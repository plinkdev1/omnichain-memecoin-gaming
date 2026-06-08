"use server"

import { createClient } from "@/lib/supabase/server"

export async function initializeTeamDatabase() {
  try {
    const supabase = await createClient()

    // Check if team_groups table exists by trying to query it
    const { data: existingGroups, error: queryError } = await supabase.from("team_groups").select("id").limit(1)

    // If table doesn't exist, return error with instructions
    if (queryError?.code === "PGRST116") {
      console.error("[v0] team_groups table does not exist. Run the migration script first.")
      return {
        success: false,
        error: "Database not initialized. Run migration script 005_create_team_groups_v2.sql",
        needsMigration: true,
      }
    }

    // Table exists, ensure default groups are present
    const defaultGroups = [
      {
        name: "New Ideas",
        description: "Brainstorming any new concepts or features",
        access_level: "open",
        is_private_messages: false,
      },
      {
        name: "Lores Picture Ideas",
        description:
          "Dedicated to visual lore and image ideas. No explicit hate, sexual/pedophile content, violence, or discriminatory ideas – keep it satirical, creative, and compliant.",
        access_level: "open",
        is_private_messages: false,
      },
      {
        name: "Technical TODOs",
        description: "Development and tech tasks",
        access_level: "open",
        is_private_messages: false,
      },
      {
        name: "DAO TODOs",
        description: "Governance, multisig, treasury, and DAO-related tasks",
        access_level: "open",
        is_private_messages: false,
      },
      {
        name: "Design and Marketing TODOs",
        description: "Creative, visual, promo, and marketing tasks",
        access_level: "open",
        is_private_messages: false,
      },
      {
        name: "Messages to Founder",
        description: "Private channel for direct feedback and suggestions to the founder. Admin only visibility.",
        access_level: "private",
        is_private_messages: true,
      },
      {
        name: "Meeting PREP and Scheduling",
        description: "Planning calls, agendas, notes, and scheduling",
        access_level: "open",
        is_private_messages: false,
      },
    ]

    // Upsert groups to ensure they exist
    for (const group of defaultGroups) {
      const { error } = await supabase.from("team_groups").upsert([group], {
        onConflict: "name",
      })

      if (error) {
        console.error(`[v0] Error upserting group ${group.name}:`, error.message)
      }
    }

    console.log("[v0] Team database initialized successfully")
    return { success: true, needsMigration: false }
  } catch (error: any) {
    console.error("[v0] Database initialization error:", error.message)
    return { success: false, error: error.message, needsMigration: true }
  }
}
