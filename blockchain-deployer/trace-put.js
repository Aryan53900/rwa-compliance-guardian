const sdk = require("casper-js-sdk");

const original = sdk.RpcClient.prototype.putTransaction;

sdk.RpcClient.prototype.putTransaction = async function (tx) {
    console.log("========== TRANSACTION JSON ==========");
    console.dir(tx.toJSON(), { depth: null });

    console.log("\n========== WRAPPER ==========");
    console.dir(tx.getTransactionWrapper(), { depth: null });

    return original.call(this, tx);
};

console.log("Patch loaded.");