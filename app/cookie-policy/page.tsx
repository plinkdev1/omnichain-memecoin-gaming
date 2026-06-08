"use client"

import Link from "next/link"

export default function CookiePolicyPage() {
  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/backgrounds/wallpaper-01-sewer-network.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-12 md:py-20 px-4">
          <h1
            className="text-5xl md:text-6xl font-bold font-mono mb-4 text-pink-400"
            style={{
              textShadow: "0 0 20px #FF1493, 0 0 40px #8B4513",
            }}
          >
            Cookie Policy
          </h1>
          <p
            className="text-2xl font-mono text-pink-300/80"
            style={{
              textShadow: "0 0 10px #FF1493",
            }}
          >
            The Shittiest One
          </p>
        </div>

        {/* Content Card */}
        <div className="max-w-3xl mx-auto px-4 pb-20">
          <div
            className="rounded-lg p-8 md:p-12 border-2 border-pink-500/60 backdrop-blur-sm"
            style={{
              background: "rgba(20, 10, 10, 0.85)",
              boxShadow: "0 0 20px rgba(255, 20, 147, 0.5), inset 0 0 10px rgba(139, 69, 19, 0.3)",
            }}
          >
            <div className="space-y-8 font-mono text-pink-100/90 leading-relaxed">
              {/* Main content */}
              <div>
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  DatXit uses almost no cookies.
                </h2>
                <div className="space-y-4 text-base md:text-lg">
                  <div>
                    <h3 className="text-pink-300 font-bold mb-2">localStorage:</h3>
                    <p className="text-pink-200/80">Wallet connection cache, dark mode preference.</p>
                  </div>

                  <div>
                    <h3 className="text-pink-300 font-bold mb-2">Vercel Analytics:</h3>
                    <p className="text-pink-200/80">Anonymous visits (first-party, no personal data).</p>
                  </div>

                  <div className="pt-4 border-t border-pink-500/30">
                    <p className="text-pink-200/80">
                      No third-party trackers. No ads. No selling data. We respect your privacy more than the system
                      respects you.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div
                className="p-4 md:p-6 rounded border border-pink-500/40 bg-black/40"
                style={{
                  boxShadow: "inset 0 0 10px rgba(255, 20, 147, 0.1)",
                }}
              >
                <p className="text-pink-300 mb-4">Questions? Flush them to feedback.</p>
                <Link
                  href="/feedback"
                  className="inline-block px-6 py-2 rounded font-bold text-sm bg-pink-600/70 hover:bg-pink-500/80 transition-all border border-pink-400/50 text-pink-100"
                  style={{
                    boxShadow: "0 0 10px rgba(255, 20, 147, 0.5)",
                  }}
                >
                  Send Feedback
                </Link>
              </div>

              {/* Footer note */}
              <div className="text-center text-xs text-pink-300/60 pt-4">
                <p>Last updated: December 2024</p>
                <p className="mt-2">This policy is part of the DatXit sewer ecosystem.</p>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-2 rounded font-mono font-bold text-sm bg-sewer-brown/50 hover:bg-sewer-brown/70 transition-all border border-sewer-brown/60 text-pink-300/80"
              style={{
                boxShadow: "0 0 8px rgba(139, 69, 19, 0.4)",
              }}
            >
              Back to Sewer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
