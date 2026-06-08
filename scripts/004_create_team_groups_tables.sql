-- Create team_groups table
CREATE TABLE IF NOT EXISTS public.team_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  access_level TEXT NOT NULL DEFAULT 'open', -- 'open' or 'private'
  is_private_messages BOOLEAN DEFAULT FALSE, -- TRUE for "Messages to Founder"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_tasks table
CREATE TABLE IF NOT EXISTS public.team_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.team_groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo', -- 'todo', 'doing', 'done'
  assignee TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  labels TEXT[], -- Array of label strings
  attachments TEXT[], -- Array of file URLs
  comments JSONB DEFAULT '[]'::jsonb,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.team_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_groups - Anyone authenticated can read all groups
CREATE POLICY "Anyone can view groups" ON public.team_groups
  FOR SELECT USING (true);

-- RLS Policies for team_tasks - Anyone authenticated can view tasks from non-private groups
CREATE POLICY "View non-private group tasks" ON public.team_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_groups 
      WHERE id = team_tasks.group_id 
      AND NOT is_private_messages
    )
  );

-- Anyone can create tasks
CREATE POLICY "Anyone can create tasks" ON public.team_tasks
  FOR INSERT WITH CHECK (true);

-- Users can update their own tasks
CREATE POLICY "Update own tasks" ON public.team_tasks
  FOR UPDATE USING (
    created_by = auth.jwt() ->> 'sub' OR
    (SELECT is_private_messages FROM public.team_groups WHERE id = team_tasks.group_id) = FALSE
  );

-- Insert the 7 default groups
INSERT INTO public.team_groups (name, description, access_level, is_private_messages) VALUES
  ('New Ideas', 'Brainstorming any new concepts or features', 'open', FALSE),
  ('Lores Picture Ideas', 'Dedicated to visual lore and image ideas. No explicit hate, sexual/pedophile content, violence, or discriminatory ideas – keep it satirical, creative, and compliant.', 'open', FALSE),
  ('Technical TODOs', 'Development and tech tasks', 'open', FALSE),
  ('DAO TODOs', 'Governance, multisig, treasury, and DAO-related tasks', 'open', FALSE),
  ('Design and Marketing TODOs', 'Creative, visual, promo, and marketing tasks', 'open', FALSE),
  ('Messages to Founder', 'Private channel for direct feedback and suggestions to the founder. Admin only visibility.', 'private', TRUE),
  ('Meeting PREP and Scheduling', 'Planning calls, agendas, notes, and scheduling', 'open', FALSE)
ON CONFLICT (name) DO NOTHING;
