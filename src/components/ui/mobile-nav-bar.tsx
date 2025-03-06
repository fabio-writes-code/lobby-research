"use client"
import { FileTextIcon, SearchIcon, Settings2Icon, LogOutIcon, LogInIcon, MenuIcon, XIcon } from "lucide-react";
import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Link from "next/link";

interface MobileNavBarProps{
  session:Session | null;
}

  export default function MobileNavBar({session}:MobileNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [authSession, setAuthSession] = useState<Session | null>(null)

  useEffect(() => {
    setAuthSession(session)
  },[session])
  const linkClasses =
    "inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return (
    <>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Side Panel */}
      <div className={`fixed top-0 right-0 bottom-0 z-40 w-72 bg-background shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {authSession?.user && (
              <>
                <Link
                  href="/generate-reports"
                  className={
                    "rounded-md px-3 py-2 text-left hover:bg-muted   " +
                    linkClasses
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <FileTextIcon className="h-5 w-5 me-2" aria-hidden="true" />
                  <span>Generate Reports</span>
                </Link>
                <Link
                  href="/document-list"
                  className={
                    "rounded-md px-3 py-2 text-left hover:bg-muted   " +
                    linkClasses
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <SearchIcon className="h-5 w-5 me-2" />
                  <span>Search</span>
                </Link>
                {authSession.user.role === "admin" && (
                  <Link
                    href="/admin"
                    className={
                      "rounded-md px-3 py-2 text-left hover:bg-muted   " +
                      linkClasses
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings2Icon className="h-5 w-5 me-2" />
                    <span>Admin</span>
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="mt-auto">
            {authSession?.user ? (
              <Link
                href="/api/auth/signout"
                className={
                  "w-full rounded-md px-3 py-2 text-left hover:bg-muted   " +
                  linkClasses
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="me-2">Sign Out</span>
                <LogOutIcon className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className={
                  "w-full rounded-md px-3 py-2 text-left hover:bg-muted   " +
                  linkClasses
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="me-2">Sign In</span>
                <LogInIcon className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
