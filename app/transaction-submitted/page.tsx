"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function TransactionSubmittedPage() {
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
              <CardTitle className="text-center">Transaction Submitted</CardTitle>
              <CardDescription className="text-center">
                Your transaction has been submitted for admin approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-center text-sm">
                  All transactions require admin approval before they can be processed. You will be notified once your
                  transaction has been approved.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Return to Dashboard
              </Button>
              <Button onClick={() => router.push("/officer-wallet")}>View Wallet</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

