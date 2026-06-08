"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Send, RefreshCw, X } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const starterMessages = [
  "Season's greetings... or not. What's shit today?",
  "Xitmas 2025 approaching. Family drama loading...",
  "Everything is shit. Prove me wrong.",
]

export default function SewerOracleChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: starterMessages[Math.floor(Math.random() * starterMessages.length)],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading || messageCount >= 10) return

    const userMessage: Message = { role: "user", content: textToSend }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setMessageCount((prev) => prev + 1)

    try {
      const response = await fetch("/api/sewer-oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Sewer clogged")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ""

      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n").filter((line) => line.trim())

          for (const line of lines) {
            if (line.startsWith("0:")) {
              const text = line.slice(2).replace(/^"|"$/g, "")
              assistantMessage += text

              setMessages((prev) => {
                const newMessages = [...prev]
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantMessage,
                }
                return newMessages
              })
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sewer clogged. Try again. 💩",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const generateMemePrompt = () => {
    sendMessage("Generate a random El Shito meme prompt using the canonical prefix")
  }

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: starterMessages[Math.floor(Math.random() * starterMessages.length)],
      },
    ])
    setMessageCount(0)
    setInput("")
  }

  if (!isExpanded) {
    return (
      <div className="fixed z-50 bottom-8 right-8 sm:bottom-8 sm:right-8">
        <Button
          onClick={() => setIsExpanded(true)}
          className="h-14 w-14 rounded-full bg-transparent hover:bg-transparent border-2 border-toxic-green shadow-lg transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(127,255,0,0.8)] p-0"
          title="Oracle Sewer - Click to open"
        >
          <img
            src="/images/officiallogo.png"
            alt="Sewer Oracle"
            className="w-7 h-7 drop-shadow-[0_0_8px_rgba(127,255,0,0.6)]"
          />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed z-50 bottom-8 right-8 w-full max-w-md" style={{ maxWidth: "calc(100vw - 32px)" }}>
      <Card className="rusty-card border-4 border-rust-orange overflow-hidden shadow-2xl flex flex-col h-[600px] sm:h-[600px] max-h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="bg-sewer-brown border-b-2 border-rust-orange p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/images/officiallogo.png" alt="Oracle Icon" className="w-8 h-8" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-toxic-green rounded-full border-2 border-sewer-brown" />
            </div>
            <div>
              <h3 className="font-bold text-dirty-yellow font-mono">Sewer Oracle</h3>
              <p className="text-xs text-foreground/70 font-mono">The shittiest AI on Solana</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" variant="ghost" onClick={resetChat} className="h-8 w-8 p-0 hover:bg-rust-orange/20">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 p-0 hover:bg-rust-orange/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sewer-green/10 terminal-texture">
          {messages.length === 1 && (
            <div className="text-center text-xs text-foreground/60 font-mono mb-4">
              What fresh shit do you want to talk about?
            </div>
          )}

          {messages.map((message, i) => (
            <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-gray-600 text-white"
                    : "bg-sewer-brown text-foreground border-2 border-rust-orange"
                }`}
              >
                {message.role === "assistant" && (
                  <img src="/images/officiallogo.png" alt="Oracle" className="w-4 h-4 mr-2 inline" />
                )}
                <span className="text-sm font-mono whitespace-pre-wrap">{message.content}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-sewer-brown text-foreground border-2 border-rust-orange rounded-lg p-3">
                <img src="/images/officiallogo.png" alt="Oracle" className="w-4 h-4 mr-2 inline" />
                <span className="text-sm font-mono animate-pulse">Typing...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t-2 border-rust-orange p-3 bg-background flex-shrink-0">
          {messageCount >= 10 && (
            <div className="text-xs text-rust-orange text-center mb-2 font-mono">
              Rate limit: 10 messages per session. Reset to continue.
            </div>
          )}

          <div className="flex gap-2 mb-2">
            <Button
              size="sm"
              onClick={generateMemePrompt}
              disabled={isLoading || messageCount >= 10}
              className="flex-1 bg-toxic-green text-background hover:bg-toxic-green/80 font-mono text-xs"
            >
              <img src="/images/paintboard2.png" alt="paint" className="w-6 h-6 mr-1" />
              Meme Prompt
            </Button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Rant here..."
              disabled={isLoading || messageCount >= 10}
              className="flex-1 bg-sewer-green/20 border-2 border-sewer-brown rounded-lg px-3 py-2 text-sm font-mono placeholder:text-foreground/40 focus:outline-none focus:border-toxic-green disabled:opacity-50"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || isLoading || messageCount >= 10}
              className="bg-rust-orange hover:bg-rust-orange/80 h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-[10px] text-foreground/50 text-center mt-2 font-mono">
            Powered by AI. Responses 100% shitpost. Not advice. Flush responsibly.
          </p>
        </div>
      </Card>
    </div>
  )
}

export { SewerOracleChat }
