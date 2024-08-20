"use client";

import React from "react";
import ContentArea from "./ContentArea";
import DateForm from "./DateForm";

export default function GenerateReportsPage() {
  const [content, setContent] = React.useState<string[]>([]);

  return (
    <div className="container flex h-auto w-full flex-col items-center justify-center space-y-2">
      <DateForm setContent={setContent} />
      <ContentArea content={content} />
    </div>
  );
}
