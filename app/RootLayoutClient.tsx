"use client"

import type React from "react"
import { useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import { Navbar, type WalletModalState } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FakeErrorPopup } from "@/components/fake-error-popup"
import { SewerChatButton } from "@/components/sewer-chat-button"
import { CookieBanner } from "@/components/cookie-banner"
import SewerOracleChat from "@/components/sewer-oracle-chat"
import OracleTeaserModal from "@/components/oracle-teaser-modal"
import DisclaimerModal from "@/components/disclaimer-modal"
import SewerAdsSection from "@/components/sewer-ads-section"
import { WalletConnectModal } from "@/components/wallet-connect-modal"

interface RootLayoutClientProps {
  children: React.ReactNode
  geistClassName: string
  geistMonoClassName: string
}

export function RootLayoutClient({ children, geistClassName, geistMonoClassName }: RootLayoutClientProps) {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const walletModalState: WalletModalState = {
    open: walletModalOpen,
    setOpen: setWalletModalOpen,
  }

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistClassName} font-sans antialiased bg-sewer-green glitch-container`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/backgrounds/wallpaper-01-sewer-network.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="cracked-overlay" />
        <div className="min-h-screen flex flex-col">
          <Navbar walletModalState={walletModalState} />
          <main className="flex-1 pt-20">{children}</main>
          <LayoutWithAds />
          <Footer />
        </div>
        <DisclaimerModal />
        <CookieBanner />
        <OracleTeaserModal />
        <SewerChatButton />
        <SewerOracleChat />
        <FakeErrorPopup />
        <WalletConnectModal
          isOpen={walletModalOpen}
          onOpenChange={setWalletModalOpen}
          onConnect={() => setIsConnected(true)}
          onDisconnect={() => setIsConnected(false)}
        />
        <Analytics />
      </body>
    </html>
  )
}

function LayoutWithAds() {
  return <SewerAdsSection />
}
