"use client";

import { ArrowUp, SearchIcon } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface Props {
  content: string[];
}

const ContentArea = ({ content }: Props) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [filteredContent, setFilteredContent] =
    React.useState<string[]>(content);

  const handleInputBoxChange = (e: HTMLInputElement) => {
    setFilteredContent(() => {
      return content.filter((line) =>
        line.toLowerCase().includes(e.value.toLowerCase()),
      );
    });
    setSearchTerm(e.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      const regex = new RegExp(searchTerm, "gi");
      const highlightedContent = filteredContent.map((line) =>
        line.replace(regex, (match) => `\`${match}\``),
      );
      setFilteredContent(highlightedContent);
    }
  };

  return (
    <div className="relative mx-6">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-[#94a3b8]" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-md bg-muted pl-8 dark:bg-[#1e293b] dark:text-[#94a3b8]"
        onChange={(e) => handleInputBoxChange(e.target)}
        onKeyDown={(e) => handleKeyDown(e)}
        value={searchTerm}
      />

      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="my-4 text-3xl font-bold" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="my-3 text-2xl font-semibold" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="my-2 text-base text-gray-700" {...props} />
          ),
          li: ({ ...props }) => <li className="ml-4 list-disc" {...props} />,
          a: ({ ...props }) => (
            <a className="text-blue-500 hover:text-blue-700" {...props} />
          ),
          code: ({ ...props }) => (
            <span className="rounded bg-yellow-200" {...props} />
          ),
        }}
      >
        {filteredContent.join("\n\n")}
      </ReactMarkdown>

      {showScrollTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2"
          onClick={scrollTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ContentArea;
