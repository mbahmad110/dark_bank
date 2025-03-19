import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"
import BackgroundWrapper from "@/components/background-wrapper"
import HackingCursor from "@/components/hacking-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DARK_BANKS",
  description: "Secure banking solutions for all your financial needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <BackgroundWrapper>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </BackgroundWrapper>
            <HackingCursor />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

