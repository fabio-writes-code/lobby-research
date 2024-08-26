"use client";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const CreateArea = () => {
  return (
    <div>
      <SimpleMDE placeholder="Type here..." />
    </div>
  );
};

export default CreateArea;
