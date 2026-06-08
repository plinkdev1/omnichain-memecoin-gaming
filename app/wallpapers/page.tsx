"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Download, Share2 } from "lucide-react"
import Link from "next/link"

const wallpapers = [
  {
    id: 1,
    title: "Toxic Liquidity Swamp",
    description: "El Shito watches over the bubbling sludge. Stake deep or sink forever.",
    preview: "/images/image-2025-12-21t21-05-59-201z.png",
    baseFile: "wallpaper-01-sewer-swamp",
  },
  {
    id: 2,
    title: "Urban Graffiti Alley Raid",
    description: "Where El Shito tags the underground. DatXit signs glow in neon brown.",
    preview: "/images/image-2025-12-21t21-04-53-239z.png",
    baseFile: "wallpaper-02-graffiti-alley",
  },
  {
    id: 3,
    title: "Underground Sewer Network",
    description: "Deep in the pipes. Sludge drips. Democracy drowns.",
    preview: "/images/image-2025-12-21t21-04-11-291z.png",
    baseFile: "wallpaper-03-underground-sewer",
  },
  {
    id: 4,
    title: "Dystopian Shit Empire Cityscape",
    description: "The empire exposed: toilet towers, poop monuments, protestors with 61$$ signs.",
    preview: "/images/image-2025-12-21t21-11-53-479z.png",
    baseFile: "wallpaper-04-dystopian-city",
  },
  {
    id: 5,
    title: "Global Protest Manure Fields",
    description: "Tractors dump truth. El Shito leads the farmers. Europe trembles.",
    preview: "/images/image-2025-12-21t21-26-13-073z.png",
    baseFile: "wallpaper-05-protest-fields",
  },
  {
    id: 6,
    title: "Delhi-Style Smog Overload",
    description: "Breathe if you can. The air is solid shit. Welcome to modern life.",
    preview: "/images/image-2025-12-21t21-27-51-950z.png",
    baseFile: "wallpaper-06-delhi-smog",
  },
  {
    id: 7,
    title: "NYC Subway Sewer Overflow",
    description: "Rats surf the sludge. Subway cars tagged with El Shito truth.",
    preview: "/images/image-2025-12-21t21-28-25-006z.png",
    baseFile: "wallpaper-07-nyc-subway",
  },
  {
    id: 8,
    title: "Mediterranean Migrant Chaos",
    description: "Boats overflow. Yachts ignore. El Shito carves truth into the cliffside.",
    preview: "/images/image-2025-12-21t22-29-39-864z.png",
    baseFile: "wallpaper-08-migrant-coast",
  },
  {
    id: 9,
    title: "Wall Street Split",
    description: "Finance crumbles. The market drowns in its own shit. Wall Street split open.",
    preview: "/wall-street-apocalypse.jpg",
    baseFile: "wallpaper-09-wall-street-split",
  },
]

const resolutionOptions = [
  { label: "4K (3840x2160)", size: "4k", ext: "jpg" },
  { label: "2K (2560x1440)", size: "2k", ext: "jpg" },
  { label: "1080p", size: "1080p", ext: "jpg" },
  { label: "Mobile", size: "mobile", ext: "jpg" },
]

