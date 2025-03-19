"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import AnimatedLogo from "@/components/animated-logo"

export default function Home() {
  const router = useRouter()
  const { login, isAdmin, isAccountOfficer } = useAuth()
  const [activeTab, setActiveTab] = useState("admin")

  // Admin login state
  const [adminUsername, setAdminUsername] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [adminError, setAdminError] = useState("")
  const [adminLoading, setAdminLoading] = useState(false)

  // Account officer login state
  const [officerUsername, setOfficerUsername] = useState("")
  const [officerPassword, setOfficerPassword] = useState("")
  const [officerError, setOfficerError] = useState("")
  const [officerLoading, setOfficerLoading] = useState(false)

  // Handle admin login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAdminError("")
    setAdminLoading(true)

    try {
      const user = login(adminUsername, adminPassword)
      if (user && user.role === "admin") {
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000)
      } else {
        setAdminLoading(false)
        setAdminError("Invalid admin credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      setAdminLoading(false)
      setAdminError("An error occurred during login")
    }
  }

  // Handle account officer login
  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setOfficerError("")
    setOfficerLoading(true)

    try {
      const user = login(officerUsername, officerPassword)
      if (user && user.role === "accountOfficer") {
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        setOfficerLoading(false)
        setOfficerError("Invalid account officer credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      setOfficerLoading(false)
      setOfficerError("An error occurred during login")
    }
  }

  // Redirect if already logged in
  if (isAdmin) {
    router.push("/admin/dashboard")
    return null
  }

  if (isAccountOfficer) {
    router.push("/dashboard")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8">
        <AnimatedLogo />
        <p className="max-w-[700px] text-gray-400 md:text-xl">Secure banking solutions for all your financial needs</p>
      </div>

      <div className="w-full max-w-md">
        <Tabs defaultValue="admin" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
            <TabsTrigger value="officer">Account Officer Login</TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <Card className="border-green-900/30 backdrop-blur-sm bg-black/60">
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
              </CardHeader>
              <form onSubmit={handleAdminLogin}>
                <CardContent className="space-y-4">
                  {adminError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{adminError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="adminUsername">Username</Label>
                    <Input
                      id="adminUsername"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      required
                      className="bg-black/50 border-green-900/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      className="bg-black/50 border-green-900/50"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={adminLoading}>
                    {adminLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="officer">
            <Card className="border-green-900/30 backdrop-blur-sm bg-black/60">
              <CardHeader>
                <CardTitle>Account Officer Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleOfficerLogin}>
                <CardContent className="space-y-4">
                  {officerError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{officerError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="officerUsername">Username</Label>
                    <Input
                      id="officerUsername"
                      value={officerUsername}
                      onChange={(e) => setOfficerUsername(e.target.value)}
                      required
                      className="bg-black/50 border-green-900/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="officerPassword">Password</Label>
                    <Input
                      id="officerPassword"
                      type="password"
                      value={officerPassword}
                      onChange={(e) => setOfficerPassword(e.target.value)}
                      required
                      className="bg-black/50 border-green-900/50"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={officerLoading}>
                    {officerLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

