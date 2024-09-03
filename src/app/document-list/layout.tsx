import React from "react";
import SidePanel from "./SidePanel";

export default function documentListLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full">
      <SidePanel />
      <div className="mt-6 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
