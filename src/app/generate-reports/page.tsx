"use client";

import React, { useState } from "react";
import ContentArea from "./_components/ContentArea";
import DateForm from "./_components/DateForm";
import { useReports } from "./_context/ReportsContext";
import CreateArea from "./_components/CreateArea";
import SearchForm from "./_components/SearchForm";
import DocNav from "./_components/DocNav";
import ReportButton from "./_components/ReportButton";
import PrintButton from "./_components/PrintButton";
import MarkdownIt from "markdown-it";
import html2pdf from "html2pdf.js";

export default function SearchReportsPage() {
  const [content, setContent] = useState<
    { date: Date; content: string | null }[]
  >([]);

  const [filteredContent, setFilteredContent] =
    useState<{ date: Date; content: string | null }[]>(content);

  const handleSearchArrayChange = (pills: string[]) => {
    function filterContent(text: string, pills: string[]) {
      if (pills.length === 0) return text;

      const regex = new RegExp(`(${pills.join("|")})`, "gi");

      const paragraphs = text.split("\n");

      const filtered = paragraphs
        .filter((paragraph) =>
          pills.some((pill) =>
            paragraph.toLowerCase().includes(pill.toLowerCase()),
          ),
        )
        .map((paragraph) =>
          paragraph.replace(regex, (match) => `\`${match}\``),
        );
      return filtered.join("\n");
    }

    const filteredContent = content.map((content) => ({
      date: content.date,
      content: filterContent(content.content!, pills),
    }));

    setFilteredContent(filteredContent);
  };

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
      });
  };

  const { printContent, createActive, setCreateActive } = useReports();

  return (
    <div className="h-100 container relative flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <DateForm setContent={setContent} />
        <SearchForm
          isContent={!!content.length}
          setSearchArray={handleSearchArrayChange}
        />
        {!!content.length && (
          <div className="col-span-1">
            <DocNav contentArray={content.map((content) => content.date)} />
          </div>
        )}
      </div>

      <div
        className={`grid ${createActive ? "grid-cols-2" : "grid-cols-1"} gap-2`}
      >
        <div className="grid grid-cols-1">
          <ContentArea
            content={filteredContent.length ? filteredContent : content}
          />
        </div>
        {createActive && <CreateArea />}
      </div>
      {!!content.length && !createActive && (
        <ReportButton handleClick={() => setCreateActive(true)} />
      )}

      {printContent.length && <PrintButton handleClick={handlePrintContent} />}
    </div>
  );
}
