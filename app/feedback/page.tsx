"use client"

import type React from "react"

import { useState } from "react"
import { submitFeedback } from "@/app/actions/feedback"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Idea",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const submissionData = {
        name: formData.name || "Anonymous",
        email: formData.email || "no-reply@sewer.local",
        category: formData.category,
        message: formData.message,
      }

      console.log("[v0] Submitting feedback:", submissionData)

      await submitFeedback(submissionData)

      setStatus("success")
      setStatusMessage("Flushed to sewer inbox! Email sent to datxitofficial@gmail.com – we'll review.")
      setFormData({ name: "", email: "", category: "Idea", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      setStatus("error")
      setStatusMessage("Flush failed – try again.")
      console.error("Feedback Error:", error)
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <div
      className="min-h-screen w-screen relative overflow-hidden"
      style={{
        backgroundImage: "url(/images/feedback-banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Fog animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sewer-brown/30 to-transparent animate-pulse" />
      </div>

      {/* Dripping particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-sewer-brown/40 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-screen flex flex-col items-center justify-start pt-24 md:pt-32 pb-12 px-4">
        {/* Header neon signs */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 text-pink-400 font-mono animate-pulse"
            style={{
              textShadow: "0 0 20px #FF1493, 0 0 40px #8B4513",
            }}
          >
            Got Ideas? Complaints? Shit to Say?
          </h1>
          <p
            className="text-2xl text-sewer-brown/80 font-mono"
            style={{
              textShadow: "0 0 15px #CD853F",
            }}
          >
            Flush it here. We read everything. 18+
          </p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-md">
          <div
            className="rounded-lg p-8 border-2 border-pink-500/60 backdrop-blur-sm"
            style={{
              background: "rgba(20, 10, 10, 0.85)",
              boxShadow: "0 0 20px rgba(255, 20, 147, 0.5), inset 0 0 10px rgba(139, 69, 19, 0.3)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-pink-300 mb-2">Name (optional)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your filthy alias"
                  className="w-full px-4 py-2 bg-black/50 border border-pink-500/40 rounded text-pink-100 placeholder-pink-700/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-pink-300 mb-2">Email (optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@sewer.local"
                  className="w-full px-4 py-2 bg-black/50 border border-pink-500/40 rounded text-pink-100 placeholder-pink-700/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-pink-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-pink-500/40 rounded text-pink-100 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                >
                  <option value="Idea">Idea</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Bug">Bug</option>
                  <option value="Advertising/Partnership">Advertising/Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-mono text-pink-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your filth here..."
                  rows={5}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-pink-500/40 rounded text-pink-100 placeholder-pink-700/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-4 rounded font-mono font-bold text-lg bg-pink-600/70 hover:bg-pink-500/80 disabled:opacity-50 transition-all border border-pink-400/50 animate-pulse"
                style={{
                  boxShadow: "0 0 15px rgba(255, 20, 147, 0.6)",
                }}
              >
                {status === "loading" ? (
                  "⏳ Flushing..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <img src="/images/toilet2.png" alt="toilet" className="w-7 h-7" />
                    Flush Message
                  </span>
                )}
              </button>

              {status === "success" && (
                <div className="p-3 bg-green-900/30 border border-green-500/50 rounded text-green-300 text-sm text-center font-mono">
                  {statusMessage}
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded text-red-300 text-sm text-center font-mono">
                  {statusMessage}
                </div>
              )}
            </form>
          </div>

          {/* Privacy note + Advertising note */}
          <div className="text-center mt-8 text-xs font-mono text-pink-300/60 space-y-2">
            <p>No data stored. Sent directly to the private sewer inbox.</p>
            <p>Adults only. Keep it consensual.</p>
            <p className="text-pink-300/80 italic mt-4 border-t border-pink-300/30 pt-4">
              For advertising, partnership, or sponsorship requests, please select 'Advertising/Partnership' in the
              category dropdown above.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
