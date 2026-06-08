-- Create lore voting table for DatXit community lore selection
CREATE TABLE IF NOT EXISTS public.lore_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lore_type TEXT NOT NULL,
  votes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (but allow public read/write for voting - no auth required)
ALTER TABLE public.lore_votes ENABLE ROW LEVEL SECURITY;

-- Public can read all lore votes
CREATE POLICY "lore_votes_select_all"
  ON public.lore_votes FOR SELECT
  USING (true);

-- Public can update vote counts (for incrementing)
CREATE POLICY "lore_votes_update_all"
  ON public.lore_votes FOR UPDATE
  USING (true);

-- Insert initial lore options
INSERT INTO public.lore_votes (lore_type, votes) 
VALUES 
  ('Great Flush', 0),
  ('The Sewer Rebellion', 0),
  ('El Shito''s Origin', 0),
  ('Reserve Hole Chronicles', 0)
ON CONFLICT DO NOTHING;
