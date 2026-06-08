"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function SwampPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [showStakeModal, setShowStakeModal] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedPool, setSelectedPool] = useState<string | null>(null)

  // Mock data - replace with real blockchain data later
  const mainPool = {
    id: "main-sewer",
    name: "Main Sewer Pit",
    description: "Stake $DATX",
    totalStaked: "428,691,337",
    yourStake: "0",
    pendingRewards: "0",
    apy: "42.69",
  }

  const comingSoonPools = [
    {
      name: "$DATX-SOL LP Swamp",
      description: "Pair liquidity for double sludge",
      status: "Bubbling...",
    },
    {
      name: "El Shito Masked Pool",
      description: "Higher risk, dirtier yield",
      status: "Bubbling...",
    },
    {
      name: "Shit High Council Exclusive Pit",
      description: "Top holders only. Guard required.",
      status: "Bubbling...",
    },
  ]

  const handleConnectWallet = () => {
    setWalletConnected(true)
  }

  const openStakeModal = (poolId: string) => {
    setSelectedPool(poolId)
    setShowStakeModal(true)
  }

  return (
    <main className="min-h-screen bg-sewer-green relative overflow-hidden">
      {/* Exclusive Swamp Background */}
      <div
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "url(/images/gemini-generated-image-pz4d99pz4d99pz4d.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Bubbling animation overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="bubble-container">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="swamp-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Swamp background with parallax effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-sewer-brown/40 via-sewer-green/60 to-sewer-green" />

        {/* Floating poop island decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-[10%] w-20 h-20 opacity-40">
            <Image src="/images/datxit-logo.png" alt="" fill className="object-contain animate-float" />
          </div>
          <div className="absolute top-[30%] right-[15%] w-16 h-16 opacity-30">
            <Image src="/images/datxit-logo.png" alt="" fill className="object-contain animate-float-delay" />
          </div>
          <div className="absolute bottom-[25%] left-[20%] w-24 h-24 opacity-35">
            <Image src="/images/datxit-logo.png" alt="" fill className="object-contain animate-float" />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-8 inline-block">
            <div className="rusty-card p-8 rotate-[-2deg] shadow-2xl border-4 border-sewer-brown">
              <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow mb-4 font-mono dripping-text glitch-text">
                Liquidity Swamp
              </h1>
              <p className="text-xl md:text-2xl text-foreground/90 font-mono">Stake Here If You Dare</p>
            </div>
          </div>

          <div className="rusty-card p-6 max-w-2xl mx-auto text-left">
            <p className="text-foreground/90 leading-relaxed font-mono text-sm md:text-base">
              Welcome to the <span className="text-toxic-green font-bold">Liquidity Swamp</span> – the festering core of
              DatXit yields. While normie farms grow clean crops, we cultivate pure sludge. Stake your $DATX or LP in
              the toxic muck. Harvest Sewer Sludge rewards. Yields may vary... like everything else in this shitty
              world. APY? Whatever the swamp decides today.
            </p>
          </div>
        </div>

        {/* El Shito silhouette watching from shadows */}
        <div className="absolute bottom-0 right-[10%] w-32 h-32 opacity-20 hidden md:block">
          <Image src="/images/datxit-logo.png" alt="" fill className="object-contain" />
        </div>
      </section>

      {/* Wallet Connect Gate */}
      {!walletConnected ? (
        <section className="container mx-auto px-4 py-16 text-center relative z-10">
          <div className="rusty-card p-12 max-w-xl mx-auto border-4 border-rust-orange">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto relative mb-4 animate-pulse">
                <Image src="/images/datxit-logo.png" alt="DatXit" fill className="object-contain" />
              </div>
              <h2 className="text-3xl font-bold text-toxic-green mb-4 font-mono">Enter the swamp.</h2>
              <p className="text-foreground/80 font-mono text-sm mb-2">Swamp bubbling... live soon</p>
            </div>
            <Button
              disabled
              className="bg-toxic-green/50 hover:bg-toxic-green/50 cursor-not-allowed opacity-50 text-black font-mono text-lg px-8 py-6 rounded-lg"
            >
              Connect Wallet
            </Button>
            <p className="text-xs text-foreground/60 mt-4 font-mono">Feature live soon – building the sewer</p>
          </div>
        </section>
      ) : (
        <>
          {/* Staking Pools Dashboard */}
          <section className="container mx-auto px-4 py-16 relative z-10">
            <h2 className="text-4xl font-bold text-dirty-yellow mb-8 text-center font-mono glitch-text">
              Active Swamp Pits
            </h2>

            {/* Main Pool */}
            <div className="max-w-4xl mx-auto mb-12">
              <Card className="rusty-card p-8 border-4 border-sewer-brown relative overflow-hidden">
                {/* Bubbling background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-sewer-brown/20 via-transparent to-toxic-green/10 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image src="/images/datxit-logo.png" alt={mainPool.name} fill className="object-contain" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-toxic-green font-mono">{mainPool.name}</h3>
                      <p className="text-foreground/70 font-mono text-sm">{mainPool.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-sewer-brown/40 p-4 rounded-lg border border-rust-orange/30">
                      <p className="text-xs text-foreground/60 mb-1 font-mono">Total Staked</p>
                      <p className="text-lg font-bold text-foreground font-mono">{mainPool.totalStaked} $DATX</p>
                    </div>
                    <div className="bg-sewer-brown/40 p-4 rounded-lg border border-rust-orange/30">
                      <p className="text-xs text-foreground/60 mb-1 font-mono">Your Stake</p>
                      <p className="text-lg font-bold text-toxic-green font-mono">{mainPool.yourStake} $DATX</p>
                    </div>
                    <div className="bg-sewer-brown/40 p-4 rounded-lg border border-rust-orange/30">
                      <p className="text-xs text-foreground/60 mb-1 font-mono">Pending Sludge</p>
                      <p className="text-lg font-bold text-dirty-yellow font-mono">{mainPool.pendingRewards} SLUDGE</p>
                    </div>
                    <div className="bg-sewer-brown/40 p-4 rounded-lg border border-rust-orange/30">
                      <p className="text-xs text-foreground/60 mb-1 font-mono">Current APY</p>
                      <p className="text-lg font-bold text-toxic-green font-mono dripping-text">{mainPool.apy}%</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => openStakeModal(mainPool.id)}
                      className="bg-toxic-green hover:bg-toxic-green/80 text-black font-mono px-6 py-3 rounded-lg transition-all hover:scale-105"
                    >
                      Stake
                    </Button>
                    <Button
                      variant="outline"
                      className="border-rust-orange text-rust-orange hover:bg-rust-orange/20 font-mono px-6 py-3 rounded-lg bg-transparent"
                    >
                      Unstake
                    </Button>
                    <Button className="bg-toxic-green hover:bg-toxic-green/80 text-black font-mono px-6 py-3 rounded-lg flicker-glow transition-all hover:scale-105">
                      Harvest Sludge
                    </Button>
                  </div>

                  <p className="text-xs text-foreground/50 mt-4 font-mono italic">
                    Harvest your sludge before it ferments.
                  </p>
                </div>
              </Card>
            </div>

            {/* Yield Lore Section */}
            <div className="max-w-3xl mx-auto mb-12 rusty-card p-6 border-2 border-dirty-yellow/30">
              <h3 className="text-xl font-bold text-dirty-yellow mb-3 font-mono">Where Does Sludge Come From?</h3>
              <p className="text-foreground/80 font-mono text-sm leading-relaxed">
                Sewer Sludge rewards come from the 10% treasury slice of Reserve Hole burns + future swamp fees. The
                swamp giveth, the swamp taketh away. No promises. Just sludge.
              </p>
            </div>

            {/* Coming Soon Pools */}
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-rust-orange mb-6 text-center font-mono">
                Future Swamp Pits – Bubbling...
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {comingSoonPools.map((pool, idx) => (
                  <Card
                    key={idx}
                    className="rusty-card p-6 border-2 border-sewer-brown/50 opacity-60 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-12 h-12 relative mx-auto mb-4 grayscale">
                      <Image src="/images/datxit-logo.png" alt="" fill className="object-contain" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground/70 mb-2 text-center font-mono">{pool.name}</h3>
                    <p className="text-sm text-foreground/60 mb-4 text-center font-mono">{pool.description}</p>
                    <div className="text-center">
                      <span className="inline-block bg-sewer-brown/60 px-4 py-2 rounded-full text-xs font-mono text-toxic-green animate-pulse">
                        {pool.status}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Stake Modal */}
      {showStakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="rusty-card p-8 max-w-md w-full border-4 border-toxic-green relative overflow-hidden">
            {/* Underwater murky view background */}
            <div className="absolute inset-0 bg-gradient-to-t from-sewer-brown via-sewer-green/80 to-sewer-brown/60 pointer-events-none opacity-30" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-toxic-green font-mono">Stake in Swamp</h3>
                <button
                  onClick={() => setShowStakeModal(false)}
                  className="text-foreground/60 hover:text-rust-orange transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-mono text-foreground/80 mb-2">Amount to Stake</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="bg-sewer-brown/60 border-rust-orange text-foreground font-mono text-lg"
                />
                <p className="text-xs text-foreground/60 mt-2 font-mono">Balance: 1,337,420 $DATX</p>
              </div>

              <div className="bg-sewer-brown/40 p-4 rounded-lg mb-6 border border-rust-orange/30">
                <p className="text-xs text-foreground/60 mb-2 font-mono">You will receive:</p>
                <p className="text-lg font-bold text-toxic-green font-mono">~{stakeAmount || "0"} staked $DATX</p>
                <p className="text-xs text-foreground/50 mt-2 font-mono italic">Unstake early? Pay the swamp toll.</p>
              </div>

              <Button
                onClick={() => {
                  setShowStakeModal(false)
                  setStakeAmount("")
                }}
                className="w-full bg-toxic-green hover:bg-toxic-green/80 text-black font-mono text-lg py-6 rounded-lg transition-all hover:scale-105"
              >
                Confirm Stake
              </Button>
            </div>
          </Card>
        </div>
      )}

      <style jsx>{`
        .bubble-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .swamp-bubble {
          position: absolute;
          bottom: -100px;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(139, 195, 74, 0.3), rgba(139, 195, 74, 0));
          border-radius: 50%;
          animation: rise linear infinite;
          opacity: 0.6;
        }

        @keyframes rise {
          0% {
            bottom: -100px;
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            bottom: 100vh;
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .dripping-text {
          text-shadow: 0 4px 8px rgba(139, 195, 74, 0.5);
        }
      `}</style>
    </main>
  )
}
