"use client"

import { ContractAddressDisplay } from "./contract-address-display"

interface DexScreenerInlineProps {
  isExpanded: boolean
  contractAddress?: string
}

export function DexScreenerInlineStandalone({
  isExpanded,
  contractAddress = "HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump",
}: DexScreenerInlineProps) {
  const dexScreenerUrl = `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`

  if (!isExpanded) {
    return null
  }

  return (
    <div className="w-full bg-sewer-green border-2 border-sewer-brown rounded-lg overflow-hidden animate-slideDown">
      <div className="sticky top-0 z-10 bg-sewer-green p-4 border-b border-sewer-brown/50 flex items-center justify-between">
        <h3 className="text-toxic-green font-mono text-lg sm:text-xl flex items-center gap-2">
          <img src="/images/livechart.png" alt="chart" className="w-6 h-6" />
          $DATX Live Chart
        </h3>
      </div>

      <div className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] max-h-[700px] overflow-y-auto">
        <iframe
          src={dexScreenerUrl}
          title="DexScreener $DATX Chart"
          className="w-full h-full border-none"
          allow="clipboard-write"
          allowFullScreen
        />
      </div>

      <div className="p-4 border-t border-sewer-brown/50 bg-sewer-green">
        <ContractAddressDisplay contractAddress={contractAddress} />
      </div>
    </div>
  )
}
