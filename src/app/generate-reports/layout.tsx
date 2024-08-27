import ReportsProvider from "./_context/ReportsContext";

export default function ReportsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-100">
      <ReportsProvider>{children}</ReportsProvider>
    </div>
  );
}
