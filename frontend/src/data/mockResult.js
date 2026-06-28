const mockResults = [
    {
      status: "PASS",
      risk: 18,
      complianceId: "CMP-10021",
      blockchainHash: "0xABCD123456EF",
      explanation:
        "Wallet is not sanctioned. Investor country is permitted and the asset carries a low compliance risk.",
    },
    {
      status: "FAIL",
      risk: 92,
      complianceId: "CMP-10022",
      blockchainHash: "0xFA112233BC",
      explanation:
        "Investor country is restricted and the wallet appears on the sanctions watchlist. Compliance verification failed.",
    },
  ];
  
  export default mockResults;