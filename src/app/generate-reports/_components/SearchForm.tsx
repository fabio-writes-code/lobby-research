"use client";

import { X } from "lucide-react";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "~/components/ui/button";

interface SearchFormProps {
  isContent: boolean;
  setSearchArray: (searchArray: string[]) => void;
}

const SearchForm = ({ isContent, setSearchArray }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [pills, setPills] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [pills]);

  useEffect(() => {
    setPills([]);
  }, [isContent]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," && inputValue.trim()) {
      e.preventDefault();
      addPill(inputValue.trim());
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && pills.length > 0) {
      removePill(pills.length - 1);
    }
  };

  const addPill = (value: string) => {
    setPills([...pills, value]);
  };

  const removePill = (index: number) => {
    setPills(pills.filter((_, i) => i !== index));
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClick = () => {
    setSearchArray(pills);
  };

  return (
    <div className="flex w-full gap-4">
      <div
        ref={containerRef}
        className="flex flex-auto flex-wrap items-center gap-2 overflow-x-auto rounded-md border border-input bg-background p-2"
        onClick={focusInput}
      >
        {pills.map((pill, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-primary px-2 py-1 text-sm text-primary-foreground"
          >
            {pill}
            <button
              type="button"
              className="ml-1 text-primary-foreground hover:text-primary-foreground/80 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                removePill(index);
              }}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-transparent outline-none"
          placeholder={
            pills.length === 0 ? "Type a word and press comma to add..." : ""
          }
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <Button
        className="w-full sm:w-fit"
        type="submit"
        disabled={!isContent}
        onClick={handleClick}
      >
        Search Keywords
      </Button>
    </div>
  );
};

export default SearchForm;
