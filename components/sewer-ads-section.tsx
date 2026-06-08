"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SewerAdsSection() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  const ads = [
    {
      id: 1,
      title: "Reserve Hole Insurance",
      tagline: "Your tokens. Their eternal home.",
      description: "Guarantee your $DATX burns forever – insure against HODL regret.",
    },
    {
      id: 2,
      title: "Plunger Pro™",
      tagline: "Flush with confidence.",
      description: "Premium sewer tools for maximum token obliteration. Patent pending.",
    },
    {
      id: 3,
      title: "Sewer Map NFTs",
      tagline: "Own the underground.",
      description: "Limited collectibles marking El Shito sighting coordinates worldwide.",
    },
  ]

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % ads.length)
  }

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + ads.length) % ads.length)
  }

  return (
    <section className="relative py-12 px-4 my-12 border-y-2 border-sewer-brown/50">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-sewer-brown/30 via-transparent to-sewer-brown/30" />
        {/* Dripping effect */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`drip-${i}`}
            className="absolute w-0.5 h-12 bg-gradient-to-b from-sewer-brown/60 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `drip ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Toilet paper banner top */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-dirty-yellow/40 to-transparent flex items-center justify-center space-x-8 opacity-60">
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-toxic-green font-mono mb-2 glitch-text">
            Get Tagged – Sewer Ads
          </h2>
          <p className="text-foreground/70 font-mono">Advertise in the Sewer. Reach the degens.</p>
        </div>

        {/* Ads Carousel / Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                index === currentAdIndex
                  ? "border-toxic-green bg-sewer-brown/40 scale-105"
                  : "border-sewer-brown/50 bg-sewer-brown/20"
              }`}
              style={{
                boxShadow:
                  index === currentAdIndex
                    ? "0 0 30px rgba(127, 255, 0, 0.3), inset 0 0 15px rgba(92, 51, 23, 0.3)"
                    : "none",
              }}
            >
              {/* Ad Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-rust-orange/30 border border-rust-orange text-rust-orange text-xs font-mono rounded">
                  COMING SOON – ADVERTISE IN THE SEWER
                </span>
              </div>

              {/* Ad Content */}
              <h3 className="text-xl font-bold text-dirty-yellow mb-2 font-mono">{ad.title}</h3>
              <p className="text-sm text-toxic-green italic mb-2">{ad.tagline}</p>
              <p className="text-foreground/80 text-sm leading-relaxed mb-4">{ad.description}</p>

              {/* Placeholder dimensions */}
              <div className="bg-black/40 border border-dashed border-sewer-brown/50 rounded p-4 text-center text-xs text-foreground/50 font-mono">
                300x250 or 728x90 banner
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Controls */}
        <div className="flex md:hidden justify-center gap-4 mb-8">
          <button
            onClick={prevAd}
            className="px-4 py-2 bg-sewer-brown hover:bg-rust-orange text-foreground font-mono font-bold rounded transition-colors"
          >
            ← Prev
          </button>
          <span className="px-4 py-2 bg-sewer-brown/50 text-foreground/70 font-mono text-sm rounded">
            {currentAdIndex + 1} / {ads.length}
          </span>
          <button
            onClick={nextAd}
            className="px-4 py-2 bg-sewer-brown hover:bg-rust-orange text-foreground font-mono font-bold rounded transition-colors"
          >
            Next →
          </button>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-lg px-8 py-6 font-mono glitch-text"
            asChild
          >
            <Link href="/feedback?category=Advertising/Partnership">Get Tagged – Contact Us for Advertising →</Link>
          </Button>
          <p className="text-xs text-foreground/50 mt-4 font-mono">
            For sponsorship & partnership inquiries, select "Advertising/Partnership" in the feedback form.
          </p>
        </div>
      </div>

      {/* Toilet paper banner bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-dirty-yellow/40 to-transparent flex items-center justify-center space-x-8 opacity-60">
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
        <span className="text-2xl">🧻</span>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 right-4 text-foreground/20 text-xs font-mono opacity-30 pointer-events-none">
        © DatXit Sewer Network
      </div>
    </section>
  )
}

export default SewerAdsSection
