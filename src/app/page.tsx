import Link from "next/link";
import { SyntheticEvent } from "react";
import { db } from "~/server/db";
import { hansardDocument } from "~/server/db/schema";
import TextComponent from "./TextComponent";

export default async function HomePage() {
  const document = await db.select().from(hansardDocument);
  console.log(typeof document[0]?.content);

  const contentArray = document[0]?.content?.split("\n");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <TextComponent content={contentArray!} />
    </main>
  );
}
