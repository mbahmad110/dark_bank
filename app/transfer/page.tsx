"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BanknoteIcon, Bitcoin } from "lucide-react"

export default function TransferPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Transfer Funds</h1>

          <Tabs defaultValue="bank" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              <TabsTrigger value="btc">BTC Transfer</TabsTrigger>
            </TabsList>

            <TabsContent value="bank">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Transfer</CardTitle>
                  <CardDescription>Transfer funds to a bank account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center py-6">
                    <BanknoteIcon className="h-24 w-24 text-primary opacity-80" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Features:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Transfer to any US bank account</li>
                      <li>Fast processing times</li>
                      <li>Secure transaction handling</li>
                      <li>Email notifications</li>
                    </ul>
                  </div>

                  <Link href="/transfer/bank">
                    <Button className="w-full">Continue to Bank Transfer</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="btc">
              <Card>
                <CardHeader>
                  <CardTitle>BTC Transfer</CardTitle>
                  <CardDescription>Transfer funds using cryptocurrency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center py-6">
                    <Bitcoin className="h-24 w-24 text-primary opacity-80" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Features:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Multiple cryptocurrency options</li>
                      <li>Automatic USD to crypto conversion</li>
                      <li>Downloadable transaction receipts</li>
                      <li>Email notifications</li>
                    </ul>
                  </div>

                  <Link href="/transfer/btc">
                    <Button className="w-full">Continue to BTC Transfer</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

