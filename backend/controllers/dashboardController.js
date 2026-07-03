const blockchain = require("../services/blockchainService");

const getDashboard = async (req, res) => {
  try {
    const totalAttestations = await blockchain.getLastId();

    res.json({
      success: true,
      totalAttestations,
      network: "Casper Testnet",
      aiModel: "Gemini 2.0 Flash",
      contract: "ComplianceAttestation",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboard,
};