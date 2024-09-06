import ReportsProvider from "./_context/ReportsContext";

export default function ReportsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-16">
      <ReportsProvider>{children}</ReportsProvider>
    </div>
  );
}
