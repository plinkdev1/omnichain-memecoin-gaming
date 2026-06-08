"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Wallet } from "lucide-react"

interface BurnWidgetProps {
  isConnected?: boolean
  onBurn?: (amount: number) => Promise<void>
  showPreview?: boolean
}

export function BurnWidget({ isConnected = false, onBurn, showPreview = true }: BurnWidgetProps) {
  const [amount, setAmount] = useState("")
  const [isBurning, setIsBurning] = useState(false)

  async function handleBurn() {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount to burn")
      return
    }

    setIsBurning(true)
    try {
      if (onBurn) {
        await onBurn(Number(amount))
      }
      setAmount("")
    } catch (error) {
      console.error("Burn failed:", error)
      alert("Burn failed. Check console for details.")
    } finally {
      setIsBurning(false)
    }
  }

  return (
    <Card className="rusty-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Flame className="w-8 h-8 text-rust-orange" />
          Burn Portal
        </CardTitle>
        <CardDescription>Reduce supply. Feed the treasury. No regrets.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="text-center py-8 space-y-4">
            <Wallet className="w-16 h-16 mx-auto text-sewer-brown/50" />
            <p className="text-foreground/70">Connect your wallet to start burning</p>
            <Button disabled className="bg-sewer-brown/50 hover:bg-sewer-brown/50 cursor-not-allowed opacity-50">
              Connect Wallet
            </Button>
            <p className="text-xs text-foreground/50 font-mono">Coming soon – Reserve Hole opens post-launch</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-mono text-foreground/80">Amount to Burn</label>
              <Input
                type="number"
                placeholder="69420"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg font-mono bg-sewer-green/30 border-sewer-brown"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-foreground/60 font-mono">Minimum: 1 $DATX</p>
            </div>

            {amount && Number(amount) > 0 && showPreview && (
              <div className="bg-sewer-brown/20 border border-sewer-brown rounded-lg p-4 space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Burned (90%):</span>
                  <span className="text-rust-orange font-bold">{(Number(amount) * 0.9).toFixed(2)} $DATX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Treasury (10%):</span>
                  <span className="text-toxic-green font-bold">{(Number(amount) * 0.1).toFixed(2)} $DATX</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleBurn}
              disabled={!amount || Number(amount) <= 0 || isBurning}
              className="w-full bg-rust-orange hover:bg-rust-orange/80 text-foreground font-bold text-lg py-6"
            >
              {isBurning ? (
                <>
                  <Flame className="w-5 h-5 mr-2 animate-pulse" />
                  Burning...
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5 mr-2" />
                  Flush It Forever
                </>
              )}
            </Button>

            <p className="text-xs text-center text-foreground/50 italic">"No refunds. Only sewer."</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
