import React from "react";
import { db } from "~/server/db";
import { hansardDocuments } from "~/server/db/schema";
import SidePanel from "./SidePanel";

interface Props {
  children: React.ReactNode;
}

export default async function documentListLayout({ children }: Props) {
  const hansardIds = await db
    .select({
      id: hansardDocuments.hansardId,
      date: hansardDocuments.hansardDate,
    })
    .from(hansardDocuments);

  return (
    <div className="mt-16 flex">
      <SidePanel hansardIds={hansardIds} />
      <div className="mt-6 flex flex-1 flex-col w-[-webkit-fill-available;]">{children}</div>
    </div>
  );
}
