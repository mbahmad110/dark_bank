"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function PendingPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Clock className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-center">Transaction Pending</CardTitle>
              <CardDescription className="text-center">
                Your withdrawal request has been submitted and is awaiting admin approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-center text-sm">
                  All transactions require admin approval before they can be processed. Once approved, the funds will be
                  added to your software wallet.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center space-x-2">
                  <div className="animate-pulse h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="animate-pulse h-2 w-2 rounded-full bg-yellow-500 animation-delay-200"></div>
                  <div className="animate-pulse h-2 w-2 rounded-full bg-yellow-500 animation-delay-400"></div>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                You will be notified once your transaction has been approved.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => router.push("/wallet")} className="w-full">
                Return to Wallet
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

