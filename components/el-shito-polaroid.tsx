"use client"

import { useState } from "react"

interface ElShitoPolaroidProps {
  imageUrl: string
  caption: string
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right"
  rotation?: number
  opacity?: number
}

export function ElShitoPolaroid({
  imageUrl,
  caption,
  position = "bottom-right",
  rotation = Math.random() * 20 - 10,
  opacity = 0.35,
}: ElShitoPolaroidProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const positionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-32 left-4",
    "top-right": "top-4 right-4",
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} pointer-events-none z-10`}
      style={{
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Polaroid frame */}
      <div className="w-48 bg-white border-8 border-amber-50 shadow-lg" style={{ aspectRatio: "3/4" }}>
        {/* Image */}
        <div className="w-full h-32 bg-sewer-brown/20 overflow-hidden relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={caption}
            className="w-full h-full object-cover grayscale-[0.6] contrast-[1.1]"
            draggable={false}
          />
          {/* Polaroid glare overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
            }}
          />
        </div>

        {/* Caption area */}
        <div className="flex-1 p-2 flex flex-col justify-between">
          <p className="text-xs text-sewer-brown font-mono leading-tight italic">{caption}</p>

          {/* Handwritten timestamp */}
          <p className="text-xs text-rust-orange/70 font-mono text-right">{new Date().toISOString().split("T")[0]}</p>
        </div>
      </div>

      {/* Tape marks */}
      <div
        className="absolute w-8 h-12 bg-amber-100/40 backdrop-blur-sm"
        style={{
          top: "-12px",
          left: "20%",
          transform: "rotate(-15deg)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
        }}
      />
      <div
        className="absolute w-8 h-12 bg-amber-100/40 backdrop-blur-sm"
        style={{
          top: "-12px",
          right: "20%",
          transform: "rotate(15deg)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
        }}
      />

      {/* Hover tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full mb-2 bg-sewer-brown text-dirty-yellow text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-auto">
          El Shito's private camera roll – leaked
        </div>
      )}
    </div>
  )
}
