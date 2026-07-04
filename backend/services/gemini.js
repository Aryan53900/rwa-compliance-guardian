const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

async function generateExplanation(data) {
  if (!API_KEY) {
    console.error("Gemini API key missing.");

    return "AI explanation unavailable. API key not configured.";
  }

  try {
    const prompt = `
You are a Senior Compliance Officer working for a global Real World Asset (RWA) tokenization platform.

Your responsibility is to review investor onboarding requests and provide professional compliance reports similar to those produced by enterprise AML/KYC platforms.

==================================================
COMPLIANCE REQUEST
==================================================

Asset Type:
${data.assetType}

Wallet Address:
${data.wallet}

Investor Country:
${data.investorCountry}

Jurisdiction:
${data.jurisdiction}

Compliance Status:
${data.status}

Risk Score:
${data.risk}/100

Risk Factors:
${data.factors?.length ? data.factors.join(", ") : "No major risk factors detected."}

==================================================

Generate a professional compliance report.

The report MUST contain these sections:

Executive Summary

Risk Analysis

Compliance Decision

Recommendation

Next Steps

Rules:

• Maximum 180 words.
• Sound like a senior compliance analyst.
• Do NOT mention you are an AI.
• Do NOT repeat the input values.
• Give practical recommendations.
• Make every response unique.
• Match the tone to the compliance result.

If Status = PASS:
- Positive tone.
- Mention low risk.
- Recommend routine monitoring.

If Status = REVIEW:
- Neutral tone.
- Mention enhanced due diligence.
- Recommend manual verification.

If Status = FAIL:
- Serious tone.
- Explain regulatory concerns.
- Recommend blocking the transaction until investigation.

Return plain text only.
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

    // Smart fallback responses

    if (data.status === "PASS") {
      return `
Executive Summary:
The compliance assessment indicates a low-risk onboarding request with no significant regulatory concerns identified.

Risk Analysis:
The automated compliance engine detected only minor observations that do not affect the overall approval decision.

Compliance Decision:
Approved.

Recommendation:
Proceed with token issuance while maintaining routine AML and transaction monitoring.

Next Steps:
Continue periodic compliance reviews according to internal policy.
`;
    }

    if (data.status === "REVIEW") {
      return `
Executive Summary:
The transaction presents moderate compliance risk requiring additional verification before approval.

Risk Analysis:
Several indicators require enhanced due diligence to validate investor identity and transaction legitimacy.

Compliance Decision:
Manual Review Required.

Recommendation:
Collect additional KYC documentation and perform source-of-funds verification.

Next Steps:
Escalate the case to the compliance team before onboarding.
`;
    }

    return `
Executive Summary:
The compliance engine identified significant regulatory concerns associated with this request.

Risk Analysis:
Multiple high-risk indicators triggered the automated risk assessment, making the transaction unsuitable for immediate approval.

Compliance Decision:
Rejected.

Recommendation:
Do not proceed until a complete AML investigation and compliance review have been completed.

Next Steps:
Block onboarding and escalate the case for regulatory investigation.
`;
  }
}

module.exports = {
  generateExplanation,
};