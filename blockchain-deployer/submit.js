require("dotenv").config();

const fs = require("fs");
const axios = require("axios");

async function main() {
    console.log("Loading transaction...");

    const tx = JSON.parse(
        fs.readFileSync("signed-transaction.json", "utf8")
    );

    console.log("Submitting...");

    const response = await axios.post(
        process.env.RPC_URL,
        {
            jsonrpc: "2.0",
            id: 1,
            method: "account_put_transaction",
            params: {
                transaction: tx
            }
        },
        {
            headers: {
                Authorization: process.env.CSPR_CLOUD_AUTH_TOKEN,
                "Content-Type": "application/json"
            }
        }
    );

    console.log("RPC Response:");
    console.dir(response.data, { depth: null });
}

main().catch(err => {
    if (err.response) {
        console.dir(err.response.data, { depth: null });
    } else {
        console.error(err);
    }
});