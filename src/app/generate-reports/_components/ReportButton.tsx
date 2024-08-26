"use client";

import { FileCheck2 } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

interface ReportButtonProps {
  handleClick: () => void;
}

const ReportButton = ({ handleClick }: ReportButtonProps) => {
  const handleReport = () => {
    handleClick();
  };

  return (
    <Button
      onClick={handleReport}
      className="absolute bottom-6 right-6 h-14 w-14"
    >
      <FileCheck2 />
    </Button>
  );
};

export default ReportButton;
