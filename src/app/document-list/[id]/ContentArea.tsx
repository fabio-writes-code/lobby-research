"use client";

import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "~/components/ui/input";

interface Props {
  content: string[];
}

const ContentArea = ({ content }: Props) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [filteredContent, setFilteredContent] =
    React.useState<string[]>(content);

  const handleInputBoxChange = (e: HTMLInputElement) => {
    setSearchTerm(e.value);
    console.log(searchTerm);

    setFilteredContent(() => {
      return content.filter((line) =>
        line.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
  };

  return (
    <div className="relative mx-6">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-[#94a3b8]" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-md bg-muted pl-8 dark:bg-[#1e293b] dark:text-[#94a3b8]"
        onChange={(e) => handleInputBoxChange(e.target)}
        value={searchTerm}
      />

      <div className="prose mt-6 p-6 text-muted-foreground dark:text-[#94a3b8]">
        {filteredContent?.length}
        {filteredContent?.map((line, index) => <p key={index}>{line}</p>)}
      </div>
    </div>
  );
};

export default ContentArea;
