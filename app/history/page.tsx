"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HistoryPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const transactions = [
    {
      id: "TX123456",
      type: "deposit",
      amount: 2500.0,
      date: "2025-03-14",
      description: "International Bank Transfer",
      status: "completed",
    },
    {
      id: "TX123455",
      type: "deposit",
      amount: 1500.0,
      date: "2025-03-10",
      description: "Local Bank Transfer",
      status: "completed",
    },
    {
      id: "TX123454",
      type: "withdrawal",
      amount: 750.0,
      date: "2025-03-05",
      description: "Bank Transfer to Chase",
      status: "completed",
    },
    {
      id: "TX123453",
      type: "withdrawal",
      amount: 250.0,
      date: "2025-03-01",
      description: "BTC Transfer",
      status: "completed",
    },
    {
      id: "TX123452",
      type: "deposit",
      amount: 1000.0,
      date: "2025-02-25",
      description: "International Bank Transfer",
      status: "completed",
    },
    {
      id: "TX123451",
      type: "withdrawal",
      amount: 500.0,
      date: "2025-02-20",
      description: "Bank Transfer to Wells Fargo",
      status: "completed",
    },
    {
      id: "TX123450",
      type: "withdrawal",
      amount: 350.0,
      date: "2025-02-15",
      description: "ETH Transfer",
      status: "completed",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter !== "all" && transaction.type !== filter) {
      return false
    }

    if (
      searchTerm &&
      !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View and search your past transactions</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="deposit">Deposits Only</SelectItem>
                <SelectItem value="withdrawal">Withdrawals Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-2/3">
            <Input
              placeholder="Search by description or transaction ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
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
                        <div className="flex space-x-4">
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          <p className="text-sm text-muted-foreground">{transaction.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`font-medium ${transaction.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

