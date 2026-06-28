import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  console.log("Current Token:", token);

  if (!token) {
    console.log("Redirecting to Login...");
    return <Navigate to="/login" replace />;
  }

  console.log("User Authenticated");

  return children;
}

export default ProtectedRoute;