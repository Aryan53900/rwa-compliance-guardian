const { exec } = require("child_process");
const path = require("path");

const CONTRACT_PATH = path.join(
  __dirname,
  "../../contracts/compliance-attestation"
);

// ===============================
// Execute Odra CLI Command
// ===============================
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(
      `cargo run --bin compliance_attestation_cli -- ${command}`,
      {
        cwd: CONTRACT_PATH,
        env: process.env,
        maxBuffer: 1024 * 1024 * 10,
      },
      (error, stdout, stderr) => {
        if (error) {
          return reject(
            new Error(stderr || stdout || "Blockchain command failed")
          );
        }

        resolve(stdout);
      }
    );
  });
}

// ===============================
// Remove ANSI color codes
// ===============================
function cleanOutput(output) {
  return output.replace(/\x1B\[[0-9;]*m/g, "");
}

// ===============================
// Parse numeric call result
// Example:
// 💁 INFO : Call result: 12
// ===============================
function extractCallResult(output) {
  output = cleanOutput(output);

  const match = output.match(/Call result:\s*(\d+)/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

// ===============================
// Parse Attestation JSON
// ===============================
function extractAttestation(output) {
  output = cleanOutput(output);

  const match = output.match(/Call result:\s*({[\s\S]*})/);

  if (!match) {
    return null;
  }

  try {
    return JSON.parse(match[1]);
  } catch (err) {
    throw new Error("Failed to parse blockchain attestation JSON.");
  }
}

// ===============================
// Blockchain Commands
// ===============================

async function whoami() {
  return await runCommand("whoami");
}

async function getLastId() {
  const output = await runCommand(
    "contract ComplianceAttestation get_last_id"
  );

  const id = extractCallResult(output);

  if (id === null) {
    throw new Error("Unable to retrieve latest attestation ID.");
  }

  return id;
}

async function getAttestation(id) {
  const output = await runCommand(
    `contract ComplianceAttestation get_attestation --id ${id}`
  );

  const record = extractAttestation(output);

  if (!record) {
    throw new Error("Blockchain attestation not found.");
  }

  return record;
}

async function storeAttestation(data) {
  await runCommand(
    `contract ComplianceAttestation store_attestation \
--wallet "${data.wallet}" \
--asset_type "${data.assetType}" \
--jurisdiction "${data.jurisdiction}" \
--investor_country "${data.investorCountry}" \
--risk_score ${data.riskScore} \
--result "${data.result}" \
--timestamp "${data.timestamp}" \
--gas "5 CSPR"`
  );

  return true;
}

module.exports = {
  whoami,
  getLastId,
  getAttestation,
  storeAttestation,
};