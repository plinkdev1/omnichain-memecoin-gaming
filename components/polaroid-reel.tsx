"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface PolaroidReelProps {
  images: Array<{ src: string; note: string }>
  subtle?: boolean
}

export default function PolaroidReel({ images, subtle = false }: PolaroidReelProps) {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [positions, setPositions] = useState<Array<{ x: number; y: number; rotation: number; z: number }> | null>(null)

  useEffect(() => {
    if (!positions) {
      const newPositions = images.map((_, i) => ({
        x: Math.random() * 200 - 100,
        y: Math.random() * 150 - 75,
        rotation: Math.random() * 40 - 20,
        z: i,
      }))
      setPositions(newPositions)
    }
  }, [images.length, positions])

  const handlePhotoClick = (index: number) => {
    const newRevealed = new Set(revealedIndices)
    if (newRevealed.has(index)) {
      newRevealed.delete(index)
    } else {
      newRevealed.add(index)
    }
    setRevealedIndices(newRevealed)
  }

  if (!positions || positions.length === 0) return <div className="w-full h-96" />

  return (
    <div
      className={`relative w-full mx-auto ${subtle ? "h-64" : "h-screen/2 min-h-96"}`}
      style={{
        perspective: "1200px",
        background: subtle
          ? "rgba(30, 20, 10, 0.3)"
          : "radial-gradient(ellipse at center, rgba(92, 51, 23, 0.15), rgba(20, 20, 20, 0.3))",
        backdropFilter: subtle ? "blur(2px)" : "blur(6px)",
      }}
    >
      {/* Misty fog overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(20, 20, 20, 0.25) 100%)",
          animation: subtle ? "none" : "fogDrift 15s ease-in-out infinite",
        }}
      />

      {/* Scattered polaroid pile with card interaction */}
      <div className="relative w-full h-full">
        {images.map((photo, i) => {
          const isRevealed = revealedIndices.has(i)
          const isVisible = isRevealed || !Array.from(revealedIndices).some((idx) => idx > i)
          const stableKey = `${i}-${photo.src}`

          return (
            <div
              key={stableKey}
              className={`absolute transition-all duration-500 hover:drop-shadow-2xl ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              style={{
                transform: `translate(calc(-50% + ${positions[i]?.x ?? 0}px), calc(-50% + ${positions[i]?.y ?? 0}px)) rotate(${positions[i]?.rotation ?? 0}deg) ${
                  isRevealed ? "scale(1.1)" : "scale(1)"
                }`,
                left: "50%",
                top: "50%",
                zIndex: isRevealed ? 1000 + i : i,
                width: subtle ? "160px" : "380px",
                height: subtle ? "185px" : "480px",
                cursor: isVisible ? "pointer" : "default",
              }}
              onClick={() => isVisible && handlePhotoClick(i)}
            >
              {/* Polaroid frame */}
              <div className="w-full h-full bg-white/95 rounded-sm shadow-2xl border-[4px] border-white/80 overflow-hidden relative group">
                {/* Image - larger */}
                <div className="w-full h-3/4 relative bg-gray-900 overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={`Polaroid ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    crossOrigin="anonymous"
                  />

                  {/* Grainy flash overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0px, rgba(255,255,255,.03) 1px, transparent 1px, transparent 2px)",
                      animation: subtle ? "none" : "grainyFlash 4s ease-in-out infinite",
                    }}
                  />
                </div>

                {/* White space for handwritten note */}
                <div className="w-full h-1/4 bg-gradient-to-br from-yellow-100/80 to-yellow-50/60 p-3 flex flex-col justify-center">
                  <p
                    className="text-xs font-mono text-amber-900 italic drop-shadow-sm line-clamp-2"
                    style={{ fontFamily: "cursive" }}
                  >
                    {photo.note}
                  </p>
                </div>

                {/* Tape marks */}
                <div
                  className="absolute -top-2 left-6 w-8 h-4 bg-amber-200/60 rounded-sm"
                  style={{
                    boxShadow: "inset 0 0 2px rgba(0,0,0,0.1)",
                    transform: "rotate(-12deg)",
                  }}
                />
                <div
                  className="absolute -top-2 right-6 w-8 h-4 bg-amber-200/60 rounded-sm"
                  style={{
                    boxShadow: "inset 0 0 2px rgba(0,0,0,0.1)",
                    transform: "rotate(15deg)",
                  }}
                />

                {/* Neon glow on reveal */}
                {isRevealed && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-sm"
                    style={{
                      border: "2px solid rgba(255, 20, 147, 0.8)",
                      boxShadow: "0 0 30px rgba(255, 20, 147, 0.7), inset 0 0 30px rgba(139, 69, 19, 0.4)",
                      animation: "neonBorder 2s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Helper text */}
      {images.length > 5 && (
        <div className="absolute bottom-4 left-4 right-4 text-center text-xs font-mono text-pink-400/50 pointer-events-none">
          Click photos to move the pile...
        </div>
      )}

      <style jsx>{`
        @keyframes fogDrift {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes grainyFlash {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 0.12;
          }
        }

        @keyframes neonBorder {
          0%,
          100% {
            border-color: rgba(255, 20, 147, 0.6);
            box-shadow: 0 0 30px rgba(255, 20, 147, 0.7), inset 0 0 30px rgba(139, 69, 19, 0.4);
          }
          50% {
            border-color: rgba(255, 20, 147, 0.9);
            box-shadow: 0 0 50px rgba(255, 20, 147, 0.9), inset 0 0 40px rgba(139, 69, 19, 0.6);
          }
        }
      `}</style>
    </div>
  )
}

export { PolaroidReel }
