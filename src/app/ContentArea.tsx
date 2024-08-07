import {
  HomeIcon,
  SearchIcon,
  InboxIcon,
  CalendarIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function ContentArea() {
  return (
    <div className="flex min-h-screen w-full">
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
      <div className="mt-6 flex flex-1 flex-col">
        <div className="relative mx-6">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-[#94a3b8]" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md bg-muted pl-8 dark:bg-[#1e293b] dark:text-[#94a3b8]"
          />
        </div>
        <div className="prose mt-6 p-6 text-muted-foreground dark:text-[#94a3b8]">
          <h2>Long Text Content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget
            aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia,
            nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed
            euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget
            aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia,
            nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed
            euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget
            aliquam nisl nisl vel nisl.
          </p>
          <p>
            Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
            eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt
            lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.
            Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
            eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt
            lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.
            Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
            eget aliquam nisl nisl vel nisl.
          </p>
          <p>
            Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
            eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt
            lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.
            Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
            eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt
            lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.
            Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
            eget aliquam nisl nisl vel nisl.
          </p>
        </div>
      </div>
    </div>
  );
}
