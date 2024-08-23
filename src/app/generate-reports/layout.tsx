import ReportsProvider from "./_context/ReportsContext";

export default function ReportsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ReportsProvider>{children}</ReportsProvider>;
}
