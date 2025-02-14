import "~/styles/globals.css";

import { type Metadata } from "next";

import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import "../styles/globals.css";
import Navbar from "./NavBar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "~/components/ui/toaster";
export const metadata: Metadata = {
  title: "Hansard Document Search",
  description: "Hansard Document Search",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cn("antialiased", fontHeading.variable, fontBody.variable)} flex h-screen flex-col`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster/>
        </SessionProvider>
      </body>
    </html>
  );
}
