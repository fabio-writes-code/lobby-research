"use client";

import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import SidePanel from "./SidePanel";
import TextArea from "./TextArea";
import ReportButton from "./ReportButton";
import { useReports } from "../_context/ReportsContext";

interface ContentAreaProps {
  content: { date: Date; content: string | null }[];
}

const ContentArea = ({ content }: ContentAreaProps) => {
  const { setActivePage, setSharedContent } = useReports();

  const [filteredContent, setFilteredContent] =
    useState<{ date: Date; content: string | null }[]>(content);

  useEffect(() => {
    setFilteredContent(content);
  }, [content]);

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

  const handleReportCreate = () => {
    setActivePage("create");
    setSharedContent(filteredContent);
  };

  return (
    <div className="relative mt-4">
      <div className="grid grid-cols-7 gap-4">
        {!!content.length && (
          <div className="col-span-1">
            <SidePanel contentArray={content.map((content) => content.date)} />
          </div>
        )}
        <div className="col-span-6">
          <SearchForm
            isContent={!!content.length}
            setSearchArray={handleSearchArrayChange}
          />
          {!!filteredContent.length &&
            filteredContent.map((content) => (
              <TextArea
                id={content.date.toDateString().replaceAll(/\s/g, "")}
                key={content.date.toDateString()}
                content={content.content!.split("\n")}
              />
            ))}
        </div>
      </div>
      {!!filteredContent.length && (
        <ReportButton handleClick={handleReportCreate} />
      )}
    </div>
  );
};

export default ContentArea;
