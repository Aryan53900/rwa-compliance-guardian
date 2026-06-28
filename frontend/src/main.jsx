import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";
import "./index.css";

import { ComplianceProvider } from "./context/ComplianceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
  <ComplianceProvider>
    <App />
  </ComplianceProvider>
</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);