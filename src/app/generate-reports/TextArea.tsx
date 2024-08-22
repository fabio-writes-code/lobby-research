"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "~/components/ui/scroll-area";

interface TextAreaProps {
  id: string;
  content: string[];
}

const TextArea = ({ id, content }: TextAreaProps) => {
  return (
    <div id={id} className="mt-3 rounded-md border shadow-sm">
      <ScrollArea className="h-96 p-4">
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
          {content.join("\n\n")}
        </ReactMarkdown>
      </ScrollArea>
    </div>
  );
};

export default TextArea;
