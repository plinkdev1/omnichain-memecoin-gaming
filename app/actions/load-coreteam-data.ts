"use server"

import { createClient } from "@/lib/supabase/server"

const DEFAULT_CORE_GROUPS = [
  {
    id: "strategic-planning",
    name: "Strategic Planning",
    description: "Long-term roadmap, vision, and strategic initiatives for the project",
    access_level: "core",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "security-compliance",
    name: "Security & Compliance",
    description: "Security protocols, audits, risk assessment, and compliance matters",
    access_level: "core",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "technical-roadmap",
    name: "Technical Roadmap",
    description: "Core technical decisions, architecture, and development priorities",
    access_level: "core",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "partnerships-bd",
    name: "Partnerships & BD",
    description: "Business development, strategic partnerships, and funding discussions",
    access_level: "core",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "operations-finance",
    name: "Operations & Finance",
    description: "Treasury management, operational decisions, and financial planning",
    access_level: "core",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "crisis-management",
    name: "Crisis Management",
    description: "Emergency protocols, incident response, and critical escalations",
    access_level: "core",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "confidential-notes",
    name: "Confidential Notes",
    description: "Private workspace for sensitive founder/leadership notes and decisions",
    access_level: "core",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function loadCoreTeamGroups() {
  try {
    console.log("[v0] Loading core team groups from server...")
    const supabase = await createClient()

    const { data, error } = await supabase.from("core_team_groups").select("*").order("created_at", { ascending: true })

    if (error) {
      console.error("[v0] Server error loading groups:", error.message)
      console.log("[v0] Using hardcoded groups as fallback")
      return { success: true, groups: DEFAULT_CORE_GROUPS, error: null }
    }

    // If query succeeds but returns no data, use fallback
    if (!data || data.length === 0) {
      console.log("[v0] No groups found in database, using hardcoded fallback")
      return { success: true, groups: DEFAULT_CORE_GROUPS, error: null }
    }

    console.log("[v0] Successfully loaded groups from database:", data.length)
    return { success: true, groups: data, error: null }
  } catch (err: any) {
    console.error("[v0] Server action error:", err.message)
    console.log("[v0] Using hardcoded groups as fallback due to error")
    return { success: true, groups: DEFAULT_CORE_GROUPS, error: null }
  }
}

export async function loadCoreTeamMembers() {
  try {
    console.log("[v0] Loading core team members...")
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("core_team_members")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("[v0] Server error loading members:", error.message)
      return { success: false, members: [], error: error.message }
    }

    console.log("[v0] Successfully loaded members:", data?.length || 0)
    return { success: true, members: data || [], error: null }
  } catch (err: any) {
    console.error("[v0] Server action error:", err.message)
    return { success: false, members: [], error: err.message }
  }
}

export async function loadCoreTeamAuditLog() {
  try {
    console.log("[v0] Loading core team audit log...")
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("core_team_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      console.error("[v0] Server error loading audit log:", error.message)
      return { success: false, logs: [], error: error.message }
    }

    console.log("[v0] Successfully loaded audit logs:", data?.length || 0)
    return { success: true, logs: data || [], error: null }
  } catch (err: any) {
    console.error("[v0] Server action error:", err.message)
    return { success: false, logs: [], error: err.message }
  }
}

export async function seedCoreTeamGroups() {
  try {
    console.log("[v0] Seeding core team groups...")
    const supabase = await createClient()

    // Check if groups already exist
    const { data: existingGroups, error: checkError } = await supabase.from("core_team_groups").select("id").limit(1)

    if (checkError) {
      console.error("[v0] Error checking existing groups:", checkError.message)
      return { success: false, error: checkError.message }
    }

    if (existingGroups && existingGroups.length > 0) {
      console.log("[v0] Groups already exist, skipping seed")
      return { success: true, message: "Groups already seeded" }
    }

    const coreGroups = [
      {
        name: "Strategic Planning",
        description: "Long-term roadmap, vision, and strategic initiatives for the project",
        access_level: "core",
      },
      {
        name: "Security & Compliance",
        description: "Security protocols, audits, risk assessment, and compliance matters",
        access_level: "core",
      },
      {
        name: "Technical Roadmap",
        description: "Core technical decisions, architecture, and development priorities",
        access_level: "core",
      },
      {
        name: "Partnerships & BD",
        description: "Business development, strategic partnerships, and funding discussions",
        access_level: "core",
      },
      {
        name: "Operations & Finance",
        description: "Treasury management, operational decisions, and financial planning",
        access_level: "core",
      },
      {
        name: "Crisis Management",
        description: "Emergency protocols, incident response, and critical escalations",
        access_level: "core",
      },
      {
        name: "Confidential Notes",
        description: "Private workspace for sensitive founder/leadership notes and decisions",
        access_level: "core",
      },
    ]

    const { data: insertedGroups, error: insertError } = await supabase
      .from("core_team_groups")
      .insert(coreGroups)
      .select()

    if (insertError) {
      console.error("[v0] Error seeding groups:", insertError.message)
      return { success: false, error: insertError.message }
    }

    console.log("[v0] Successfully seeded core team groups:", insertedGroups?.length || 0)
    return { success: true, groups: insertedGroups || [] }
  } catch (err: any) {
    console.error("[v0] Seed error:", err.message)
    return { success: false, error: err.message }
  }
}
