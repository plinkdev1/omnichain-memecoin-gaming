"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { getSolBalance, getDatxBalance, formatAddress, isWalletInstalled } from "@/lib/wallet-utils"

interface WalletConnectModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConnect?: () => void
  onDisconnect?: () => void
}

const WALLET_ICONS: Record<string, string> = {
  Phantom: "/wallets/phantom-icon.png",
  Solflare: "/wallets/solflare-icon.png",
  Ledger: "/wallets/ledger-icon.jpeg",
}

const WALLETS = [
  {
    name: "Phantom",
    installUrl: "https://phantom.app",
  },
  {
    name: "Solflare",
    installUrl: "https://solflare.com",
  },
  {
    name: "Ledger",
    installUrl: "https://www.ledger.com/solana",
  },
]

export function WalletConnectModal({ isOpen, onOpenChange, onConnect, onDisconnect }: WalletConnectModalProps) {
  const { connected, publicKey, disconnect, select, wallets } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | null>(null)
  const [datxBalance, setDatxBalance] = useState<number | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [walletInstalledStatus, setWalletInstalledStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const checkWalletInstallation = async () => {
      const status: Record<string, boolean> = {}
      for (const wallet of WALLETS) {
        status[wallet.name] = await isWalletInstalled(wallet.name)
      }
      setWalletInstalledStatus(status)
    }
    checkWalletInstallation()
  }, [])

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalances()
      onConnect?.()
    } else {
      setBalance(null)
      setDatxBalance(null)
    }
  }, [connected, publicKey, onConnect])

  const fetchBalances = async () => {
    if (!publicKey) return
    setIsLoadingBalance(true)
    try {
      const [sol, datx] = await Promise.all([
        getSolBalance(connection, publicKey),
        getDatxBalance(connection, publicKey),
      ])
      setBalance(sol)
      setDatxBalance(datx)
      setError(null)
    } catch (error) {
      console.error("[v0] Error fetching balance:", error)
      setError("Failed to fetch balances. Please try again.")
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const handleWalletSelect = (walletName: string) => {
    if (!walletInstalledStatus[walletName]) {
      setError(`${walletName} is not installed. Please install it to connect.`)
      return
    }

    setSelectedWallet(walletName)
    setError(null)

    const wallet = wallets.find((w) => w.adapter.name === walletName)
    if (wallet) {
      try {
        select(wallet.adapter.name)
      } catch (err) {
        console.error("[v0] Error selecting wallet:", err)
        setError(`Failed to connect to ${walletName}. Please try again.`)
      }
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      setSelectedWallet(null)
      setError(null)
      onDisconnect?.()
    } catch (error) {
      console.error("[v0] Error disconnecting wallet:", error)
      setError("Failed to disconnect. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-sewer-green border-sewer-brown max-w-md fixed top-8 left-1/2 -translate-x-1/2 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-sewer-green pb-4 border-b border-sewer-brown">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-toxic-green font-mono text-xl">
                {connected ? "✓ Connected" : "Connect Your Wallet"}
              </DialogTitle>
              <DialogDescription className="text-foreground/80 font-mono text-xs mt-1">
                {connected ? "Your sewer account is active." : "Choose your weapon to enter the sewer."}
              </DialogDescription>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-foreground/60 hover:text-toxic-green transition-colors p-1"
            >
              ✕
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {error && (
            <div className="bg-rust-orange/10 border-l-4 border-rust-orange rounded px-3 py-2">
              <p className="text-xs text-rust-orange font-mono">{error}</p>
            </div>
          )}

          {!connected ? (
            <>
              <div className="border-2 border-dirty-yellow bg-sewer-brown/50 rounded-lg p-4">
                <h3 className="font-mono text-dirty-yellow font-bold mb-3 text-sm">Select Wallet</h3>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {WALLETS.map((wallet) => {
                    const isInstalled = walletInstalledStatus[wallet.name]
                    const icon = WALLET_ICONS[wallet.name]

                    return (
                      <button
                        key={wallet.name}
                        onClick={() => handleWalletSelect(wallet.name)}
                        disabled={!isInstalled}
                        className={`p-3 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 backdrop-blur-sm ${
                          !isInstalled
                            ? "opacity-40 cursor-not-allowed border-foreground/10 bg-sewer-brown/20"
                            : selectedWallet === wallet.name
                              ? "border-toxic-green bg-toxic-green/15 shadow-lg shadow-toxic-green/20"
                              : "border-dirty-yellow/40 hover:border-toxic-green hover:bg-toxic-green/5 hover:shadow-md hover:shadow-toxic-green/10"
                        }`}
                        title={!isInstalled ? `${wallet.name} not installed` : ""}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-sewer-brown/50 p-1">
                          <img
                            src={icon || "/placeholder.svg"}
                            alt={`${wallet.name} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-mono font-bold text-foreground text-center line-clamp-1">
                          {wallet.name}
                        </span>
                        {!isInstalled && <span className="text-[10px] text-rust-orange font-semibold">Install</span>}
                      </button>
                    )
                  })}
                </div>

                <p className="text-xs text-foreground/70 mt-3 font-mono text-center">
                  {selectedWallet ? `Connecting to ${selectedWallet}...` : "Phantom • Solflare • Ledger"}
                </p>
              </div>

              <div className="border-2 border-dashed border-rust-orange/50 bg-rust-orange/5 rounded-lg p-4">
                <h3 className="font-mono text-rust-orange font-bold mb-2 text-sm">✨ Coming Soon</h3>
                <p className="text-xs text-foreground/60 font-mono">
                  More wallets (Backpack, Magic Eden, Jupiter, Brave, Trust) & smart wallet email login – Alchemy
                  Account Kit launching soon.
                </p>
              </div>

              <div className="bg-sewer-brown/30 border-l-4 border-rust-orange rounded px-4 py-3 text-xs">
                <p className="text-foreground/80 font-mono">
                  <span className="text-rust-orange font-bold">Powered by Alchemy RPC:</span> Fast, reliable, and
                  designed for degens.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="text-toxic-green font-mono text-sm">✓ Connected to the Sewer</div>

              <div className="bg-sewer-brown/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-foreground/70 font-mono break-all flex-1">
                    {formatAddress(publicKey?.toString() || "")}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(publicKey?.toString() || "")
                    }}
                    className="text-xs text-toxic-green hover:text-dirty-yellow transition-colors p-1"
                    title="Copy address"
                  >
                    📋
                  </button>
                </div>

                {isLoadingBalance ? (
                  <div className="text-xs text-foreground/60 font-mono">Loading balance...</div>
                ) : error ? (
                  <div className="text-xs text-rust-orange font-mono flex items-center gap-1">
                    <span>⚠</span>
                    <span>Balance unavailable</span>
                    <button
                      onClick={fetchBalances}
                      className="ml-auto text-toxic-green hover:text-dirty-yellow underline text-[10px]"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-dirty-yellow font-mono">{balance?.toFixed(4)} SOL</p>
                    <p className="text-xs text-toxic-green font-mono">{datxBalance?.toFixed(2)} $DATX</p>
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="flex-1 border-rust-orange text-rust-orange font-mono bg-transparent hover:bg-rust-orange/10 text-xs"
                >
                  Disconnect
                </Button>
                <Button
                  onClick={() => onOpenChange(false)}
                  className="flex-1 bg-sewer-brown hover:bg-rust-orange text-foreground font-mono text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 mt-6 pt-4 border-t border-sewer-brown/50 text-center text-xs text-foreground/60 font-mono bg-sewer-green">
          Powered by Alchemy – RPC for the sewer
        </div>
      </DialogContent>
    </Dialog>
  )
}
