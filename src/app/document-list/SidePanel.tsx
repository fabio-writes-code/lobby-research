"use client";

import { FileText, CalendarDays, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import DateForm from "./_components/DateForm";
import { Button } from "~/components/ui/button";

interface Hansard {
  id: string;
  date: Date; // or string, if you parse it to a Date in the server
}

interface SidePanelProps {
  hansardIds: Hansard[];
}


export default function SidePanel({ hansardIds }: SidePanelProps) {
  // Local state for filter range
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  // Filter in memory
  const filteredHansards = useMemo(() => {
    // If neither date is selected, return everything
    if (!startDate && !endDate) return hansardIds;

    return hansardIds.filter((doc) => {
      if (startDate && doc.date < startDate) return false;
      if (endDate && doc.date > endDate) return false;
      return true;
    });
  }, [startDate, endDate, hansardIds]);

  // Group by Month+Year
  const groupedHansards = filteredHansards.reduce((groups, hansard) => {
    const monthYear = hansard.date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(hansard);
    return groups;
  }, {} as Record<string, Hansard[]>);

  return (
    <>
      {/* Toggle button for mobile */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 rounded-full shadow-md hover:shadow-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ArrowLeft className="h-5 w-5" />
        ) : (
          <CalendarDays className="h-5 w-5" />
        )}
      </Button>

      {/* Sidebar */}
      <aside 
        className={`fixed bottom-0 left-0 top-[73px] lg:top-[69px] w-64 overflow-y-auto border-r bg-background p-4 transition-transform duration-300 lg:translate-x-0 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DateForm
          startDate={startDate}
          endDate={endDate}
          onChangeStart={setStartDate}
          onChangeEnd={setEndDate}
        />

        {Object.entries(groupedHansards).map(([monthYear, hansards]) => (
          <div key={monthYear} className="mb-6">
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              {monthYear}
            </h4>
            <div className="space-y-2">
              {hansards.map((hansard) => (
                <Link
                  key={hansard.id}
                  href={`/document-list/${hansard.id}`}
                  className="flex w-full justify-start gap-2 rounded-md px-2 py-2 text-sm text-primary shadow-sm shadow-stone-300 hover:bg-muted  "
                >
                  <FileText className="h-5 w-5" />
                  <span>
                    {`${hansard.date.toLocaleString("default", {
                      weekday: "long",
                    })} ${hansard.date
                      .getDate()
                      .toString()
                      .padStart(2, "0")} ${hansard.id.split("_")[1]!.slice(0, 2)}:${hansard.id.split("_")[1]!.slice(2, 4)}`}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