export default function WallpapersPage() {
  const [currentHero, setCurrentHero] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [availableFiles, setAvailableFiles] = useState<{ [key: number]: string[] }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % wallpapers.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const checkAvailableFiles = async () => {
      const available: { [key: number]: string[] } = {}

      for (const wallpaper of wallpapers) {
        const wallpaperAvailable: string[] = []

        for (const resolution of resolutionOptions) {
          const fileName = `${wallpaper.baseFile}-${resolution.size}.${resolution.ext}`
          const filePath = `/wallpapers/${fileName}`

          try {
            const response = await fetch(filePath, { method: "HEAD" })
            if (response.ok) {
              wallpaperAvailable.push(resolution.label)
            }
          } catch (error) {
            // File doesn't exist, skip it
          }
        }

        // If any files found for this wallpaper, mark them as available
        if (wallpaperAvailable.length > 0) {
          available[wallpaper.id] = wallpaperAvailable
        }
      }

      setAvailableFiles(available)
      setLoading(false)
    }

    checkAvailableFiles()
  }, [])

  const shareToTwitter = (wallpaper: (typeof wallpapers)[0]) => {
    const text = `Just downloaded "${wallpaper.title}" from DatXit Sewer Wallpapers 🚽💩\n\nFlush your screen. Spread the shit.\n\n#DatXitToTheSewer`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank")
  }

  const downloadAll = () => {
    alert("Bundle download coming soon. For now, click individual wallpapers.")
  }

  const getDownloadLink = (wallpaper: (typeof wallpapers)[0], resolutionLabel: string) => {
    const resolution = resolutionOptions.find((r) => r.label === resolutionLabel)
    if (!resolution) return null
    return `/wallpapers/${wallpaper.baseFile}-${resolution.size}.${resolution.ext}`
  }

  return (
    <main className="min-h-screen bg-sewer-green">
      {/* Hero Section - Rotating Preview */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden border-b-4 border-sewer-brown">
        <div className="absolute inset-0">
          <Image
            src={wallpapers[currentHero].preview || "/placeholder.svg"}
            alt={wallpapers[currentHero].title}
            fill
            className="object-cover opacity-40 transition-opacity duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sewer-brown/60 via-sewer-green/40 to-sewer-green" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="rusty-card p-8 border-4 border-rust-orange mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow mb-4 font-mono glitch-text">
              <span className="flex items-center justify-center gap-3">
                <img src="/images/Toilet.png" alt="Toilet" className="w-16 h-16 md:w-20 md:h-20" />
                Sewer Wallpapers
              </span>
            </h1>
          </div>

          <div className="rusty-card p-6 max-w-2xl mx-auto mb-8">
            <p className="text-foreground/90 leading-relaxed font-mono text-sm md:text-base">
              Free Wallpapers – Inspired by the Shittiest Revolution. El Shito-approved backgrounds for desktop and
              mobile. Download in 4K, 2K, or 1080p. Tag your screen. Raid with style.
            </p>
          </div>

          <Button
            onClick={downloadAll}
            className="bg-toxic-green hover:bg-toxic-green/80 text-black font-mono text-lg px-8 py-6 rounded-lg transition-all hover:scale-105"
          >
            <Download className="mr-2" />
            Download All 9 (4K Bundle)
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {wallpapers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHero(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentHero ? "bg-toxic-green w-8" : "bg-sewer-brown/50 hover:bg-sewer-brown"
              }`}
              aria-label={`View wallpaper ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wallpapers.map((wallpaper) => {
            const available = availableFiles[wallpaper.id] || []
            if (available.length === 0 && !loading) return null

            return (
              <Card
                key={wallpaper.id}
                className="rusty-card border-2 border-sewer-brown hover:border-toxic-green transition-all overflow-hidden group"
                onMouseEnter={() => setHoveredId(wallpaper.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={wallpaper.preview || "/placeholder.svg"}
                    alt={wallpaper.title}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      hoveredId === wallpaper.id ? "blur-0 scale-110" : "blur-sm"
                    }`}
                  />
                  {hoveredId === wallpaper.id && (
                    <div className="absolute inset-0 bg-toxic-green/20 border-4 border-toxic-green pointer-events-none" />
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-dirty-yellow mb-2 font-mono">{wallpaper.title}</h3>
                    <p className="text-sm text-foreground/80 font-mono leading-relaxed">{wallpaper.description}</p>
                  </div>

                  <div className="space-y-2">
                    {loading ? (
                      <p className="text-xs text-foreground/50 text-center py-2">Checking files...</p>
                    ) : available.length > 0 ? (
                      available.map((resolution) => (
                        <a
                          key={resolution}
                          href={getDownloadLink(wallpaper, resolution) || "#"}
                          download={`${wallpaper.baseFile}-${resolution.split(" ")[0].toLowerCase()}.jpg`}
                          className="block w-full bg-sewer-brown hover:bg-rust-orange text-foreground font-mono text-sm py-2 px-4 rounded transition-colors text-center border border-rust-orange/30 flex items-center justify-center gap-2 h-10"
                        >
                          <Download className="inline h-4 w-4" />
                          {resolution}
                        </a>
                      ))
                    ) : (
                      <p className="text-xs text-foreground/50 text-center py-2">Coming soon</p>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-toxic-green text-toxic-green hover:bg-toxic-green/20 font-mono bg-transparent flex items-center justify-center gap-2"
                    asChild
                  >
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                      <img src="/images/twitterbird.png" alt="Twitter" className="w-4 h-4" />
                      Raid with this wallpaper
                    </a>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="rusty-card p-8 max-w-3xl mx-auto border-2 border-dirty-yellow/30">
          <h2 className="text-3xl font-bold text-dirty-yellow mb-4 font-mono">Want More?</h2>
          <p className="text-foreground/90 mb-6 font-mono leading-relaxed">
            Submit wallpaper ideas to Public Rooster. Best ones become official DatXit backgrounds and earn sludge
            rewards.
          </p>
          <Button
            className="bg-toxic-green hover:bg-toxic-green/80 text-black font-mono text-lg px-8 py-4 rounded-lg transition-all hover:scale-105"
            asChild
          >
            <Link href="/rooster">
              <Share2 className="mr-2" />
              Submit to Public Rooster
            </Link>
          </Button>
        </div>

        {/* Microcopy */}
        <div className="mt-12 space-y-2">
          <p className="text-toxic-green font-mono text-sm">Flush your desktop. Tag your screen. Spread the shit.</p>
          <p className="text-foreground/60 font-mono text-xs">
            Every screen a potential DatXit billboard. The revolution backgrounds your phone.
          </p>
        </div>
      </section>
    </main>
  )
}
