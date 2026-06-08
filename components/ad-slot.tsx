"use client"

import Link from "next/link"

interface AdConfig {
  title: string
  tagline: string
  description: string
  imageUrl?: string
  linkUrl?: string
  cta?: string
}

interface AdSlotProps {
  slotNumber: 1 | 2 | 3
  pageContext: string
  adConfig?: AdConfig
  isHighlighted?: boolean
}

export function AdSlot({ slotNumber, pageContext, adConfig, isHighlighted }: AdSlotProps) {
  const defaultConfigs: Record<number, AdConfig> = {
    1: {
      title: `Slot ${slotNumber} – ${pageContext} Partners`,
      tagline: "Featured partnership opportunity",
      description: "Contact us for partnership and advertising opportunities in this slot.",
      linkUrl: "/feedback?category=Advertising/Partnership",
      cta: "Learn More →",
    },
    2: {
      title: `Slot ${slotNumber} – ${pageContext} Allies`,
      tagline: "Strategic brand placement",
      description: "Your brand here. Customize this slot with your own image, link, and messaging.",
      linkUrl: "/feedback?category=Advertising/Partnership",
      cta: "Partner With Us →",
    },
    3: {
      title: `Slot ${slotNumber} – ${pageContext} Friends`,
      tagline: "Community spotlight",
      description: "Support the sewer ecosystem by becoming a featured advertiser.",
      linkUrl: "/feedback?category=Advertising/Partnership",
      cta: "Get Tagged →",
    },
  }

  const config = adConfig || defaultConfigs[slotNumber]

  return (
    <div
      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
        isHighlighted ? "border-toxic-green bg-sewer-brown/40 scale-105" : "border-sewer-brown/50 bg-sewer-brown/20"
      }`}
      style={{
        boxShadow: isHighlighted ? "0 0 30px rgba(127, 255, 0, 0.3), inset 0 0 15px rgba(92, 51, 23, 0.3)" : "none",
      }}
    >
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-rust-orange/30 border border-rust-orange text-rust-orange text-xs font-mono rounded">
          SLOT {slotNumber} – {pageContext.toUpperCase()}
        </span>
      </div>

      {/* Ad content */}
      <h3 className="text-xl font-bold text-dirty-yellow mb-2 font-mono">{config.title}</h3>
      <p className="text-sm text-toxic-green italic mb-2">{config.tagline}</p>
      <p className="text-foreground/80 text-sm leading-relaxed mb-4">{config.description}</p>

      {/* Image placeholder or actual image */}
      {config.imageUrl ? (
        <img
          src={config.imageUrl || "/placeholder.svg"}
          alt={config.title}
          className="w-full h-48 object-cover rounded mb-4 border border-sewer-brown/30"
        />
      ) : (
        <div className="bg-black/40 border border-dashed border-sewer-brown/50 rounded p-4 text-center text-xs text-foreground/50 font-mono mb-4">
          300x250 or 728x90 banner placeholder
        </div>
      )}

      {/* CTA Link */}
      {config.linkUrl && (
        <Link
          href={config.linkUrl}
          className="inline-block px-4 py-2 bg-toxic-green hover:bg-toxic-green/80 text-black font-mono font-bold rounded transition-colors text-sm"
        >
          {config.cta || "Learn More →"}
        </Link>
      )}
    </div>
  )
}
