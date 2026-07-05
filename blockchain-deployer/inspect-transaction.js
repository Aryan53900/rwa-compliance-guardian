const {
    SessionBuilder,
    PrivateKey,
    Args,
    CLValue
} = require("casper-js-sdk");

const fs = require("fs");

const wasm = fs.readFileSync(
    "../contracts/compliance-attestation/wasm/ComplianceAttestation.wasm"
);

console.log("Loaded WASM:", wasm.length, "bytes");