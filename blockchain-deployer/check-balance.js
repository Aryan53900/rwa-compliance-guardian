require("dotenv").config();

const axios = require("axios");

async function main() {
    const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "query_global_state",
        params: {
            key: "account-hash-YOUR_ACCOUNT_HASH",
            state_identifier: {}
        }
    };

    const res = await axios.post(
        process.env.RPC_URL,
        body,
        {
            headers: {
                Authorization: process.env.CSPR_CLOUD_AUTH_TOKEN,
                "Content-Type": "application/json"
            }
        }
    );

    console.dir(res.data, { depth: null });
}

main().catch(console.error);