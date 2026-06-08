import type { Metadata } from "next"
import { PageClient } from "./page.client"

export const metadata: Metadata = {
  title: "DatXit – Flush the System | Solana Memecoin | El Shito Vigilante",
  description:
    "DatXit – the shittiest token on Solana. Born Dec 21, 2025. Join the sewer revolution with Reserve Hole burns, community governance, and El Shito raids.",
  openGraph: {
    title: "DatXit – Flush the System",
    description: "The shittiest token on Solana. Join the sewer revolution.",
    url: "https://datxit.com",
  },
}

export default function HomePage() {
  return <PageClient />
}
