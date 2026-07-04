import { Navigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

function WalletProtectedRoute({ children }) {
  const { wallet } = useWallet();

  if (!wallet.connected) {
    return <Navigate to="/connect-wallet" replace />;
  }

  return children;
}

export default WalletProtectedRoute;