const { RpcClient, HttpHandler } = require("casper-js-sdk");

async function main() {
    const rpc = new RpcClient(
        new HttpHandler("http://195.201.174.222:7777/rpc")
    );

    const status = await rpc.getStatus();

    console.log(status.chainspecName || status.chainspec_name);
}

main().catch(console.error);