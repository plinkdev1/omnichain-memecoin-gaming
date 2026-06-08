"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-sewer-brown bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[...Array(7)].map((_, i) => (
              <img key={`logo-${i}`} src="/images/datxit-logo.png" alt="" className="w-8 h-8 object-contain" />
            ))}
            <img
              src="/icons/Toilet.png"
              alt="The one true throne of the sewer"
              className="w-8 h-8 toilet-icon hover:scale-125 transition-transform"
            />
            {[...Array(6)].map((_, i) => (
              <img key={`logo2-${i}`} src="/images/datxit-logo.png" alt="" className="w-8 h-8 object-contain" />
            ))}
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <p className="text-lg font-bold text-toxic-green font-mono">The shitty world ends where DatXit begins.</p>
            <p className="text-foreground/90 font-mono">Flush it. Burn it. Meme it.</p>
            <p className="text-xl font-bold text-dirty-yellow">#DatXitToTheSewer</p>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[...Array(7)].map((_, i) => (
              <img key={`logo3-${i}`} src="/images/datxit-logo.png" alt="" className="w-8 h-8 object-contain" />
            ))}
            <img
              src="/icons/Toilet.png"
              alt="The one true throne of the sewer"
              className="w-8 h-8 toilet-icon hover:scale-125 transition-transform"
            />
            {[...Array(6)].map((_, i) => (
              <img key={`logo4-${i}`} src="/images/datxit-logo.png" alt="" className="w-8 h-8 object-contain" />
            ))}
          </div>

          <div className="pt-4 border-t border-sewer-brown/30 flex items-center justify-center gap-4 flex-wrap text-xs font-mono">
            <Link href="/disclaimer" className="text-pink-400/70 hover:text-pink-300 transition-colors underline">
              Disclaimer
            </Link>
            <span className="text-sewer-brown/50">•</span>
            <Link href="/terms" className="text-pink-400/70 hover:text-pink-300 transition-colors underline">
              Community Guidelines
            </Link>
            <span className="text-sewer-brown/50">•</span>
            <Link href="/cookie-policy" className="text-pink-400/70 hover:text-pink-300 transition-colors underline">
              Cookie Policy
            </Link>
          </div>

          <div className="pt-4 border-t border-sewer-brown/30 text-xs text-muted-foreground font-mono">
            <p>© 2025 DatXit - The Shittiest Token on Solana</p>
            <p className="text-rust-orange mt-1 flex items-center justify-center gap-2">
              <img src="/images/warning.png" alt="warning" className="w-4 h-4" />
              Meme coins are risky. 99% go to zero. DYOR.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
