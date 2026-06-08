-- Public Rooster submissions table
CREATE TABLE IF NOT EXISTS rooster_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  ipfs_hash TEXT NOT NULL,
  ipfs_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('meme', 'mascot', 'el_shito', 'general')),
  wallet_address TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  tips_received BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for filtering by category and week
CREATE INDEX IF NOT EXISTS idx_rooster_category ON rooster_submissions(category);
CREATE INDEX IF NOT EXISTS idx_rooster_week ON rooster_submissions(week_number, year);
CREATE INDEX IF NOT EXISTS idx_rooster_wallet ON rooster_submissions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_rooster_created ON rooster_submissions(created_at DESC);

-- RLS Policies
ALTER TABLE rooster_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can view submissions
CREATE POLICY "Rooster submissions are viewable by everyone"
  ON rooster_submissions FOR SELECT
  USING (true);

-- Anyone can insert submissions (wallet-gated on frontend)
CREATE POLICY "Anyone can submit to the rooster"
  ON rooster_submissions FOR INSERT
  WITH CHECK (true);

-- Tips tracking table
CREATE TABLE IF NOT EXISTS rooster_tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES rooster_submissions(id) ON DELETE CASCADE,
  from_wallet TEXT NOT NULL,
  amount BIGINT NOT NULL,
  signature TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for tips
CREATE INDEX IF NOT EXISTS idx_tips_submission ON rooster_tips(submission_id);
CREATE INDEX IF NOT EXISTS idx_tips_wallet ON rooster_tips(from_wallet);

-- RLS for tips
ALTER TABLE rooster_tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tips are viewable by everyone"
  ON rooster_tips FOR SELECT
  USING (true);

CREATE POLICY "Anyone can record tips"
  ON rooster_tips FOR INSERT
  WITH CHECK (true);

-- Function to update tips count
CREATE OR REPLACE FUNCTION update_tips_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE rooster_submissions
  SET tips_received = tips_received + NEW.amount,
      updated_at = NOW()
  WHERE id = NEW.submission_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update tips count
CREATE TRIGGER trigger_update_tips
  AFTER INSERT ON rooster_tips
  FOR EACH ROW
  EXECUTE FUNCTION update_tips_count();
