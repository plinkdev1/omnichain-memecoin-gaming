"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, Copy } from "lucide-react"
import Image from "next/image"

export default function BrandPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const canonicalPrompt = `A glossy brown swirling poop emoji character with a black bandana mask covering the eyes (Zorro-style with white eye slits and small black pupils), wearing a tattered white toilet paper cape flowing behind, holding a brown spray paint can in one hand and/or a toilet plunger like a sword in the other. Expression is sarcastic, mischievous, and defiant – never cute. Background should be gritty urban scenes (protests, subways, corporate buildings, government facilities). Include rats, manure piles, or smog for extra satire. Tag "DatXit" graffiti visible somewhere in the scene. Style: Simpsons cartoon OR realistic graffiti art OR Banksy stencil aesthetic.`

  const colors = [
    { name: "Sewer Brown", hex: "#5C3317", rgb: "92, 51, 23" },
    { name: "Toxic Green", hex: "#2E4B2E", rgb: "46, 75, 46" },
    { name: "Rust Orange", hex: "#B8860B", rgb: "184, 134, 11" },
    { name: "Dirty Yellow", hex: "#D4AF37", rgb: "212, 175, 55" },
    { name: "Sludge Gray", hex: "#3D3D3D", rgb: "61, 61, 61" },
  ]

  const textAssets = {
    telegram:
      "DatXit – The Shittiest Token on Solana. Born Dec 21, 2025. No moon, just sewer. Flush politics, burn supply, meme your way to the Reserve Hole. 💩🚽 #DatXitToTheSewer",
    twitter:
      "💩 $DATX | The Shittiest Token on Solana | Deflation via Reserve Hole | El Shito vigilante lore | RaidX contests | Everything is shit. We're the exit. 🚽 | CA: [PENDING]",
    medium:
      "DatXit ($DATX) is a Solana-based meme revolution embracing sarcasm, deflation, and free speech. Join the sewer.",
    universalTag: `The shitty world ends where DatXit begins.

Flush it. Burn it. Meme it.

#DatXitToTheSewer`,
  }

  const dos = [
    "Use the canonical prompt for El Shito generations",
    "Keep colors within the official palette",
    "Tag #DatXitToTheSewer and #ElShitoWasHere",
    "Embrace dark humor and sarcasm",
    "Reference lore: Reserve Hole, RaidX, Shit High Council",
    "Add 'Human made AI edited' when applicable",
  ]

  const donts = [
    "Never use hopeful/positive messaging (no 'moon', no 'we're gonna make it')",
    "Don't make El Shito cute or innocent",
    "No financial advice or price predictions",
    "Don't deviate from core visual canon (mask, cape, tools)",
    "Avoid corporate/professional aesthetics",
    "Never promote hate, violence, or illegal activity",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sewer-brown/20 to-transparent"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-8">
            <img src="/images/officiallogo.png" alt="official logo" className="w-40 h-40 block mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4 text-dirty-yellow glitch-text">DatXit Brand Guidelines</h1>
            <p className="text-xl text-foreground/80 font-mono">
              Everything you need to spread the shittiest revolution
            </p>
            <p className="text-sm text-toxic-green mt-2">Human made. AI edited. Degen approved.</p>
          </div>
        </div>
      </section>

      {/* Canonical Prompt */}
      <section className="py-12 px-4 bg-sewer-brown/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-rust-orange">Official El Shito Canonical Prompt</h2>
          <p className="text-foreground/80 mb-4">
            Use this exact prompt for AI-generated El Shito sightings. Copy, paste, add context.
          </p>
          <div className="relative rusty-card p-6 rounded-lg border-2 border-sewer-brown">
            <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-mono leading-relaxed">
              {canonicalPrompt}
            </pre>
            <Button
              onClick={() => copyToClipboard(canonicalPrompt, "prompt")}
              className="absolute top-4 right-4 bg-sewer-brown hover:bg-rust-orange"
              size="sm"
            >
              {copiedSection === "prompt" ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-foreground/60 mt-3 italic">
            Tip: Add specific locations/events after the prompt for custom sightings
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-rust-orange">Official Color Palette</h2>
          <p className="text-foreground/80 mb-6">Stick to these shitty colors for brand cohesion.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div key={color.hex} className="rusty-card p-6 rounded-lg border-2 border-sewer-brown">
                <div
                  className="w-full h-32 rounded-lg mb-4 border-2 border-foreground/20 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <h3 className="text-xl font-bold mb-2">{color.name}</h3>
                <p className="text-sm text-foreground/70 font-mono">HEX: {color.hex}</p>
                <p className="text-sm text-foreground/70 font-mono">RGB: {color.rgb}</p>
                <Button
                  onClick={() => copyToClipboard(color.hex, color.hex)}
                  className="mt-3 w-full bg-sewer-brown hover:bg-rust-orange text-xs"
                  size="sm"
                >
                  {copiedSection === color.hex ? "Copied!" : "Copy HEX"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Assets */}
      <section className="py-12 px-4 bg-sewer-brown/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-rust-orange">Official Text Assets</h2>
          <p className="text-foreground/80 mb-6">
            Pre-written bios and tags for social media. Copy and deploy across platforms.
          </p>

          <div className="space-y-6">
            {/* Telegram Bio */}
            <div className="rusty-card p-6 rounded-lg border-2 border-sewer-brown">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-toxic-green">Telegram Bio</h3>
                <Button
                  onClick={() => copyToClipboard(textAssets.telegram, "telegram")}
                  className="bg-sewer-brown hover:bg-rust-orange"
                  size="sm"
                >
                  {copiedSection === "telegram" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-foreground/80 font-mono">
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline mx-1" />
                DatXit – The Shittiest Token on Solana. Born Dec 21, 2025. No moon, just sewer. Flush politics, burn
                supply, meme your way to the Reserve Hole.
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline mx-1" />
                #DatXitToTheSewer
              </p>
            </div>

            {/* Twitter/X Bio */}
            <div className="rusty-card p-6 rounded-lg border-2 border-sewer-brown">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-toxic-green">Twitter/X Bio</h3>
                <Button
                  onClick={() => copyToClipboard(textAssets.twitter, "twitter")}
                  className="bg-sewer-brown hover:bg-rust-orange"
                  size="sm"
                >
                  {copiedSection === "twitter" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-foreground/80 font-mono">
                <img src="/images/custom3.png" alt="custom3" className="w-5 h-5 inline mx-1" />
                $DATX | The Shittiest Token on Solana | Deflation via Reserve Hole | El Shito vigilante lore | RaidX
                contests | Everything is shit. We're the exit.
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline mx-1" />| CA: [PENDING]
              </p>
            </div>

            {/* Medium/Blog */}
            <div className="rusty-card p-6 rounded-lg border-2 border-sewer-brown">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-toxic-green">Medium / Blog Tagline</h3>
                <Button
                  onClick={() => copyToClipboard(textAssets.medium, "medium")}
                  className="bg-sewer-brown hover:bg-rust-orange"
                  size="sm"
                >
                  {copiedSection === "medium" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-foreground/80 font-mono">{textAssets.medium}</p>
            </div>

            {/* Universal End Tag */}
            <div className="rusty-card p-6 rounded-lg border-2 border-rust-orange">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-rust-orange">Universal End Tag</h3>
                <Button
                  onClick={() => copyToClipboard(textAssets.universalTag, "universal")}
                  className="bg-sewer-brown hover:bg-rust-orange"
                  size="sm"
                >
                  {copiedSection === "universal" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src="/images/custom3.png" alt="custom3" className="w-5 h-5 inline" />
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline" />
                <img src="/images/custom3.png" alt="custom3" className="w-5 h-5 inline" />
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline" />
                <img src="/images/custom3.png" alt="custom3" className="w-5 h-5 inline" />
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline" />
              </div>
              <p className="text-sm text-foreground/80 font-mono text-center">{textAssets.universalTag}</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <img src="/images/custom3.png" alt="custom3" className="w-5 h-5 inline" />
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline" />
                <img src="/images/custom3.png" alt="custom3" className="w-5 h-5 inline" />
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline" />
                <img src="/images/custom3.png" alt="custom3" className="w-5 h-5 inline" />
                <img src="/images/toilet.png" alt="toilet" className="w-5 h-5 inline" />
              </div>
              <p className="text-xs text-foreground/60 mt-3 italic text-center">
                Use this to end every major announcement, thread, or campaign
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Downloads */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-rust-orange">Logo & Assets</h2>
          <p className="text-foreground/80 mb-6">Download official logos and graphics for your content.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Realistic Poop Logo */}
            <div className="rusty-card p-6 rounded-lg border-2 border-sewer-brown text-center">
              <div className="bg-white/10 p-8 rounded-lg mb-4 border border-foreground/20">
                <img src="/images/officiallogo.png" alt="realistic logo" className="w-32 h-32 block mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Realistic Token Logo</h3>
              <p className="text-sm text-foreground/60 mb-4">Natural poop texture – primary brand mark</p>
              <Button className="w-full bg-sewer-brown hover:bg-rust-orange" disabled>
                Download PNG (Coming Soon)
              </Button>
            </div>

            {/* El Shito Character */}
            <div className="rusty-card p-6 rounded-lg border-2 border-sewer-brown text-center">
              <div className="bg-white/10 p-8 rounded-lg mb-4 border border-foreground/20 relative aspect-square">
                <Image
                  src="/images/image-2025-12-21t16-16-44-155z.png"
                  alt="El Shito Character"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">El Shito Character</h3>
              <p className="text-sm text-foreground/60 mb-4">Official mascot illustration</p>
              <Button className="w-full bg-sewer-brown hover:bg-rust-orange" disabled>
                Download PNG (Coming Soon)
              </Button>
            </div>

            {/* Wordmark */}
            <div className="rusty-card p-6 rounded-lg border-2 border-sewer-brown text-center">
              <div className="bg-white/10 p-8 rounded-lg mb-4 border border-foreground/20">
                <h1 className="text-6xl font-bold text-dirty-yellow font-mono">DatXit</h1>
              </div>
              <h3 className="text-xl font-bold mb-2">Wordmark</h3>
              <p className="text-sm text-foreground/60 mb-4">Official typography lockup</p>
              <Button className="w-full bg-sewer-brown hover:bg-rust-orange" disabled>
                Download SVG (Coming Soon)
              </Button>
            </div>

            {/* Full Logo */}
            <div className="rusty-card p-6 rounded-lg border-2 border-sewer-brown text-center">
              <div className="bg-white/10 p-8 rounded-lg mb-4 border border-foreground/20 flex items-center justify-center gap-3">
                <img src="/images/officiallogo.png" alt="official logo" className="w-16 h-16" />
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-dirty-yellow font-mono">DatXit</h1>
                  <p className="text-sm text-toxic-green font-mono">$DATX</p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Full Logo Lockup</h3>
              <p className="text-sm text-foreground/60 mb-4">Combined mark + wordmark</p>
              <Button className="w-full bg-sewer-brown hover:bg-rust-orange" disabled>
                Download PNG (Coming Soon)
              </Button>
            </div>
          </div>

          <p className="text-xs text-foreground/60 mt-6 text-center italic">
            Assets pending final treasury setup. Check back post-launch or request in Telegram.
          </p>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="py-12 px-4 bg-sewer-brown/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-rust-orange text-center">Do's & Don'ts</h2>
          <p className="text-foreground/80 mb-8 text-center">
            Keep the brand shitty but recognizable. Follow these loose rules.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do's */}
            <div className="rusty-card p-8 rounded-lg border-2 border-toxic-green">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-toxic-green/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-toxic-green" />
                </div>
                <h3 className="text-2xl font-bold text-toxic-green">Do This Shit</h3>
              </div>
              <ul className="space-y-3">
                {dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/80">
                    <Check className="w-6 h-6 text-toxic-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="rusty-card p-8 rounded-lg border-2 border-rust-orange">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-rust-orange/20 flex items-center justify-center">
                  <X className="w-6 h-6 text-rust-orange" />
                </div>
                <h3 className="text-2xl font-bold text-rust-orange">Don't Do This Shit</h3>
              </div>
              <ul className="space-y-3">
                {donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/80">
                    <X className="w-6 h-6 text-rust-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-dirty-yellow">Questions? Need More Assets?</h2>
          <p className="text-foreground/80 mb-6">
            Join the Telegram or tag us on X. We're building this shit together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-toxic-green hover:bg-toxic-green/80 text-white font-bold" size="lg">
              Join Telegram
            </Button>
            <Button
              variant="outline"
              className="border-2 border-rust-orange text-rust-orange hover:bg-rust-orange hover:text-white font-bold bg-transparent"
              size="lg"
            >
              Follow on X
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-sewer-brown">
            <p className="text-sm text-foreground/60 font-mono mb-3">Remember:</p>
            <p className="text-xl font-bold text-toxic-green flex items-center justify-center gap-2">
              The shitty world ends where DatXit begins.
              <img src="/images/customking.png" alt="custom king" className="w-7 h-7" />
              <img src="/images/toilet.png" alt="toilet" className="w-7 h-7" />
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
