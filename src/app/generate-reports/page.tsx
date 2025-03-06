"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import ContentArea from "./_components/ContentArea";
import CreateArea from "./_components/CreateArea";
import DateForm from "./_components/DateForm";
import DocNav from "./_components/DocNav";
import PrintButton from "./_components/PrintButton";
import ReportButton from "./_components/ReportButton";
import SearchForm from "./_components/SearchForm";
import { useReports } from "./_context/ReportsContext";
import { Separator } from "~/components/ui/separator";
import { useToast } from "~/hooks/use-toast";

export default function SearchReportsPage() {
  const { toast } = useToast();
  const [content, setContent] = useState<
    { date: Date; content: string | null }[]
  >([]);

  const [filteredContent, setFilteredContent] =
    useState<{ date: Date; content: string | null }[]>(content);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSearchArrayChange = (pills: string[]) => {
    if (pills.length === 0) {
      toast({
        description: "Please enter at least one keyword to search.",
        variant: "destructive",
      });
      return;
    }

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

    // Count documents with matches
    const matchCount = filteredContent.filter(item => 
      item.content?.includes('`')
    ).length;

    if (matchCount === 0) {
      toast({
        description: "No matches found for your search terms.",
        variant: "destructive",
      });
    } else {
      toast({
        description: `Found matches in ${matchCount} document${matchCount > 1 ? 's' : ''} for: ${pills.join(', ')}`,
      });
    }
  };

  const { printContent, createActive } = useReports();

  // Ref areas
  const mainAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    content.forEach((area, index) => {
      textAreaRefs.current[
        area.date.toDateString().replaceAll(/\s/g, "") + index
      ] = document.getElementById(
        area.date.toDateString().replaceAll(/\s/g, "") + index,
      ) as HTMLDivElement;
    });
  
  }, [content]);

  const scrollToArea = (id: string) => {
    const element = textAreaRefs.current[id];
    if (element && mainAreaRef.current) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      toast({
        description: "Unable to scroll to the selected document.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-100 relative mt-4">
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 rounded-full shadow-md hover:shadow-lg lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >

        {isSidebarOpen ? (
          <ArrowLeft className="h-5 w-5" />
        ) : (
          <CalendarDays className="h-5 w-5" />
        )}
      </Button>
      <div className="flex flex-col gap-2">
        <aside
          className={`fixed bottom-0 left-0 top-[73px] lg:top-[69px] z-40 w-64 overflow-y-auto border-r  bg-background p-4 transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DateForm setContent={setContent} />
          <Separator className="mb-4" />
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
      <div className={`transition-all duration-300 px-4 lg:px-6 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
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
      {!!content.length && !createActive && (
        <div className="hidden lg:block">
          <ReportButton />
        </div>
      )}

      {!!printContent.length && (
        <div className="hidden lg:block">
          <PrintButton />
        </div>
      )}
    </div>
  );
}
