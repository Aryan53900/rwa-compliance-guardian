// ----------------------------
// MetaMask Connection
// ----------------------------

export async function connectMetaMask() {
    if (!window.ethereum) {
      throw new Error(
        "MetaMask is not installed."
      );
    }
  
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    return {
      walletType: "MetaMask",
      walletAddress: accounts[0],
    };
  }
  
  // ----------------------------
  // Casper Wallet Connection
  // ----------------------------
  
 // ----------------------------
// Casper Wallet Connection
// ----------------------------
export async function connectCasperWallet() {
    if (!window.CasperWalletProvider) {
      throw new Error("Casper Wallet extension is not installed.");
    }
  
    // Create provider instance
    const provider = window.CasperWalletProvider();
  
    // Ask user to connect
    await provider.requestConnection();
  
    // Read public key
    const publicKey = await provider.getActivePublicKey();
  
    return {
      walletType: "Casper",
      walletAddress: publicKey,
    };
  }
  export async function disconnectCasperWallet() {
    if (!window.CasperWalletProvider) return;
  
    const provider = window.CasperWalletProvider();
  
    await provider.disconnectFromSite();
  }