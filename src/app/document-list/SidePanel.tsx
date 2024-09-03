import { FileText } from "lucide-react";
import Link from "next/link";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";

export default async function SidePanel() {
  const hansardIds = await db
    .select({
      id: hansardDocument.hansard_id,
      date: hansardDocument.hansard_date,
    })
    .from(hansardDocument);
  return (
    <div className="flex flex-col items-start gap-2 border-r bg-background p-4 dark:bg-[#0f172a]">
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
    </div>
  );
}
