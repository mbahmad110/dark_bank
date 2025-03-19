"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"
import Link from "next/link"

export default function WalletPage() {
  const router = useRouter()
  const [balance] = useState(5000.0)

  const recentTransactions = [
    {
      id: "TX123456",
      type: "deposit",
      amount: 2500.0,
      date: "2025-03-14",
      description: "International Bank Transfer",
    },
    {
      id: "TX123455",
      type: "deposit",
      amount: 1500.0,
      date: "2025-03-10",
      description: "Local Bank Transfer",
    },
    {
      id: "TX123454",
      type: "withdrawal",
      amount: 750.0,
      date: "2025-03-05",
      description: "Bank Transfer to Chase",
    },
    {
      id: "TX123453",
      type: "withdrawal",
      amount: 250.0,
      date: "2025-03-01",
      description: "BTC Transfer",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Your current wallet balance and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Available Balance</span>
                <span className="text-4xl font-bold">${balance.toFixed(2)}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/transfer">
                  <Button>Transfer Funds</Button>
                </Link>
                <Button variant="outline">Deposit Funds</Button>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${transaction.type === "deposit" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}
                        >
                          {transaction.type === "deposit" ? (
                            <ArrowDownLeft
                              className={`h-5 w-5 ${transaction.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            />
                          ) : (
                            <ArrowUpRight
                              className={`h-5 w-5 ${transaction.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/history">
                    <Button variant="link" className="text-sm">
                      View All Transactions
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Transfer options for your funds</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bank">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                  <TabsTrigger value="btc">BTC Transfer</TabsTrigger>
                </TabsList>
                <TabsContent value="bank" className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">Transfer funds directly to a bank account</p>
                  <Link href="/transfer/bank">
                    <Button className="w-full">Start Bank Transfer</Button>
                  </Link>
                </TabsContent>
                <TabsContent value="btc" className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">Transfer funds using cryptocurrency</p>
                  <Link href="/transfer/btc">
                    <Button className="w-full">Start BTC Transfer</Button>
                  </Link>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Pending Transactions</CardTitle>
              <CardDescription>Transactions awaiting completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">No pending transactions at this time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

