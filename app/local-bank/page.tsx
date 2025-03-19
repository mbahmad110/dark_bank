"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// List of Nigerian banks
const NIGERIAN_BANKS = [
  "Access Bank",
  "Zenith Bank",
  "First Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Guaranty Trust Bank (GTB)",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "Union Bank of Nigeria",
  "Sterling Bank",
  "Wema Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Citibank Nigeria",
  "Heritage Bank",
  "Keystone Bank",
  "Unity Bank",
  "Providus Bank",
  "SunTrust Bank",
  "Jaiz Bank",
  "FCMB",
]

export default function LocalBank() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validate Information fields
  const [validateAccountNumber, setValidateAccountNumber] = useState("")
  const [validateBvn, setValidateBvn] = useState("")
  const [validatePhone, setValidatePhone] = useState("")

  // Make Withdrawal fields
  const [selectedBank, setSelectedBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bvn, setBvn] = useState("")

  const handleValidateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      router.push("/local-bank/amount")
    }, 1000)
  }

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      router.push("/local-bank/amount")
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Local Bank Access</CardTitle>
              <CardDescription>Please select an option to proceed</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="validate" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="validate">Validate Information</TabsTrigger>
                  <TabsTrigger value="withdraw">Make Withdrawal</TabsTrigger>
                </TabsList>

                <TabsContent value="validate">
                  <form onSubmit={handleValidateSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="validateAccountNumber">Account Number</Label>
                      <Input
                        id="validateAccountNumber"
                        placeholder="Enter 10-digit account number"
                        value={validateAccountNumber}
                        onChange={(e) => {
                          // Only allow numeric input and limit to 10 digits
                          const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                          setValidateAccountNumber(value)
                        }}
                        pattern="[0-9]{10}"
                        title="Account number must be 10 digits"
                        required
                      />
                      {validateAccountNumber && validateAccountNumber.length !== 10 && (
                        <p className="text-xs text-red-500">Account number must be 10 digits</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="validateBvn">BVN</Label>
                      <Input
                        id="validateBvn"
                        type="text"
                        placeholder="Enter 11-digit BVN"
                        value={validateBvn}
                        onChange={(e) => {
                          // Only allow numeric input and limit to 11 digits
                          const value = e.target.value.replace(/\D/g, "").slice(0, 11)
                          setValidateBvn(value)
                        }}
                        pattern="[0-9]{11}"
                        title="BVN must be 11 digits"
                        required
                      />
                      {validateBvn && validateBvn.length !== 11 && (
                        <p className="text-xs text-red-500">BVN must be 11 digits</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="validatePhone">Phone Number</Label>
                      <Input
                        id="validatePhone"
                        type="text"
                        placeholder="Enter phone number"
                        value={validatePhone}
                        onChange={(e) => setValidatePhone(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-4"
                      disabled={
                        isSubmitting ||
                        validateAccountNumber.length !== 10 ||
                        validateBvn.length !== 11 ||
                        !validatePhone
                      }
                    >
                      {isSubmitting ? "Processing..." : "Continue"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="withdraw">
                  <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank">Select Bank</Label>
                      <Select value={selectedBank} onValueChange={setSelectedBank} required>
                        <SelectTrigger id="bank">
                          <SelectValue placeholder="Select a Nigerian bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {NIGERIAN_BANKS.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="Enter 10-digit account number"
                        value={accountNumber}
                        onChange={(e) => {
                          // Only allow numeric input and limit to 10 digits
                          const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                          setAccountNumber(value)
                        }}
                        pattern="[0-9]{10}"
                        title="Account number must be 10 digits"
                        required
                      />
                      {accountNumber && accountNumber.length !== 10 && (
                        <p className="text-xs text-red-500">Account number must be 10 digits</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bvn">BVN</Label>
                      <Input
                        id="bvn"
                        type="text"
                        placeholder="Enter 11-digit BVN"
                        value={bvn}
                        onChange={(e) => {
                          // Only allow numeric input and limit to 11 digits
                          const value = e.target.value.replace(/\D/g, "").slice(0, 11)
                          setBvn(value)
                        }}
                        pattern="[0-9]{11}"
                        title="BVN must be 11 digits"
                        required
                      />
                      {bvn && bvn.length !== 11 && <p className="text-xs text-red-500">BVN must be 11 digits</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-4"
                      disabled={isSubmitting || !selectedBank || accountNumber.length !== 10 || bvn.length !== 11}
                    >
                      {isSubmitting ? "Processing..." : "Continue"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

