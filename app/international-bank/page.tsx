"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// List of European banks
const EURO_BANKS = [
  "Deutsche Bank (Germany)",
  "BNP Paribas (France)",
  "Crédit Agricole (France)",
  "Banco Santander (Spain)",
  "ING Group (Netherlands)",
  "UniCredit (Italy)",
  "Intesa Sanpaolo (Italy)",
  "Nordea (Finland)",
  "BBVA (Spain)",
  "Société Générale (France)",
  "Commerzbank (Germany)",
  "Crédit Mutuel (France)",
  "Rabobank (Netherlands)",
  "KBC Bank (Belgium)",
  "Danske Bank (Denmark)",
  "Erste Group (Austria)",
  "ABN AMRO (Netherlands)",
  "Caixabank (Spain)",
  "Swedbank (Sweden)",
  "SEB (Sweden)",
  "Raiffeisen Bank International (Austria)",
  "DNB (Norway)",
  "Banco Sabadell (Spain)",
  "Belfius (Belgium)",
  "Bankia (Spain)",
]

export default function InternationalBank() {
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [routingNumber, setRoutingNumber] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      router.push("/international-bank/amount")
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>International Bank Withdrawal</CardTitle>
              <CardDescription>Please enter your card details and select a European bank</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiration Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    placeholder="Enter routing number"
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank">Select Bank</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank} required>
                    <SelectTrigger id="bank">
                      <SelectValue placeholder="Select a European bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {EURO_BANKS.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !cardNumber || !expiryDate || !cvv || !routingNumber || !selectedBank}
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

