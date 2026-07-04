import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/layout/Layout";
import WalletProtectedRoute from "./components/WalletProtectedRoute";

import Dashboard from "./pages/Dashboard";
import NewCheck from "./pages/NewCheck";
import Reports from "./pages/Reports";
import Blockchain from "./pages/Blockchain";
import Settings from "./pages/Settings";
import About from "./pages/About";
import ConnectWallet from "./pages/ConnectWallet";

function App() {
  return (
    <>
      <Routes>

        {/* Public Route */}

        <Route
          path="/connect-wallet"
          element={<ConnectWallet />}
        />

        {/* Protected Routes */}

        <Route
          path="/*"
          element={
            <WalletProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/check" element={<NewCheck />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/blockchain" element={<Blockchain />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Layout>
            </WalletProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;