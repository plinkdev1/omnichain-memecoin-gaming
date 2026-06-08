-- Create team_groups table
CREATE TABLE IF NOT EXISTS public.team_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  access_level TEXT NOT NULL DEFAULT 'open',
  is_private_messages BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_tasks table
CREATE TABLE IF NOT EXISTS public.team_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.team_groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo',
  assignee TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  labels TEXT[],
  attachments TEXT[],
  comments JSONB DEFAULT '[]'::jsonb,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on team_groups
ALTER TABLE public.team_groups ENABLE ROW LEVEL SECURITY;

-- Enable RLS on team_tasks
ALTER TABLE public.team_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for team_groups (everyone can read)
CREATE POLICY "Team groups are publicly readable"
  ON public.team_groups
  FOR SELECT
  USING (true);

-- Create policies for team_tasks (everyone can read/write for wallet-gated users)
CREATE POLICY "Team tasks are readable"
  ON public.team_tasks
  FOR SELECT
  USING (true);

CREATE POLICY "Team tasks can be created"
  ON public.team_tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Team tasks can be updated"
  ON public.team_tasks
  FOR UPDATE
  USING (true);

-- Insert default groups
INSERT INTO public.team_groups (name, description, access_level, is_private_messages) VALUES
  ('New Ideas', 'Brainstorming any new concepts or features', 'open', false),
  ('Lores Picture Ideas', 'Dedicated to visual lore and image ideas. No explicit hate, sexual/pedophile content, violence, or discriminatory ideas – keep it satirical, creative, and compliant.', 'open', false),
  ('Technical TODOs', 'Development and tech tasks', 'open', false),
  ('DAO TODOs', 'Governance, multisig, treasury, and DAO-related tasks', 'open', false),
  ('Design and Marketing TODOs', 'Creative, visual, promo, and marketing tasks', 'open', false),
  ('Messages to Founder', 'Private channel for direct feedback and suggestions to the founder. Admin only visibility.', 'private', true),
  ('Meeting PREP and Scheduling', 'Planning calls, agendas, notes, and scheduling', 'open', false)
ON CONFLICT (name) DO NOTHING;
