import Link from "next/link";
import { SyntheticEvent } from "react";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";
import { Dashboard } from "~/components/component/dashboard";

export default async function HomePage() {
  // const document = await db.select().from(hansardDocument);
  // console.log(typeof document[0]?.content);

  // const contentArray = document[0]?.content?.split("\n");

  return (
    <main className="flex min-h-screen">
      <Link href="/document-list/1">Document List</Link>
    </main>
  );
}
