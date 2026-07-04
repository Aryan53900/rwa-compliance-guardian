import {
    ShieldCheck,
    Bot,
    Database,
    FileCheck,
    Brain,
  } from "lucide-react";
  function About() {
    return (
      <div className="space-y-8">
  
        {/* Header */}
  
        <div className="bg-[#CFE8D5] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">
  
          <h1 className="text-5xl font-black">
            About RWA Compliance Guardian
          </h1>
  
          <p className="text-lg mt-3 text-gray-700">
            AI-powered compliance verification for Real World Asset tokenization.
          </p>
  
        </div>
  
        {/* Problem */}
  
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">
  
          <h2 className="text-3xl font-black mb-5">
            Problem Statement
          </h2>
  
          <p className="leading-8 text-lg">
  
            Compliance verification for tokenized Real World Assets (RWAs)
            is still largely manual, slow, and difficult to audit.
  
            Financial institutions must perform AML checks, sanctions
            screening, jurisdiction verification, and investor validation
            before approving transactions.
  
            Traditional workflows are expensive and lack transparent,
            immutable audit trails.
  
          </p>
  
        </div>
  
        {/* Solution */}
  
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">
  
          <h2 className="text-3xl font-black mb-6">
            Our Solution
          </h2>
  
          <div className="grid md:grid-cols-2 gap-6">
  
            <Feature
              icon={<Bot />}
              title="AI Compliance Analysis"
              text="Google Gemini AI generates intelligent compliance assessments and recommendations."
            />
  
            <Feature
              icon={<ShieldCheck />}
              title="Risk Engine"
              text="Custom rule-based AML and sanctions engine calculates compliance risk."
            />
  
            <Feature
              icon={<Database />}
              title="Blockchain Storage"
              text="Compliance attestations are stored permanently on the Casper Blockchain."
            />
  
            <Feature
              icon={<FileCheck />}
              title="Compliance Reports"
              text="Generate downloadable compliance reports with blockchain references."
            />
  
          </div>
  
        </div>
  
        {/* Technology */}
  
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">
  
          <h2 className="text-3xl font-black mb-6">
            Technology Stack
          </h2>
  
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
  
            <Tech name="React" />
  
            <Tech name="Node.js" />
  
            <Tech name="Express.js" />
  
            <Tech name="Gemini AI" />
  
            <Tech name="Casper Blockchain" />
  
            <Tech name="Rust Smart Contract" />
  
          </div>
  
        </div>
  
        {/* Workflow */}
  
        <div className="bg-[#FFF5C2] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">
  
          <h2 className="text-3xl font-black mb-6">
            Compliance Workflow
          </h2>
  
          <div className="space-y-4">
  
            <Step text="Investor submits compliance request" />
  
            <Step text="Wallet & sanctions screening" />
  
            <Step text="AI risk assessment using Gemini" />
  
            <Step text="Risk Engine calculates compliance score" />
  
            <Step text="Blockchain attestation stored on Casper" />
  
            <Step text="Compliance report generated" />
  
          </div>
  
        </div>
  
        {/* Footer */}
  
        <div className="text-center text-gray-500 pb-10">
  
          <Brain className="mx-auto mb-4" size={50} />
  
          <p>
            Built for secure, transparent and AI-driven compliance in the
            future of tokenized Real World Assets.
          </p>
  
        </div>
  
      </div>
    );
  }
  
  function Feature({ icon, title, text }) {
    return (
      <div className="border-4 border-black rounded-xl p-6 bg-gray-50">
        <div className="mb-3">{icon}</div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className="mt-3">{text}</p>
      </div>
    );
  }
  
  function Tech({ name }) {
    return (
      <div className="bg-green-100 border-2 border-black rounded-xl p-5 text-center font-bold">
        {name}
      </div>
    );
  }
  
  function Step({ text }) {
    return (
      <div className="bg-white border-2 border-black rounded-lg p-4">
        ✅ {text}
      </div>
    );
  }
  
  export default About;