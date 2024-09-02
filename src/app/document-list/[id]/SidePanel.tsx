import {
  HomeIcon,
  SearchIcon,
  InboxIcon,
  CalendarIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function SidePanel() {
  return (
    <div className="flex flex-col items-start gap-2 border-r bg-background p-4 dark:bg-[#0f172a]">
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Home</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
      >
        <SearchIcon className="h-5 w-5" />
        <span>Search</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
      >
        <InboxIcon className="h-5 w-5" />
        <span>Inbox</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
      >
        <CalendarIcon className="h-5 w-5" />
        <span>Calendar</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 rounded-md px-3 py-2 text-left hover:bg-muted dark:hover:bg-[#334155]"
      >
        <SettingsIcon className="h-5 w-5" />
        <span>Settings</span>
      </Button>
    </div>
  );
}
