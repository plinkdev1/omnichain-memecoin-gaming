"use client"

import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface ContractAddressDisplayProps {
  contractAddress?: string
}

export function ContractAddressDisplay({
  contractAddress = "HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump",
}: ContractAddressDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-sewer-brown/20 border-2 border-toxic-green rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-mono text-foreground/70">Official Contract Address (CA)</span>
        <Button
          onClick={handleCopy}
          size="sm"
          className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold h-8"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      <p className="font-mono text-sm font-bold text-dirty-yellow break-all leading-relaxed glow-text">
        {contractAddress}
      </p>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-xs border-rust-orange text-rust-orange hover:bg-rust-orange/10 bg-transparent"
          asChild
        >
          <a href={`https://solscan.io/token/${contractAddress}`} target="_blank" rel="noopener noreferrer">
            Solscan
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-xs border-toxic-green text-toxic-green hover:bg-toxic-green/10 bg-transparent"
          asChild
        >
          <a href={`https://dexscreener.com/solana/${contractAddress}`} target="_blank" rel="noopener noreferrer">
            DexScreener
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-xs border-dirty-yellow text-dirty-yellow hover:bg-dirty-yellow/10 bg-transparent"
          asChild
        >
          <a href={`https://pump.fun/coin/${contractAddress}`} target="_blank" rel="noopener noreferrer">
            pump.fun
          </a>
        </Button>
      </div>
    </div>
  )
}
