-- Create burns table to track Reserve Hole burn events
CREATE TABLE IF NOT EXISTS burns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_address TEXT NOT NULL,
  burn_amount BIGINT NOT NULL,
  treasury_amount BIGINT NOT NULL,
  total_amount BIGINT NOT NULL,
  transaction_hash TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  year INT NOT NULL,
  week_number INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient queries
CREATE INDEX idx_burns_year_week ON burns(year, week_number);
CREATE INDEX idx_burns_user_address ON burns(user_address);
CREATE INDEX idx_burns_timestamp ON burns(timestamp DESC);

-- Create burn stats view for quick stats
CREATE OR REPLACE VIEW burn_stats_weekly AS
SELECT
  year,
  week_number,
  COUNT(*) as total_burns,
  SUM(burn_amount) as total_burned,
  SUM(treasury_amount) as total_treasury,
  SUM(total_amount) as total_flushed
FROM burns
GROUP BY year, week_number
ORDER BY year DESC, week_number DESC;

-- Create leaderboard view for top burners
CREATE OR REPLACE VIEW burn_leaderboard AS
SELECT
  user_address,
  COUNT(*) as burn_count,
  SUM(burn_amount) as total_burned,
  SUM(treasury_amount) as total_treasury,
  SUM(total_amount) as total_flushed,
  MAX(timestamp) as last_burn
FROM burns
GROUP BY user_address
ORDER BY total_flushed DESC
LIMIT 100;
