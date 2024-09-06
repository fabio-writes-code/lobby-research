import TextArrayProvider from "./_context/TextArrayContext";

export default function ReportsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <TextArrayProvider>{children}</TextArrayProvider>;
}
