import type { Metadata } from "next"
import { BridgeClient } from "./bridge-client"

export const metadata: Metadata = {
  title: "Sewer Bridge – Flush $DATX Omnichain | DatXit",
  description:
    "Sewer Bridge – Take $DATX across chains. Flush omnichain via Stargate V2 powered by LayerZero. Supported: Ethereum, Arbitrum, Base, Optimism, Polygon, BSC.",
  openGraph: {
    title: "Sewer Bridge – Flush $DATX Omnichain",
    description: "Take the truth omnichain. Powered by Stargate.",
    url: "https://datxit.com/bridge",
  },
}

export default function BridgePage() {
  return <BridgeClient />
}
