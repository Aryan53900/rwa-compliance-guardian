require("dotenv").config();

const axios = require("axios");

(async () => {
    try {
        const res = await axios.post(
            process.env.RPC_URL,
            {
                jsonrpc: "2.0",
                id: 1,
                method: "info_get_status",
                params: []
            },
            {
                headers: {
                    Authorization: process.env.CSPR_CLOUD_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(res.status);
        console.log(res.data.result.api_version);

    } catch (e) {
        console.log("STATUS:", e.response?.status);
        console.log(e.response?.data);
    }
})();