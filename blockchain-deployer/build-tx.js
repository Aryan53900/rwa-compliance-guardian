require("dotenv").config();

const fs = require("fs");

const {
    CasperNetwork,
    RpcClient,
    HttpHandler,
    PrivateKey,
    KeyAlgorithm,
    Args,
    CLValue,
} = require("casper-js-sdk");

async function main() {
    console.log("========== Loading Files ==========");

    // Load private key
    const pem = fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8");

    const privateKey = PrivateKey.fromPem(
        pem,
        KeyAlgorithm.SECP256K1
    );

    // Load wasm
    const wasm = fs.readFileSync(process.env.WASM_PATH);

    console.log("Loaded WASM:", wasm.length, "bytes");
    console.log("Public Key:", privateKey.publicKey.toHex());

    console.log("\n========== Building Runtime Args ==========");

    const args = Args.fromMap({
        odra_cfg_package_hash_key_name: CLValue.newCLString(
            "compliance_attestation"
        ),

        odra_cfg_allow_key_override: CLValue.newCLValueBool(true),

        odra_cfg_is_upgradable: CLValue.newCLValueBool(false),
    });

    console.log("Runtime args created.");

    console.log("\n========== Connecting Network ==========");

    const handler = new HttpHandler(process.env.RPC_URL);

    handler.setCustomHeaders({
        Authorization: process.env.CSPR_CLOUD_AUTH_TOKEN,
    });

    const rpc = new RpcClient(handler);
    const network = await CasperNetwork.create(rpc);

    console.log("Connected.");

    console.log("\n========== Building Transaction ==========");

    const tx = network.createSessionWasmTransaction(
        privateKey.publicKey,
        process.env.CHAIN_NAME,
        200000000000,
        1800000,
        wasm,
        args
    );

    console.log("Transaction built.");

    console.log("\n========== Signing ==========");

    tx.sign(privateKey);

    console.log("Transaction signed.");

    //
    // Intercept the FINAL request the SDK sends
    //
    const originalAxios = rpc.handler.processAxiosRequest.bind(rpc.handler);

rpc.handler.processAxiosRequest = async function (body) {

    console.log("\n========== RAW JSON SENT TO NODE ==========\n");

    const fs = require("fs");

fs.writeFileSync("rpc-body.json", body);

console.log("Saved to rpc-body.json");

    throw new Error("STOP_AFTER_CAPTURE");
};

    try {
        await rpc.putTransaction(tx);
    } catch (err) {
        if (err.message !== "STOP_AFTER_CAPTURE") {
            console.error(err);
        }
    }

    console.log("\n========== DONE ==========");
}

main().catch((err) => {
    console.error("\n========== ERROR ==========");
    console.error(err);
});