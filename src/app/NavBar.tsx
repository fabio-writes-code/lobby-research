import { BarChartIcon, LogOutIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const linkClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between gap-4 border-b bg-background p-4 dark:bg-[#0f172a]">
      <div className="flex items-center justify-between gap-4 w-full">
        <div>        <Link
          href="/document-list"
          className={
            "rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155] " +
            linkClasses
          }
        >
          <span className="me-2">Search</span>
          <SearchIcon className="h-5 w-5" />
        </Link>
        <Link
          href="/generate-reports"
          className={
            "rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155] " +
            linkClasses
          }
        >
          <span className="me-2">Generate Reports</span>
          <BarChartIcon className="h-5 w-5" />
        </Link>
        </div>
        <div>
<Link
          href="/api/auth/signout"
          className={
            "rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155] " +
            linkClasses
          }
        >
          <span className="me-2">Sign Out</span>
          <LogOutIcon className="h-5 w-5" />
        </Link>
        </div>
      </div>
    </nav>
  );
}
