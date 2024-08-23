import React from "react";

interface HansardDocumentProps {
  content: string | null;
}

const HansardDocument = ({ content }: HansardDocumentProps) => {
  return (
    <>
      <div className="grid grid-cols-7 gap-4">
        {content!.split("\n").map((paragraph, index) => (
          <div key={index} className="col-span-7">
            <p>{paragraph}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HansardDocument;
