"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has accepted disclaimer
    const hasAccepted = localStorage.getItem("datxit-disclaimer-accepted")
    const acceptanceTime = localStorage.getItem("datxit-disclaimer-timestamp")

    // If accepted, check if 90 days have passed (90 days in milliseconds)
    const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000
    if (hasAccepted && acceptanceTime) {
      const timeSinceAcceptance = Date.now() - Number.parseInt(acceptanceTime)
      if (timeSinceAcceptance < NINETY_DAYS) {
        setIsLoading(false)
        return
      }
    }

    // Show modal if not accepted or 90 days have passed
    setIsOpen(true)
    setIsLoading(false)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("datxit-disclaimer-accepted", "true")
    localStorage.setItem("datxit-disclaimer-timestamp", Date.now().toString())
    setIsOpen(false)
  }

  const handleLeave = () => {
    // Redirect to Google
    window.location.href = "https://www.google.com"
  }

  if (isLoading) return null

  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-start justify-center p-4 pt-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.95)), url('/backgrounds/wallpaper-01-sewer-network.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[80vh] rounded-lg overflow-y-auto border-2 border-pink-500/60 backdrop-blur-sm flex flex-col"
        style={{
          background: "rgba(20, 10, 10, 0.95)",
          boxShadow: "0 0 40px rgba(255, 20, 147, 0.6), inset 0 0 20px rgba(139, 69, 19, 0.3)",
        }}
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-pink-500/30 bg-black/40">
          <h1
            className="text-3xl md:text-4xl font-bold font-mono text-pink-400 text-center"
            style={{
              textShadow: "0 0 20px #FF1493",
            }}
          >
            Welcome to the Sewer
          </h1>
          <p className="text-center text-pink-300/70 font-mono mt-2">Read This First</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 font-mono text-pink-100/90 text-sm md:text-base leading-relaxed">
          {/* Nature of project */}
          <div>
            <h2 className="text-xl font-bold text-pink-400 mb-3" style={{ textShadow: "0 0 10px #FF1493" }}>
              What is DatXit?
            </h2>
            <p className="text-pink-200/80">
              $DATX and the El Shito lore are a <span className="text-pink-300 font-bold">satirical meme project</span>{" "}
              and cultural commentary on societal absurdity. The content is intended purely as dark humor, creative
              expression, and entertainment.
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded border border-pink-500/30">
            <h2 className="text-lg font-bold text-pink-300 mb-2">Financial Disclaimer:</h2>
            <p className="text-pink-200/80 text-sm">
              $DATX is a memecoin with NO profit promises or financial returns. This is NOT investment advice. Do not
              invest money you cannot afford to lose.
            </p>
          </div>

          {/* What we DO NOT tolerate */}
          <div>
            <h2 className="text-xl font-bold text-pink-400 mb-3" style={{ textShadow: "0 0 10px #FF1493" }}>
              We Explicitly DO NOT Endorse:
            </h2>
            <ul className="space-y-2 text-pink-200/80">
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold flex-shrink-0">•</span>
                <span>Hate speech, discrimination, or bigotry of any kind</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold flex-shrink-0">•</span>
                <span>Sexual content, pedophilia, or exploitation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold flex-shrink-0">•</span>
                <span>Violence, threats, harassment, or criminal activity</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold flex-shrink-0">•</span>
                <span>Any illegal or platform-violating behavior</span>
              </li>
            </ul>
          </div>

          {/* Liability */}
          <div className="p-4 rounded bg-black/40 border border-pink-500/30">
            <p className="text-pink-300 font-bold mb-2">Liability Shift:</p>
            <p className="text-pink-200/80">
              The project, creators, and official channels bear <span className="font-bold">NO responsibility</span> for
              third-party actions, statements, or misuse. Anyone claiming affiliation while doing illegal/harmful things
              acts entirely on their own and does <span className="font-bold">NOT represent</span> the project.
            </p>
          </div>

          <div className="p-4 rounded bg-black/40 border border-pink-500/30">
            <p className="text-pink-300 font-bold mb-2">Law Enforcement:</p>
            <p className="text-pink-200/80">
              Illegal activity is reported to authorities. We cooperate fully with law enforcement investigations.
            </p>
          </div>

          {/* User agreement */}
          <div className="p-4 rounded bg-black/40 border border-pink-500/30">
            <p className="text-pink-300 font-bold mb-2">Your Agreement:</p>
            <p className="text-pink-200/80">
              By clicking "I Understand & Accept," you agree to comply with all terms. Participation is legal and
              ethical only. Read the full{" "}
              <Link href="/disclaimer" className="text-pink-400 font-bold hover:text-pink-300 underline">
                Disclaimer
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-pink-400 font-bold hover:text-pink-300 underline">
                Community Guidelines
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="p-6 md:p-8 border-t border-pink-500/30 bg-black/40 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto px-8 py-3 rounded font-bold font-mono bg-green-600/80 hover:bg-green-600 text-white transition-all border border-green-500/60"
            style={{
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
            }}
          >
            I Understand & Accept
          </button>

          <button
            onClick={handleLeave}
            className="w-full sm:w-auto px-8 py-3 rounded font-bold font-mono bg-red-900/60 hover:bg-red-900 text-red-100 transition-all border border-red-700/60"
            style={{
              boxShadow: "0 0 15px rgba(153, 27, 27, 0.5)",
            }}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisclaimerModal
