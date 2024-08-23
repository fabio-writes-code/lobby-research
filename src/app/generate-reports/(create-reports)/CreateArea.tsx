"use client";

import React from "react";
import { useReports } from "../_context/ReportsContext";
import HansardDocument from "./HansardDocument";
import { useTextArray } from "./_context/TextArrayContext";

const CreateArea = () => {
  const { sharedContent } = useReports();

  const { textArray } = useTextArray();

  console.log("TextArray", textArray);

  return (
    <>
      {sharedContent.map((textContent, index) => (
        <div key={index} className="">
          {textContent.date.toDateString()}

          <div className="grid grid-cols-6 gap-4">
            <HansardDocument content={textContent.content} />
          </div>
        </div>
      ))}
    </>
  );
};

export default CreateArea;
