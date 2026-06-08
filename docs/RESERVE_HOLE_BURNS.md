# Reserve Hole – Burn Mechanism Documentation

## Overview

The Reserve Hole is DatXit's deflationary burn mechanism. Users voluntarily burn $DATX tokens to reduce supply and fund the protocol treasury.

**Split:**
- **90%** – Permanently burned (sent to dead wallet, supply deflation)
- **10%** – Treasury funding (RaidX prizes, operations, development)

## Implementation

### Smart Contract Integration

**Burn Transaction Structure:**
```
User sends 100 $DATX
├─ 90 $DATX → Dead wallet (11111111111111111111111111111111)
└─ 10 $DATX → Treasury (AS6eLBveWWosdH1aQtefBxfvaJZDoqpoGmujemmcAcR4)
```

**On-Chain Instructions (Web3.js):**
```typescript
1. Create transfer instruction (90% burn)
   from: User's DATX ATA
   to: Dead wallet DATX ATA
   amount: 90,000,000 (for 100 tokens @ 9 decimals)

2. Create transfer instruction (10% treasury)
   from: User's DATX ATA
   to: Treasury DATX ATA
   amount: 10,000,000
```

### Database Schema

**Burns Table:**
```sql
- id (UUID, PK)
- user_address (TEXT) – Wallet that initiated burn
- burn_amount (BIGINT) – Amount sent to dead wallet (in smallest units)
- treasury_amount (BIGINT) – Amount sent to treasury
- total_amount (BIGINT) – Total $DATX flushed
- transaction_hash (TEXT, UNIQUE) – On-chain transaction signature
- timestamp (TIMESTAMP) – When burn occurred
- year, week_number – For weekly leaderboards
```

**Views:**
- `burn_stats_weekly` – Weekly burn totals and stats
- `burn_leaderboard` – Top 100 all-time burners

## Frontend Integration

### Components

**BurnWidget** (`components/burn-widget.tsx`)
- Reusable component for any page
- Displays burn amount input
- Shows 90%/10% split preview
- Handles transaction signing and confirmation

**Reserve Hole Page** (`app/reserve-hole/page.tsx`)
- Full page with hero section
- Live stats dashboard (total burned, weekly burned, burn pool, total flushes)
- How it works explanations
- Recent burns feed (when live)
- El Shito polaroid

### Usage

#### Add Burn Widget to a Page

```tsx
import { BurnWidget } from "@/components/burn-widget"

export default function MyPage() {
  const [isConnected, setIsConnected] = useState(false)

  const handleBurn = async (amount: number) => {
    // 1. Create transaction
    // 2. Sign with wallet
    // 3. Send to RPC
    // 4. Record in Supabase
  }

  return (
    <BurnWidget 
      isConnected={isConnected}
      onBurn={handleBurn}
      showPreview={true}
    />
  )
}
```

## Treasury Address

**Treasury ATA:** `AS6eLBveWWosdH1aQtefBxfvaJZDoqpoGmujemmcAcR4`

View on Solscan: `https://solscan.io/address/AS6eLBveWWosdH1aQtefBxfvaJZDoqpoGmujemmcAcR4`

## Stats & Leaderboard

### Live Stats (Refresh every 30 seconds)
```
Total Burned: SUM(burn_amount) from all burns
Weekly Burned: SUM(burn_amount) where year = CURRENT_YEAR AND week = CURRENT_WEEK
Burn Pool: SUM(treasury_amount) this week
Total Flushes: COUNT(*) of all burns
```

### Top Burners Leaderboard
Queries `burn_leaderboard` view, shows top 100 users by total flushed amount.

## Testing

### Development/Testnet Flow

1. **Devnet Testing:**
   - Use Solana devnet RPC
   - Create test tokens on devnet
   - Test burn + treasury split transactions
   - Verify Supabase recording

2. **Localnet (Optional):**
   ```bash
   solana-test-validator --url mainnet-beta
   ```

### Production Checklist

- [ ] Treasury ATA created and funded
- [ ] Dead wallet correctly set (11111...11111 system program)
- [ ] $DATX mint address confirmed
- [ ] Supabase schema migrated (`scripts/003_create_burns_table.sql`)
- [ ] Wallet adapter connected and tested
- [ ] Transaction signing verified
- [ ] Stats dashboard pulling correct on-chain data
- [ ] Leaderboard calculating correctly
- [ ] Recent burns feed live

## Security Considerations

1. **Dead Wallet:** Use system program (11111...11111) – no private key exists
2. **Treasury:** Multisig recommended for production (not required for MVP)
3. **Transaction Verification:** Always verify tx.signature on-chain before recording
4. **Rate Limiting:** Implement per-user rate limit to prevent spam burns
5. **Minimum Burn:** Enforce minimum burn amount (e.g., 1 token = 1,000,000,000 smallest units)

## Roadmap

**Phase 1 (Current):**
- Basic burn mechanism
- Supabase tracking
- Stats dashboard
- Treasury funding

**Phase 2:**
- Burn leaderboard with weekly rankings
- Burn milestones + achievements
- Airdrop to top weekly burners
- Burn predictions / supply forecasts

**Phase 3:**
- DAO voting on treasury usage
- Quarterly burn reports
- Integration with RaidX for burn-based contests
- Burn NFTs for top burners

## FAQ

**Q: Can I get my tokens back after burning?**
A: No. Burned tokens are permanently removed. This is intentional deflation.

**Q: Where does the 10% go?**
A: Treasury wallet. Used for RaidX prizes, development, merch, and operations.

**Q: How is the leaderboard calculated?**
A: By total $DATX flushed (burn_amount + treasury_amount). Weekly and all-time rankings available.

**Q: Can I burn without a wallet?**
A: No. Wallet signature required for on-chain transaction verification.

**Q: What's the maximum I can burn?**
A: No limit, but implement sensible minimums (1 token) and rate limits (1 burn per minute per user).
