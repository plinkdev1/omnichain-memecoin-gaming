-- Reserve Hole burn tracking
CREATE TABLE IF NOT EXISTS burns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL,
  amount BIGINT NOT NULL, -- in smallest unit (lamports for SOL, token smallest unit)
  burn_amount BIGINT NOT NULL, -- 90% burned
  treasury_amount BIGINT NOT NULL, -- 10% to treasury
  transaction_signature TEXT UNIQUE NOT NULL,
  week_number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_burns_week ON burns(year, week_number);
CREATE INDEX IF NOT EXISTS idx_burns_wallet ON burns(wallet_address);
CREATE INDEX IF NOT EXISTS idx_burns_created ON burns(created_at DESC);

-- Enable RLS
ALTER TABLE burns ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read burn stats
CREATE POLICY "Burns are publicly readable"
  ON burns FOR SELECT
  TO PUBLIC
  USING (true);

-- Allow anyone to insert burns (they'll be verified on-chain anyway)
CREATE POLICY "Anyone can record burns"
  ON burns FOR INSERT
  TO PUBLIC
  WITH CHECK (true);
