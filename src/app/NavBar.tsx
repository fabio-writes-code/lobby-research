import { BarChartIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const linkClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background p-4 dark:bg-[#0f172a]">
      <div className="flex items-center gap-4">
        <Link
          href="/document-list/1"
          className={
            "rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155] " +
            linkClasses
          }
        >
          <SearchIcon className="h-5 w-5" />
          <span>Search</span>
        </Link>
        <Link
          href="/generate-reports"
          className={
            "rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155] " +
            linkClasses
          }
        >
          <BarChartIcon className="h-5 w-5" />
          <span>Generate Reports</span>
        </Link>
        <Link
          href="/api/auth/signout"
          className={
            "rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155] " +
            linkClasses
          }
        >
          <BarChartIcon className="h-5 w-5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </nav>
  );
}
