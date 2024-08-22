"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";
import SidePanel from "./SidePanel";
import TextArea from "./TextArea";

interface Props {
  content: { date: Date; content: string | null }[];
}

const ContentArea = ({ content }: Props) => {
  const [filteredContent, setFilteredContent] = useState<string[]>(
    content.map((content) => content.content!),
  );

  const handleSearchArrayChange = (pills: string[]) => {
    console.log(pills);

    for (const document of content) {
      const lines = document.content?.split("\n");
    }

    const filteredContent = content.filter((content) =>
      pills.every((pill) => content.content!.includes(pill)),
    );
    setFilteredContent(filteredContent.map((content) => content.content!));
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
          {!!content.length &&
            content.map((content) => (
              <TextArea
                id={content.date.toDateString()}
                key={content.date.toDateString()}
                content={content.content!.split("\n")}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
