"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the banner
    const cookieConsent = localStorage.getItem("datxit-cookie-consent")
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("datxit-cookie-consent", "accepted")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 md:top-0 z-40 p-4 md:p-6"
      style={{
        background: "rgba(20, 10, 10, 0.95)",
        borderTop: "2px solid rgba(255, 20, 147, 0.6)",
        borderBottom: "2px solid rgba(255, 20, 147, 0.6)",
        boxShadow: "0 0 30px rgba(139, 69, 19, 0.4), 0 0 60px rgba(255, 20, 147, 0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p
              className="text-sm md:text-base font-mono text-pink-300/90 leading-relaxed"
              style={{
                textShadow: "0 0 10px rgba(255, 20, 147, 0.3)",
              }}
            >
              We use minimal cookies & localStorage for wallet cache and theme. No tracking. No ads. Everything is shit
              anyway.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 items-center w-full md:w-auto">
            <button
              onClick={handleDismiss}
              className="flex-1 md:flex-none px-6 py-2 rounded font-mono font-bold text-sm bg-pink-600/70 hover:bg-pink-500/80 transition-all border border-pink-400/50 text-pink-100 whitespace-nowrap"
              style={{
                boxShadow: "0 0 10px rgba(255, 20, 147, 0.5)",
              }}
            >
              Got it
            </button>
            <Link
              href="/cookie-policy"
              onClick={handleDismiss}
              className="flex-1 md:flex-none px-6 py-2 rounded font-mono font-bold text-sm bg-sewer-brown/50 hover:bg-sewer-brown/70 transition-all border border-sewer-brown/60 text-pink-300/80 whitespace-nowrap text-center"
              style={{
                boxShadow: "0 0 8px rgba(139, 69, 19, 0.4)",
              }}
            >
              More info
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
