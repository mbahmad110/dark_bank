"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, UserPlus, Users, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import type { User, Transaction } from "@/lib/auth-types"
import { getAllAccountOfficers } from "@/lib/auth"
import db from "@/lib/db"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { isAdmin, user } = useAuth()
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([])
  const [accountOfficers, setAccountOfficers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdmin && !isLoading) {
      router.push("/")
      return
    }

    try {
      // Load pending transactions
      const pending = db.getPendingTransactions()
      setPendingTransactions(pending)

      // Load account officers
      const officers = getAllAccountOfficers()
      setAccountOfficers(officers)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [router, isAdmin, isLoading])

  const handleApproveTransaction = (id: string) => {
    try {
      const approved = db.approveTransaction(id)
      if (approved) {
        // Update the transaction lists
        setPendingTransactions(db.getPendingTransactions())
      }
    } catch (error) {
      console.error("Error approving transaction:", error)
    }
  }

  const handleRejectTransaction = (id: string) => {
    try {
      const rejected = db.rejectTransaction(id)
      if (rejected) {
        // Update the transaction lists
        setPendingTransactions(db.getPendingTransactions())
      }
    } catch (error) {
      console.error("Error rejecting transaction:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.fullName || "Administrator"}</p>
          </div>
          <Button onClick={() => router.push("/admin/create-officer")} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Create Account Officer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Officers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accountOfficers.length}</div>
              <p className="text-xs text-muted-foreground">Total registered account officers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
              <Activity className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTransactions.length}</div>
              <p className="text-xs text-muted-foreground">Transactions awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Online</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Transactions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Transactions</CardTitle>
            <CardDescription>Transactions requiring admin approval</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingTransactions.length > 0 ? (
              <div className="space-y-4">
                {pendingTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Pending
                        </Badge>
                        <span className="font-medium">{transaction.id}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.date} • {transaction.type} • ${transaction.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">By: {transaction.accountOfficerName}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveTransaction(transaction.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleRejectTransaction(transaction.id)}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No pending transactions at this time</div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="officers">
          <TabsList>
            <TabsTrigger value="officers">Account Officers</TabsTrigger>
            <TabsTrigger value="system">System Status</TabsTrigger>
          </TabsList>
          <TabsContent value="officers">
            <Card>
              <CardHeader>
                <CardTitle>Account Officers</CardTitle>
                <CardDescription>Manage your account officers</CardDescription>
              </CardHeader>
              <CardContent>
                {accountOfficers.length > 0 ? (
                  <div className="space-y-4">
                    {accountOfficers.map((officer) => (
                      <div key={officer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{officer.fullName}</p>
                          <p className="text-sm text-muted-foreground">{officer.email}</p>
                          <p className="text-sm text-muted-foreground">Username: {officer.username}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Created: {new Date(officer.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No account officers found. Create one to get started.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Server Uptime</span>
                      <span className="text-sm text-green-600">99.9%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full w-[99.9%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Response Time</span>
                      <span className="text-sm text-green-600">120ms</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full w-[85%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Database Load</span>
                      <span className="text-sm text-yellow-600">65%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-yellow-600 h-full w-[65%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-green-600">42%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full w-[42%]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

