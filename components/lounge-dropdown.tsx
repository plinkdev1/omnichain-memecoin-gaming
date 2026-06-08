"use client"

import { useState } from "react"
import Link from "next/link"

export function LoungeDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-green-400 hover:text-pink-500 transition-colors duration-300 font-bold text-sm relative group/btn"
      >
        <span className="relative">
          Lounge
          <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm text-pink-500">
            Lounge
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-black/95 border-2 border-pink-500 rounded-lg shadow-lg shadow-pink-500/50 z-50 backdrop-blur-sm">
          <Link
            href="/afterdark"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 transition-all duration-200 border-b border-pink-500/30 first:rounded-t-lg group/item"
          >
            <span className="inline-block w-5 h-5 mr-2">
              <img src="/images/flame.png" alt="flame" className="w-full h-full" />
            </span>
            After Dark – Adult Raid Gear
            <span className="text-xs text-pink-300/70 block mt-1">Exclusive 18+ gear</span>
          </Link>

          <div className="px-4 py-3 text-pink-400 hover:bg-pink-500/20 transition-all duration-200 rounded-b-lg opacity-50 cursor-not-allowed flex items-center gap-2">
            <span className="inline-block w-5 h-5">
              <img src="/images/lock.png" alt="lock" className="w-full h-full" />
            </span>
            Private Club
            <span className="text-xs text-pink-300/70 block mt-1">Coming Soon...</span>
          </div>
        </div>
      )}
    </div>
  )
}
