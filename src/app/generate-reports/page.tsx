"use client";

import React from "react";
import ContentArea from "./(search-reports)/ContentArea";
import DateForm from "./(search-reports)/DateForm";
import { useReports } from "./_context/ReportsContext";
import CreateArea from "./(create-reports)/CreateArea";

export default function SearchReportsPage() {
  const [content, setContent] = React.useState<
    { date: Date; content: string | null }[]
  >([]);

  const currentPage = useReports().activePage;

  return (
    <>
      {currentPage === "search" && (
        <div className="container grid grid-cols-1">
          <DateForm setContent={setContent} />
          <ContentArea content={content} />
        </div>
      )}
      {currentPage === "create" && <CreateArea />}
    </>
  );
}
