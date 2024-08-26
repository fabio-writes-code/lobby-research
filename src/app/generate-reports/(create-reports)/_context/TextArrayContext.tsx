"use client";

import React from "react";
import { createContext, useContext, useState } from "react";

interface TextArrayContextType {
  textArray: Record<string, Record<number, string>>;
  setTextArray:
    | React.Dispatch<
        React.SetStateAction<Record<string, Record<number, string>>>
      >
    | (() => void);
}

const defaultContext: TextArrayContextType = {
  textArray: {},
  setTextArray: () => {
    /* No operation (no-op) */
  },
};

const TextArrayContext = createContext<TextArrayContextType>(defaultContext);

const TextArrayProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [textArray, setTextArray] = useState<
    Record<string, Record<number, string>>
  >(defaultContext.textArray);

  return (
    <TextArrayContext.Provider value={{ textArray, setTextArray }}>
      <div>{children}</div>
    </TextArrayContext.Provider>
  );
};

export const useTextArray = () => {
  const context = useContext(TextArrayContext);
  if (!context) {
    throw new Error("useTextArray must be used within a TextArrayProvider");
  }
  return context;
};

export default TextArrayProvider;
