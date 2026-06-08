# DatXit Sewer Ads System – Developer Guide

## Overview

The "Get Tagged – Sewer Ads" system allows **3 independent, customizable ad slots per page**. Each page can have different advertisements, partners, or brands in each slot without affecting other pages.

## System Architecture

### Components

1. **AdSlot Component** (`/components/ad-slot.tsx`)
   - Reusable ad slot component
   - Accepts configuration for title, tagline, description, image, and link
   - Displays placeholder text if no custom config provided
   - Supports highlighting for carousel navigation

2. **SewerAdsSlots Component** (`/components/sewer-ads-slots.tsx`)
   - Container component that manages 3 ad slots
   - Mobile carousel functionality (Prev/Next buttons)
   - Desktop 3-column grid layout
   - Page-context aware (title reflects page theme)
   - Props: `pageContext`, `slot1`, `slot2`, `slot3`

3. **Legacy SewerAdsSection** (`/components/sewer-ads-section.tsx`)
   - Original global ads component (kept for backward compatibility)
   - Uses hardcoded ads array
   - Still used on pages without custom per-page ads

## How to Add Custom Ads to a Page

### Step 1: Import the Component
```tsx
import { SewerAdsSlots } from "@/components/sewer-ads-slots"
```

### Step 2: Define Ad Configurations
```tsx
const adConfigs = {
  slot1: {
    title: "Partnership Brand Name",
    tagline: "Your brand tagline here",
    description: "Description of the partnership or ad",
    imageUrl: "https://example.com/ad-banner.png",
    linkUrl: "https://partner-website.com",
    cta: "Visit →"
  },
  slot2: {
    title: "Another Brand",
    tagline: "Different tagline",
    description: "Another partnership description",
    imageUrl: "https://example.com/another-ad.png",
    linkUrl: "https://another-partner.com",
    cta: "Learn More →"
  },
  slot3: {
    title: "Third Partner",
    tagline: "Community spotlight",
    description: "Featured community project",
    // If no imageUrl, shows placeholder
    linkUrl: "/feedback?category=Advertising/Partnership",
    cta: "Get Tagged →"
  }
}
```

### Step 3: Use Component in Page
```tsx
export default function MyPage() {
  return (
    <>
      {/* Page content */}
      <SewerAdsSlots 
        pageContext="Lore Partners"
        slot1={adConfigs.slot1}
        slot2={adConfigs.slot2}
        slot3={adConfigs.slot3}
      />
    </>
  )
}
```

## Ad Configuration Object

Each slot accepts an optional `AdConfig` object:

```typescript
interface AdConfig {
  title: string           // Ad headline (e.g., "Reserve Hole Insurance")
  tagline: string         // Short tagline (e.g., "Your tokens. Their eternal home.")
  description: string     // Full description of the ad
  imageUrl?: string       // Optional banner image URL (300x250 or 728x90)
  linkUrl?: string        // Where the ad links to
  cta?: string           // Call-to-action text (default: "Learn More →")
}
```

### Optional Fields
- If `imageUrl` is omitted, a placeholder "300x250 or 728x90 banner" is shown
- If `linkUrl` is omitted, no CTA button is rendered
- If `cta` is omitted, defaults to "Learn More →"

## Page-Specific Slot Guidelines

### Home Page (`/`)
- **Slot 1**: General Solana ecosystem partners
- **Slot 2**: Token infrastructure projects
- **Slot 3**: Featured partnerships

### Lore Pages (`/lore`, `/tags`, `/afterdark`)
- **Slot 1**: Meme culture & satire projects
- **Slot 2**: Art & NFT protocols
- **Slot 3**: Community creators & artists

### Liquidity Pages (`/empire`, `/swamp`, `/dao`)
- **Slot 1**: DEXs & AMMs (Raydium, Marinade, etc.)
- **Slot 2**: Liquidity tools & protocols
- **Slot 3**: Farming & staking platforms

### Core Features Pages (`/rooster`, `/reserve-hole`)
- **Slot 1**: Feature-related utilities
- **Slot 2**: Complementary protocols
- **Slot 3**: Community spotlights

## Lounge Pages (No Ads)
The following pages **do NOT display ads** (via `ConditionalAdsSection`):
- `/afterdark` – AfterDark lounge
- `/private` – Private club
- `/feedback` – Feedback form (to reduce clutter)

To add ads to these pages, use `SewerAdsSlots` directly instead of relying on conditional rendering.

## Responsive Behavior

- **Desktop (md breakpoint)**: 3-column grid layout showing all slots
- **Mobile**: Carousel view with Prev/Next buttons showing 1 slot at a time
- **Highlight**: Current mobile slot has enhanced border glow and scale

## Styling & Theming

All ad slots automatically inherit:
- Sewer brown borders with neon green highlighting
- Toilet paper emoji decorative borders (top & bottom)
- Dripping effect background animation
- Glitch text effect on title
- Toxic green neon glow on hover

Customization can be done via Tailwind classes in `AdSlot` component.

## Migration from Legacy System

### Before (Global Ads)
```tsx
// Old approach - same ads everywhere
<ConditionalAdsSection /> // Uses SewerAdsSection with hardcoded ads
```

### After (Per-Page Customization)
```tsx
// New approach - custom ads per page
<SewerAdsSlots 
  pageContext="Page Theme"
  slot1={customConfig1}
  slot2={customConfig2}
  slot3={customConfig3}
/>
```

## Best Practices

1. **Use descriptive pageContext values**: "Lore Partners", "Liquidity Allies", "Core Team Friends"
2. **Keep ad copy concise**: Tagline should be under 40 chars
3. **Optimize images**: Use compressed banners (300x250px or 728x90px recommended)
4. **Test on mobile**: Always verify carousel navigation works smoothly
5. **Link externally for partners**: Use full URLs for external partnerships
6. **Internal links for feedback**: Use `/feedback?category=Advertising/Partnership` for self-promotion

## Example: Adding Ads to `/swamp` Page

```tsx
// app/swamp/page.tsx
import { SewerAdsSlots } from "@/components/sewer-ads-slots"

const SWAMP_ADS = {
  slot1: {
    title: "Raydium",
    tagline: "Your AMM on Solana",
    description: "Swap, farm, and provide liquidity on the fastest DEX.",
    imageUrl: "https://example.com/raydium-banner.png",
    linkUrl: "https://raydium.io",
    cta: "Trade on Raydium →"
  },
  // ... more slots
}

export default function SwampPage() {
  return (
    <>
      <SwampHeroSection />
      <SwampContent />
      <SewerAdsSlots 
        pageContext="Liquidity Allies"
        slot1={SWAMP_ADS.slot1}
        slot2={SWAMP_ADS.slot2}
        slot3={SWAMP_ADS.slot3}
      />
    </>
  )
}
```

## Troubleshooting

**Q: Ads not showing on my page?**
- A: Make sure you're using `SewerAdsSlots`, not `ConditionalAdsSection` (which hides ads on lounge pages)

**Q: Images not loading?**
- A: Check image URL is accessible and not blocked by CORS. Use full HTTPS URLs.

**Q: Mobile carousel not working?**
- A: Ensure component is wrapped in `"use client"` (it is by default)

**Q: Want to keep global fallback ads?**
- A: Use `ConditionalAdsSection` on pages without custom `SewerAdsSlots`

## Future Enhancements

- Database-backed ad management system
- Admin dashboard to manage ads per page
- Rotation/scheduling for multiple campaigns
- Analytics tracking for ad impressions & clicks
- Dynamic ad loading based on user region/wallet

---

**Last Updated**: 2025-12-28
**Maintained By**: DatXit Development Team
