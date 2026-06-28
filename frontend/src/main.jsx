import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

import { ComplianceProvider } from "./context/ComplianceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ComplianceProvider>
        <App />
      </ComplianceProvider>
    </BrowserRouter>
  </React.StrictMode>
);