import { useState } from "react";
import axios from "axios";

import Badge from "../ui/Badge";
import { useCompliance } from "../../context/ComplianceContext";

const API_URL = import.meta.env.VITE_API_URL;

function ReportTable({ search, statusFilter }) {
  const { reports } = useCompliance();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.wallet.toLowerCase().includes(search.toLowerCase()) ||
      report.asset.toLowerCase().includes(search.toLowerCase()) ||
      report.country.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const fetchBlockchainRecord = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/compliance/${id}`
      );

      setSelectedRecord(res.data.result);

    } catch (err) {
      console.error(err);
      alert("Unable to fetch blockchain record.");
    } finally {
      setLoading(false);
    }
  };

  if (filteredReports.length === 0) {
    return (
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-12 text-center">
        <div className="text-6xl mb-5">📄</div>

        <h2 className="text-3xl font-black">
          No Reports Found
        </h2>

        <p className="text-gray-500 mt-3">
          Try changing your search or run a new compliance check.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#CFE8D5] border-b-4 border-black">

            <tr>

              <th className="p-4">#</th>
              <th className="p-4 text-left">Compliance ID</th>
              <th className="p-4 text-left">Wallet</th>
              <th className="p-4 text-left">Asset</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Risk</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredReports.map((report, index) => (

              <tr
                key={report.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-bold">
                  {index + 1}
                </td>

                <td className="p-4">
                  {report.id}
                </td>

                <td className="p-4 font-mono">
                  {report.wallet}
                </td>

                <td className="p-4">
                  {report.asset}
                </td>

                <td className="p-4">
                  {report.country}
                </td>

                <td className="p-4 font-bold">
                  {report.risk}
                </td>

                <td className="p-4">
                  <Badge status={report.status} />
                </td>

                <td className="p-4">
                  {report.date}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      fetchBlockchainRecord(report.id)
                    }
                    className="
                      bg-black
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      hover:bg-gray-800
                    "
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {selectedRecord && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-[650px] rounded-2xl border-4 border-black p-8">

            <h2 className="text-3xl font-black mb-6">
              Blockchain Attestation
            </h2>

            {loading ? (

              <p>Loading...</p>

            ) : (

              <div className="space-y-3">

                <p><strong>ID:</strong> {selectedRecord.id}</p>

                <p><strong>Wallet:</strong> {selectedRecord.wallet}</p>

                <p><strong>Asset:</strong> {selectedRecord.asset_type}</p>

                <p><strong>Country:</strong> {selectedRecord.investor_country}</p>

                <p><strong>Jurisdiction:</strong> {selectedRecord.jurisdiction}</p>

                <p><strong>Risk:</strong> {selectedRecord.risk_score}</p>

                <p><strong>Status:</strong> {selectedRecord.result}</p>

                <p><strong>Timestamp:</strong> {selectedRecord.timestamp}</p>

              </div>

            )}

            <button
              onClick={() => setSelectedRecord(null)}
              className="
                mt-8
                w-full
                bg-black
                text-white
                py-3
                rounded-lg
              "
            >
              Close
            </button>

          </div>

        </div>

      )}

    </>
  );
}

export default ReportTable;