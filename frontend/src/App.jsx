import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import NewCheck from "./pages/NewCheck";
import Reports from "./pages/Reports";
import Blockchain from "./pages/Blockchain";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/check" element={<NewCheck />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;