import { SearchIcon, BarChartIcon, XIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background p-4 dark:bg-[#0f172a]">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
        >
          <SearchIcon className="h-5 w-5" />
          <span>Search</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
        >
          <BarChartIcon className="h-5 w-5" />
          <span>Reports</span>
        </Button>
      </div>
      <Button variant="ghost" size="icon">
        <XIcon className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </Button>
    </nav>
  );
}
