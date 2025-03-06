"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "~/components/ui/scroll-area";

interface TextAreaProps {
  content: string[];
}

const TextArea = ({ content }: TextAreaProps) => {
  return (
    <div className="rounded-md border shadow-sm">
      <ScrollArea className="h-96 p-4">
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => (
              <p className="my-4 text-xl font-bold" {...props} />
            ),
            h2: ({ ...props }) => (
              <p className="my-3 text-lg font-semibold" {...props} />
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
          {content.join("\n\n")}
        </ReactMarkdown>
      </ScrollArea>
    </div>
  );
};

export default TextArea;
