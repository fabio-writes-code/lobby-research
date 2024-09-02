"use client";

import { NotebookPen } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

interface PrintButtonProps {
  handleClick: () => void;
}

const PrintButton = ({ handleClick }: PrintButtonProps) => {
  return (
    <Button
      onClick={() => handleClick()}
      className="fixed bottom-6 right-6 h-14 w-14"
    >
      <NotebookPen />
    </Button>
  );
};

export default PrintButton;
