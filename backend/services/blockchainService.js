const { exec } = require("child_process");
const path = require("path");

const CONTRACT_PATH = path.join(
  __dirname,
  "../../contracts/compliance-attestation"
);

function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log("\n==========================");
    console.log("Executing:");
    console.log(`cargo run --bin compliance_attestation_cli -- ${command}`);
    console.log("Working Directory:");
    console.log(CONTRACT_PATH);
    console.log("==========================\n");

    exec(
      `cargo run --bin compliance_attestation_cli -- ${command}`,
      {
        cwd: CONTRACT_PATH,
        env: process.env,
        maxBuffer: 1024 * 1024 * 10,
      },
      (error, stdout, stderr) => {
        console.log("========== STDOUT ==========");
        console.log(stdout);

        console.log("========== STDERR ==========");
        console.log(stderr);

        if (error) {
          console.error(error);
          return reject(
            new Error(stderr || stdout || "Blockchain command failed")
          );
        }

        resolve(stdout);
      }
    );
  });
}

// -------------------------
// Parse CLI output
// -------------------------
function extractCallResult(output) {
  const match = output.match(/Call result:\s*([\s\S]*)/);

  if (!match) {
    return output.trim();
  }

  return match[1].trim();
}

// -------------------------
// Commands
// -------------------------

async function whoami() {
  return runCommand("whoami");
}

async function getLastId() {
  const output = await runCommand(
    "contract ComplianceAttestation get_last_id"
  );

  const result = extractCallResult(output);

  return Number(result);
}

async function getAttestation(id) {
  const output = await runCommand(
    `contract ComplianceAttestation get_attestation --id ${id}`
  );

  return extractCallResult(output);
}

async function storeAttestation(data) {
  const output = await runCommand(
    `contract ComplianceAttestation store_attestation \
--wallet "${data.wallet}" \
--asset_type "${data.assetType}" \
--jurisdiction "${data.jurisdiction}" \
--investor_country "${data.investorCountry}" \
--risk_score ${data.riskScore} \
--result "${data.result}" \
--timestamp "${data.timestamp}" \
--gas "2 CSPR"`
  );

  return output;
}

module.exports = {
  whoami,
  getLastId,
  getAttestation,
  storeAttestation,
};