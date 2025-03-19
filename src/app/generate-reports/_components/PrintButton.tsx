/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { NotebookPen } from "lucide-react";
import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
// import { type Html2PdfType } from "~/types/html2pdf.js";
// import { html  } from "~/types/html2pdf.js";

type Html2PdfType = () => {
  from: (element: HTMLElement) => {
    set: (options: Record<string, unknown>) => { save: () => Promise<void> };
  };
};

const PrintButton = ({printContent}:{printContent:string}) => {
  const [html2pdf, setHtml2pdf] = useState<Html2PdfType | null>(null);

  useEffect(() => {
    // Dynamically import html2pdf only on the client side
    void import("html2pdf.js").then((module) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setHtml2pdf(() => module.default);
    });
  }, []);

  const handlePrintContent = async () => {
    if (!html2pdf) {
      console.error("html2pdf is not loaded yet.");
      return;
    }

    const md = new MarkdownIt();
    const htmlContent = md.render(printContent);

    const styles = `
    <style>
      body { font-family: Times New Roman, serif; }
      h1, h2, h3, h4, h5, h6 { page-break-before: avoid; font-weight: bold; }
      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.17em; }
      p { margin: 0; text-align: justify; page-break-inside: avoid; }
      .pdf-content { padding: 20px; }
    </style>
  `;

    const options = {
      margin: 10,
      filename: "document.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    const html = document.createElement("div");
    html.innerHTML =
      styles + '<div class="pdf-content">' + htmlContent + "</div>";

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
