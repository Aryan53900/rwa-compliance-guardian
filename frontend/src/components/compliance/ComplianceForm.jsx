import { useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { toast } from "react-toastify";

function ComplianceForm({ onCheck, loading }) {
  const [formData, setFormData] = useState({
    assetType: "",
    wallet: "",
    investorCountry: "",
    jurisdiction: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.assetType ||
      !formData.wallet ||
      !formData.investorCountry ||
      !formData.jurisdiction
    ) {
      toast.warning("⚠️ Please fill all fields.");
      return;
    }

    onCheck(formData);
  };

  return (
    <Card className="bg-[#FFD65A]">
      <h2 className="text-2xl font-bold mb-6">
        New Compliance Check
      </h2>

      <div className="grid grid-cols-2 gap-5">
        <Input
          label="Asset Type"
          name="assetType"
          placeholder="Real Estate"
          value={formData.assetType}
          onChange={handleChange}
        />

        <Input
          label="Wallet Address"
          name="wallet"
          placeholder="0x123456789..."
          value={formData.wallet}
          onChange={handleChange}
        />

        <Input
          label="Investor Country"
          name="investorCountry"
          placeholder="India"
          value={formData.investorCountry}
          onChange={handleChange}
        />

        <Input
          label="Jurisdiction"
          name="jurisdiction"
          placeholder="Singapore"
          value={formData.jurisdiction}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="dark"
        className="mt-6 w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "🤖 AI Compliance Engine Running..."
          : "🚀 Run AI Compliance Check"}
      </Button>
    </Card>
  );
}

export default ComplianceForm;