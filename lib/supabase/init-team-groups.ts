import { createClient } from "@/lib/supabase/client"

export async function initializeTeamGroups() {
  const supabase = createClient()

  try {
    console.log("[v0] Starting team groups initialization...")

    // Check if groups already exist
    const { data: existingGroups, error: checkError } = await supabase.from("team_groups").select("*").limit(1)

    if (checkError) {
      console.error("[v0] Error checking team groups:", checkError.message)
      return false
    }

    // If groups already exist, don't insert them again
    if (existingGroups && existingGroups.length > 0) {
      console.log("[v0] Team groups already initialized:", existingGroups.length, "groups found")
      return true
    }

    console.log("[v0] No existing groups found, inserting defaults...")

    // Insert default collaborative groups
    const groupsToInsert = [
      {
        name: "New Ideas",
        description: "Brainstorm new concepts, features, and innovations",
        access_level: "public",
      },
      {
        name: "Lores Picture Ideas",
        description: "Visual lore and image ideas for the community",
        access_level: "public",
      },
      {
        name: "Technical TODOs",
        description: "Development tasks and technical improvements",
        access_level: "public",
      },
      {
        name: "DAO TODOs",
        description: "Governance, multisig, treasury, and DAO management",
        access_level: "public",
      },
      {
        name: "Design and Marketing TODOs",
        description: "Creative, visual, promotional, and marketing tasks",
        access_level: "public",
      },
      {
        name: "Messages to Founder",
        description: "Private feedback channel (founder only sees submissions)",
        access_level: "private",
      },
      {
        name: "Meeting PREP and Scheduling",
        description: "Call planning, agendas, notes, and scheduling",
        access_level: "public",
      },
    ]

    const { data, error } = await supabase.from("team_groups").insert(groupsToInsert).select()

    if (error) {
      console.error("[v0] Error inserting team groups:", error.message)
      return false
    }

    console.log("[v0] Team groups initialized successfully:", data?.length, "groups created")
    return true
  } catch (err: any) {
    console.error("[v0] Unexpected error initializing team groups:", err.message)
    return false
  }
}
