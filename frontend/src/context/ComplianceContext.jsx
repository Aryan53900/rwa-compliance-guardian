import { createContext, useContext, useState } from "react";

const ComplianceContext = createContext();

export function ComplianceProvider({ children }) {
  const [reports, setReports] = useState([]);

  const addReport = (report) => {
    setReports((prev) => [report, ...prev]);
  };

  const clearReports = () => {
    setReports([]);
  };

  return (
    <ComplianceContext.Provider
      value={{
        reports,
        addReport,
        clearReports,
      }}
    >
      {children}
    </ComplianceContext.Provider>
  );
}

export function useCompliance() {
  return useContext(ComplianceContext);
}