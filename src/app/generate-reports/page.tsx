"use client";

import React from "react";
import ContentArea from "./ContentArea";
import DateForm from "./DateForm";
import SearchForm from "./SearchForm";

export default function GenerateReportsPage() {
  const [content, setContent] = React.useState<string[]>([]);

  return (
    <div className="container grid grid-cols-1">
      <DateForm setContent={setContent} />
      <ContentArea content={content} />
    </div>
  );
}
