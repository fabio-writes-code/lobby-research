"use client";

import React, { useState } from "react";
import ContentArea from "./(search-reports)/ContentArea";
import DateForm from "./(search-reports)/DateForm";
import { useReports } from "./_context/ReportsContext";
import CreateArea from "./(search-reports)/CreateArea";
import SearchForm from "./(search-reports)/SearchForm";
import DocNav from "./(search-reports)/DocNav";
import ReportButton from "./(search-reports)/ReportButton";

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

  const { createActive, setCreateActive } = useReports();

  return (
    <div className="position-relative container flex flex-col gap-4">
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

        {!!content.length && !createActive && (
          <ReportButton handleClick={() => setCreateActive(true)} />
        )}
      </div>
    </div>
  );
}
