"use client";

import { useEffect, useRef, useState } from "react";
import ContentArea from "./_components/ContentArea";
import CreateArea from "./_components/CreateArea";
import DateForm from "./_components/DateForm";
import DocNav from "./_components/DocNav";
import PrintButton from "./_components/PrintButton";
import ReportButton from "./_components/ReportButton";
import SearchForm from "./_components/SearchForm";
import { useReports } from "./_context/ReportsContext";
// import dynamic from "next/dynamic";

import { Separator } from "~/components/ui/separator";

// const html2pdf = dynamic(() => import("html2pdf.js"), {
//   ssr: false,
// });

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

      const paragraphs = text.split("\n\n");

      const filtered = paragraphs
        .filter((paragraph) =>
          pills.some((pill) =>
            paragraph.toLowerCase().includes(pill.toLowerCase()),
          ),
        )
        .map((paragraph) =>
          paragraph.replace(regex, (match) => `\`${match}\``),
        );
      return filtered.join("\n\n");
    }

    const filteredContent = content.map((content) => ({
      date: content.date,
      content: filterContent(content.content!, pills),
    }));

    setFilteredContent(filteredContent);
  };

  const { printContent, createActive } = useReports();

  // Ref areas
  const mainAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    content.forEach((area) => {
      textAreaRefs.current[area.date.toDateString().replaceAll(/\s/g, "")] =
        document.getElementById(
          area.date.toDateString().replaceAll(/\s/g, ""),
        ) as HTMLDivElement;
    });
  }, [content]);

  const scrollToArea = (id: string) => {
    const element = textAreaRefs.current[id];
    if (element && mainAreaRef.current) {
      const topPosition = element.offsetTop - mainAreaRef.current.offsetTop;
      console.log(id, topPosition);
      mainAreaRef.current.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="h-100 relative mt-4">
      <div className="flex flex-col gap-2">
        <aside className="fixed bottom-0 left-0 top-16 w-64 overflow-y-auto bg-muted p-4">
          <DateForm setContent={setContent} />
          <Separator />
          {!!content.length && (
            <div className="col-span-1">
              <DocNav
                contentArray={content.map((content) => content.date)}
                scrollToArea={scrollToArea}
              />
            </div>
          )}
        </aside>
      </div>

      {/* main area */}
      <div className="ml-64 px-6">
        {/* search bar */}
        <SearchForm
          isContent={!!content.length}
          setSearchArray={handleSearchArrayChange}
        />

        {/* Content Area */}
        <div
          className={`grid ${createActive ? "grid-cols-2" : "grid-cols-1"} gap-2`}
        >
          <div className="grid grid-cols-1" ref={mainAreaRef}>
            <ContentArea
              content={filteredContent.length ? filteredContent : content}
            />
          </div>
          {createActive && <CreateArea />}
        </div>
      </div>

      {/* Absolutely Positioned Buttons */}
      {!!content.length && !createActive && <ReportButton />}

      {!!printContent.length && <PrintButton />}
    </div>
  );
}
