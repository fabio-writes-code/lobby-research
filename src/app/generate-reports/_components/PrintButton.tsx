/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { NotebookPen } from "lucide-react";
import MarkdownIt from "markdown-it";
import React from "react";
import { Button } from "~/components/ui/button";
import { useReports } from "../_context/ReportsContext";
import html2pdf from "html2pdf.js";

const PrintButton = () => {
  const { printContent } = useReports();

  const handlePrintContent = async () => {
    const md = new MarkdownIt();
    const htmlContent = md.render(printContent);

    const styles = `
    <style>
      body { font-family: Arial, sans-serif; }
      h1, h2, h3, h4, h5, h6 { page-break-before: avoid; }
      h1 { font-size: 2em; }
      p { margin: 0; }
      .pdf-content { padding: 20px; }
    </style>
  `;

    const options = {
      margin: 10,
      filename: "document.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const html = document.createElement("div");
    html.innerHTML =
      styles + '<div class="pdf-content">' + htmlContent + "</div>";

    html2pdf()
      .from(html)
      .set(options)
      .save()
      .then(() => {
        document.body.removeChild(html);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  return (
    <Button
      onClick={() => handlePrintContent()}
      className="fixed bottom-6 right-6 h-14 w-14"
    >
      <NotebookPen />
    </Button>
  );
};

export default PrintButton;
