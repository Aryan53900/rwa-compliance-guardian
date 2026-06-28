import Badge from "../components/ui/Badge";
import { useCompliance } from "../context/ComplianceContext";

function Blockchain() {
  const { reports } = useCompliance();

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">
        Blockchain Records
      </h1>

      {reports.length === 0 ? (
        <div className="bg-white border-4 border-black shadow-[8px_8px_0_black] p-10 text-center">
          <h2 className="text-2xl font-bold">
            No Blockchain Records
          </h2>

          <p className="text-gray-500 mt-3">
            Run a compliance check to generate blockchain attestations.
          </p>
        </div>
      ) : (
        <div className="bg-white border-4 border-black shadow-[8px_8px_0_black] overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100 border-b-4 border-black">
              <tr>
                <th className="p-4 text-left">Attestation ID</th>
                <th className="p-4 text-left">Wallet</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Blockchain Hash</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>

              {reports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-50">

                  <td className="p-4">{report.id}</td>

                  <td className="p-4">{report.wallet}</td>

                  <td className="p-4">
                    <Badge status={report.status} />
                  </td>

                  <td className="p-4 font-mono text-sm">
                    {report.hash}
                  </td>

                  <td className="p-4">
                    {report.date}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}

export default Blockchain;