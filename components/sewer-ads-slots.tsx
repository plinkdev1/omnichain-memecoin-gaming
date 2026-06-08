"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AdSlot, type AdConfig } from "@/components/ad-slot"

interface SewerAdsSlotsProps {
  pageContext: string
  slot1?: AdConfig
  slot2?: AdConfig
  slot3?: AdConfig
}

export function SewerAdsSlots({ pageContext, slot1, slot2, slot3 }: SewerAdsSlotsProps) {
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0)

  const slots = [slot1, slot2, slot3]

  const nextSlot = () => {
    setCurrentSlotIndex((prev) => (prev + 1) % slots.length)
  }

  const prevSlot = () => {
    setCurrentSlotIndex((prev) => (prev - 1 + slots.length) % slots.length)
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
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-toxic-green font-mono mb-2 glitch-text">
            Get Tagged – {pageContext}
          </h2>
          <p className="text-foreground/70 font-mono">Advertise in the Sewer. Reach the degens.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <AdSlot slotNumber={1} pageContext={pageContext} adConfig={slot1} isHighlighted={currentSlotIndex === 0} />
          <AdSlot slotNumber={2} pageContext={pageContext} adConfig={slot2} isHighlighted={currentSlotIndex === 1} />
          <AdSlot slotNumber={3} pageContext={pageContext} adConfig={slot3} isHighlighted={currentSlotIndex === 2} />
        </div>

        {/* Mobile Carousel Controls */}
        <div className="flex md:hidden justify-center gap-4 mb-8">
          <button
            onClick={prevSlot}
            className="px-4 py-2 bg-sewer-brown hover:bg-rust-orange text-foreground font-mono font-bold rounded transition-colors"
          >
            ← Prev
          </button>
          <span className="px-4 py-2 bg-sewer-brown/50 text-foreground/70 font-mono text-sm rounded">
            {currentSlotIndex + 1} / 3
          </span>
          <button
            onClick={nextSlot}
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
