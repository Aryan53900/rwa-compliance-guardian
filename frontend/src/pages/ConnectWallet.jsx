import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import { useWallet } from "../context/WalletContext";
import {
  connectMetaMask,
  connectCasperWallet,
} from "../services/walletService";

function ConnectWallet() {
  const navigate = useNavigate();

  const { connectWallet } = useWallet();

  const [loading, setLoading] = useState(false);

  const handleMetaMask = async () => {
    setLoading(true);

    try {
      const wallet = await connectMetaMask();

      connectWallet(
        wallet.walletType,
        wallet.walletAddress
      );

      toast.success("MetaMask Connected!");

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }

    setLoading(false);
  };

  const handleCasper = async () => {
    setLoading(true);

    try {
      const wallet = await connectCasperWallet();

      connectWallet(
        wallet.walletType,
        wallet.walletAddress
      );

      toast.success("Casper Wallet Connected!");

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#CFE8D5] flex justify-center items-center px-5">

      <div className="w-full max-w-lg bg-white border-4 border-black shadow-[10px_10px_0_black] p-10">

        <div className="text-center">

          <ShieldCheck
            size={70}
            className="mx-auto mb-5"
          />

          <h1 className="text-4xl font-black">
            AI Compliance Guardian
          </h1>

          <p className="mt-4 text-gray-600">
            Secure AI-powered compliance verification
            for Real World Assets.
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <button
            onClick={handleCasper}
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              border-2
              border-black
              py-4
              font-bold
              hover:bg-white
              hover:text-black
              transition
            "
          >
            ⭐ Connect Casper Wallet
          </button>

          <div className="text-center font-bold">
            OR
          </div>

          <button
            onClick={handleMetaMask}
            disabled={loading}
            className="
              w-full
              bg-yellow-300
              border-2
              border-black
              py-4
              font-bold
              hover:bg-yellow-400
              transition
            "
          >
            🦊 Connect MetaMask
          </button>

        </div>

        <div className="mt-10 border-t pt-6 text-center text-gray-500">

          <Wallet
            className="mx-auto mb-3"
            size={40}
          />

          <p>
            Powered by Casper Network
          </p>

          <p>
            Google Gemini AI
          </p>

        </div>

      </div>

    </div>
  );
}

export default ConnectWallet;