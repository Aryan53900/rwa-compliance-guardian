const calculateRisk = require("./services/riskEngine");

const result = calculateRisk({
  assetType: "Gold",
  wallet: "0xBAD999",
  investorCountry: "Iran",
});

console.log(result);