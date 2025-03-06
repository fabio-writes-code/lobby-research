import { Button } from "~/components/ui/button";

interface SidePanelProps {
  contentArray: Date[];
  scrollToArea: (id: string) => void;
}

export default function DocNav({ contentArray, scrollToArea }: SidePanelProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {contentArray.map((content, index) => (
        <Button
          key={index}
          onClick={() =>
            scrollToArea(content.toDateString().replaceAll(/\s/g, "") + index)
          }
          variant={"ghost"}
          // href={`#${content.toDateString().replaceAll(/\s/g, "")}`}
          className="w-full justify-start gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-primary shadow-md hover:bg-muted  "
        >
          {/* <CalendarIcon className="h-5 w-5 grid-cols-1" /> */}
          <span>{content.toUTCString().split("00")[0]}</span>
        </Button>
      ))}
    </div>
  );
}
