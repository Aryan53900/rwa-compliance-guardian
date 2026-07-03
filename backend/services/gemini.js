const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

async function generateExplanation(data) {
  if (!API_KEY) {
    console.error("Gemini API key missing.");

    return "AI explanation unavailable. API key not configured.";
  }

  try {
    const prompt = `
You are an expert AI Compliance Officer for Real World Assets (RWA).

Analyze the following compliance request.

Asset Type: ${data.assetType}
Wallet Address: ${data.wallet}
Investor Country: ${data.investorCountry}
Jurisdiction: ${data.jurisdiction}
Risk Score: ${data.risk}
Compliance Status: ${data.status}

Generate:

1. Compliance Assessment
2. Risk Analysis
3. Recommendation

Keep the response under 100 words.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI explanation unavailable."
    );
  } catch (error) {

    console.error(
      "Gemini Error:",
      error.response?.data || error.message
    );
  
    if (data.status === "PASS") {
      return `
  Overall Assessment:
  The transaction appears compliant.
  
  Risk Analysis:
  Only minor compliance factors were detected.
  
  Recommendation:
  Proceed with onboarding while continuing routine monitoring.
  `;
    }
  
    if (data.status === "REVIEW") {
      return `
  Overall Assessment:
  The transaction requires manual review.
  
  Risk Analysis:
  Several moderate-risk indicators were identified.
  
  Recommendation:
  Request additional documentation before approval.
  `;
    }
  
    return `
  Overall Assessment:
  The transaction has been flagged as high risk.
  
  Risk Analysis:
  Critical compliance indicators triggered the automated risk engine.
  
  Recommendation:
  Do not approve this transaction until a full AML investigation has been completed.
  `;
  }
}

module.exports = {
  generateExplanation,
};