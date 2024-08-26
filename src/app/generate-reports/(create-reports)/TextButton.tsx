import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useTextArray } from "./_context/TextArrayContext";
import Markdown from "react-markdown";
import { text } from "stream/consumers";

interface TextButtonProps {
  paragraph: string;
  date: string;
  index: number;
}

const TextButton = ({ paragraph, date, index }: TextButtonProps) => {
  const { textArray, setTextArray } = useTextArray();

  // const [textArray, setTextArray] = useState<
  //   Record<string, Record<number, string>>
  // >({});

  const handleAddParagraph = () => {
    console.log("Button clicked"); // This should log when the button is clicked

    setTextArray((prevTextArray) => {
      console.log("Inside setTextArray"); // This should log if the function is invoked

      const updatedTextArray = { ...prevTextArray };
      if (!updatedTextArray[date]) updatedTextArray[date] = {};
      updatedTextArray[date][index] = paragraph;

      return updatedTextArray;
    });
  };

  const handleRemoveParagraph = () => {
    if (date in textArray) {
      delete textArray[date];
      setTextArray({ ...textArray });
    }
  };
  return (
    <div className="relative">
      <ScrollArea className="h-32 w-full space-x-1 rounded-md border">
        <Markdown className="pr-12 text-sm">{paragraph}</Markdown>
      </ScrollArea>
      <div className="absolute right-2 top-2 flex space-x-1">
        <Button
          size="icon"
          variant="outline"
          className={`h-6 w-6 ${!textArray[date]?.[index] ? "bg-green-500 text-white" : ""}`}
          onClick={handleAddParagraph}
          // disabled={!!textArray[date]?.length}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {date in textArray && (
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 bg-red-500 text-white"
            onClick={handleAddParagraph}
          >
            <Minus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TextButton;
