const calculateRisk = require("../services/riskEngine");
const { generateExplanation } = require("../services/gemini");
const { v4: uuidv4 } = require("uuid");

const checkCompliance = async (req, res) => {
  try {
    const {
      assetType,
      wallet,
      investorCountry,
      jurisdiction,
    } = req.body;

    if (!assetType || !wallet || !investorCountry) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Calculate risk
    const result = calculateRisk({
      assetType,
      wallet,
      investorCountry,
      jurisdiction,
    });

    // Ask Gemini for explanation
    const explanation = await generateExplanation({
      assetType,
      wallet,
      investorCountry,
      jurisdiction,
      risk: result.risk,
      status: result.status,
    });

    res.json({
      success: true,
      complianceId: `CMP-${uuidv4().slice(0, 8).toUpperCase()}`,
      status: result.status,
      risk: result.risk,
      factors: result.factors,
      blockchainHash:
        "0x" +
        Math.random()
          .toString(16)
          .substring(2, 18)
          .toUpperCase(),
      explanation,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  checkCompliance,
};