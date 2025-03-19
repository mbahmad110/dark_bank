"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import db from "@/lib/db"

const CRYPTO_COINS = [
  { name: "Bitcoin", symbol: "BTC", rate: 65000 },
  { name: "Ethereum", symbol: "ETH", rate: 3500 },
  { name: "Litecoin", symbol: "LTC", rate: 80 },
  { name: "Bitcoin Cash", symbol: "BCH", rate: 350 },
  { name: "Ripple", symbol: "XRP", rate: 0.5 },
]

export default function CryptoConversionPage() {
  const router = useRouter()
  const { isAccountOfficer } = useAuth()
  const [selectedCoin, setSelectedCoin] = useState("")
  const [amount, setAmount] = useState("")
  const [cryptoAmount, setCryptoAmount] = useState("0")
  const [walletAddress, setWalletAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Redirect if not account officer
    if (!isAccountOfficer) {
      router.push("/")
    }
  }, [isAccountOfficer, router])

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin)
    if (amount) {
      const selectedRate = CRYPTO_COINS.find((c) => c.symbol === coin)?.rate || 1
      setCryptoAmount((Number.parseFloat(amount) / selectedRate).toFixed(8))
    }
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
    if (selectedCoin) {
      const selectedRate = CRYPTO_COINS.find((c) => c.symbol === selectedCoin)?.rate || 1
      setCryptoAmount((Number.parseFloat(value || "0") / selectedRate).toFixed(8))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create transaction
      const transaction = db.createTransaction({
        type: "crypto",
        amount,
        fee: (Number.parseFloat(amount) * 0.05).toFixed(2), // 5% fee
        details: {
          cryptoCurrency: selectedCoin,
          cryptoAmount,
          walletAddress,
        },
      })

      // Redirect to success page
      setTimeout(() => {
        router.push("/transaction-submitted")
      }, 1500)
    } catch (error) {
      console.error("Error creating transaction:", error)
      setIsSubmitting(false)
    }
  }

  if (!isAccountOfficer) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Currency to Crypto Conversion</CardTitle>
              <CardDescription>Convert currency to cryptocurrency</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coin">Select Cryptocurrency</Label>
                  <Select value={selectedCoin} onValueChange={handleCoinSelect} required>
                    <SelectTrigger id="coin">
                      <SelectValue placeholder="Select a cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CRYPTO_COINS.map((coin) => (
                        <SelectItem key={coin.symbol} value={coin.symbol}>
                          {coin.name} ({coin.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-7"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {selectedCoin && (
                  <div className="space-y-2">
                    <Label>Equivalent in {selectedCoin}</Label>
                    <div className="p-3 bg-muted rounded-md text-center font-mono">
                      {cryptoAmount} {selectedCoin}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    placeholder={`Enter ${selectedCoin || "cryptocurrency"} wallet address`}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Transaction Fee</Label>
                  <div className="p-3 bg-muted rounded-md text-center">
                    5% (${amount ? (Number.parseFloat(amount) * 0.05).toFixed(2) : "0.00"})
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !selectedCoin || !amount || !walletAddress}
                >
                  {isSubmitting ? "Processing..." : "Submit for Approval"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

