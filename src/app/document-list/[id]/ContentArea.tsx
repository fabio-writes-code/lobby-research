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
    const searchValue = e.value;
    setSearchTerm(searchValue);
    
    if (!searchValue.trim()) {
      setFilteredContent(content);
      return;
    }
    
    // Filter content that includes the search term
    const filtered = content.filter((line) =>
      line.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    // Highlight matches with markdown code syntax (which renders as highlighted)
    if (searchValue.trim()) {
      const regex = new RegExp(`(${searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const highlightedContent = filtered.map((line) =>
        line.replace(regex, '`$1`')
      );
      setFilteredContent(highlightedContent);
    } else {
      setFilteredContent(filtered);
    }
  };

  // We can simplify the keydown handler since highlighting happens on input change
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      // Optionally, you could add functionality here like jumping to the next match
      e.preventDefault();
    }
  };

  return (
    <div className="relative lg:mx-6 px-6 lg:px-0">
      <div className="relative mb-4 w-full">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-[#94a3b8] z-10" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-md bg-muted pl-8 "
          onChange={(e) => handleInputBoxChange(e.target)}
          onKeyDown={(e) => handleKeyDown(e)}
          value={searchTerm}
        />
        {searchTerm && (
          <div className="mt-2 text-sm text-muted-foreground">
            Found {filteredContent.length} matching paragraphs
          </div>
        )}
      </div>

      <ReactMarkdown
        className='max-w-screen break-words'
        components={{
          h1: ({ ...props }) => (
            <h1 className="my-4 text-3xl font-bold" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="my-3 text-2xl font-semibold" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="my-2 text-base text-gray-700 dark:text-muted-foreground" {...props} />
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
