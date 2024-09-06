import React from "react";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";
import SidePanel from "./SidePanel";

interface Props {
  children: React.ReactNode;
}

export default async function documentListLayout({ children }: Props) {
  const hansardIds = await db
    .select({
      id: hansardDocument.hansard_id,
      date: hansardDocument.hansard_date,
    })
    .from(hansardDocument);

  return (
    <div className="mt-16 flex w-full">
      <SidePanel hansardIds={hansardIds} />
      <div className="mt-6 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
