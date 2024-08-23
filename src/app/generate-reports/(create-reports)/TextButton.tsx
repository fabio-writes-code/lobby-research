import { Minus, Plus } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useTextArray } from "./_context/TextArrayContext";

interface TextButtonProps {
  paragraph: string;
  date: string;
}

const TextButton = ({ paragraph, date }: TextButtonProps) => {
  const { textArray, setTextArray } = useTextArray();

  return (
    <div className="relative">
      <ScrollArea className="h-32 w-full space-x-1 rounded-md border">
        <p className="pr-12 text-sm">{paragraph}</p>
      </ScrollArea>
      <div className="absolute right-2 top-2 flex space-x-1">
        <Button
          size="icon"
          variant="outline"
          className={`h-6 w-6 ${textArray[date](paragraph) ? "bg-green-500 text-white" : ""}`}
          onClick={() => handleAddText(paragraph)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {selectedTexts.includes(paragraph) && (
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 bg-red-500 text-white"
            onClick={() => handleRemoveText(paragraph)}
          >
            <Minus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TextButton;
