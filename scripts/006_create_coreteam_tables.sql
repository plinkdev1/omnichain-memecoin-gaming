-- Create core_team_members table
CREATE TABLE IF NOT EXISTS public.core_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  added_by TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create core_team_groups table
CREATE TABLE IF NOT EXISTS public.core_team_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  access_level TEXT NOT NULL DEFAULT 'core_only',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create core_team_tasks table
CREATE TABLE IF NOT EXISTS public.core_team_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.core_team_groups(id) ON DELETE CASCADE,
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

-- Create core_team_audit_log table
CREATE TABLE IF NOT EXISTS public.core_team_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  actor_wallet TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all core team tables
ALTER TABLE public.core_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.core_team_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.core_team_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.core_team_audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies for core_team_members (readable if approved member)
CREATE POLICY "Approved members can view members list"
  ON public.core_team_members
  FOR SELECT
  USING (true);

-- Create policies for core_team_groups (readable for all authenticated)
CREATE POLICY "Core groups are readable"
  ON public.core_team_groups
  FOR SELECT
  USING (true);

-- Create policies for core_team_tasks (readable for all authenticated)
CREATE POLICY "Core tasks are readable"
  ON public.core_team_tasks
  FOR SELECT
  USING (true);

CREATE POLICY "Core tasks can be created"
  ON public.core_team_tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Core tasks can be updated"
  ON public.core_team_tasks
  FOR UPDATE
  USING (true);

-- Create policies for audit log (readable by all)
CREATE POLICY "Audit log is readable"
  ON public.core_team_audit_log
  FOR SELECT
  USING (true);

CREATE POLICY "Audit log can be created"
  ON public.core_team_audit_log
  FOR INSERT
  WITH CHECK (true);

-- Insert core team admin (your wallet)
INSERT INTO public.core_team_members (wallet_address, status, added_by) VALUES
  ('JCx2tdw26o4x2V5dDfCt3BNhH43YrAgtzLjMmMNZdXQ6', 'approved', 'system')
ON CONFLICT (wallet_address) DO NOTHING;

-- Insert default core team groups
INSERT INTO public.core_team_groups (name, description, access_level) VALUES
  ('Strategic Planning', 'Long-term vision, roadmap, and critical decisions', 'core_only'),
  ('Security & Treasury', 'Wallet management, security protocols, treasury discussions', 'core_only'),
  ('Technical Roadmap', 'Core development priorities, architecture decisions, tech stack', 'core_only'),
  ('Partnership & Growth', 'Strategic partnerships, fundraising, business development', 'core_only'),
  ('Operations', 'Team coordination, processes, hiring, admin tasks', 'core_only'),
  ('Crisis Management', 'Emergency protocols, incident response, damage control', 'core_only'),
  ('Confidential Notes', 'Private founder notes, sensitive feedback, internal analysis', 'core_only')
ON CONFLICT (name) DO NOTHING;
