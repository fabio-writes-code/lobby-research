"use client";

import React from "react";
import { useReports } from "../_context/ReportsContext";
import HansardDocument from "./HansardDocument";
import { useTextArray } from "./_context/TextArrayContext";

const CreateArea = () => {
  const { sharedContent } = useReports();

  const { textArray } = useTextArray();

  return (
    <div className="container">
      {sharedContent.map((textContent, index) => (
        <div key={index} className="border-b-2 border-gray-300 py-5">
          <h3 className="pb-5 text-xl">{textContent.date.toDateString()}</h3>

          <div className="">
            <HansardDocument
              content={textContent.content}
              date={textContent.date.toDateString()}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateArea;
