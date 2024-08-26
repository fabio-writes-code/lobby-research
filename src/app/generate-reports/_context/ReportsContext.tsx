"use client";

import React from "react";
import { createContext, useContext, useState } from "react";

interface ReportsContextType {
  createActive: boolean;
  setCreateActive: (createActive: boolean) => void;
  printContent: string;
  setPrintContent: (content: string) => void;
}

// Default values for the context
const defaultContext: ReportsContextType = {
  createActive: false,
  setCreateActive: () => {
    /* No operation (no-op) */
  },
  printContent: "",
  setPrintContent: () => {
    /* No operation (no-op) */
  },
};

const ReportsContext = createContext<ReportsContextType>(defaultContext);

const ReportsProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [createActive, setCreateActive] = useState<boolean>(
    defaultContext.createActive,
  );
  const [printContent, setPrintContent] = useState<string>(
    defaultContext.printContent,
  );

  return (
    <ReportsContext.Provider
      value={{ createActive, setCreateActive, printContent, setPrintContent }}
    >
      <div>{children}</div>
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
};

export default ReportsProvider;
