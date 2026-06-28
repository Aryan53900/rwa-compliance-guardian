import Badge from "../components/ui/Badge";
import { useCompliance } from "../context/ComplianceContext";

function Blockchain() {
  const { reports } = useCompliance();

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-[#CFE8D5] border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-8">

        <h1 className="text-5xl font-black">
          Blockchain Explorer
        </h1>

        <p className="mt-3 text-lg text-gray-700">
          Immutable compliance attestations secured on the Casper Network.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-green-200 border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">

          <h3 className="font-bold uppercase">
            Verified Records
          </h3>

          <h2 className="text-5xl font-black mt-3">
            {reports.length}
          </h2>

        </div>

        <div className="bg-blue-200 border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">

          <h3 className="font-bold uppercase">
            Immutable Records
          </h3>

          <h2 className="text-5xl font-black mt-3">
            {reports.length}
          </h2>

        </div>

        <div className="bg-yellow-200 border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6">

          <h3 className="font-bold uppercase">
            Network
          </h3>

          <h2 className="text-3xl font-black mt-5">
            Casper
          </h2>

          <p>Testnet</p>

        </div>

      </div>

      {/* Empty State */}

      {reports.length === 0 ? (

        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-12 text-center">

          <div className="text-6xl mb-4">
            ⛓
          </div>

          <h2 className="text-3xl font-black">
            No Blockchain Records
          </h2>

          <p className="text-gray-500 mt-3">
            Generate a compliance report to create a blockchain attestation.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {reports
            .slice()
            .reverse()
            .map((report) => (

              <div
                key={report.id}
                className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_black] p-6"
              >

                <div className="flex justify-between items-center mb-6">

                  <div>

                    <h2 className="text-2xl font-black">
                      {report.id}
                    </h2>

                    <p className="text-gray-500">
                      Blockchain Compliance Attestation
                    </p>

                  </div>

                  <Badge status={report.status} />

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <p className="font-semibold">
                      Wallet
                    </p>

                    <p className="font-mono text-sm break-all">
                      {report.wallet}
                    </p>

                  </div>

                  <div>

                    <p className="font-semibold">
                      Asset
                    </p>

                    <p>{report.asset}</p>

                  </div>

                  <div>

                    <p className="font-semibold">
                      Blockchain Hash
                    </p>

                    <p className="font-mono text-sm break-all">
                      {report.hash}
                    </p>

                  </div>

                  <div>

                    <p className="font-semibold">
                      Timestamp
                    </p>

                    <p>{report.date}</p>

                  </div>

                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default Blockchain;