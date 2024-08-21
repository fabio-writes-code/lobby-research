"use client";

import { SearchIcon } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Input } from "~/components/ui/input";
import SearchForm from "./SearchForm";

interface Props {
  content: string[];
}

const ContentArea = ({ content }: Props) => {
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

  return (
    <div className="relative">
      <SearchForm isContent={!!content} />
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="my-4 text-3xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="my-3 text-2xl font-semibold" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="my-2 text-base text-gray-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4 list-disc" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-500 hover:text-blue-700" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="rounded bg-gray-100 p-2 text-sm" {...props} />
          ),
        }}
      >
        {filteredContent.join("\n\n")}
      </ReactMarkdown>
    </div>
  );
};

export default ContentArea;
