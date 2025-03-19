"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function BankTransferSuccessPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-center">Transfer Successful</CardTitle>
              <CardDescription className="text-center">
                Your bank transfer has been completed successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Transaction ID:</span>
                  <span className="text-sm">BT-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm text-green-600">Completed</span>
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                A debit notification has been sent to your email
              </p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => router.push("/wallet")}>
                Go to Wallet
              </Button>
              <Button onClick={() => router.push("/transfer")}>New Transfer</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

