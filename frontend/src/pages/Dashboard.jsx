import StatCard from "../components/dashboard/StatCard";
import { useCompliance } from "../context/ComplianceContext";
import {
  ShieldCheck,
  TriangleAlert,
  Activity,
  FileSearch,
} from "lucide-react";

function Dashboard() {
  const { reports } = useCompliance();

  const totalChecks = reports.length;

  const passCount = reports.filter(
    (report) => report.status === "PASS"
  ).length;

  const reviewCount = reports.filter(
    (report) => report.status === "REVIEW"
  ).length;

  const failCount = reports.filter(
    (report) => report.status === "FAIL"
  ).length;

  const passRate =
    totalChecks === 0
      ? 0
      : Math.round((passCount / totalChecks) * 100);

  const averageRisk =
    totalChecks === 0
      ? 0
      : Math.round(
          reports.reduce(
            (sum, report) => sum + report.risk,
            0
          ) / totalChecks
        );

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="bg-[#CFE8D5] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h1 className="text-5xl font-black">
          Welcome Back 
        </h1>

        <p className="text-xl mt-3 text-gray-700">
          AI-powered Real World Asset Compliance Dashboard
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <StatCard
          title="Total Checks"
          value={totalChecks}
          subtitle="Compliance requests"
          icon={<FileSearch />}
          color="bg-green-200"
        />

        <StatCard
          title="Pass Rate"
          value={`${passRate}%`}
          subtitle="Successful checks"
          icon={<ShieldCheck />}
          color="bg-blue-200"
        />

        <StatCard
          title="Failed"
          value={failCount}
          subtitle="High-risk cases"
          icon={<TriangleAlert />}
          color="bg-red-200"
        />

        <StatCard
          title="Average Risk"
          value={averageRisk}
          subtitle="Overall risk score"
          icon={<Activity />}
          color="bg-yellow-200"
        />

      </div>

      {/* Recent Activity */}

      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h2 className="text-3xl font-black mb-6">
          Recent Compliance Activity
        </h2>

        {reports.length === 0 ? (
          <p className="text-gray-500">
            No compliance checks performed yet.
          </p>
        ) : (
          <div className="space-y-4">

            {reports
              .slice(-5)
              .reverse()
              .map((report) => (
                <div
                  key={report.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>

                    <h3 className="font-bold">
                      {report.asset}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {report.wallet}
                    </p>

                  </div>

                  <div className="text-right">

                    <p
                      className={`font-bold ${
                        report.status === "PASS"
                          ? "text-green-600"
                          : report.status === "REVIEW"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.status}
                    </p>

                    <p className="text-sm">
                      Risk {report.risk}
                    </p>

                  </div>

                </div>
              ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;