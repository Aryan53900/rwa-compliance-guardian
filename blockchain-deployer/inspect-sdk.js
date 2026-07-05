require("dotenv").config();

const axios = require("axios");

// Patch axios BEFORE loading the SDK
const originalRequest = axios.Axios.prototype.request;

axios.Axios.prototype.request = async function (config) {
    console.log("\n===== AXIOS CONFIG =====");
    console.dir(config, { depth: null });

    return originalRequest.call(this, config);
};

const { RpcClient, HttpHandler } = require("casper-js-sdk");

const handler = new HttpHandler(process.env.RPC_URL);

handler.setCustomHeaders({
    Authorization: process.env.CSPR_CLOUD_AUTH_TOKEN
});

const rpc = new RpcClient(handler);

rpc.getStatus().catch(console.error);