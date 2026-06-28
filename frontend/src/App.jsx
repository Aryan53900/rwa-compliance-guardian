import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewCheck from "./pages/NewCheck";
import Reports from "./pages/Reports";
import Blockchain from "./pages/Blockchain";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Routes>

        {/* Public Route */}

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/check" element={<NewCheck />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/blockchain" element={<Blockchain />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
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