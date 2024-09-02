"use client";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useReports } from "../_context/ReportsContext";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const CreateArea = () => {
  const { printContent, setPrintContent } = useReports();

  return (
    <div>
      <SimpleMDE
        placeholder="Type here..."
        value={printContent}
        onChange={(value) => setPrintContent(value)}
      />
    </div>
  );
};

export default CreateArea;
