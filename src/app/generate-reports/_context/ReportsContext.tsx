"use client";

import React from "react";
import { createContext, useContext, useState } from "react";

interface ReportsContextType {
  activePage: "search" | "create";
  setActivePage: (page: "search" | "create") => void;
  sharedContent: { date: Date; content: string | null }[];
  setSharedContent: (content: { date: Date; content: string | null }[]) => void;
}

// Default values for the context
const defaultContext: ReportsContextType = {
  activePage: "search",
  setActivePage: () => {
    /* No operation (no-op) */
  },
  sharedContent: [],
  setSharedContent: () => {
    /* No operation (no-op) */
  },
};

const ReportsContext = createContext<ReportsContextType>(defaultContext);

const ReportsProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [activePage, setActivePage] = useState<"search" | "create">(
    defaultContext.activePage,
  );
  const [sharedContent, setSharedContent] = useState<
    { date: Date; content: string | null }[]
  >(defaultContext.sharedContent);

  return (
    <ReportsContext.Provider
      value={{ activePage, setActivePage, sharedContent, setSharedContent }}
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
