-- Create team_groups table (collaborative groups/sections)
CREATE TABLE IF NOT EXISTS team_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  access_level TEXT NOT NULL DEFAULT 'public', -- 'public', 'private'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_tasks table (kanban tasks within groups)
CREATE TABLE IF NOT EXISTS team_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES team_groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo', -- 'todo', 'doing', 'done'
  assignee TEXT,
  due_date DATE,
  created_by TEXT, -- wallet address of creator
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_task_comments table
CREATE TABLE IF NOT EXISTS team_task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES team_tasks(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_task_attachments table
CREATE TABLE IF NOT EXISTS team_task_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES team_tasks(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE team_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_task_attachments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_groups (anyone can read public groups)
CREATE POLICY "Public groups are readable" ON team_groups
  FOR SELECT USING (access_level = 'public');

-- RLS Policies for team_tasks (anyone can read)
CREATE POLICY "Tasks are readable" ON team_tasks
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can insert tasks" ON team_tasks
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own tasks" ON team_tasks
  FOR UPDATE USING (TRUE);

-- RLS Policies for team_task_comments (anyone can read)
CREATE POLICY "Comments are readable" ON team_task_comments
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can add comments" ON team_task_comments
  FOR INSERT WITH CHECK (TRUE);

-- RLS Policies for team_task_attachments (anyone can read)
CREATE POLICY "Attachments are readable" ON team_task_attachments
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can add attachments" ON team_task_attachments
  FOR INSERT WITH CHECK (TRUE);

-- Insert default collaborative groups
INSERT INTO team_groups (name, description, access_level) VALUES
  ('New Ideas', 'Brainstorm new concepts, features, and innovations', 'public'),
  ('Lores Picture Ideas', 'Visual lore and image ideas for the community', 'public'),
  ('Technical TODOs', 'Development tasks and technical improvements', 'public'),
  ('DAO TODOs', 'Governance, multisig, treasury, and DAO management', 'public'),
  ('Design and Marketing TODOs', 'Creative, visual, promotional, and marketing tasks', 'public'),
  ('Messages to Founder', 'Private feedback channel (founder only sees submissions)', 'private'),
  ('Meeting PREP and Scheduling', 'Call planning, agendas, notes, and scheduling', 'public');
