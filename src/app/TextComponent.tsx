"use client";

import React, { SyntheticEvent } from "react";

interface TextComponentProps {
  content: string[];
}

const TextComponent = ({ content }: TextComponentProps) => {
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
    <>
      {/* Searchbox */}
      <form>
        <input
          type="text"
          placeholder="Search"
          className="bg-white text-black"
          onChange={(e) => handleInputBoxChange(e.target)}
          value={searchTerm}
        />
      </form>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {filteredContent?.length}
        {filteredContent?.map((line, index) => (
          <p key={index} className="text-lg">
            {line}
          </p>
        ))}
      </div>
    </>
  );
};

export default TextComponent;
