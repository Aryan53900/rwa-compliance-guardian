import ReportTable from "../components/dashboard/ReportTable";

function Reports() {
  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-5xl font-bold">
            Compliance Reports
          </h1>

          <p className="text-gray-600 mt-2">
            View all compliance verification reports.
          </p>

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search..."
            className="
            px-4
            py-3
            border-2
            border-black
            bg-white
            "
          />

          <select
            className="
            px-4
            py-3
            border-2
            border-black
            bg-white
            "
          >
            <option>All</option>
            <option>PASS</option>
            <option>FAIL</option>
          </select>

        </div>

      </div>

      <ReportTable />

    </div>
  );
}

export default Reports;