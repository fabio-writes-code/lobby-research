"use client";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { marked } from "marked";
import DOMPurify from "dompurify";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function CreateArea() {
  const [printContent, setPrintContent] = useState("");

  const handleChange = useCallback((value: string) => {
    setPrintContent(value);
  }, []);

  // Memoize the preview render function
  const previewRender = useCallback((plain: string) => {
    const html = marked.parse(plain) as string;
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  }, []);

  const options = useMemo(
    () => ({
      toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list"] as const,
      previewRender,
      autofocus: false,
      spellChecker: false,
      status: false,
      autosave: {
        enabled: true,
        uniqueId: "hansardEditor",
        delay: 1000,
      },
    }),
    [previewRender]
  );

  return (
    <div className="my-4">
      <h3 className="mb-2 text-lg font-bold">Hansard Report Drafting</h3>
      <Separator />
      <SimpleMDE
        className="mt-4"
        placeholder="Type here..."
        value={printContent}
        onChange={handleChange}
        options={options}
      />
      {/* ... */}
    </div>
  );
}
