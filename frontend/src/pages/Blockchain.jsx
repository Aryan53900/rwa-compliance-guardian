import { useState } from "react";
import axios from "axios";

import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import { useCompliance } from "../context/ComplianceContext";

const API_URL = import.meta.env.VITE_API_URL;

function Blockchain() {
  const { reports } = useCompliance();

  const [attestationId, setAttestationId] = useState("");
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecord = async () => {
    if (!attestationId) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/compliance/${attestationId}`
      );

      setRecord(response.data.result);
    } catch (err) {
      console.error(err);

      alert("Blockchain record not found.");

      setRecord(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-[#CFE8D5] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h1 className="text-5xl font-black">
          Blockchain Explorer
        </h1>

        <p className="mt-3 text-lg text-gray-700">
          Immutable compliance attestations secured on Casper Testnet.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-green-200 border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">
          <h3 className="font-bold uppercase">
            Verified Records
          </h3>

          <h2 className="text-5xl font-black mt-3">
            {reports.length}
          </h2>
        </div>

        <div className="bg-blue-200 border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">
          <h3 className="font-bold uppercase">
            Immutable Records
          </h3>

          <h2 className="text-5xl font-black mt-3">
            {reports.length}
          </h2>
        </div>

        <div className="bg-yellow-200 border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">
          <h3 className="font-bold uppercase">
            Network
          </h3>

          <h2 className="text-3xl font-black mt-5">
            Casper
          </h2>

          <p>Testnet</p>
        </div>

      </div>

      {/* Search Card */}

      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h2 className="text-3xl font-black mb-6">
          Search Blockchain
        </h2>

        <div className="flex gap-4 items-end">

          <div className="flex-1">

            <Input
              label="Attestation ID"
              placeholder="11"
              value={attestationId}
              onChange={(e) =>
                setAttestationId(e.target.value)
              }
            />

          </div>

          <button
            onClick={fetchRecord}
            className="
              bg-black
              text-white
              px-8
              py-3
              font-bold
              border-2
              border-black
              hover:bg-white
              hover:text-black
              transition
            "
          >
            Fetch
          </button>

        </div>

      </div>

      {/* Blockchain Result */}

      {loading && (

        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-10 text-center">

          <div className="animate-spin w-16 h-16 border-[6px] border-black border-t-transparent rounded-full mx-auto mb-6"></div>

          <h2 className="text-2xl font-bold">
            Fetching Blockchain Record...
          </h2>

        </div>

      )}

      {record && (

        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-black">
              Blockchain Attestation
            </h2>

            <Badge status={record.result} />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="font-bold">Attestation ID</p>
              <p>{record.id}</p>
            </div>

            <div>
              <p className="font-bold">Wallet</p>
              <p className="font-mono break-all">
                {record.wallet}
              </p>
            </div>

            <div>
              <p className="font-bold">Asset Type</p>
              <p>{record.asset_type}</p>
            </div>

            <div>
              <p className="font-bold">Investor Country</p>
              <p>{record.investor_country}</p>
            </div>

            <div>
              <p className="font-bold">Jurisdiction</p>
              <p>{record.jurisdiction}</p>
            </div>

            <div>
              <p className="font-bold">Risk Score</p>
              <p>{record.risk_score}/100</p>
            </div>

            <div>
              <p className="font-bold">Status</p>
              <p>{record.result}</p>
            </div>

            <div>
              <p className="font-bold">Timestamp</p>
              <p>{record.timestamp}</p>
            </div>

          </div>

        </div>

      )}

      {/* Existing Records */}

      {reports.length > 0 && (

        <div>

          <h2 className="text-3xl font-black mb-6">
            Recent Compliance Reports
          </h2>

          <div className="space-y-5">

            {reports
              .slice()
              .reverse()
              .map((report) => (

                <div
                  key={report.id}
                  className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-2xl font-black">
                        {report.id}
                      </h3>

                      <p className="text-gray-500">
                        {report.wallet}
                      </p>

                    </div>

                    <Badge status={report.status} />

                  </div>

                </div>

              ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default Blockchain;