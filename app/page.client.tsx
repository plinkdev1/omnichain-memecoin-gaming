"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ElShitoSlideshow } from "@/components/el-shito-slideshow"
import { ElShitoIntroCard } from "@/components/el-shito-intro-card"
import { ElShitoPolaroid } from "@/components/el-shito-polaroid"
import { DexScreenerInline } from "@/components/dex-screener-modal"
import { useState } from "react"

const PageClient = () => {
  const [chartExpanded, setChartExpanded] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/images/image-2025-12-21t21-11-53-479z.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-8">
          <div className="space-y-3">
            <h1 className="text-6xl md:text-8xl font-black text-dirty-yellow font-mono glitch-text">DATXIT</h1>
            <p className="text-2xl md:text-3xl text-rust-orange font-bold">The Shittiest Token on Solana</p>
            <p className="text-lg text-foreground/80 italic">
              Born Dec 21, 2025. No moon, just sewer. Everything is shit – we're the exit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button className="bg-rust-orange hover:bg-dirty-yellow text-black font-bold text-lg px-8 py-6" asChild>
              <Link href="/council">View The Shit High Council</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-toxic-green font-bold text-lg px-8 py-6 bg-transparent"
              asChild
            >
              <Link href="/reserve-hole">
                <img src="/images/Toilet.png" alt="Toilet icon" className="w-6 h-6 mr-2 inline" />
                Flush Tokens Now
              </Link>
            </Button>
          </div>
        </section>

        {/* El Shito Intro Card */}
        <ElShitoIntroCard />

        {/* El Shito Slideshow */}
        <ElShitoSlideshow />

        {/* Live Chart Card */}
        <Card className="rusty-card max-w-3xl mx-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-dirty-yellow glitch-text">Live Chart</h3>
            </div>
            <div className="bg-sewer-brown/20 p-8 rounded border border-sewer-brown/50 text-center space-y-4">
              <p className="text-foreground/70 font-mono">View live $DATX price chart on DexScreener</p>
              <Button
                className="bg-rust-orange hover:bg-dirty-yellow text-black font-bold"
                onClick={() => setChartExpanded(!chartExpanded)}
              >
                {chartExpanded ? "Hide Chart ↑" : "Open Live Chart →"}
              </Button>
            </div>
            <p className="text-xs text-toxic-green font-mono text-center drop-shadow-[0_0_8px_rgba(0,255,100,0.6)] glow-text">
              Real-time $DATX trading data. CA: HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump
            </p>
          </div>
        </Card>

        {/* Expanded Chart Section */}
        {chartExpanded && (
          <div className="max-w-3xl mx-auto">
            <DexScreenerInline isExpanded={chartExpanded} />
          </div>
        )}

        {/* Three Pillars */}
        <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="rusty-card p-6">
            <h2 className="text-2xl font-bold text-toxic-green mb-3 glitch-text">Reserve Hole Burns</h2>
            <p className="text-foreground/80 leading-relaxed">
              Every token burned makes your bag scarcer. No inflation. No bullshit. Just pure deflationary mechanics
              through the Reserve Hole.
            </p>
            <Button className="mt-4 bg-sewer-brown hover:bg-rust-orange w-full h-12" asChild>
              <Link href="/reserve-hole">Visit Reserve Hole</Link>
            </Button>
          </Card>

          <Card className="rusty-card p-6">
            <h2 className="text-2xl font-bold text-toxic-green mb-3 glitch-text">El Shito Was Here</h2>
            <p className="text-foreground/80 leading-relaxed">
              Join RaidX contests. Submit memes. Vote on governance. Top burners get Council badges. Degens run this
              sewer.
            </p>
            <Button className="mt-4 bg-sewer-brown hover:bg-rust-orange w-full h-12" asChild>
              <Link href="/raidx">Join RaidX Contests</Link>
            </Button>
          </Card>

          <Card className="rusty-card p-6">
            <h2 className="text-2xl font-bold text-toxic-green mb-3 glitch-text">Sewer Merch</h2>
            <p className="text-foreground/80 leading-relaxed">
              A masked vigilante strikes from the sewer. Tagged 17 countries. Interpol watches. The legend grows daily.
              Who is El Shito?
            </p>
            <Button className="mt-4 bg-sewer-brown hover:bg-rust-orange w-full h-12" asChild>
              <Link href="/store">Shop Merch</Link>
            </Button>
          </Card>
        </section>

        {/* Features Section */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-dirty-yellow glitch-text">The Revolution Runs Deep</h2>

          <div className="space-y-4">
            <Card className="rusty-card p-6">
              <h3 className="text-xl font-bold text-rust-orange mb-2">Fair Launch (100% to Community)</h3>
              <p className="text-foreground/80">
                No team allocation. No VC rounds. No presale. pump.fun launched Dec 21, 2025 – everyone had equal
                opportunity.
              </p>
            </Card>

            <Card className="rusty-card p-6">
              <h3 className="text-xl font-bold text-rust-orange mb-2">Zero Tax Buy/Sell</h3>
              <p className="text-foreground/80">
                No rug mechanics. No hidden taxes. Pure degen chaos. Your tokens are yours – no siphoning, no bullshit.
              </p>
            </Card>

            <Card className="rusty-card p-6">
              <h3 className="text-xl font-bold text-rust-orange mb-2">Permanent Deflation (Reserve Hole)</h3>
              <p className="text-foreground/80">
                Burn tokens forever. 90% to dead wallet (11111111111111111111111111111111). 10% to treasury. Every burn
                = scarcity.
              </p>
            </Card>

            <Card className="rusty-card p-6">
              <h3 className="text-xl font-bold text-rust-orange mb-2">DAO Governance (Realms)</h3>
              <p className="text-foreground/80">
                $DATX holders vote on RaidX rules, lore, burns, and chaos. Your stake = your voice. No CEO. No board.
                Pure democracy.
              </p>
            </Card>
          </div>
        </section>

        {/* Social & Links */}
        <section className="text-center space-y-6 max-w-2xl mx-auto pb-12">
          <Card className="rusty-card p-8 space-y-4">
            <h2 className="text-3xl font-bold text-dirty-yellow glitch-text">Join The Sewer</h2>
            <p className="text-foreground/80">
              The shitty world ends where DatXit begins. Flush politics. Burn supply. Meme your way to the exit.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              <Button className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold" size="lg" asChild>
                <a href="https://t.me/datxit" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </Button>
              <Button className="bg-rust-orange hover:bg-rust-orange/80 text-black font-bold" size="lg" asChild>
                <a href="https://x.com/DatXitSewer" target="_blank" rel="noopener noreferrer">
                  Twitter/X
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-dirty-yellow text-dirty-yellow font-bold bg-transparent"
                size="lg"
                asChild
              >
                <Link href="/brand">Brand Kit</Link>
              </Button>
              <Button
                variant="outline"
                className="border-dirty-yellow text-dirty-yellow font-bold bg-transparent"
                size="lg"
                asChild
              >
                <Link href="/tokenomics">Tokenomics</Link>
              </Button>
            </div>

            <div className="pt-4 border-t border-sewer-brown">
              <p className="text-sm text-foreground/60 font-mono flex items-center justify-center gap-2">
                <img src="/images/Toilet.png" alt="Toilet" className="w-6 h-6" />
                <img src="/images/custom2.png" alt="Poop" className="w-6 h-6" />
                #DatXitToTheSewer
                <img src="/images/custom2.png" alt="Poop" className="w-6 h-6" />
                <img src="/images/Toilet.png" alt="Toilet" className="w-6 h-6" />
              </p>
            </div>
          </Card>
        </section>
      </div>

      {/* El Shito sighting polaroid in bottom-right corner */}
      <ElShitoPolaroid
        imageUrl="/images/image-2025-12-21t16-46-53-785z.png"
        caption="NYC Times Square – He was here"
        position="bottom-right"
        rotation={Math.random() * 20 - 10}
        opacity={0.4}
      />
    </div>
  )
}

export default PageClient
export { PageClient }
