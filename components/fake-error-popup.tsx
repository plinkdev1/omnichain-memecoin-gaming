"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

const errorMessages = [
  "Sewer Overflow 404 – Everything is shit anyway",
  "Connection lost. Blame the government.",
  "Site melting... refresh or cope",
  "Too much shit detected. Try again.",
  "Human made, AI edited, server hated",
  "Democracy crashed. Rebooting rebellion...",
  "Toilet paper roll empty. Site buffering...",
  "Reserve Hole full. Flushing database...",
  "El Shito tagged your RAM",
  "Swamp gas leak detected. Evacuate browser.",
]

export function FakeErrorPopup() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Show random error popup every 30-90 seconds
    const showPopup = () => {
      const randomDelay = Math.random() * 60000 + 30000 // 30-90 seconds
      setTimeout(() => {
        setMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)])
        setVisible(true)
        // Auto-dismiss after 5 seconds
        setTimeout(() => setVisible(false), 5000)
        showPopup() // Schedule next popup
      }, randomDelay)
    }

    showPopup()
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] animate-in slide-in-from-bottom-5">
      <div className="bg-rust-orange border-2 border-red-600 rounded-lg shadow-2xl max-w-sm p-4 relative glitch-popup">
        {/* Glitch effect overlay */}
        <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse" />

        <div className="relative z-10 flex items-start gap-3">
          <div className="flex-shrink-0">
            <img src="/images/warning.png" alt="error" className="w-6 h-6 animate-bounce" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white mb-1 text-sm">SYSTEM ERROR</h3>
            <p className="text-white/90 text-xs font-mono">{message}</p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Fake corrupted pixels */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 opacity-50" />
      </div>
    </div>
  )
}
