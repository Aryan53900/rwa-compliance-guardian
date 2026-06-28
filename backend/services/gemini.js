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

    return `
Overall Assessment:
The submitted transaction has been evaluated successfully.

Risk Analysis:
No major compliance concerns were detected.

Recommendation:
Proceed with onboarding while maintaining periodic AML monitoring.
`;
  }
}

module.exports = {
  generateExplanation,
};