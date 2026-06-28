const sanctions = require("../data/sanctions.json");
const countries = require("../data/countries.json");

function calculateRisk(data) {
  let risk = 0;
  const factors = [];

  // -------------------------
  // Wallet Sanctions Check
  // -------------------------
  if (sanctions.sanctionedWallets.includes(data.wallet)) {
    risk += 100;
    factors.push("Wallet found on sanctions list");
  }

  // -------------------------
  // Restricted Country
  // -------------------------
  if (
    countries.restrictedCountries
      .map((c) => c.toLowerCase())
      .includes(data.investorCountry.toLowerCase())
  ) {
    risk += 60;
    factors.push("Investor belongs to a restricted country");
  }

  // -------------------------
  // Asset Type Risk
  // -------------------------
  switch (data.assetType) {
    case "Real Estate":
      risk += 10;
      factors.push("Real Estate asset");
      break;

    case "Government Bond":
      risk += 15;
      factors.push("Government Bond asset");
      break;

    case "Gold":
      risk += 20;
      factors.push("Gold asset");
      break;

    case "Private Equity":
      risk += 30;
      factors.push("Private Equity asset");
      break;

    case "NFT":
      risk += 35;
      factors.push("NFT asset");
      break;

    case "Cryptocurrency":
      risk += 40;
      factors.push("Cryptocurrency asset");
      break;

    default:
      risk += 5;
      factors.push("Standard asset");
  }

  // -------------------------
  // Jurisdiction Risk
  // -------------------------
  const highRiskJurisdictions = [
    "Panama",
    "Cayman Islands",
    "British Virgin Islands",
    "Belize",
  ];

  if (
    data.jurisdiction &&
    highRiskJurisdictions
      .map((j) => j.toLowerCase())
      .includes(data.jurisdiction.toLowerCase())
  ) {
    risk += 20;
    factors.push("High-risk jurisdiction");
  }

  // -------------------------
  // Wallet Format Check
  // -------------------------
  if (data.wallet.length < 12) {
    risk += 10;
    factors.push("Suspicious wallet format");
  }

  // -------------------------
  // Normalize Risk
  // -------------------------
  if (risk > 100) {
    risk = 100;
  }

  // -------------------------
  // Compliance Status
  // -------------------------
  let status = "PASS";

  if (risk >= 61) {
    status = "FAIL";
  } else if (risk >= 31) {
    status = "REVIEW";
  }

  return {
    risk,
    status,
    factors,
  };
}

module.exports = calculateRisk;