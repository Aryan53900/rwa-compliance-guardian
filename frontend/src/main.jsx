import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

import { ComplianceProvider } from "./context/ComplianceContext";
import { WalletProvider } from "./context/WalletContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <ComplianceProvider>
          <App />
        </ComplianceProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);