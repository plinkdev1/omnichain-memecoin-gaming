"use client"

import { usePathname } from "next/navigation"
import { SewerAdsSection } from "@/components/sewer-ads-section"

export default function ConditionalAdsSection() {
  const pathname = usePathname()

  const isLoungePage = ["/afterdark", "/private", "/feedback"].includes(pathname)

  if (isLoungePage) {
    return null
  }

  return <SewerAdsSection />
}
