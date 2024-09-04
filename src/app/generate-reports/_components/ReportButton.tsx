"use client";

import { FileCheck2 } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { useReports } from "../_context/ReportsContext";

const ReportButton = () => {
  const { setCreateActive } = useReports();

  return (
    <Button
      onClick={() => setCreateActive(true)}
      className="container fixed bottom-6 right-6 h-14 w-14"
    >
      <FileCheck2 />
    </Button>
  );
};

export default ReportButton;
