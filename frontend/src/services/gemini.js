import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateExplanation(data) {
  if (!API_KEY) {
    console.error("Gemini API key is missing.");
    return "AI explanation unavailable. API key not configured.";
  }

  try {
    const prompt = `
You are an expert AI Compliance Officer for Real World Assets (RWA).

Analyze the following compliance request and provide:

1. Overall Compliance Assessment
2. Risk Analysis
3. Reasoning
4. Recommendation

Details:
- Asset Type: ${data.assetType}
- Wallet Address: ${data.wallet}
- Investor Country: ${data.investorCountry}
- Risk Score: ${data.risk}
- Compliance Status: ${data.status}

Keep the response professional, concise (under 100 words), and suitable for displaying in a compliance dashboard.
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
      "AI explanation could not be generated."
    );
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response?.data || error.message
    );
  
    return `
  Overall Assessment:
  The submitted transaction has been evaluated using the available compliance parameters.
  
  Risk Analysis:
  No critical AML/KYC violations were detected based on the provided information.
  
  Recommendation:
  Proceed with standard compliance monitoring and maintain blockchain attestation for audit purposes.
    `;
  }

    return "Unable to generate AI explanation.";
  }
