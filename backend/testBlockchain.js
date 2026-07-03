require("dotenv").config();

const blockchain = require("./services/blockchainService");

console.log("====================================");
console.log("Environment Check");
console.log("====================================");
console.log(
  "NODE_ADDRESS:",
  process.env.ODRA_CASPER_LIVENET_NODE_ADDRESS
);
console.log(
  "CHAIN_NAME:",
  process.env.ODRA_CASPER_LIVENET_CHAIN_NAME
);
console.log(
  "EVENTS_ADDRESS:",
  process.env.ODRA_CASPER_LIVENET_EVENTS_ADDRESS
);
console.log(
  "EVENTS_URL:",
  process.env.ODRA_CASPER_LIVENET_EVENTS_URL
);
console.log(
  "SECRET_KEY:",
  process.env.ODRA_CASPER_LIVENET_SECRET_KEY_PATH
);
console.log(
  "TOKEN:",
  process.env.CSPR_CLOUD_AUTH_TOKEN ? "Loaded ✅" : "Missing ❌"
);
console.log("====================================\n");

async function test() {
  try {
    console.log("Testing blockchain connection...\n");

    const result = await blockchain.whoami();

    console.log("\n========== RESULT ==========");
    console.log(result);
  } catch (err) {
    console.error("\n========== ERROR ==========");
    console.error(err);
  }
}

test();