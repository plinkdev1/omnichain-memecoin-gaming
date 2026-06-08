"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import type { SewerChatModalProps, Message } from "./types"

const SewerChatModal = ({ isOpen, onClose }: SewerChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("mainSewer")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!isOpen) return null

  const groups = [
    { id: "mainSewer", name: "🚽 Main Sewer", icon: "/images/toilet2.png" },
    { id: "raidX", name: "⚔️ RaidX Coords", icon: "/images/sword.png" },
    { id: "elShito", name: "🕵️ El Shito", icon: "/images/policeinspector.png" },
    { id: "reserveHole", name: "🔥 Reserve Hole", icon: "/images/flame2.png" },
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      author: "You",
      text: inputValue,
      timestamp: Date.now(),
      isOwn: true,
    }

    setMessages([...messages, newMessage])
    setInputValue("")
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm opacity-30 pointer-events-none transition-opacity duration-300" />

      <div
        ref={modalRef}
        className="fixed z-50 top-24 right-4 sm:right-6 md:right-8 w-[calc(100vw-32px)] sm:w-96 max-h-[calc(100vh-120px)] rounded-lg overflow-hidden shadow-2xl flex flex-col"
        style={{
          background: "linear-gradient(135deg, #2e4b2e 0%, #3a5a3a 100%)",
          border: "3px solid #d4af37",
          boxShadow: `
            0 0 30px rgba(212, 175, 55, 0.5),
            0 0 60px rgba(127, 255, 0, 0.2) inset,
            0 10px 40px rgba(0, 0, 0, 0.6)
          `,
          animation: "slideInFromTop 0.3s ease-out",
        }}
      >
        <style>{`
          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <div
          className="p-4 border-b-2 flex items-center justify-between relative overflow-hidden flex-shrink-0"
          style={{
            background: "linear-gradient(90deg, #5c3317 0%, #4a4a4a 50%, #5c3317 100%)",
            borderColor: "#d4af37",
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <img src="/images/flower.png" alt="flower" className="w-6 h-6" />
              <h2
                className="text-lg font-black text-dirty-yellow animate-pulse"
                style={{ textShadow: "0 0 10px #d4af37" }}
              >
                AFTER DARK
              </h2>
              <img src="/images/flower.png" alt="flower" className="w-6 h-6" />
            </div>
            <p className="text-xs text-rust-orange font-mono">Sewer Chat (18+) • On-Chain Forever</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-sewer-brown/50 rounded transition-colors flex-shrink-0"
            title="Close chat"
          >
            <X size={20} className="text-dirty-yellow" />
          </button>
        </div>

        <div className="flex gap-3 p-2 bg-sewer-brown/20 border-b border-sewer-brown/50 overflow-x-auto scrollbar-hide">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`px-4 py-2.5 rounded text-sm font-mono whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${
                selectedGroup === group.id
                  ? "bg-dirty-yellow text-black font-bold"
                  : "bg-sewer-brown/30 text-dirty-yellow hover:bg-sewer-brown/50"
              }`}
            >
              <img src={group.icon || "/placeholder.svg"} alt={group.id} className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">{group.name.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 terminal-texture bg-black/30">
          <div className="h-full flex flex-col items-center justify-center text-center gap-4">
            <div className="text-4xl">
              <img src="/images/lock2.png" alt="locked" className="w-16 h-16 mx-auto" />
            </div>
            <div>
              <p className="text-dirty-yellow font-bold text-sm">WALLET + XMTP COMING</p>
              <p className="text-foreground/60 text-xs mt-1">Connect wallet to join the sewer</p>
              <p className="text-foreground/40 text-xs mt-2 font-mono flex items-center justify-center gap-1">
                <img src="/images/potiontube.png" alt="testing" className="w-4 h-4" />
                Testing Phase – Messages Mocked
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 border-t-2 border-sewer-brown/50 bg-sewer-brown/10 space-y-2 flex-shrink-0">
          <div className="text-xs text-foreground/60 font-mono px-2 py-1 bg-black/30 rounded border border-rust-orange/30 flex items-center gap-2">
            <img src="/images/warning.png" alt="warning" className="w-5 h-5" />
            All messages on-chain forever. No takebacks.
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your filth..."
              disabled={true}
              className="flex-1 px-3 py-2 rounded bg-sewer-brown/50 border border-dirty-yellow/50 text-dirty-yellow placeholder-foreground/40 focus:outline-none focus:border-dirty-yellow disabled:opacity-50 text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={true}
              className="px-3 py-2 bg-rust-orange hover:bg-dirty-yellow text-black font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              title="Send message"
            >
              <img src="/images/plunger.png" alt="send" className="w-6 h-6" />
            </button>
          </div>

          <div className="text-xs text-foreground/50 text-center font-mono flex items-center justify-center gap-1">
            <img src="/images/potiontube.png" alt="testing" className="w-4 h-4" />
            XMTP Integration – Pre-Launch Testing
          </div>
        </div>
      </div>
    </>
  )
}

export { SewerChatModal }
export default SewerChatModal
