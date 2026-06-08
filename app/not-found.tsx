"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function NotFound() {
  const [bgImage, setBgImage] = useState("")

  useEffect(() => {
    const images = [
      "/404-images/404-1.webp",
      "/404-images/404-2.webp",
      "/404-images/404-3.webp",
      "/404-images/404-4.webp",
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    setBgImage(randomImage)
  }, [])

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1
          className="text-7xl md:text-8xl font-bold font-mono mb-6 animate-pulse"
          style={{
            color: "#FF1493",
            textShadow: "0 0 30px #FF1493, 0 0 60px #8B4513",
          }}
        >
          404
        </h1>

        <h2
          className="text-4xl md:text-5xl font-bold font-mono mb-4 text-dirty-yellow"
          style={{
            textShadow: "0 0 20px #CD853F",
          }}
        >
          Lost in the Sewer
        </h2>

        <p className="text-xl text-sewer-brown/80 font-mono mb-8 max-w-md mx-auto">
          The page you seek has been flushed. Everything is shit anyway.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-4 bg-pink-600/70 hover:bg-pink-500/80 text-white font-mono font-bold rounded-lg transition-all border border-pink-400/50 animate-pulse"
          style={{
            boxShadow: "0 0 15px rgba(255, 20, 147, 0.6)",
          }}
        >
          🚽 Return to Sewer Home
        </Link>

        {/* Drip animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-sewer-brown/30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
