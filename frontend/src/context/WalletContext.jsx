import { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(() => {
    const stored = localStorage.getItem("wallet");

    if (stored) {
      return JSON.parse(stored);
    }

    return {
      connected: false,
      walletType: null,
      walletAddress: null,
    };
  });

  useEffect(() => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
  }, [wallet]);

  const connectWallet = (walletType, walletAddress) => {
    setWallet({
      connected: true,
      walletType,
      walletAddress,
    });
  };

  const disconnectWallet = () => {
    localStorage.removeItem("wallet");

    setWallet({
      connected: false,
      walletType: null,
      walletAddress: null,
    });
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}