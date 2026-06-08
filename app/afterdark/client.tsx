"use client"

import { useState } from "react"
import Image from "next/image"
import PolaroidReel from "@/components/polaroid-reel"
import { ComingSoonBadge } from "@/components/coming-soon-badge"

const PRODUCTS = [
  {
    id: 1,
    name: "Midnight Flush",
    description: "Limited glow-in-dark acrylic stencil",
    price: 49.99,
    image: "/products/midnight-flush.png",
    comingSoon: false,
  },
  {
    id: 2,
    name: "Neon Tease",
    description: "Provocative bandana mask set",
    price: 34.99,
    image: "/products/neon-tease.png",
    comingSoon: false,
  },
  {
    id: 3,
    name: "Private Booth",
    description: "Full adult cosplay kit",
    price: 129.99,
    image: "/products/private-booth.png",
    comingSoon: false,
  },
  {
    id: 4,
    name: "Forbidden Tag",
    description: "Custom adult stencil stencil",
    price: 59.99,
    image: "/products/forbidden-tag.png",
    comingSoon: false,
  },
]

const LORE_PHOTOS = [
  { src: "/polaroids/polaroid-1.png", note: "Late night sessions" },
  { src: "/polaroids/polaroid-2.png", note: "After hours vibes" },
  { src: "/polaroids/polaroid-3.png", note: "Private collection" },
  { src: "/polaroids/polaroid-4.png", note: "Exclusive moments" },
  { src: "/polaroids/polaroid-5.png", note: "Hidden treasures" },
  { src: "/polaroids/polaroid-6.png", note: "Secret stash" },
  { src: "/polaroids/polaroid-7.png", note: "Behind the scenes" },
  { src: "/polaroids/polaroid-8.png", note: "Rare footage" },
  { src: "/polaroids/polaroid-9.png", note: "Forbidden moments" },
  { src: "/polaroids/polaroid-10.png", note: "Legend has it..." },
]

export default function AfterDarkClient() {
  const [cart, setCart] = useState<string[]>([])
  const [showWarning, setShowWarning] = useState(true)

  const addToCart = (productId: string) => {
    setCart([...cart, productId])
  }

  return (
    <div className="min-h-screen bg-black text-foreground">
      {showWarning && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center pt-12 overflow-y-auto bg-black/95 backdrop-blur-md">
          <div className="border-2 border-pink-500 rounded-2xl p-12 max-w-md text-center bg-gradient-to-b from-black to-pink-950/20 shadow-2xl shadow-pink-500 my-auto">
            {/* Glowing 18 Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-80"></div>
                <div className="relative bg-pink-500 rounded-full w-20 h-20 flex items-center justify-center border-2 border-red-500 shadow-lg shadow-pink-500">
                  <img src="/images/18ball.png" alt="18 plus" className="w-20 h-20 rounded-full" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2
              className="text-5xl font-black text-pink-500 mb-2 tracking-wider"
              style={{ textShadow: "0 0 20px rgba(236, 72, 153, 0.8)" }}
            >
              18+ ONLY
            </h2>

            {/* Subtitle */}
            <p className="text-pink-400 text-lg mb-6 font-mono">Adult Content Warning</p>

            {/* Warning Box */}
            <div className="border border-pink-600 rounded-lg bg-black/60 p-6 mb-8 text-left">
              <p className="text-gray-300 text-sm leading-relaxed font-mono">
                This section contains provocative adult-themed satirical merchandise and lore.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed font-mono mt-3">
                Enter at your own risk. DatXit is not responsible for your arousal or offense.
              </p>
              <p className="text-pink-400 italic font-mono mt-4 text-center">The forbidden club awaits...</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-all border border-amber-600 hover:shadow-lg shadow-amber-700/50 text-lg flex items-center justify-center gap-2"
              >
                <img src="/images/toilet2.png" alt="toilet" className="w-10 h-10" />
                Leave
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-black font-black py-3 px-6 rounded-lg transition-all border-2 border-pink-400 hover:shadow-lg shadow-pink-500/50 text-lg flex items-center justify-center gap-3"
              >
                <img src="/images/trumpet.png" alt="trumpet" className="w-10 h-10 flex-shrink-0" />
                Enter the Lounge
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-pink-400 text-xs font-mono flex items-center justify-center gap-2">
              <img src="/images/warning.png" alt="warning" className="w-7 h-7" />
              By entering, you confirm you are 18+ and accept DatXit's terms
            </p>
          </div>
        </div>
      )}

      {/* Product Section */}
      <div className="px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-balance">Adult Raid Gear</h1>

        <div className="bg-pink-500/10 border-2 border-pink-500 rounded-lg p-6 max-w-4xl mx-auto mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          <p className="text-lg font-mono text-pink-400 font-bold relative z-10 flex items-center justify-center gap-3">
            <img src="/images/trumpet.png" alt="trumpet" className="w-6 h-6 animate-bounce" />
            More adult merch dropping soon – Exclusive chaos incoming
            <img
              src="/images/trumpet.png"
              alt="trumpet"
              className="w-6 h-6 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-32">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="border border-pink-500 rounded-lg p-6 bg-zinc-900 hover:border-pink-400 transition-colors relative group"
            >
              {/* Product Image Container */}
              <div className="relative w-full h-48 mb-6 bg-black rounded overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {product.comingSoon && <ComingSoonBadge />}
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-mono text-pink-500 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-4 text-balance">{product.description}</p>

              {/* Price and Button */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-amber-400">${product.price}</span>
                <button
                  onClick={() => addToCart(product.id.toString())}
                  disabled
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded transition-colors"
                >
                  Out-of-Stock
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Polaroid Reel Section */}
        <div className="pt-60 pb-20 border-t border-pink-500 relative">
          <div className="absolute -left-20 top-20 z-30">
            <img
              src="/images/disquette.png"
              alt="floppy disk decoration"
              className="w-56 h-56 opacity-90 hover:scale-110 transition-transform"
            />
          </div>
          <PolaroidReel images={LORE_PHOTOS} />
        </div>
      </div>
    </div>
  )
}
