"use client"
import { FileTextIcon, LogInIcon, LogOutIcon, MoonIcon, SearchIcon, Settings2Icon, SunIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileNavBar from "~/components/ui/mobile-nav-bar";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";
import { useTheme } from "next-themes";


interface NavbarProps{
  session:Session | null
}

export default function Navbar({session}:NavbarProps) {
  const [authSession, setAuthSession] = useState<Session|null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setAuthSession(session)
    setMounted(true)
  },[session])
  const linkClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const { theme, setTheme } = useTheme()
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between gap-4 border-b bg-background p-4 ">
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex justify-center items-center gap-4">
          <Link href="/" className="font-semibold text-lg">
            <Image src="/favicon.png" alt="AC Logo" width={24} height={24}/>
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={
              "rounded-md px-3 py-2 text-left hover:bg-muted shadow " +
              linkClasses
            }
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <SunIcon className="h-5 w-5 text-[#b5995a]" />
              ) : (
                <MoonIcon className="h-5 w-5 text-[#b5995a]" />
              )
            ) : (
              <div className="h-5 w-5" /> /* Placeholder with same dimensions */
            )}
          </button>
        </div>
        <MobileNavBar session={authSession}/>
        <div className="lg:flex hidden items-center gap-3">

          {authSession?.user && (
            <>
              <Link
                href="/generate-reports"
                className={
                  "rounded-md px-3 py-2 text-left hover:bg-muted " +
                  linkClasses
                }
              >
                <FileTextIcon className="h-5 w-5 me-2" aria-hidden="true" />
                <span className="me-2">Generate Reports</span>
              </Link>
              <Link
                href="/document-list"
                className={
                  "rounded-md px-3 py-2 text-left hover:bg-muted   " +
                  linkClasses
                }
              >
                <SearchIcon className="h-5 w-5 me-2" />
                <span className="me-2">Search</span>
              </Link>
            {authSession.user.role === "admin" && (
              <Link
                href="/admin"
                className={
                  "rounded-md px-3 py-2 text-left hover:bg-muted   " +
                  linkClasses
                }
              >
                <Settings2Icon className="h-5 w-5 me-2" />
                <span className="me-2">Admin</span>
              </Link>
            )}
            </>
          )}
          {authSession?.user ? (
            <Link
              href="/api/auth/signout"
              className={
                "rounded-md px-3 py-2 text-left hover:bg-muted   " +
                linkClasses
              }
            >
              <span className="me-2">Sign Out</span>
              <LogOutIcon className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className={
                "rounded-md px-3 py-2 text-left hover:bg-muted   " +
                linkClasses
              }
            >
              <span className="me-2">Sign In</span>
              <LogInIcon className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
