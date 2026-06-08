"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWallet } from "@solana/wallet-adapter-react"

export interface WalletModalState {
  open: boolean
  setOpen: (open: boolean) => void
}

interface NavbarProps {
  walletModalState: WalletModalState
}

export function Navbar({ walletModalState }: NavbarProps) {
  const [showNotice, setShowNotice] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { connected, publicKey } = useWallet()

  const toolsLinks = [
    { href: "/reserve-hole", label: "Reserve Hole" },
    { href: "/raidx", label: "RaidX Contests" },
    { href: "/rooster", label: "Public Rooster" },
    { href: "/dao", label: "SHIT DAO" },
    { href: "/council", label: "Shit High Council" },
    { href: "/swamp", label: "Liquidity Swamp" },
  ]

  const resourcesLinks = [
    { href: "/wallpapers", label: "Wallpapers", icon: "/images/spiral.png" },
    { href: "/lore", label: "El Shito Lore" },
    { href: "/events", label: "Events" },
    { href: "/tokenomics", label: "Tokenomics" },
    { href: "/brand", label: "Brand" },
    { href: "/store", label: "Raid Gear" },
    { href: "/empire", label: "Shit Empire" },
    { href: "/tags", label: "Global Tags" },
  ]

  const loungeLinks = [
    { href: "/afterdark", label: "After Dark – Adult Raid Gear", icon: "/images/flame.png" },
    { href: "/private", label: "Private Club (Coming Soon)", icon: "/images/lock.png" },
    { href: "/feedback", label: "Sewer Suggestions", icon: "/images/conversationcloud.png" },
  ]

  const shortAddress = connected && publicKey ? publicKey.toString().slice(0, 8) + "..." : null

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9998] border-b border-sewer-brown bg-sewer-green/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image src="/images/datxit-logo.png" alt="DatXit Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-dirty-yellow font-mono">DatXit</h1>
          <span className="text-xs text-toxic-green font-mono bg-sewer-brown px-2 py-1 rounded">$DATX</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-mono transition-colors ${
              pathname === "/" ? "text-toxic-green font-bold" : "text-foreground/80 hover:text-dirty-yellow"
            }`}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
              <button className="text-sm font-mono text-foreground/80 hover:text-dirty-yellow transition-colors cursor-pointer">
                Tools ▾
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-sewer-green border-sewer-brown z-[10000]">
              {toolsLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`text-sm font-mono cursor-pointer ${
                      pathname === link.href ? "text-toxic-green font-bold" : "text-foreground/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
              <button className="text-sm font-mono text-foreground/80 hover:text-dirty-yellow transition-colors cursor-pointer">
                Resources ▾
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-sewer-green border-sewer-brown z-[10000]">
              {resourcesLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`text-sm font-mono cursor-pointer flex items-center gap-2 ${
                      pathname === link.href ? "text-toxic-green font-bold" : "text-foreground/80"
                    }`}
                  >
                    {link.icon && <img src={link.icon || "/placeholder.svg"} alt="" className="w-5 h-5" />}
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
              <button className="text-sm font-mono text-pink-400 hover:text-pink-300 transition-colors font-bold cursor-pointer">
                Lounge ▾
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 border-pink-500 border-2 z-[10000]">
              {loungeLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`text-sm font-mono cursor-pointer flex items-center gap-2 ${
                      pathname === link.href ? "text-pink-300 font-bold" : "text-pink-400 hover:text-pink-300"
                    }`}
                  >
                    <img src={link.icon || "/placeholder.svg"} alt="" className="w-5 h-5" />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-sm text-foreground/80">
            <span className="font-mono">#DatXitToTheSewer</span>
            <img
              src="/icons/Toilet.png"
              alt="The one true throne of the sewer"
              className="w-8 h-8 toilet-icon hover:scale-125 transition-transform"
            />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-toxic-green transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12M6 12h12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Button
            onClick={() => walletModalState?.setOpen(true)}
            title={connected ? shortAddress : "Connect Your Wallet"}
            className={`rounded-lg p-2.5 transition-all flex items-center justify-center relative group ${
              connected
                ? "bg-toxic-green/10 border border-toxic-green/50 hover:bg-toxic-green/20"
                : "bg-transparent hover:bg-transparent"
            }`}
          >
            <svg
              className={`hidden sm:flex w-6 h-6 transition-all ${
                connected
                  ? "text-toxic-green group-hover:drop-shadow-[0_0_12px_rgba(0,255,100,0.8)]"
                  : "text-dirty-yellow group-hover:text-toxic-green group-hover:drop-shadow-[0_0_8px_rgba(0,255,100,0.6)]"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="5" width="20" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
              <rect x="16" y="12" width="4" height="3" rx="0.5" fill="currentColor" />
            </svg>

            <span className="sm:hidden text-sm font-mono transition-colors">💼</span>

            <span
              className={`hidden sm:inline text-xs font-mono ml-1 transition-colors ${
                connected ? "text-toxic-green" : "text-dirty-yellow group-hover:text-toxic-green"
              }`}
            >
              {connected ? shortAddress : "Connect"}
            </span>

            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-xs text-toxic-green font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-toxic-green/50">
              {connected ? "Wallet Connected" : "Connect Wallet"}
            </span>
          </Button>

          {showNotice && (
            <div className="absolute top-full right-0 mt-2 w-64 p-4 rusty-card rounded-lg text-xs text-foreground/90 z-50">
              <p className="font-mono mb-2 text-toxic-green">✓ Alchemy Connected</p>
              <p>You&apos;re now connected to the fastest RPC in the sewer. Transactions are sponsored. Gas is fake.</p>
              <button onClick={() => setShowNotice(false)} className="mt-2 text-rust-orange underline">
                Got it
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sewer-brown bg-sewer-green/98 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-mono py-2 px-3 rounded transition-colors ${
                pathname === "/"
                  ? "bg-sewer-brown text-toxic-green font-bold"
                  : "text-foreground/80 hover:bg-sewer-brown/50 hover:text-dirty-yellow"
              }`}
            >
              Home
            </Link>

            <div className="text-xs font-mono text-toxic-green px-3 pt-2">Tools</div>
            {toolsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-mono py-2 px-3 rounded transition-colors ${
                  pathname === link.href
                    ? "bg-sewer-brown text-toxic-green font-bold"
                    : "text-foreground/80 hover:bg-sewer-brown/50 hover:text-dirty-yellow"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="text-xs font-mono text-toxic-green px-3 pt-2">Resources</div>
            {resourcesLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-mono py-2 px-3 rounded transition-colors flex items-center gap-2 ${
                  pathname === link.href
                    ? "bg-sewer-brown text-toxic-green font-bold"
                    : "text-foreground/80 hover:bg-sewer-brown/50 hover:text-dirty-yellow"
                }`}
              >
                {link.icon && <img src={link.icon || "/placeholder.svg"} alt="" className="w-5 h-5" />}
                {link.label}
              </Link>
            ))}

            <div className="text-xs font-mono text-pink-400 px-3 pt-2">Lounge</div>
            {loungeLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-mono py-2 px-3 rounded transition-colors flex items-center gap-2 ${
                  pathname === link.href
                    ? "bg-black/50 text-pink-300 font-bold"
                    : "text-pink-400 hover:bg-black/50 hover:text-pink-300"
                }`}
              >
                <img src={link.icon || "/placeholder.svg"} alt="" className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
