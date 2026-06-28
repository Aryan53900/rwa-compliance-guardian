import Badge from "../ui/Badge";
import { useCompliance } from "../../context/ComplianceContext";

function ReportTable() {
  const { reports } = useCompliance();

  if (reports.length === 0) {
    return (
      <div className="bg-white border-4 border-black shadow-[8px_8px_0_black] p-10 text-center">
        <h2 className="text-3xl font-bold mb-3">
          📄 No Reports Yet
        </h2>

        <p className="text-gray-500">
          Run a compliance check to generate reports.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0_black] overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100 border-b-4 border-black">

          <tr>

            <th className="p-4">#</th>

            <th className="p-4 text-left">
              Compliance ID
            </th>

            <th className="p-4 text-left">
              Wallet
            </th>

            <th className="p-4 text-left">
              Asset
            </th>

            <th className="p-4 text-left">
              Country
            </th>

            <th className="p-4 text-left">
              Risk
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report, index) => (

            <tr
              key={report.id}
              className="border-b hover:bg-gray-50"
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

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ReportTable;