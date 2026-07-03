import {
  Server,
  Bot,
  ShieldCheck,
  Database,
  Globe,
  Wallet,
  Cpu,
  CheckCircle,
} from "lucide-react";

function Settings() {
  const backendURL = import.meta.env.VITE_API_URL;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-[#CFE8D5] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h1 className="text-5xl font-black">
          System Settings
        </h1>

        <p className="mt-3 text-lg text-gray-700">
          AI Compliance Guardian Configuration & System Status
        </p>

      </div>

      {/* System Status */}

      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h2 className="text-3xl font-black mb-8">
          System Status
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <StatusCard
            icon={<Server size={30} />}
            title="Backend API"
            value="Connected"
            color="green"
          />

          <StatusCard
            icon={<Bot size={30} />}
            title="Gemini AI"
            value="Connected"
            color="green"
          />

          <StatusCard
            icon={<Database size={30} />}
            title="Blockchain"
            value="Casper Testnet"
            color="green"
          />

          <StatusCard
            icon={<ShieldCheck size={30} />}
            title="Compliance Engine"
            value="Running"
            color="green"
          />

        </div>

      </div>

      {/* Configuration */}

      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h2 className="text-3xl font-black mb-8">
          Configuration
        </h2>

        <div className="space-y-5">

          <ConfigItem
            icon={<Globe />}
            label="Backend URL"
            value={backendURL}
          />

          <ConfigItem
            icon={<Cpu />}
            label="AI Model"
            value="Gemini 2.0 Flash"
          />

          <ConfigItem
            icon={<Database />}
            label="Blockchain"
            value="Casper Testnet"
          />

          <ConfigItem
            icon={<ShieldCheck />}
            label="Smart Contract"
            value="ComplianceAttestation"
          />

          <ConfigItem
            icon={<Wallet />}
            label="Wallet Network"
            value="Casper Testnet"
          />

          <ConfigItem
            icon={<CheckCircle />}
            label="Application Version"
            value="v1.0.0"
          />

        </div>

      </div>

      {/* About */}

      <div className="bg-[#FFF5C2] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h2 className="text-3xl font-black mb-4">
          About
        </h2>

        <p className="leading-8 text-lg">

          RWA Compliance Guardian is an AI-powered compliance platform
          designed for Real World Asset tokenization.

          <br /><br />

          The platform combines

          <strong> Google Gemini AI </strong>

          for intelligent compliance analysis and

          <strong> Casper Blockchain </strong>

          for immutable compliance attestations.

        </p>

      </div>

    </div>
  );
}

function StatusCard({ icon, title, value, color }) {
  return (
    <div
      className={`
      border-4
      border-black
      rounded-2xl
      p-6
      shadow-[6px_6px_0_black]
      ${
        color === "green"
          ? "bg-green-100"
          : "bg-gray-100"
      }
      `}
    >
      <div className="flex items-center gap-4">

        {icon}

        <div>

          <h3 className="font-black text-xl">
            {title}
          </h3>

          <p className="text-green-700 font-semibold">
            {value}
          </p>

        </div>

      </div>
    </div>
  );
}

function ConfigItem({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">

      <div className="flex items-center gap-3">

        {icon}

        <span className="font-bold">
          {label}
        </span>

      </div>

      <span className="font-mono text-gray-700">
        {value}
      </span>

    </div>
  );
}

export default Settings;