import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FakeErrorPopup } from "@/components/fake-error-popup"
import { WalletProvider } from "@/components/wallet-provider"
import { SewerChatButton } from "@/components/sewer-chat-button"
import { CookieBanner } from "@/components/cookie-banner"
import SewerOracleChat from "@/components/sewer-oracle-chat"
import OracleTeaserModal from "@/components/oracle-teaser-modal"
import DisclaimerModal from "@/components/disclaimer-modal"
import "./globals.css"
import { RootLayoutClient } from "@/app/RootLayoutClient"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DatXit $DATX – The Shittiest Memecoin on Solana | El Shito Vigilante",
  description:
    "DatXit – satirical Solana memecoin with Reserve Hole burns, Sewer Arena games, and El Shito tagging the world. Everything is shit. Join the sewer revolution.",
  generator: "v0.app",
  robots: "index, follow",
  icons: {
    icon: "/images/datxit-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://datxit.com",
    siteName: "DatXit",
    title: "DatXit $DATX – The Shittiest Memecoin on Solana | El Shito Vigilante",
    description:
      "DatXit – satirical Solana memecoin with Reserve Hole burns, Sewer Arena games, and El Shito tagging the world. Everything is shit. Join the sewer revolution.",
    images: [
      {
        url: "/images/datxit-logo.png",
        width: 1200,
        height: 630,
        alt: "DatXit neon logo - The Shittiest Memecoin on Solana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@DatXitSewer",
    creator: "@DatXitSewer",
    title: "DatXit $DATX – The Shittiest Memecoin on Solana",
    description:
      "Satirical Solana memecoin with Reserve Hole burns, Sewer Arena games, and El Shito tagging the world.",
    images: ["/images/datxit-logo.png"],
  },
  keywords: ["DatXit", "$DATX", "Solana", "memecoin", "El Shito", "burn token", "sewer", "deflationary"],
  alternates: {
    canonical: "https://datxit.com",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#2e4b2e",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${_geist.className} font-sans antialiased bg-sewer-green relative glitch-container`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/backgrounds/wallpaper-01-sewer-network.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="cracked-overlay" />
        <WalletProvider>
          <RootLayoutClient geistClassName={_geist.className} geistMonoClassName={_geistMono.className}>
            {children}
          </RootLayoutClient>
        </WalletProvider>
        <DisclaimerModal />
        <CookieBanner />
        <OracleTeaserModal />
        <SewerChatButton />
        <SewerOracleChat />
        <FakeErrorPopup />
        <Analytics />
      </body>
    </html>
  )
}
