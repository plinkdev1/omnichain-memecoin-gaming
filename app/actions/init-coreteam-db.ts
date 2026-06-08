"use server"

import { createClient } from "@/lib/supabase/server"

export async function initializeCoreteamDatabase() {
  try {
    const supabase = createClient()
    console.log("[v0] Initializing core team database...")

    const { data: tableCheck, error: checkError } = await supabase
      .from("core_team_members")
      .select("count", { count: "exact" })
      .limit(1)

    if (checkError && checkError.code === "PGRST116") {
      console.log("[v0] Core team table does not exist")
      return { success: false, needsMigration: true }
    }

    if (checkError) {
      console.error("[v0] Error checking core team table:", checkError.message)
      return { success: false, error: checkError.message }
    }

    console.log("[v0] Core team database initialized successfully")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Core team init error:", error)
    return { success: false, error: error.message }
  }
}

export async function checkIfApprovedMember(walletAddress: string) {
  try {
    console.log("[v0] Checking approval status for wallet:", walletAddress)

    let supabase: any
    try {
      supabase = createClient()
    } catch (clientError) {
      console.error("[v0] Failed to create Supabase client:", clientError)
      return false
    }

    if (!supabase || typeof supabase.from !== "function") {
      console.error("[v0] Supabase client is not properly initialized")
      return false
    }

    const { data, error } = await supabase
      .from("core_team_members")
      .select("wallet_address, status")
      .eq("wallet_address", walletAddress)
      .single()

    console.log("[v0] Query result - Data:", data, "Error:", error?.message)

    if (error) {
      if (error.code === "PGRST116") {
        console.log("[v0] Wallet not found in approved members")
        return false
      }
      console.error("[v0] Error checking member status:", error.message)
      return false
    }

    const isApproved = data?.status === "approved"
    console.log("[v0] Approval result:", { wallet: walletAddress, status: data?.status, isApproved })
    return isApproved
  } catch (error: any) {
    console.error("[v0] Member check error:", error.message)
    return false
  }
}

export async function addCoreteamMember(walletAddress: string, adminWallet: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("core_team_members").insert([
      {
        wallet_address: walletAddress,
        status: "pending",
        added_by: adminWallet,
      },
    ])

    if (error) {
      return { success: false, error: error.message }
    }

    // Log the action
    await supabase.from("core_team_audit_log").insert([
      {
        action: "MEMBER_INVITED",
        actor_wallet: adminWallet,
        target_type: "member",
        target_id: walletAddress,
        details: { status: "pending" },
      },
    ])

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Add member error:", error)
    return { success: false, error: error.message }
  }
}

export async function approvCoreteamMember(walletAddress: string, adminWallet: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from("core_team_members")
      .update({ status: "approved" })
      .eq("wallet_address", walletAddress)

    if (error) {
      return { success: false, error: error.message }
    }

    // Log the action
    await supabase.from("core_team_audit_log").insert([
      {
        action: "MEMBER_APPROVED",
        actor_wallet: adminWallet,
        target_type: "member",
        target_id: walletAddress,
        details: { status: "approved" },
      },
    ])

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Approve member error:", error)
    return { success: false, error: error.message }
  }
}

export async function removeCoreteamMember(walletAddress: string, adminWallet: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("core_team_members").delete().eq("wallet_address", walletAddress)

    if (error) {
      return { success: false, error: error.message }
    }

    // Log the action
    await supabase.from("core_team_audit_log").insert([
      {
        action: "MEMBER_REMOVED",
        actor_wallet: adminWallet,
        target_type: "member",
        target_id: walletAddress,
      },
    ])

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Remove member error:", error)
    return { success: false, error: error.message }
  }
}

export async function seedCoreTeamGroups() {
  try {
    console.log("[v0] Seeding core team groups...")
    const supabase = createClient()

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
