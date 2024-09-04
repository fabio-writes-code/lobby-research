import { FileText } from "lucide-react";
import Link from "next/link";

interface SidePanelProps {
  hansardIds: { id: string; date: Date }[];
}

export default async function SidePanel({ hansardIds }: SidePanelProps) {
  return (
    <aside className="fixed bottom-0 left-0 top-16 w-64 overflow-y-auto bg-muted p-4">
      {hansardIds.map((hansardId) => (
        <Link
          key={hansardId.id}
          href={`/document-list/${hansardId.id}`}
          className="flex w-full justify-start gap-2 rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
        >
          <FileText className="h-5 w-5" />
          <span>{hansardId.date.toUTCString().split("00")[0]}</span>
        </Link>
      ))}
    </aside>
  );
}
