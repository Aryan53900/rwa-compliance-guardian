import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { exportCompliancePDF } from "../../utils/exportPDF";

function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <Card>
        <h2 className="text-2xl font-bold mb-6">
          🤖 AI Compliance Engine
        </h2>

        <div className="flex justify-center mb-6">
        <div className="flex justify-center mb-8">
  <div className="animate-spin w-16 h-16 border-[6px] border-black border-t-transparent rounded-full"></div>
</div>
        </div>

        <div className="space-y-4 text-lg">
          <p>🔍 Analyzing Wallet Address...</p>
          <p>🛡 Checking AML & Sanctions Lists...</p>
          <p>🌍 Verifying Investor Jurisdiction...</p>
          <p>📊 Calculating Compliance Risk...</p>
          <p>🤖 Generating AI Compliance Report...</p>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card>
        <h2 className="text-2xl font-bold mb-6">
          AI Compliance Assessment
        </h2>

        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛡</div>

          <h3 className="text-xl font-bold mb-2">
            No Compliance Report
          </h3>

          <p className="text-gray-500">
            Run your first compliance check to generate an AI assessment.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          AI Compliance Assessment
        </h2>

        <Badge status={result.status} />
      </div>

      {/* Overall Risk */}

      <div className="space-y-6">

        <div className="flex justify-between items-center border-b pb-4">

          <span className="font-semibold text-lg">
            Overall Risk
          </span>

          <div className="text-right">

            <h2 className="text-4xl font-black">
              {result.risk}/100
            </h2>

            <p
              className={`font-bold ${
                result.risk <= 30
                  ? "text-green-600"
                  : result.risk <= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {result.risk <= 30
                ? "LOW"
                : result.risk <= 60
                ? "MEDIUM"
                : "HIGH"}
            </p>

          </div>

        </div>

        {/* Compliance Pipeline */}

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-green-100 border border-green-400 rounded-lg p-3">
            ✔ Wallet Screening
          </div>

          <div className="bg-green-100 border border-green-400 rounded-lg p-3">
            ✔ AML Screening
          </div>

          <div className="bg-green-100 border border-green-400 rounded-lg p-3">
            ✔ Sanctions Check
          </div>

          <div className="bg-green-100 border border-green-400 rounded-lg p-3">
            ✔ Blockchain Recorded
          </div>

        </div>
{/* Compliance Pipeline */}

<div className="mt-8">

  <h3 className="text-lg font-bold mb-4">
    Compliance Pipeline
  </h3>

  <div className="space-y-3">

    <div className="flex justify-between items-center bg-green-100 border border-green-300 rounded-lg p-3">
      <span>👜 Wallet Verification</span>
      <span className="font-semibold text-green-700">
        Completed
      </span>
    </div>

    <div
      className={`flex justify-between items-center rounded-lg p-3 border ${
        result.status === "FAIL"
          ? "bg-red-100 border-red-300"
          : "bg-green-100 border-green-300"
      }`}
    >
      <span>🛡 AML Screening</span>

      <span
        className={`font-semibold ${
          result.status === "FAIL"
            ? "text-red-700"
            : "text-green-700"
        }`}
      >
        {result.status === "FAIL"
          ? "Failed"
          : "Passed"}
      </span>
    </div>

    <div
      className={`flex justify-between items-center rounded-lg p-3 border ${
        result.status === "FAIL"
          ? "bg-red-100 border-red-300"
          : "bg-green-100 border-green-300"
      }`}
    >
      <span>🚫 Sanctions Screening</span>

      <span
        className={`font-semibold ${
          result.status === "FAIL"
            ? "text-red-700"
            : "text-green-700"
        }`}
      >
        {result.status === "FAIL"
          ? "Match Found"
          : "Clear"}
      </span>
    </div>

    <div
      className={`flex justify-between items-center rounded-lg p-3 border ${
        result.status === "REVIEW"
          ? "bg-yellow-100 border-yellow-300"
          : result.status === "FAIL"
          ? "bg-red-100 border-red-300"
          : "bg-green-100 border-green-300"
      }`}
    >
      <span>🌍 Jurisdiction Review</span>

      <span
        className={`font-semibold ${
          result.status === "PASS"
            ? "text-green-700"
            : result.status === "REVIEW"
            ? "text-yellow-700"
            : "text-red-700"
        }`}
      >
        {result.status === "PASS"
          ? "Approved"
          : result.status === "REVIEW"
          ? "Manual Review"
          : "Restricted"}
      </span>
    </div>

    <div
      className={`flex justify-between items-center rounded-lg p-3 border ${
        result.status === "FAIL"
          ? "bg-gray-100 border-gray-300"
          : "bg-green-100 border-green-300"
      }`}
    >
      <span>⛓ Blockchain Attestation</span>

      <span
        className={`font-semibold ${
          result.status === "FAIL"
            ? "text-gray-600"
            : "text-green-700"
        }`}
      >
        {result.status === "FAIL"
          ? "Pending"
          : "Recorded"}
      </span>
    </div>

  </div>

</div>
        {/* Compliance Details */}

        <div className="bg-gray-100 border-2 border-black rounded-xl p-4">

          <p className="mb-3">
            <strong>Compliance ID:</strong>{" "}
            {result.complianceId}
          </p>

          <p className="text-sm break-all font-mono">
            <strong>Blockchain Hash:</strong>{" "}
            {result.blockchainHash}
          </p>

        </div>

        {/* Risk Factors */}

        {result.factors && result.factors.length > 0 && (

          <div>

            <h3 className="text-lg font-bold mb-3">
              Risk Factors
            </h3>

            <div className="space-y-2">

              {result.factors.map((factor, index) => (

                <div
                  key={index}
                  className="bg-yellow-100 border border-yellow-400 rounded-lg p-3"
                >
                  • {factor}
                </div>

              ))}

            </div>

          </div>

        )}

        {/* Recommendation */}

        <div
          className={`rounded-xl p-5 font-semibold ${
            result.status === "PASS"
              ? "bg-green-100 text-green-700"
              : result.status === "REVIEW"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          <h3 className="font-bold mb-2">
            Recommendation
          </h3>

          {result.status === "PASS" &&
            "Proceed with token issuance. Compliance requirements have been satisfied."}

          {result.status === "REVIEW" &&
            "Manual compliance review is recommended before approving this transaction."}

          {result.status === "FAIL" &&
            "Transaction blocked due to high compliance risk. Further investigation is required."}

        </div>

      </div>

      {/* AI Summary */}

      <div className="mt-8">

        <h3 className="font-bold text-lg mb-3">
          🤖 AI Assessment
        </h3>

        <div className="bg-gray-100 border-2 border-black rounded-lg p-5 leading-8">

          {result.explanation}

        </div>

      </div>

      {/* PDF */}

      <button
        onClick={() => exportCompliancePDF(result)}
        className="
          mt-8
          w-full
          bg-black
          text-white
          border-2
          border-black
          py-3
          font-bold
          hover:bg-white
          hover:text-black
          transition
        "
      >
        📄 Download Compliance Report
      </button>

      <p className="text-center text-xs text-gray-500 mt-5">
        Generated by AI Compliance Guardian • Powered by Gemini AI & Casper Network
      </p>

    </Card>
  );
}

export default ResultCard;