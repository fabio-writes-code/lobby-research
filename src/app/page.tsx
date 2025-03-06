import Link from "next/link";
import { FileTextIcon, SearchIcon } from "lucide-react";

export default async function HomePage() {
  return (
    <main className="mt-16 h-full flex justify-center items-center">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-3xl font-bold">Welcome to Alberta Counsel&apos;s Hanasard Transcripts</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Link
            className="group flex flex-col items-center justify-center rounded-lg border p-8 shadow-lg transition-all hover:shadow-xl hover:bg-muted  "
            href="/document-list"
          >
            <SearchIcon className="mb-4 h-12 w-12 transition-transform group-hover:scale-110" />
            <h2 className="text-2xl font-semibold">Document List</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Search and browse through available documents
            </p>
          </Link>
          
          <Link
            className="group flex flex-col items-center justify-center rounded-lg border p-8 shadow-lg transition-all hover:shadow-xl hover:bg-muted  "
            href="/generate-reports"
          >
            <FileTextIcon className="mb-4 h-12 w-12 transition-transform group-hover:scale-110" />
            <h2 className="text-2xl font-semibold">Generate Reports</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Create and customize reports from documents
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
