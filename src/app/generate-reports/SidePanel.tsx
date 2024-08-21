interface SidePanelProps {
  contentArray: Date[];
}

export default function SidePanel({ contentArray }: SidePanelProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {contentArray.map((content) => (
        <a
          key={content.toDateString()}
          href={`#${content.toDateString()}`}
          className="w-full justify-start gap-2 rounded-md py-2 text-left text-sm font-medium text-primary shadow-md hover:bg-muted dark:hover:bg-[#334155]"
        >
          {/* <CalendarIcon className="h-5 w-5 grid-cols-1" /> */}
          <span>{content.toDateString()}</span>
        </a>
      ))}
    </div>
  );
}
