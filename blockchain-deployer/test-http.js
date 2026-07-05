require("dotenv").config();

console.log("RPC_URL:", process.env.RPC_URL);
console.log("TOKEN LENGTH:", process.env.CSPR_CLOUD_AUTH_TOKEN?.length);
console.log(
  "TOKEN PREFIX:",
  process.env.CSPR_CLOUD_AUTH_TOKEN?.substring(0, 8)
);