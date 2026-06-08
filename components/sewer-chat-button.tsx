"use client"

import { useState, useEffect } from "react"
import { SewerChatModal } from "./sewer-chat-modal"

export function SewerChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <div
        data-chat-floating="true"
        style={{
          position: "fixed",
          top: "clamp(90px, 100px, 110px)",
          right: "12px",
          zIndex: 9999,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          pointerEvents: "auto",
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle, #8B4513, #5C3317)",
            border: "4px solid #FF1493",
            boxShadow: "0 0 20px #FF1493, 0 0 40px #8B4513",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: "url('/icons/chat-neon-1.png')",
            animation: "chatPulse 2s infinite, swapChatImages 5s infinite",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 40px #FF1493, 0 0 60px #8B4513, 0 0 80px #FF1493"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px #FF1493, 0 0 40px #8B4513"
          }}
          title="Open Sewer Chat 18+"
          aria-label="Open Sewer Chat"
        />
      </div>

      <SewerChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default SewerChatButton
