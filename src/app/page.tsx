import Link from "next/link";

export default async function HomePage() {
  // const document = await db.select().from(hansardDocument);
  // console.log(typeof document[0]?.content);

  // const contentArray = document[0]?.content?.split("\n");

  return (
    <main className="mt-16 flex h-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8">
        <Link
          className="flex h-20 w-96 items-center justify-center rounded-md px-2 py-2 text-center text-2xl shadow-md hover:bg-muted dark:hover:bg-[#334155]"
          href="/document-list"
        >
          Document List
        </Link>
        <Link
          className="flex h-20 w-96 items-center justify-center rounded-md px-2 py-2 text-center text-2xl shadow-md hover:bg-muted dark:hover:bg-[#334155]"
          href="/generate-reports"
        >
          Generate Reports
        </Link>
      </div>
    </main>
  );
}
