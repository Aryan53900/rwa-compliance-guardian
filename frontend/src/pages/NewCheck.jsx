import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import ComplianceForm from "../components/compliance/ComplianceForm";
import ResultCard from "../components/compliance/ResultCard";
import { useCompliance } from "../context/ComplianceContext";

const API_URL = import.meta.env.VITE_API_URL;

function NewCheck() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addReport } = useCompliance();

  const handleCheck = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/compliance/check`,
        formData
      );

      const generatedResult = response.data;

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
        toast.success(
          "✅ Compliance verification completed successfully."
        );
      } else {
        toast.error(
          "⚠ High-risk compliance issues detected. Manual review required."
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "⚠ Unable to connect to the Compliance API."
      );
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