"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { useAuth } from "@/components/auth-provider"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, isAdmin, isAccountOfficer, logout, user } = useAuth()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-green-900/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/"}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold text-green-500 font-mono relative overflow-hidden">
              DARK_BANKS
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-shine"></span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {isAdmin && (
                <>
                  <Link
                    href="/admin/dashboard"
                    className={`text-sm font-medium ${isActive("/admin/dashboard") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/create-officer"
                    className={`text-sm font-medium ${isActive("/admin/create-officer") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    Create Officer
                  </Link>
                </>
              )}

              {isAccountOfficer && (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/local-bank"
                    className={`text-sm font-medium ${isActive("/local-bank") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    Local Bank
                  </Link>
                  <Link
                    href="/international-bank"
                    className={`text-sm font-medium ${isActive("/international-bank") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    International Bank
                  </Link>
                  <Link
                    href="/crypto-conversion"
                    className={`text-sm font-medium ${isActive("/crypto-conversion") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    Crypto
                  </Link>
                  <Link
                    href="/officer-wallet"
                    className={`text-sm font-medium ${isActive("/officer-wallet") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    Wallet
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-center space-x-2">
              <ModeToggle />
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={() => logout()} className="flex items-center gap-1">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Link href="/">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              {isAdmin && (
                <>
                  <Link
                    href="/admin/dashboard"
                    className={`text-sm font-medium ${isActive("/admin/dashboard") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/create-officer"
                    className={`text-sm font-medium ${isActive("/admin/create-officer") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Officer
                  </Link>
                </>
              )}

              {isAccountOfficer && (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/local-bank"
                    className={`text-sm font-medium ${isActive("/local-bank") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Local Bank
                  </Link>
                  <Link
                    href="/international-bank"
                    className={`text-sm font-medium ${isActive("/international-bank") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    International Bank
                  </Link>
                  <Link
                    href="/crypto-conversion"
                    className={`text-sm font-medium ${isActive("/crypto-conversion") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Crypto
                  </Link>
                  <Link
                    href="/officer-wallet"
                    className={`text-sm font-medium ${isActive("/officer-wallet") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wallet
                  </Link>
                </>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <ModeToggle />
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

