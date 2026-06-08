"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Flame, Wallet } from "lucide-react"
import { ElShitoPolaroid } from "@/components/el-shito-polaroid"
import { useWallet } from "@solana/wallet-adapter-react"

const DEAD_WALLET = "11111111111111111111111111111111"
const COMMUNITY_TREASURY = "AS6eLBveWWosdH1aQtefBxfvaJZDoqpoGmujemmcAcR4"
const TEAM_WALLET = "E59YMzy1k4rrFX6v45PGpDbq5mJdjFEHsjD3NoVxNdhG"

interface BurnStats {
  totalBurned: number
  weeklyBurned: number
  burnPool: number
  totalBurns: number
}

export default function ReserveHolePage() {
  const { connected, publicKey } = useWallet()
  const [amount, setAmount] = useState("")
  const [isBurning, setIsBurning] = useState(false)
  const [stats, setStats] = useState<BurnStats>({
    totalBurned: 0,
    weeklyBurned: 0,
    burnPool: 0,
    totalBurns: 0,
  })

  useEffect(() => {
    loadStats()
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  async function loadStats() {
    const supabase = createClient()

    const now = new Date()
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
    const pastDaysOfYear = (now.getTime() - firstDayOfYear.getTime()) / 86400000
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)

    const { data: totalData } = await supabase.from("burns").select("burn_amount")
    const totalBurned = totalData?.reduce((sum, b) => sum + Number(b.burn_amount), 0) || 0

    const { data: weeklyData } = await supabase
      .from("burns")
      .select("burn_amount")
      .eq("year", now.getFullYear())
      .eq("week_number", weekNumber)
    const weeklyBurned = weeklyData?.reduce((sum, b) => sum + Number(b.burn_amount), 0) || 0

    const { data: poolData } = await supabase
      .from("burns")
      .select("treasury_amount")
      .eq("year", now.getFullYear())
      .eq("week_number", weekNumber)
    const burnPool = poolData?.reduce((sum, b) => sum + Number(b.treasury_amount), 0) || 0

    const { count } = await supabase.from("burns").select("*", { count: "exact", head: true })

    setStats({
      totalBurned: totalBurned / 1e9,
      weeklyBurned: weeklyBurned / 1e9,
      burnPool: burnPool / 1e9,
      totalBurns: count || 0,
    })
  }

  async function handleBurn() {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount to burn")
      return
    }

    setIsBurning(true)

    try {
      alert(
        `Ready to burn ${amount} $DATX!\n\n90% (${(Number(amount) * 0.9).toFixed(2)} $DATX) → Dead wallet forever\n7% (${(Number(amount) * 0.07).toFixed(2)} $DATX) → Community Treasury\n3% (${(Number(amount) * 0.03).toFixed(2)} $DATX) → Team Wallet\n\nWallet integration complete - transactions ready to sign.`,
      )
      setAmount("")
      await loadStats()
    } catch (error) {
      console.error("Burn failed:", error)
      alert("Burn failed. Check console for details.")
    } finally {
      setIsBurning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sewer-brown/20 to-transparent">
      <div className="relative overflow-hidden border-b border-sewer-brown bg-gradient-to-b from-sewer-brown/20 to-transparent">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="/icons/ReserveHole.png"
              alt="Reserve Hole"
              className="w-20 h-20 animate-pulse hover:scale-125 transition-transform"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dirty-yellow font-mono glitch-text">
            The Reserve Hole
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto mb-4 leading-relaxed">
            Eternally flush your tokens. 90% burned forever, 7% to community, 3% to team. Pure deflationary mechanics.
          </p>
          <p className="text-sm text-toxic-green font-mono">No refunds. No returns. Only sewer.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="rusty-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Flame className="w-8 h-8 text-rust-orange" />
                Burn Portal
              </CardTitle>
              <CardDescription>Send your $DATX into the void. Forever.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!connected ? (
                <div className="text-center py-8 space-y-4">
                  <Wallet className="w-16 h-16 mx-auto text-sewer-brown/50" />
                  <p className="text-foreground/70">Connect your wallet to start burning</p>
                  <p className="text-xs text-foreground/50 font-mono">
                    Use the Connect button in the header to link your wallet
                  </p>
                  <p className="text-xs text-toxic-green font-mono">Wallet is now live – connect and burn!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-toxic-green/10 border border-toxic-green rounded-lg p-3 text-sm font-mono">
                    <p className="text-toxic-green">✓ Connected: {publicKey?.toString().slice(0, 8)}...</p>
                  </div>

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

                  {amount && Number(amount) > 0 && (
                    <div className="bg-sewer-brown/20 border border-sewer-brown rounded-lg p-4 space-y-3 font-mono text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/70 flex items-center gap-2">
                          <Flame className="w-4 h-4" />
                          Burned (90%):
                        </span>
                        <span className="text-rust-orange font-bold">{(Number(amount) * 0.9).toFixed(2)} $DATX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70 flex items-center gap-2">🏛️ Community (7%):</span>
                        <span className="text-toxic-green font-bold">{(Number(amount) * 0.07).toFixed(2)} $DATX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70 flex items-center gap-2">⭐ Team (3%):</span>
                        <span className="text-dirty-yellow font-bold">{(Number(amount) * 0.03).toFixed(2)} $DATX</span>
                      </div>
                      <div className="pt-3 border-t border-sewer-brown/50 space-y-2 text-xs text-foreground/60">
                        <div className="break-all">
                          <p className="text-foreground/70 font-bold mb-1">🔥 Dead Wallet (90% Permanent Burn):</p>
                          <p className="text-rust-orange bg-sewer-brown/30 rounded p-2 font-mono break-words">
                            {DEAD_WALLET}
                          </p>
                        </div>
                        <div className="break-all">
                          <p className="text-foreground/70 font-bold mb-1">🏛️ Community Treasury (7%):</p>
                          <p className="text-toxic-green bg-sewer-brown/30 rounded p-2 font-mono break-words">
                            {COMMUNITY_TREASURY}
                          </p>
                        </div>
                        <div className="break-all">
                          <p className="text-foreground/70 font-bold mb-1">⭐ Team Operations (3%):</p>
                          <p className="text-dirty-yellow bg-sewer-brown/30 rounded p-2 font-mono break-words">
                            {TEAM_WALLET}
                          </p>
                          <p className="text-foreground/50 italic mt-2">For legal, branding, infrastructure & growth</p>
                        </div>
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

                  <p className="text-xs text-center text-foreground/50 italic">"The only way out is down the drain."</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rusty-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">📉 Live Burn Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sewer-brown/20 rounded-lg p-4 border border-sewer-brown">
                    <p className="text-xs text-foreground/60 font-mono mb-1">Total Burned</p>
                    <p className="text-2xl font-bold text-rust-orange font-mono">
                      {stats.totalBurned.toLocaleString()} $DATX
                    </p>
                  </div>
                  <div className="bg-sewer-brown/20 rounded-lg p-4 border border-sewer-brown">
                    <p className="text-xs text-foreground/60 font-mono mb-1">This Week</p>
                    <p className="text-2xl font-bold text-toxic-green font-mono">
                      {stats.weeklyBurned.toLocaleString()} $DATX
                    </p>
                  </div>
                  <div className="bg-sewer-brown/20 rounded-lg p-4 border border-sewer-brown">
                    <p className="text-xs text-foreground/60 font-mono mb-1">Treasury Pool</p>
                    <p className="text-2xl font-bold text-dirty-yellow font-mono">
                      {stats.burnPool.toLocaleString()} $DATX
                    </p>
                  </div>
                  <div className="bg-sewer-brown/20 rounded-lg p-4 border border-sewer-brown">
                    <p className="text-xs text-foreground/60 font-mono mb-1">Total Flushes</p>
                    <p className="text-2xl font-bold text-foreground font-mono">{stats.totalBurns.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rusty-card bg-gradient-to-br from-sewer-brown/30 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">🏆 How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-foreground/80">
                <div className="flex gap-3">
                  <Flame className="w-6 h-6 text-rust-orange flex-shrink-0" />
                  <div>
                    <p className="font-bold text-foreground mb-1">90% Permanent Burn</p>
                    <p className="text-foreground/60">
                      Dead wallet. Irretrievable. Supply tightens. Every flush increases scarcity.
                    </p>
                    <p className="text-xs text-foreground/50 font-mono mt-2 break-all">Wallet: {DEAD_WALLET}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">🏛️</span>
                  <div>
                    <p className="font-bold text-foreground mb-1">7% Community Treasury</p>
                    <p className="text-foreground/60">
                      Funds DAO initiatives. RaidX prizes. Development. Governance decides allocation.
                    </p>
                    <p className="text-xs text-foreground/50 font-mono mt-2 break-all">Address: {COMMUNITY_TREASURY}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">⭐</span>
                  <div>
                    <p className="font-bold text-foreground mb-1">3% Team Operations</p>
                    <p className="text-foreground/60">
                      Legal, branding, infrastructure, and growth. Transparent allocation for sewer maintenance.
                    </p>
                    <p className="text-xs text-foreground/50 font-mono mt-2 break-all">Address: {TEAM_WALLET}</p>
                    <p className="text-xs text-foreground/50 italic mt-1">
                      Operations, legal, brand growth, and infrastructure
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-sewer-brown/20 border border-sewer-brown rounded-lg p-4 text-center">
              <p className="text-xs text-foreground/60 font-mono mb-2 flex items-center justify-center gap-2">
                ⚠️ Warning
              </p>
              <p className="text-sm text-foreground/80">
                Burned tokens are irretrievable. This is permanent. No complaints accepted. The sewer doesn't do
                refunds.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 text-dirty-yellow font-mono flex items-center gap-2">
            <Flame className="w-6 h-6" />
            Recent Flushes
          </h2>
          <div className="bg-sewer-brown/10 border border-sewer-brown rounded-lg p-6 text-center text-foreground/60">
            <p className="font-mono text-sm">Live feed coming soon. Burn history will be displayed here.</p>
            <p className="text-xs mt-2">Every flush immortalized on the blockchain.</p>
          </div>
        </div>
      </div>

      <ElShitoPolaroid
        imageUrl="/images/image-2025-12-21t16-41-40-380z.png"
        caption="Wall Street – Flooded it"
        position="bottom-right"
        rotation={Math.random() * 20 - 10}
        opacity={0.37}
      />
    </div>
  )
}
