"use client";

import { Separator } from "~/components/ui/separator";
import TextArea from "./TextArea";

interface ContentAreaProps {
  content: { date: Date; content: string | null }[];
}

const ContentArea = ({ content }: ContentAreaProps) => {
  return (
    <div className="relative">
      {!!content.length &&
        content.map((content, index) => (
          <div
            key={index}
            id={content.date.toDateString().replaceAll(/\s/g, "") + index}
          >
            <div className="my-4">
              <h3 className="mb-2 text-lg font-bold">
                {content.date.toUTCString().split("00")[0]}
              </h3>
              <Separator />
            </div>
            <TextArea content={content.content!.split("\n\n")} />
          </div>
        ))}
    </div>
  );
};

export default ContentArea;
