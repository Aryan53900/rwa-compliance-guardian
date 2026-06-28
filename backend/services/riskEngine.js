const sanctions = require("../data/sanctions.json");
const countries = require("../data/countries.json");

function calculateRisk(data) {
  let risk = 0;

  // Wallet Check
  if (sanctions.sanctionedWallets.includes(data.wallet)) {
    risk += 100;
  }

  // Country Check
  if (countries.restrictedCountries.includes(data.investorCountry)) {
    risk += 70;
  }

  // Asset Risk
  switch (data.assetType) {
    case "Real Estate":
      risk += 15;
      break;

    case "Private Equity":
      risk += 35;
      break;

    case "Government Bond":
      risk += 20;
      break;

    case "Gold":
      risk += 25;
      break;

    default:
      risk += 10;
  }

  if (risk > 100) risk = 100;

  return {
    risk,
    status: risk >= 70 ? "FAIL" : "PASS",
  };
}

module.exports = calculateRisk;