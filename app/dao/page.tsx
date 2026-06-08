import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DAOPage() {
  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/images/image-2025-12-21t21-11-53-479z.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow glitch-text font-mono">SHIT DAO</h1>
          <p className="text-xl text-rust-orange font-semibold italic">Community Governance. Pure Degen Democracy.</p>
          <p className="text-foreground/90 leading-relaxed">
            Hold $DATX tokens. Vote on burns, lore, contests, and chaos. No CEO. No board. Just degens deciding the
            future of the sewer.
          </p>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto space-y-6">
          <Card className="p-8 bg-sewer-green border-sewer-brown">
            <h2 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">How SHIT DAO Works</h2>
            <div className="space-y-4 text-foreground/90">
              <p className="leading-relaxed">
                Every $DATX token is your voice. Hold tokens, connect your Solana wallet to Realms, and vote on
                governance proposals. Weekly burns, RaidX rules, lore additions – the community decides.
              </p>
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="bg-sewer-brown/30 p-4 rounded">
                  <p className="font-bold text-toxic-green mb-2">1. Vote</p>
                  <p className="text-sm">Cast your votes on Realms governance platform</p>
                </div>
                <div className="bg-sewer-brown/30 p-4 rounded">
                  <p className="font-bold text-toxic-green mb-2">2. Shape</p>
                  <p className="text-sm">Influence the future of $DATX and the sewer</p>
                </div>
                <div className="bg-sewer-brown/30 p-4 rounded">
                  <p className="font-bold text-toxic-green mb-2">3. Rule</p>
                  <p className="text-sm">Become part of the Council through voting weight</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Active Proposals */}
        <section className="max-w-4xl mx-auto space-y-6">
          <Card className="p-8 bg-sewer-green border-sewer-brown">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-dirty-yellow mb-2 glitch-text">Active Proposals</h2>
              <p className="text-sm text-foreground/70">
                Powered by Realms.today - Solana's premier DAO governance platform
              </p>
            </div>

            <div className="w-full bg-sewer-green/20 p-8 rounded-lg border-2 border-sewer-brown text-center space-y-4">
              <p className="text-foreground/70 font-mono">Vote on active proposals on Realms</p>
              <Button className="bg-rust-orange hover:bg-dirty-yellow text-black font-bold" asChild>
                <a href="https://app.realms.today/dao/DATX" target="_blank" rel="noopener noreferrer">
                  Open Realms DAO →
                </a>
              </Button>
            </div>

            <div className="mt-4 p-4 bg-sewer-brown/30 rounded border border-rust-orange">
              <p className="text-xs text-foreground/80 mb-2">
                <strong>Can't see proposals?</strong> The Realms dashboard requires a connected Solana wallet. Use
                Phantom or Solflare.
              </p>
            </div>
          </Card>
        </section>

        {/* Governance Structure */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center text-dirty-yellow glitch-text">The Council Structure</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-sewer-green border-sewer-brown">
              <h3 className="text-xl font-bold text-toxic-green mb-3">Top Burners (Council Members)</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Holders who burn the most tokens get special voting weight and Council badges. Your sacrifice = your
                influence.
              </p>
            </Card>

            <Card className="p-6 bg-sewer-green border-sewer-brown">
              <h3 className="text-xl font-bold text-toxic-green mb-3">RaidX Winners</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Contest champions earn governance badges. Degens who win meme battles get a voice in the sewer's future.
              </p>
            </Card>

            <Card className="p-6 bg-sewer-green border-sewer-brown">
              <h3 className="text-xl font-bold text-toxic-green mb-3">Public Rooster Contributors</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Most active submitters and spotters get contributor status. Your El Shito sightings matter – vote on
                lore.
              </p>
            </Card>

            <Card className="p-6 bg-sewer-green border-sewer-brown">
              <h3 className="text-xl font-bold text-toxic-green mb-3">The Shit High Council</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                The top voices from each category form the inner circle. They guide governance but answer to community
                votes.
              </p>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center max-w-2xl mx-auto">
          <Card className="p-8 bg-rust-orange/20 border-rust-orange border-2">
            <h2 className="text-3xl font-bold text-rust-orange mb-4">Ready to Govern?</h2>
            <p className="text-foreground/90 mb-6 leading-relaxed">
              Get $DATX tokens, connect your wallet to Realms, and start voting. Your voice shapes the sewer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-sewer-brown hover:bg-rust-orange text-foreground font-bold text-lg px-8 py-6"
                asChild
              >
                <a href="https://app.realms.today/dao/DATX" target="_blank" rel="noopener noreferrer">
                  Join on Realms
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-rust-orange text-rust-orange font-bold text-lg px-8 py-6 bg-transparent"
                asChild
              >
                <a href="https://t.me/datxit" target="_blank" rel="noopener noreferrer">
                  Ask in Telegram
                </a>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
