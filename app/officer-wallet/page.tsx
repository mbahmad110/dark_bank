"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"
import db from "@/lib/db"
import type { Transaction } from "@/lib/auth-types"

export default function OfficerWalletPage() {
  const router = useRouter()
  const { isAccountOfficer, user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect if not account officer
    if (!isAccountOfficer) {
      router.push("/")
      return
    }

    try {
      if (user) {
        // Load account officer transactions
        const officerTransactions = db.getAccountOfficerTransactions(user.id)
        setTransactions(officerTransactions)
      }
    } catch (error) {
      console.error("Error loading transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [isAccountOfficer, router, user])

  if (!isAccountOfficer) {
    return null
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <p>Loading wallet...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Account Officer Wallet</h1>
          <p className="text-muted-foreground">View your transaction history</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All transactions you've processed</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.status === "approved"
                            ? "bg-green-100 dark:bg-green-900"
                            : transaction.status === "rejected"
                              ? "bg-red-100 dark:bg-red-900"
                              : "bg-yellow-100 dark:bg-yellow-900"
                        }`}
                      >
                        {transaction.status === "approved" ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : transaction.status === "rejected" ? (
                          <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium mr-2">
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Transaction
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              transaction.status === "approved"
                                ? "bg-green-100 text-green-800 border-green-300"
                                : transaction.status === "rejected"
                                  ? "bg-red-100 text-red-800 border-red-300"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-300"
                            }
                          >
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date} • {transaction.time}
                        </p>
                        <p className="text-sm text-muted-foreground">ID: {transaction.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">Fee: ${transaction.fee}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found. Start by processing a transaction.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

