"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { BanknoteIcon, Bitcoin, Globe, Wallet } from "lucide-react"
import Link from "next/link"

export default function AccountOfficerDashboard() {
  const router = useRouter()
  const { isAccountOfficer, user } = useAuth()

  useEffect(() => {
    // Redirect if not account officer
    if (!isAccountOfficer) {
      router.push("/")
    }
  }, [isAccountOfficer, router])

  if (!isAccountOfficer) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Account Officer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.fullName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Local Bank</CardTitle>
                <BanknoteIcon className="h-6 w-6 text-green-500" />
              </div>
              <CardDescription>Process local bank transactions</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/local-bank">
                <Button size="lg" className="w-full">
                  Access Local Bank
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>International Bank</CardTitle>
                <Globe className="h-6 w-6 text-green-500" />
              </div>
              <CardDescription>Process international transactions</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/international-bank">
                <Button size="lg" className="w-full">
                  Access International Bank
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Crypto Conversion</CardTitle>
                <Bitcoin className="h-6 w-6 text-green-500" />
              </div>
              <CardDescription>Convert currency to cryptocurrency</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/crypto-conversion">
                <Button size="lg" className="w-full">
                  Access Crypto Conversion
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Wallet</CardTitle>
                <Wallet className="h-6 w-6 text-green-500" />
              </div>
              <CardDescription>View your transaction wallet</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/officer-wallet">
                <Button size="lg" className="w-full">
                  Access Wallet
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent transactions and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No recent activities found. Start by processing a transaction.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

