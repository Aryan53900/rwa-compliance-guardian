import StatCard from "../components/dashboard/StatCard";
import { useCompliance } from "../context/ComplianceContext";

function Dashboard() {
  const { reports } = useCompliance();

  const totalChecks = reports.length;

  const passCount = reports.filter(
    (report) => report.status === "PASS"
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
          reports.reduce((sum, report) => sum + report.risk, 0) /
            totalChecks
        );

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">
        Compliance Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <StatCard
          title="Total Checks"
          value={totalChecks}
          color="bg-green-200"
        />

        <StatCard
          title="Pass Rate"
          value={`${passRate}%`}
          color="bg-blue-200"
        />

        <StatCard
          title="Blocked"
          value={failCount}
          color="bg-red-200"
        />

        <StatCard
          title="Average Risk"
          value={averageRisk}
          color="bg-yellow-200"
        />

      </div>
    </div>
  );
}

export default Dashboard;