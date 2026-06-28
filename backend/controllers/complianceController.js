const calculateRisk = require("../services/riskEngine");
const { v4: uuidv4 } = require("uuid");

const checkCompliance = (req, res) => {
  try {
    const { assetType, wallet, investorCountry } = req.body;

    // Basic validation
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
    });

    // Create response
    const response = {
      success: true,
      id: `CMP-${uuidv4().slice(0, 8).toUpperCase()}`,
      status: result.status,
      risk: result.risk,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
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