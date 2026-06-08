-- Insert the 7 core team groups into core_team_groups table
INSERT INTO public.core_team_groups (name, description, access_level, created_at, updated_at) VALUES
  ('Strategic Planning', 'Long-term strategy, roadmap, and business direction', 'restricted', NOW(), NOW()),
  ('Security & Compliance', 'Security incidents, audit findings, and compliance issues', 'restricted', NOW(), NOW()),
  ('Technical Roadmap', 'Core technical decisions and architecture planning', 'restricted', NOW(), NOW()),
  ('Partnerships & BD', 'Deal negotiations and partnership discussions', 'restricted', NOW(), NOW()),
  ('Operations & Finance', 'Budget, expenses, and operational decisions', 'restricted', NOW(), NOW()),
  ('Crisis Management', 'Emergency response and crisis decisions', 'restricted', NOW(), NOW()),
  ('Confidential Notes', 'Private founder notes and confidential discussions', 'restricted', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Verify groups were inserted
SELECT id, name, description FROM public.core_team_groups ORDER BY created_at;
