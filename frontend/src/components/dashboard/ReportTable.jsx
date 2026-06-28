import Badge from "../ui/Badge";
import { useCompliance } from "../../context/ComplianceContext";

function ReportTable({ search, statusFilter }) {
  const { reports } = useCompliance();

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

  if (filteredReports.length === 0) {
    return (
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-12 text-center">

        <div className="text-6xl mb-5">
          📄
        </div>

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
    <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] overflow-hidden">

      <table className="w-full">

        <thead className="bg-[#CFE8D5] border-b-4 border-black">

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

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ReportTable;