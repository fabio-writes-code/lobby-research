import React from "react";
import TextButton from "./TextButton";

interface HansardDocumentProps {
  content: string | null;
  date: string;
}

const HansardDocument = ({ content, date }: HansardDocumentProps) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {content!.split("\n").map((paragraph, index) => (
          <div key={index} className="col-span-1">
            <TextButton paragraph={paragraph} date={date} index={index} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HansardDocument;
