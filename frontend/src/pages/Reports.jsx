import { useState } from "react";
import ReportTable from "../components/dashboard/ReportTable";

function Reports() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-[#CFE8D5] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h1 className="text-5xl font-black">
          Compliance Reports
        </h1>

        <p className="text-gray-700 mt-3 text-lg">
          Monitor every compliance verification performed by the AI Compliance Guardian.
        </p>

      </div>

      {/* Filters */}

      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="🔍 Search Wallet, Asset or Country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              px-5
              py-3
              border-2
              border-black
              rounded-lg
            "
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              px-5
              py-3
              border-2
              border-black
              rounded-lg
            "
          >
            <option value="ALL">All Status</option>
            <option value="PASS">PASS</option>
            <option value="REVIEW">REVIEW</option>
            <option value="FAIL">FAIL</option>
          </select>

        </div>

      </div>

      <ReportTable
        search={search}
        statusFilter={statusFilter}
      />

    </div>
  );
}

export default Reports;