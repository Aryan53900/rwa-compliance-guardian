import { useState } from "react";
import ComplianceForm from "../components/compliance/ComplianceForm";
import ResultCard from "../components/compliance/ResultCard";
import { useCompliance } from "../context/ComplianceContext";
import { toast } from "react-toastify";
import { generateExplanation } from "../services/gemini";

function NewCheck() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addReport } = useCompliance();

  const handleCheck = async (formData) => {
    setLoading(true);

    try {
      // Fake AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const restrictedCountries = [
        "Iran",
        "North Korea",
        "Syria",
        "Russia",
      ];

      const isRestricted = restrictedCountries.some(
        (country) =>
          country.toLowerCase() ===
          formData.investorCountry.toLowerCase()
      );

      const generatedResult = {
        status: isRestricted ? "FAIL" : "PASS",
        risk: isRestricted ? 92 : 18,
        complianceId: `CMP-${Math.floor(
          1000 + Math.random() * 9000
        )}`,
        blockchainHash:
          "0x" +
          Math.random()
            .toString(16)
            .substring(2, 18)
            .toUpperCase(),
        explanation: "",
      };

      // Try Gemini
      try {
        generatedResult.explanation = await generateExplanation({
          assetType: formData.assetType,
          wallet: formData.wallet,
          investorCountry: formData.investorCountry,
          risk: generatedResult.risk,
          status: generatedResult.status,
        });
      } catch (err) {
        console.error("Gemini failed:", err);

        generatedResult.explanation =
          generatedResult.status === "PASS"
            ? "The submitted wallet and investor jurisdiction passed the compliance checks. No major AML or sanctions risks were detected."
            : "The submitted transaction contains high-risk compliance indicators. Manual review is recommended before proceeding.";
      }

      setResult(generatedResult);

      addReport({
        id: generatedResult.complianceId,
        wallet: formData.wallet,
        asset: formData.assetType,
        country: formData.investorCountry,
        risk: generatedResult.risk,
        status: generatedResult.status,
        hash: generatedResult.blockchainHash,
        date: new Date().toLocaleDateString(),
      });

      if (generatedResult.status === "PASS") {
        toast.success("✅ Compliance Check Passed");
      } else {
        toast.error("❌ Compliance Check Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">
        New Compliance Check
      </h1>

      <div className="grid grid-cols-2 gap-8">
        <ComplianceForm
          onCheck={handleCheck}
          loading={loading}
        />

        <ResultCard
          result={result}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default NewCheck;