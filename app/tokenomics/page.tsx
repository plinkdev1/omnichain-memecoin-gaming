"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { DexScreenerModal, DexScreenerInline } from "@/components/dex-screener-modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function TokenomicsPage() {
  const [chartModalOpen, setChartModalOpen] = useState(false)
  const [chartExpanded, setChartExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sewer-green via-sewer-brown/20 to-sewer-green">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow mb-4 glitch-text font-mono">TOKENOMICS</h1>
          <p className="text-xl md:text-2xl text-toxic-green font-mono mb-2">Simple as shit: we burn, you cope.</p>
          <p className="text-foreground/60 font-mono text-sm">No tricks. No taxes. Just pure sewer economics.</p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-sewer-brown/20 border-2 border-toxic-green rounded-lg p-4 space-y-2">
              <p className="text-sm font-mono text-foreground/70">Official Contract Address (CA)</p>
              <p className="font-mono text-sm font-bold text-dirty-yellow break-all glow-text">
                HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                <a
                  href="https://solscan.io/token/HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-rust-orange hover:underline"
                >
                  Solscan
                </a>
                <span className="text-foreground/30">•</span>
                <a
                  href="https://dexscreener.com/solana/HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-toxic-green hover:underline"
                >
                  DexScreener
                </a>
                <span className="text-foreground/30">•</span>
                <a
                  href="https://pump.fun/coin/HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-dirty-yellow hover:underline"
                >
                  pump.fun
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Supply Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="rusty-card border-rust-orange">
            <CardHeader>
              <CardTitle className="text-toxic-green font-mono flex items-center gap-2">
                <img src="/images/totalsupply.png" alt="total supply" className="w-9 h-9" />
                Total Supply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-dirty-yellow mb-2">2,000,000,000</p>
              <p className="text-sm text-foreground/70 font-mono">2 Billion $DATX</p>
              <p className="text-xs text-foreground/50 mt-2">Getting shittier every day via burns</p>
            </CardContent>
          </Card>

          <Card className="rusty-card border-rust-orange">
            <CardHeader>
              <CardTitle className="text-toxic-green font-mono flex items-center gap-2">
                <img src="/images/rocketlaunch.png" alt="rocket launch" className="w-9 h-9" />
                Launch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-dirty-yellow mb-2">Fair Launch</p>
              <p className="text-sm text-foreground/70 font-mono mb-2">pump.fun</p>
              <p className="text-xs text-foreground/50">Dec 21, 2025 - The day shit got real</p>
            </CardContent>
          </Card>

          <Card className="rusty-card border-rust-orange">
            <CardHeader>
              <CardTitle className="text-toxic-green font-mono flex items-center gap-2">
                <img src="/images/taxesfees.png" alt="taxes fees" className="w-9 h-9" />
                Taxes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-dirty-yellow mb-2">0%</p>
              <p className="text-sm text-foreground/70 font-mono">Buy: 0% | Sell: 0%</p>
              <p className="text-xs text-foreground/50 mt-2">No rug mechanics. Pure chaos.</p>
            </CardContent>
          </Card>
        </div>

        {/* Deflation Mechanism */}
        <Card className="rusty-card border-toxic-green mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-dirty-yellow font-mono flex items-center gap-3">
              <img src="/images/toilet.png" alt="toilet" className="w-12 h-12" />
              Deflationary Mechanism: Reserve Hole
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl text-toxic-green font-mono mb-3">How It Works:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-sewer-brown/30 rounded-lg border border-rust-orange/50">
                  <img src="/images/flamefire.png" alt="flame fire" className="w-9 h-9" />
                  <div>
                    <p className="text-lg font-bold text-dirty-yellow mb-1">90% Burned Forever</p>
                    <p className="text-sm text-foreground/80 font-mono">
                      Sent to dead wallet (11111111111111111111111111111111). Gone. Flushed. Never coming back.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-sewer-brown/30 rounded-lg border border-rust-orange/50">
                  <img src="/images/treasurypool.png" alt="treasury pool" className="w-9 h-9" />
                  <div>
                    <p className="text-lg font-bold text-dirty-yellow mb-1">10% Treasury Pool</p>
                    <p className="text-sm text-foreground/80 font-mono">
                      Feeds RaidX contest winners, El Shito rewards, and the Shit Empire. Keeps the sewer running.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sewer-green/50 border border-toxic-green p-6 rounded-lg">
              <p className="text-foreground/90 font-mono text-sm leading-relaxed">
                <span className="text-toxic-green font-bold">Why burn?</span> Because supply inflation is shit.
                Democracy is shit. Fiat is shit. We're flushing it all. Every token burned makes your bag scarcer.
                Eternally flush your tokens at the{" "}
                <Link href="/reserve-hole" className="text-rust-orange underline hover:text-dirty-yellow">
                  Reserve Hole
                </Link>
                .
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/reserve-hole"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rust-orange hover:bg-toxic-green transition-colors rounded-lg font-mono font-bold text-lg"
              >
                <img src="/images/toilet2.png" alt="toilet" className="w-6 h-6" />
                Flush Tokens Now
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="rusty-card border-rust-orange mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-dirty-yellow font-mono flex items-center gap-2">
              <img src="/images/livechart.png" alt="live chart" className="w-9 h-9" />
              Live Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-sewer-brown/30 p-8 rounded-lg border-2 border-sewer-brown text-center">
              <p className="text-foreground/70 font-mono mb-4">View live $DATX price chart on DexScreener</p>
              <Button
                onClick={() => setChartExpanded(!chartExpanded)}
                className="inline-block px-6 py-3 bg-rust-orange hover:bg-dirty-yellow transition-colors rounded-lg font-mono font-bold text-lg text-foreground"
              >
                {chartExpanded ? "Hide Chart ↑" : "Open Live Chart →"}
              </Button>
            </div>
            <p className="text-xs text-foreground/50 text-center mt-3 font-mono">
              Real-time $DATX trading data with candlesticks and volume.
            </p>
          </CardContent>
        </Card>

        {/* Expanded Chart Section */}
        {chartExpanded && (
          <div className="max-w-4xl mx-auto mb-12">
            <DexScreenerInline isExpanded={chartExpanded} />
          </div>
        )}

        {/* Distribution Breakdown */}
        <Card className="rusty-card border-toxic-green mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-dirty-yellow font-mono">Distribution Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-sewer-brown/30 rounded-lg">
                <div>
                  <p className="font-bold text-toxic-green font-mono">Fair Launch (pump.fun)</p>
                  <p className="text-sm text-foreground/60">100% to the people</p>
                </div>
                <p className="text-2xl font-bold text-dirty-yellow">100%</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-sewer-brown/30 rounded-lg opacity-50">
                <div>
                  <p className="font-bold text-foreground/50 font-mono line-through">Team Allocation</p>
                  <p className="text-sm text-foreground/40">Doesn't exist</p>
                </div>
                <p className="text-2xl font-bold text-foreground/50">0%</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-sewer-brown/30 rounded-lg opacity-50">
                <div>
                  <p className="font-bold text-foreground/50 font-mono line-through">VC Rounds</p>
                  <p className="text-sm text-foreground/40">Fuck VCs</p>
                </div>
                <p className="text-2xl font-bold text-foreground/50">0%</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-sewer-brown/30 rounded-lg opacity-50">
                <div>
                  <p className="font-bold text-foreground/50 font-mono line-through">Marketing Wallet</p>
                  <p className="text-sm text-foreground/40">Organic or die</p>
                </div>
                <p className="text-2xl font-bold text-foreground/50">0%</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-toxic-green/10 border border-toxic-green rounded-lg">
              <p className="text-center text-sm font-mono text-foreground/90">
                No presale. No whitelist. No team dump. Just pure degen fairness from the sewer.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Microcopy Footer */}
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-rust-orange font-mono">Simple as shit: we burn, you cope.</p>
          <p className="text-foreground/60 text-sm font-mono max-w-2xl mx-auto">
            No complex DeFi mechanisms. No staking pools that rugpull. No governance theater. Just a shitty token
            getting shittier (scarcer) every day. The revolution doesn't need fancy tokenomics.
          </p>

          <div className="pt-8 border-t border-sewer-brown">
            <p className="text-xs text-foreground/40 font-mono">
              <img src="/images/customking.png" alt="custom king" className="w-5 h-5 inline mx-1" />
              <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline mx-1" />
              The shitty world ends where DatXit begins. Flush it. Burn it. Meme it. #DatXitToTheSewer
              <img src="/images/customking.png" alt="custom king" className="w-5 h-5 inline mx-1" />
              <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline mx-1" />
            </p>
          </div>
        </div>
      </div>

      <DexScreenerModal isOpen={chartModalOpen} onOpenChange={setChartModalOpen} />
    </div>
  )
}
