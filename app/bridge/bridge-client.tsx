"use client"
import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const CHAIN_NAMES = {
  solana: "Solana Sewer",
  ethereum: "Ethereum Clog",
  arbitrum: "Arbitrum Backup",
  base: "Base Camp Leak",
  optimism: "Optimism Flush",
  polygon: "Polygon Pit",
  bsc: "BSC Blockage",
}

const CHAIN_LOGOS = {
  solana: "/images/sol.png",
  ethereum: "/images/eth.png",
  arbitrum: "/images/arb.png",
  base: "/images/base.png",
  optimism: "/images/op.png",
  polygon: "/images/pol.png",
  bsc: "/images/bnb.png",
}

const SUPPORTED_CHAINS = ["ethereum", "arbitrum", "base", "optimism", "polygon", "bsc"] as const

export function BridgeClient() {
  const { publicKey, connected } = useWallet()
  const [fromChain, setFromChain] = useState("solana")
  const [toChain, setToChain] = useState("ethereum")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bridgeStatus, setBridgeStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleBridge = async () => {
    if (!connected || !publicKey) {
      setStatusMessage("Wallet not connected. Connect wallet to bridge.")
      setBridgeStatus("error")
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      setStatusMessage("Enter valid amount to flush.")
      setBridgeStatus("error")
      return
    }

    setIsLoading(true)
    setBridgeStatus("pending")
    setStatusMessage("Preparing omnichain flush via Stargate...")

    // In production: integrate Stargate SDK for cross-chain transactions
    // For now: show coming soon message
    setTimeout(() => {
      setStatusMessage("Stargate V2 widget integration coming soon. Check back soon!")
      setBridgeStatus("error")
      setIsLoading(false)
    }, 2000)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/backgrounds/wallpaper-01-sewer-network.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="absolute top-10 left-1/4 w-96 h-96 bg-toxic-green/10 blur-[150px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-rust-orange/15 blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="bg-sewer-brown/60 border-2 border-toxic-green rounded-2xl p-0 shadow-[0_0_20px_rgba(127,255,0,0.15)] w-36 h-36 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/stargate.png"
                alt="Stargate V2 Logo"
                width={128}
                height={128}
                className="w-36 h-36 object-cover"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-3 bg-sewer-green/40 border-2 border-toxic-green rounded-full px-4 py-2 mb-4">
            <div className="w-3 h-3 bg-toxic-green rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-toxic-green">POWERED BY STARGATE V2</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold font-mono drop-shadow-[0_0_30px_rgba(127,255,0,0.5)]">
            <span className="text-dirty-yellow">Sewer</span> <span className="text-toxic-green">Bridge</span>
          </h1>

          <p className="text-3xl text-rust-orange font-bold italic">Flush Across Chains</p>

          <p className="text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed font-mono">
            Take the truth omnichain. Bridge <span className="text-toxic-green font-bold">$DATX</span> from the Solana
            Sewer to the EVM cesspools via LayerZero's Stargate protocol.
          </p>

          <p className="text-sm text-foreground/70 flex items-center justify-center gap-2">
            <span className="inline-block w-3 h-3 bg-toxic-green rounded-full"></span>
            Audited cross-chain. Trustless. Unstoppable.
            <span className="inline-block w-3 h-3 bg-toxic-green rounded-full"></span>
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <Card className="p-8 border-2 border-toxic-green bg-sewer-green/90 shadow-[0_0_40px_rgba(127,255,0,0.2)]">
            <div className="space-y-6">
              {/* From chain selector */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-dirty-yellow font-mono">FROM (Source)</label>
                <div className="bg-sewer-brown/50 border-2 border-sewer-brown rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-toxic-green/20 border border-toxic-green flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={CHAIN_LOGOS.solana || "/placeholder.svg"}
                        alt="Solana"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Solana Network</p>
                      <p className="text-lg font-bold text-toxic-green font-mono">{CHAIN_NAMES.solana}</p>
                    </div>
                  </div>
                  <span className="text-xs text-foreground/60">Mainnet</span>
                </div>
              </div>

              {/* Amount input */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-dirty-yellow font-mono">AMOUNT</label>
                <input
                  type="number"
                  placeholder="Enter $DATX amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-sewer-brown/50 border-2 border-sewer-brown rounded-lg p-4 text-foreground font-mono focus:outline-none focus:border-toxic-green focus:ring-1 focus:ring-toxic-green"
                  disabled={!connected}
                />
                <p className="text-xs text-foreground/60">Min: 1 $DATX • Fee: ~0.5%</p>
              </div>

              {/* To chain selector */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-dirty-yellow font-mono">TO (Destination)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {SUPPORTED_CHAINS.map((chain) => (
                    <button
                      key={chain}
                      onClick={() => setToChain(chain)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        toChain === chain
                          ? "border-toxic-green bg-toxic-green/20 shadow-[0_0_15px_rgba(127,255,0,0.3)]"
                          : "border-sewer-brown bg-sewer-brown/30 hover:border-toxic-green/50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={CHAIN_LOGOS[chain as keyof typeof CHAIN_LOGOS] || "/placeholder.svg"}
                            alt={chain}
                            width={20}
                            height={20}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-mono text-foreground/60">{chain.toUpperCase()}</p>
                      </div>
                      <p className="text-sm font-bold text-dirty-yellow">
                        {CHAIN_NAMES[chain as keyof typeof CHAIN_NAMES].split(" ")[0]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee & time estimate */}
              <div className="grid grid-cols-2 gap-4 bg-sewer-brown/30 rounded-lg p-4 border border-sewer-brown/50">
                <div>
                  <p className="text-xs text-foreground/60">Bridge Fee</p>
                  <p className="text-lg font-bold text-toxic-green">
                    ~{(Number.parseFloat(amount) * 0.005).toFixed(2) || "0"} $DATX
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Est. Time</p>
                  <p className="text-lg font-bold text-toxic-green">5-15 min</p>
                </div>
              </div>

              {!connected && (
                <div className="bg-rust-orange/20 border-2 border-rust-orange rounded-lg p-4 flex items-center gap-3">
                  <Image
                    src="/images/warningtriangle.png"
                    alt="Warning"
                    width={28}
                    height={28}
                    className="w-7 h-7 flex-shrink-0"
                  />
                  <p className="text-sm text-foreground/90">Connect wallet to bridge $DATX omnichain</p>
                </div>
              )}

              {/* Flush Now button */}
              <Button
                onClick={handleBridge}
                disabled={!connected || isLoading}
                className="w-full bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-xl py-6 shadow-[0_0_30px_rgba(127,255,0,0.3)] rounded-lg border-2 border-toxic-green disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {!connected ? (
                  "Connect Wallet First"
                ) : isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-transparent border-t-black border-r-black rounded-full animate-spin"></span>
                    Flushing...
                  </span>
                ) : (
                  <>
                    <Image
                      src="/images/cybertoilet-20-281-29.png"
                      alt="Flush Now"
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                    Flush Now
                  </>
                )}
              </Button>

              {/* Status message */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-lg border-2 text-sm font-mono ${
                    bridgeStatus === "success"
                      ? "bg-toxic-green/20 border-toxic-green text-toxic-green"
                      : bridgeStatus === "error"
                        ? "bg-rust-orange/20 border-rust-orange text-rust-orange"
                        : "bg-dirty-yellow/20 border-dirty-yellow text-dirty-yellow"
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </div>
          </Card>

          <Card className="mt-6 p-6 border-2 border-sewer-brown bg-sewer-brown/50">
            <div className="flex items-start gap-4">
              <Image
                src="/images/chainlinkicon.png"
                alt="Powered by Stargate"
                width={56}
                height={56}
                className="w-14 h-14 flex-shrink-0"
              />
              <div className="space-y-2">
                <p className="font-bold text-dirty-yellow">Powered by Stargate V2</p>
                <p className="text-sm text-foreground/80">
                  Stargate's Omnichain Fungible Token (OFT) standard enables instant, asset-agnostic bridging via
                  LayerZero's verification networks. Cross-chain composability. Zero wrapped tokens.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mb-12 p-8 bg-gradient-to-r from-rust-orange/20 to-sewer-brown/30 border-2 border-dashed border-rust-orange rounded-lg text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/hourglass.png"
              alt="Preparing Omnichain Flush"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>
          <p className="text-xl font-bold text-dirty-yellow">Preparing Omnichain Flush</p>
          <p className="text-foreground/80">
            $DATX Stargate V2 configuration launching next. Bridge will go live when token deployment is complete.
          </p>
          <p className="text-xs text-foreground/60 font-mono">Check back soon for full cross-chain trading.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "/images/shield.png",
              iconAlt: "Audited",
              title: "Audited",
              desc: "LayerZero & Stargate security audits. Enterprise-grade cross-chain.",
            },
            {
              icon: "/images/lightningbolt.png",
              iconAlt: "Instant",
              title: "Instant",
              desc: "5-15 minute settlement. No liquidity pools to wait for.",
            },
            {
              icon: "/images/refreshloop.png",
              iconAlt: "True Asset",
              title: "True Asset",
              desc: "OFT protocol. No wrapping. Same $DATX on all chains.",
            },
          ].map((feature, i) => (
            <Card key={i} className="p-6 border-2 border-sewer-brown bg-sewer-brown/40 text-center space-y-3">
              <Image
                src={feature.icon || "/placeholder.svg"}
                alt={feature.iconAlt}
                width={64}
                height={64}
                className="w-16 h-16 mx-auto"
              />
              <h3 className="text-lg font-bold text-dirty-yellow font-mono">{feature.title}</h3>
              <p className="text-sm text-foreground/80">{feature.desc}</p>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-3 mb-8">
          <p className="text-sm text-foreground/70">Questions? Need help?</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/lore" className="text-toxic-green hover:text-toxic-green/80 font-mono text-sm underline">
              Back to Lore →
            </Link>
            <a
              href="https://stargate.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dirty-yellow hover:text-dirty-yellow/80 font-mono text-sm underline"
            >
              Stargate Docs ↗
            </a>
            <a
              href="https://layerzero.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rust-orange hover:text-rust-orange/80 font-mono text-sm underline"
            >
              LayerZero ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
