"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download } from "lucide-react"
import { jsPDF } from "jspdf"

export default function SuccessPage() {
  const router = useRouter()

  // In a real application, we would get the transaction ID from the URL or context
  // and then fetch the transaction details from the database
  const [transactionDetails, setTransactionDetails] = useState({
    id: "IBH-510882",
    date: "3/17/2025",
    time: "6:15:24 AM",
    // User input details - exact values as mentioned
    cardNumber: "4532 9856 1234 5678",
    expiryDate: "09/26",
    cvv: "123",
    routingNumber: "021000021",
    bank: "Deutsche Bank (Germany)",
    amount: "3500.00", // Exact amount input by user
    transactionCharge: "175.00", // Transaction charge
    bypassFee: "8550.99", // Bypass fee
    status: "Completed",
    reference: "REF-7654321",
  })
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [showBypassFee, setShowBypassFee] = useState(true) // User paid bypass fee

  // Calculate total amount - exactly as mentioned
  const totalAmount = "12225.99"

  const handleDownloadReceipt = () => {
    setIsGeneratingPdf(true)

    // Create a new PDF document
    setTimeout(() => {
      try {
        const doc = new jsPDF()

        // Add logo/header
        doc.setFontSize(22)
        doc.setTextColor(0, 51, 153)
        doc.text("International Bank of Hacking", 105, 20, { align: "center" })

        // Add title
        doc.setFontSize(16)
        doc.setTextColor(0, 0, 0)
        doc.text("Withdrawal Receipt", 105, 30, { align: "center" })

        // Add line
        doc.setDrawColor(0, 51, 153)
        doc.setLineWidth(0.5)
        doc.line(20, 35, 190, 35)

        // Add transaction details
        doc.setFontSize(12)
        doc.text("Transaction Details", 20, 45)

        doc.setFontSize(10)
        doc.text(`Transaction ID: ${transactionDetails.id}`, 20, 55)
        doc.text(`Reference Number: ${transactionDetails.reference}`, 20, 62)
        doc.text(`Date: ${transactionDetails.date}`, 20, 69)
        doc.text(`Time: ${transactionDetails.time}`, 20, 76)
        doc.text(`Status: ${transactionDetails.status}`, 20, 83)

        // Add card and bank details
        doc.setFontSize(12)
        doc.text("Card and Bank Details", 20, 95)

        doc.setFontSize(10)
        doc.text(`Card Number: ${transactionDetails.cardNumber}`, 20, 105)
        doc.text(`Expiry Date: ${transactionDetails.expiryDate}`, 20, 112)
        doc.text(`CVV: ${transactionDetails.cvv}`, 20, 119)
        doc.text(`Routing Number: ${transactionDetails.routingNumber}`, 20, 126)
        doc.text(`Bank: ${transactionDetails.bank}`, 20, 133)

        // Add amount details
        doc.setFontSize(12)
        doc.text("Amount Details", 20, 145)

        doc.setFontSize(10)
        doc.text(`Withdrawal Amount: €${transactionDetails.amount}`, 20, 155)
        doc.text(`Transaction Charge: €${transactionDetails.transactionCharge}`, 20, 162)
        doc.text(`Token Bypass Fee: €${transactionDetails.bypassFee}`, 20, 169)

        doc.setFontSize(11)
        doc.setFont(undefined, "bold")
        doc.text(`Total Amount: €${totalAmount}`, 20, 176)
        doc.setFont(undefined, "normal")

        // Add footer
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        doc.text(
          "This is an official receipt from International Bank of Hacking. Keep it for your records.",
          105,
          270,
          { align: "center" },
        )
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 275, { align: "center" })

        // Save the PDF
        doc.save(`IBH_Withdrawal_Receipt_${transactionDetails.id}.pdf`)

        setIsGeneratingPdf(false)
      } catch (error) {
        console.error("Error generating PDF:", error)
        setIsGeneratingPdf(false)
        alert("There was an error generating your PDF. Please try again.")
      }
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-center">Withdrawal Successful</CardTitle>
              <CardDescription className="text-center">
                Funds have been successfully added to your software wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Transaction ID:</span>
                  <span className="text-sm">{transactionDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{transactionDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Time:</span>
                  <span className="text-sm">{transactionDetails.time}</span>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="text-sm font-semibold mb-2">Card & Bank Details</h4>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Card Number:</span>
                  <span className="text-sm">{transactionDetails.cardNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Expiry Date:</span>
                  <span className="text-sm">{transactionDetails.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">CVV:</span>
                  <span className="text-sm">{transactionDetails.cvv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Routing Number:</span>
                  <span className="text-sm">{transactionDetails.routingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Bank:</span>
                  <span className="text-sm">{transactionDetails.bank}</span>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="text-sm font-semibold mb-2">Amount Details</h4>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Withdrawal Amount:</span>
                  <span className="text-sm font-semibold">€{transactionDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Transaction Charge:</span>
                  <span className="text-sm">€{transactionDetails.transactionCharge}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Token Bypass Fee:</span>
                  <span className="text-sm">€{transactionDetails.bypassFee}</span>
                </div>

                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-sm font-bold">€{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm text-green-600 font-semibold">{transactionDetails.status}</span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleDownloadReceipt}
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isGeneratingPdf}
                >
                  {isGeneratingPdf ? (
                    <>Generating PDF...</>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download Receipt as PDF
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => router.push("/wallet")} className="w-full">
                Go to Wallet
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

