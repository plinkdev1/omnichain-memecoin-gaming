"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { ContractAddressDisplay } from "./contract-address-display"

interface DexScreenerModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  contractAddress?: string
}

export function DexScreenerModal({
  isOpen,
  onOpenChange,
  contractAddress = "HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump",
}: DexScreenerModalProps) {
  const dexScreenerUrl = `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-sewer-green border-2 border-sewer-brown w-screen h-screen md:w-[90vw] md:max-w-4xl md:max-h-[90vh] overflow-y-auto p-0 flex flex-col top-0 left-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg md:pt-0 pt-12">
        <DialogHeader className="p-4 border-b border-sewer-brown/50 flex-shrink-0 sticky top-0 z-10 bg-sewer-green">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-toxic-green font-mono text-xl sm:text-2xl flex items-center gap-2">
              <img src="/images/livechart.png" alt="chart" className="w-6 h-6" />
              $DATX Live Chart
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="hover:bg-rust-orange/20 flex-shrink-0">
                <X className="w-5 h-5 text-toxic-green" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[600px] overflow-y-auto flex-1">
          <div className="w-full h-full flex items-center justify-center bg-sewer-green/50">
            <iframe
              src={dexScreenerUrl}
              title="DexScreener $DATX Chart"
              className="w-full h-full border-none"
              allow="clipboard-write"
              allowFullScreen
              onLoad={() => console.log("[v0] Chart iframe loaded")}
            />
          </div>
        </div>

        <div className="p-4 border-t border-sewer-brown/50 flex-shrink-0 bg-sewer-green">
          <ContractAddressDisplay contractAddress={contractAddress} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DexScreenerInline({
  isExpanded,
  contractAddress = "HwqrGdE2kb32PqyUQNg3vETUmmUbkmG3KnS9rVMWpump",
}: {
  isExpanded: boolean
  contractAddress?: string
}) {
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
        <div className="w-full h-full flex items-center justify-center bg-sewer-green/50">
          <iframe
            src={dexScreenerUrl}
            title="DexScreener $DATX Chart"
            className="w-full h-full border-none"
            allow="clipboard-write"
            allowFullScreen
          />
          {/* Fallback loading text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-foreground/40 font-mono text-sm">
              Chart loading... Token on bonding curve – full data after graduation.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-sewer-brown/50 bg-sewer-green">
        <ContractAddressDisplay contractAddress={contractAddress} />
      </div>
    </div>
  )
}
