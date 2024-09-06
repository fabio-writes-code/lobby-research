"use client";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useReports } from "../_context/ReportsContext";
import { Separator } from "~/components/ui/separator";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const CreateArea = () => {
  const { printContent, setPrintContent } = useReports();

  return (
    <div className="my-4">
      <h3 className="mb-2 text-lg font-bold">Hansard Report Drafting</h3>
      <Separator />
      <SimpleMDE
        className="mt-4"
        placeholder="Type here..."
        value={printContent}
        onChange={(value) => setPrintContent(value)}
      />
    </div>
  );
};

export default CreateArea;
