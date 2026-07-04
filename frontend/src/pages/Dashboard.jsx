import { useEffect, useState } from "react";
import StatCard from "../components/dashboard/StatCard";
import { useCompliance } from "../context/ComplianceContext";
import { useWallet } from "../context/WalletContext";

import axios from "axios";
import {
  ShieldCheck,
  TriangleAlert,
  Activity,
  FileSearch,
  Database,
  Cpu,
} from "lucide-react";

//import StatCard from "../components/dashboard/StatCard";
//mport { useCompliance } from "../context/ComplianceContext";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const { wallet, disconnectWallet } = useWallet();

  const { reports } = useCompliance();
  //const { wallet } = useWallet();

  const [dashboard, setDashboard] = useState({
    totalAttestations: 0,
    network: "Loading...",
    aiModel: "Loading...",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/dashboard`
      );

      setDashboard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalChecks = reports.length;

  const passCount = reports.filter(
    (r) => r.status === "PASS"
  ).length;

  const failCount = reports.filter(
    (r) => r.status === "FAIL"
  ).length;

  const passRate =
    totalChecks === 0
      ? 0
      : Math.round((passCount / totalChecks) * 100);

  const averageRisk =
    totalChecks === 0
      ? 0
      : Math.round(
          reports.reduce((a, b) => a + b.risk, 0) /
            totalChecks
        );

  return (
    <div className="space-y-8">

      <div className="bg-[#CFE8D5] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h1 className="text-5xl font-black">
          AI Compliance Dashboard
        </h1>

        <p className="text-xl mt-3 text-gray-700">
          Real-Time Blockchain Compliance Monitoring
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <StatCard
          title="Compliance Checks"
          value={totalChecks}
          subtitle="Current Session"
          icon={<FileSearch />}
          color="bg-green-200"
        />

        <StatCard
          title="Blockchain Records"
          value={dashboard.totalAttestations}
          subtitle="Casper Testnet"
          icon={<Database />}
          color="bg-blue-200"
        />

        <StatCard
          title="Pass Rate"
          value={`${passRate}%`}
          subtitle="Successful Checks"
          icon={<ShieldCheck />}
          color="bg-yellow-200"
        />

        <StatCard
          title="Failed"
          value={failCount}
          subtitle="High Risk"
          icon={<TriangleAlert />}
          color="bg-red-200"
        />

        <StatCard
          title="Average Risk"
          value={averageRisk}
          subtitle="Risk Score"
          icon={<Activity />}
          color="bg-orange-200"
        />

        <StatCard
          title="AI Model"
          value="Gemini"
          subtitle={dashboard.aiModel}
          icon={<Cpu />}
          color="bg-purple-200"
        />

      </div>

      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h2 className="text-3xl font-black mb-6">
          System Status
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-green-100 border-2 border-green-500 rounded-xl p-5">
            <h3 className="font-bold">
              Blockchain
            </h3>

            <p className="mt-2">
              ✅ Connected
            </p>

            <p className="text-sm mt-1">
              {dashboard.network}
            </p>

          </div>

          <div className="bg-green-100 border-2 border-green-500 rounded-xl p-5">
            <h3 className="font-bold">
              AI Engine
            </h3>

            <p className="mt-2">
              ✅ Connected
            </p>

            <p className="text-sm mt-1">
              {dashboard.aiModel}
            </p><div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">
  <h2 className="text-2xl font-black mb-4">
    Connected Wallet
  </h2>

  <p>
    <strong>Type:</strong> {wallet.walletType}
  </p>

  <p className="break-all font-mono mt-2">
    {wallet.walletAddress}
  </p>
</div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;