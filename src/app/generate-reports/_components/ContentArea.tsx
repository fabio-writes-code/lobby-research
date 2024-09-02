"use client";

import TextArea from "./TextArea";

interface ContentAreaProps {
  content: { date: Date; content: string | null }[];
}

const ContentArea = ({ content }: ContentAreaProps) => {
  return (
    <div className="relative">
      <div className="">
        {!!content.length &&
          content.map((content) => (
            <TextArea
              id={content.date.toDateString().replaceAll(/\s/g, "")}
              key={content.date.toDateString()}
              content={content.content!.split("\n")}
            />
          ))}
      </div>
    </div>
  );
};

export default ContentArea;
