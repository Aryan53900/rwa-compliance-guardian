const calculateRisk = require("../services/riskEngine");
const { generateExplanation } = require("../services/gemini");
const blockchain = require("../services/blockchainService");

// ===============================
// POST /api/compliance/check
// ===============================
const checkCompliance = async (req, res) => {
  try {
    const assetType = req.body.assetType?.trim();
    const wallet = req.body.wallet?.trim();
    const investorCountry = req.body.investorCountry?.trim();
    const jurisdiction = req.body.jurisdiction?.trim();

    // Validation
    if (!assetType || !wallet || !investorCountry) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Calculate Risk
    const result = calculateRisk({
      assetType,
      wallet,
      investorCountry,
      jurisdiction,
    });

    // Gemini Explanation
    let explanation;

    try {
      explanation = await generateExplanation({
        assetType,
        wallet,
        investorCountry,
        jurisdiction,
        risk: result.risk,
        status: result.status,
        factors: result.factors,
      });
    } catch (err) {
      console.log("Gemini unavailable:", err.message);

      explanation =
        "AI explanation is temporarily unavailable. The compliance decision was generated using the rule-based risk engine.";
    }

    // -------------------------------
    // Blockchain (Cloud Safe)
    // -------------------------------
    let lastId = "LOCAL-DEMO";
    let blockchainRecord = null;
    let blockchainHash = "Blockchain unavailable";

    try {
      await blockchain.storeAttestation({
        wallet,
        assetType,
        jurisdiction,
        investorCountry,
        riskScore: result.risk,
        result: result.status,
        timestamp: new Date().toISOString(),
      });

      lastId = await blockchain.getLastId();

      blockchainRecord = await blockchain.getAttestation(lastId);

      blockchainHash = `Attestation #${lastId}`;
    } catch (err) {
      console.log("Blockchain skipped:", err.message);
    }

    return res.json({
      success: true,
      complianceId: lastId,
      status: result.status,
      risk: result.risk,
      factors: result.factors,
      explanation,
      blockchainHash,
      blockchainRecord,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Compliance Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET /api/compliance/whoami
// ===============================
const whoami = async (req, res) => {
  try {
    const result = await blockchain.whoami();

    res.json({
      success: true,
      output: result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ===============================
// GET /api/compliance/last
// ===============================
const getLastId = async (req, res) => {
  try {
    const lastId = await blockchain.getLastId();

    res.json({
      success: true,
      lastId,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ===============================
// GET /api/compliance/:id
// ===============================
const getAttestation = async (req, res) => {
  try {
    const result = await blockchain.getAttestation(req.params.id);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  checkCompliance,
  whoami,
  getLastId,
  getAttestation,
};

console.log({
  checkCompliance: typeof checkCompliance,
  whoami: typeof whoami,
  getLastId: typeof getLastId,
  getAttestation: typeof getAttestation,
});