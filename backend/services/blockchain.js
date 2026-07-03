const { execa } = require("execa");
const path = require("path");

const CONTRACT_PATH = path.resolve(
    __dirname,
    "../../contracts/compliance-attestation"
);

const CLI_BINARY = "compliance_attestation_cli";

async function runCommand(args) {
    try {

        const { stdout } = await execa(
            "cargo",
            [
                "run",
                "--bin",
                CLI_BINARY,
                "--",
                ...args
            ],
            {
                cwd: CONTRACT_PATH
            }
        );

        return stdout;

    } catch (error) {

        console.error(error.stderr);

        throw new Error(
            error.stderr || "Blockchain command failed"
        );
    }
}

module.exports = {
    runCommand
};