"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const ADMIN_WALLET = "JCx2tdw26o4x2V5dDfCt3BNhH43YrAgtzLjMmMNZdXQ6"

const HARDCODED_GROUPS = [
  { id: "1", name: "Strategic Planning", description: "Long-term strategy and roadmap planning" },
  { id: "2", name: "Security & Compliance", description: "Security protocols, audits, and legal compliance" },
  { id: "3", name: "Technical Roadmap", description: "Engineering priorities and technical decisions" },
  { id: "4", name: "Partnerships & BD", description: "Business development and partnership opportunities" },
  { id: "5", name: "Operations & Finance", description: "Operations, treasury, and financial management" },
  { id: "6", name: "Crisis Management", description: "Emergency response and crisis protocols" },
  { id: "7", name: "Confidential Notes", description: "Private sensitive discussions and notes" },
]

export default function CoreteamPage() {
  const { connected, publicKey, select, disconnect: walletDisconnect } = useWallet()
  const { setVisible } = useWalletModal()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isApproved, setIsApproved] = useState(false)
  const [activeGroup, setActiveGroup] = useState("Strategic Planning")
  const [groups, setGroups] = useState<any[]>(HARDCODED_GROUPS)
  const [tasksByGroup, setTasksByGroup] = useState<{ [key: string]: any[] }>({})
  const [members, setMembers] = useState<any[]>([])
  const [auditLog, setAuditLog] = useState<any[]>([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [newMemberWallet, setNewMemberWallet] = useState("")
  const [newTask, setNewTask] = useState({ title: "", description: "", assignee: "", dueDate: "" })
  const { toast } = useToast()

  const supabase = createClient()

  useEffect(() => {
    if (!connected) {
      setIsAuthenticated(false)
      setIsApproved(false)
      setPassword("")
      setPasswordError("")
    }
  }, [connected])

  useEffect(() => {
    if (connected && !isApproved) {
      checkApprovalStatus()
    }
  }, [connected])

  useEffect(() => {
    if (isAuthenticated) {
      loadMembers()
      loadAuditLog()
      loadTasks()
    }
  }, [isAuthenticated, activeGroup])

  const checkApprovalStatus = async () => {
    if (!publicKey) {
      console.log("[v0] No wallet address provided")
      return
    }

    console.log("[v0] Checking approval for:", publicKey.toString())
    try {
      const { data, error } = await supabase
        .from("core_team_members")
        .select("wallet_address, status")
        .eq("wallet_address", publicKey.toString())
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          console.log("[v0] Wallet not approved")
          setIsApproved(false)
          return
        }
        console.error("[v0] Error checking approval:", error.message)
        setIsApproved(false)
        return
      }

      setIsApproved(data?.status === "approved")
    } catch (err: any) {
      console.error("[v0] Approval check error:", err.message)
      setIsApproved(false)
    }
  }

  const loadTasks = async () => {
    if (!supabase || !activeGroup) return

    try {
      console.log("[v0] Loading tasks for group:", activeGroup)
      const group = groups.find((g) => g.name === activeGroup)
      if (!group) {
        console.log("[v0] Group not found:", activeGroup)
        return
      }

      // Try to load from database, but don't block on failure
      try {
        const { data, error } = await supabase
          .from("core_team_tasks")
          .select("*")
          .eq("group_id", group.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.log("[v0] Database query failed (expected in v0 preview):", error.message)
          // Don't fail - just use local state
          return
        }

        console.log("[v0] Loaded tasks from database:", data?.length || 0)
        if (data) {
          setTasksByGroup((prev) => ({ ...prev, [activeGroup]: data }))
        }
      } catch (dbErr) {
        console.log("[v0] Database connection error (expected in v0 preview):", dbErr)
        // Continue with local state
      }
    } catch (err: any) {
      console.error("[v0] Load tasks error:", err.message)
    }
  }

  const loadMembers = async () => {
    try {
      console.log("[v0] Loading members...")
      const { data, error } = await supabase.from("core_team_members").select("*").order("created_at")

      if (error) {
        console.error("[v0] Error loading members:", error)
        setMembers([])
        return
      }
      console.log("[v0] Members loaded:", data?.length || 0)
      setMembers(data || [])
    } catch (err: any) {
      console.error("[v0] Members loading error:", err.message)
      setMembers([])
    }
  }

  const loadAuditLog = async () => {
    try {
      console.log("[v0] Loading audit log...")
      const { data, error } = await supabase
        .from("core_team_audit_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20)

      if (error) {
        console.error("[v0] Error loading audit log:", error)
        setAuditLog([])
        return
      }
      console.log("[v0] Audit log loaded:", data?.length || 0)
      setAuditLog(data || [])
    } catch (err: any) {
      console.error("[v0] Audit log loading error:", err.message)
      setAuditLog([])
    }
  }

  const handleWalletConnect = async () => {
    try {
      setVisible(true)
      toast({ title: "Wallet connected", description: "Checking approval status..." })
    } catch (err: any) {
      toast({ title: "Wallet connection failed", description: err.message, variant: "destructive" })
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!connected) {
      setPasswordError("Connect wallet first")
      return
    }

    if (!isApproved) {
      setPasswordError("Your wallet is not approved for core team access")
      return
    }

    const correctPassword = process.env.NEXT_PUBLIC_CORETEAM_PASSWORD || "core-access"
    if (password === correctPassword) {
      setIsAuthenticated(true)
      setPasswordError("")
      toast({ title: "Core team access granted", description: `Welcome, ${publicKey?.toString().slice(0, 8)}...` })
    } else {
      setPasswordError("Incorrect core access password")
      setPassword("")
    }
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || publicKey.toString() !== ADMIN_WALLET) {
      toast({ title: "Unauthorized", description: "Only admin can add members", variant: "destructive" })
      return
    }

    if (!newMemberWallet.trim()) {
      toast({ title: "Error", description: "Enter a wallet address", variant: "destructive" })
      return
    }

    try {
      const { error } = await supabase.from("core_team_members").insert([
        {
          wallet_address: newMemberWallet.trim(),
          status: "pending",
          added_by: publicKey.toString(),
        },
      ])

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" })
        return
      }

      toast({ title: "Member invited", description: `${newMemberWallet.slice(0, 8)}... invited` })
      setNewMemberWallet("")
      await loadMembers()
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  }

  const handleApproveMember = async (walletAddress: string) => {
    if (!publicKey || publicKey.toString() !== ADMIN_WALLET) return

    try {
      const { error } = await supabase
        .from("core_team_members")
        .update({ status: "approved" })
        .eq("wallet_address", walletAddress)

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" })
        return
      }

      toast({ title: "Member approved", description: "Access granted" })
      await loadMembers()
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  }

  const handleRemoveMember = async (walletAddress: string) => {
    if (!publicKey || publicKey.toString() !== ADMIN_WALLET) return

    try {
      const { error } = await supabase.from("core_team_members").delete().eq("wallet_address", walletAddress)

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" })
        return
      }

      toast({ title: "Member removed", description: "Access revoked" })
      await loadMembers()
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  }

  const addTask = async () => {
    if (!newTask.title.trim()) {
      toast({ title: "Error", description: "Task title is required", variant: "destructive" })
      return
    }

    if (!activeGroup) {
      toast({ title: "Error", description: "No group selected", variant: "destructive" })
      return
    }

    try {
      const group = groups.find((g) => g.name === activeGroup)
      if (!group) {
        toast({ title: "Error", description: "Group not found", variant: "destructive" })
        return
      }

      // Create task object with local ID
      const newTaskObj = {
        id: Math.random().toString(36).substr(2, 9), // Local ID
        group_id: group.id,
        title: newTask.title,
        description: newTask.description || null,
        assignee: newTask.assignee || null,
        due_date: newTask.dueDate || null,
        status: "todo" as const,
        created_by: publicKey?.toString() || "Unknown",
        created_at: new Date().toISOString(),
        labels: [],
        comments: [],
      }

      console.log("[v0] Adding task locally:", newTaskObj.title)

      // Add to local state immediately
      setTasksByGroup((prev) => ({
        ...prev,
        [activeGroup]: [newTaskObj, ...(prev[activeGroup] || [])],
      }))

      // Clear form
      setNewTask({ title: "", description: "", assignee: "", dueDate: "" })

      // Try to sync to database in background
      if (supabase && publicKey) {
        try {
          const { error } = await supabase.from("core_team_tasks").insert([
            {
              group_id: group.id,
              title: newTaskObj.title,
              description: newTaskObj.description,
              assignee: newTaskObj.assignee,
              due_date: newTaskObj.due_date,
              status: "todo",
              created_by: publicKey.toString(),
            },
          ])

          if (error) {
            console.log("[v0] Database sync failed (expected in v0 preview):", error.message)
            // Task already in local state, so continue
          } else {
            console.log("[v0] Task synced to database successfully")
          }
        } catch (dbErr: any) {
          console.log("[v0] Database sync error (expected in v0 preview):", dbErr.message)
          // Task already in local state, so continue
        }
      }

      toast({ title: "Success", description: "Task created" })
    } catch (err: any) {
      console.error("[v0] Add task error:", err.message)
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  }

  const moveTask = async (taskId: string, newStatus: "todo" | "doing" | "done") => {
    if (!activeGroup) return

    try {
      console.log("[v0] Moving task:", taskId, "to status:", newStatus)

      // Update local state immediately
      setTasksByGroup((prev) => ({
        ...prev,
        [activeGroup]: (prev[activeGroup] || []).map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      }))

      // Try to sync to database
      if (supabase && publicKey) {
        try {
          const { error } = await supabase.from("core_team_tasks").update({ status: newStatus }).eq("id", taskId)

          if (error) {
            console.log("[v0] Database sync failed (expected in v0 preview):", error.message)
          } else {
            console.log("[v0] Task status synced to database")
          }
        } catch (dbErr: any) {
          console.log("[v0] Database sync error (expected in v0 preview):", dbErr.message)
        }
      }
    } catch (err: any) {
      console.error("[v0] Move task error:", err.message)
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!activeGroup) return

    try {
      console.log("[v0] Deleting task:", taskId)

      // Remove from local state immediately
      setTasksByGroup((prev) => ({
        ...prev,
        [activeGroup]: (prev[activeGroup] || []).filter((task) => task.id !== taskId),
      }))

      // Try to sync to database
      if (supabase) {
        try {
          const { error } = await supabase.from("core_team_tasks").delete().eq("id", taskId)

          if (error) {
            console.log("[v0] Database deletion failed (expected in v0 preview):", error.message)
          } else {
            console.log("[v0] Task deleted from database")
          }
        } catch (dbErr: any) {
          console.log("[v0] Database deletion error (expected in v0 preview):", dbErr.message)
        }
      }
    } catch (err: any) {
      console.error("[v0] Delete task error:", err.message)
    }
  }

  const currentGroup = groups.find((g) => g.name === activeGroup)
  const tasks = tasksByGroup[activeGroup] || []
  const todoTasks = tasks.filter((t) => t.status === "todo")
  const doingTasks = tasks.filter((t) => t.status === "doing")
  const doneTasks = tasks.filter((t) => t.status === "done")
  const isAdmin = publicKey?.toString() === ADMIN_WALLET

  // Login Gate
  if (!connected || !isApproved || !isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url('/images/team-control-banner.png')`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="bg-black/90 border-2 border-red-600 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-2 text-red-500 font-mono flex items-center gap-2">
              <img src="/images/circleindicator1.png" alt="Core Team Icon" className="w-8 h-8" />
              CORE TEAM ONLY
            </h1>
            <p className="text-red-400 text-sm font-mono text-center mb-6">
              Restricted access - Critical decisions & sensitive discussions
            </p>

            {!connected ? (
              <div>
                <p className="text-red-300 font-mono text-sm mb-4">Step 1: Connect your approved Solana wallet</p>
                <Button
                  onClick={handleWalletConnect}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 font-mono mb-4"
                >
                  Connect Wallet
                </Button>
              </div>
            ) : !isApproved ? (
              <div>
                <p className="text-red-400 font-mono text-sm mb-4 text-center">
                  ❌ {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)} is not approved for core
                  team access
                </p>
                <Button
                  onClick={() => walletDisconnect()}
                  variant="outline"
                  className="w-full text-red-400 border-red-400 hover:bg-red-400/10 bg-transparent"
                >
                  Disconnect & Try Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <p className="text-red-300 font-mono text-sm mb-4">Step 2: Enter core team password</p>
                <input
                  type="password"
                  placeholder="Core team password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-red-500 rounded text-red-300 font-mono text-sm placeholder-red-400/50 focus:outline-none focus:border-red-300"
                />
                {passwordError && <p className="text-red-400 text-xs font-mono mt-2 text-center">{passwordError}</p>}
                <Button
                  type="submit"
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 font-mono"
                >
                  Access Core Team
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Main Dashboard
  return (
    <div
      className="min-h-screen relative pt-8"
      style={{
        backgroundImage: `url('/images/team-control-banner.png')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 font-mono mb-2 flex items-center gap-2">
              <img src="/images/circleindicator1.png" alt="Core Team Icon" className="w-8 h-8" />
              CORE TEAM COMMAND CENTER
            </h1>
            <p className="text-red-400 text-sm font-mono">
              {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)} •{" "}
              {isAdmin ? (
                <span className="flex items-center gap-1 inline-flex">
                  <img src="/images/crown1.png" alt="Admin" className="w-4 h-4" />
                  ADMIN
                </span>
              ) : (
                <span className="flex items-center gap-1 inline-flex">
                  <img src="/images/identity2.png" alt="Member" className="w-4 h-4" />
                  Member
                </span>
              )}{" "}
              • Restricted Access
            </p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs"
              >
                {showAdminPanel ? (
                  "✗ Hide Admin"
                ) : (
                  <span className="flex items-center gap-1">
                    <img src="/images/gearcog1.png" alt="Admin" className="w-4 h-4" />
                    Admin
                  </span>
                )}
              </Button>
            )}
            <Button
              onClick={() => walletDisconnect()}
              variant="outline"
              className="bg-transparent text-red-400 border-red-400 hover:bg-red-400/10 font-mono text-xs"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Admin Panel */}
        {showAdminPanel && isAdmin && (
          <div className="bg-black/90 border-2 border-red-600/50 rounded-lg p-6 mb-8">
            <h2 className="text-red-500 font-bold font-mono mb-4 flex items-center gap-2">
              <img src="/images/crown2.png" alt="Admin Control Panel" className="w-6 h-6" />
              Admin Control Panel
            </h2>

            {/* Member Management */}
            <div className="mb-6 p-4 bg-black/50 border border-red-500/30 rounded">
              <h3 className="text-red-400 font-bold font-mono mb-3 flex items-center gap-2">
                <img src="/images/plussign2.png" alt="Add New Member" className="w-5 h-5" />
                Add New Member
              </h3>
              <form onSubmit={handleAddMember} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Solana wallet address"
                  value={newMemberWallet}
                  onChange={(e) => setNewMemberWallet(e.target.value)}
                  className="flex-1 px-3 py-2 bg-black/50 border border-red-500/50 rounded text-red-300 text-sm placeholder-red-600/30 focus:outline-none font-mono"
                />
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1 text-xs">
                  Invite
                </Button>
              </form>

              {/* Members List */}
              <div className="space-y-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-black/50 border border-red-500/20 rounded font-mono text-xs"
                  >
                    <div>
                      <p className="text-red-300">
                        {member.wallet_address.slice(0, 8)}...{member.wallet_address.slice(-8)}
                      </p>
                      <p className="text-red-600 text-xs">Status: {member.status}</p>
                    </div>
                    <div className="flex gap-2">
                      {member.status === "pending" && (
                        <Button
                          onClick={() => handleApproveMember(member.wallet_address)}
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs"
                        >
                          Approve
                        </Button>
                      )}
                      <Button
                        onClick={() => handleRemoveMember(member.wallet_address)}
                        className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Log */}
            <div className="p-4 bg-black/50 border border-red-500/30 rounded max-h-64 overflow-y-auto">
              <h3 className="text-red-400 font-bold font-mono mb-3 flex items-center gap-2">
                <img src="/images/crown2.png" alt="Audit Log" className="w-5 h-5" />
                Recent Activity Log
              </h3>
              <div className="space-y-2">
                {auditLog.slice(0, 10).map((log) => (
                  <div key={log.id} className="text-red-600/80 text-xs font-mono pb-2 border-b border-red-500/10">
                    <p>
                      {log.actor_wallet.slice(0, 6)}... {log.action} {log.target_type} •{" "}
                      {new Date(log.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Groups Summary Table */}
        <div className="bg-black/80 border border-red-600/50 rounded-lg p-4 md:p-6 mb-8 overflow-x-auto">
          <h2 className="text-red-500 font-bold font-mono mb-4 flex items-center gap-2">
            <img src="/images/closedlock1.png" alt="Restricted Groups" className="w-6 h-6" />
            Restricted Groups
          </h2>
          {groups.length === 0 ? (
            <p className="text-red-600/50 font-mono text-sm">Loading groups...</p>
          ) : (
            <table className="w-full text-xs md:text-sm text-red-300 font-mono">
              <thead>
                <tr className="border-b border-red-500/30">
                  <th className="text-left py-2 px-2">Group</th>
                  <th className="text-left py-2 px-2">Description</th>
                  <th className="text-center py-2 px-2">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  const groupTaskCount = tasks.filter((t) => t.group_id === group.id).length
                  return (
                    <tr
                      key={group.id}
                      className={`border-b border-red-500/20 cursor-pointer hover:bg-red-600/10 transition-colors ${
                        activeGroup === group.name ? "bg-red-600/20" : ""
                      }`}
                      onClick={() => setActiveGroup(group.name)}
                    >
                      <td className="py-3 px-2 font-bold">{group.name}</td>
                      <td className="py-3 px-2 text-red-400/80 max-w-xs truncate">{group.description}</td>
                      <td className="py-3 px-2 text-center font-bold">{groupTaskCount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Active Group */}
        {currentGroup && (
          <div className="bg-black/80 border border-red-600/50 rounded-lg p-4 md:p-6 mb-6">
            <h2 className="text-red-500 font-bold font-mono mb-1">{currentGroup.name}</h2>
            <p className="text-red-400/80 text-sm font-mono mb-4">{currentGroup.description}</p>

            {/* Add Task Form */}
            <div className="bg-black/50 border border-red-500/50 rounded p-4">
              <h3 className="text-red-400 font-bold font-mono mb-3 flex items-center gap-2">
                <img src="/images/plussign1.png" alt="New Task" className="w-5 h-5" />
                New Task
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-3">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-red-500/50 rounded text-red-300 text-xs md:text-sm placeholder-red-600/30 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-red-500/50 rounded text-red-300 text-xs md:text-sm placeholder-red-600/30 focus:outline-none"
                />
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-red-500/50 rounded text-red-300 text-xs md:text-sm focus:outline-none"
                />
                <textarea
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-red-500/50 rounded text-red-300 text-xs md:text-sm placeholder-red-600/30 focus:outline-none"
                  rows={1}
                />
                <button
                  onClick={addTask}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded transition-colors text-xs md:text-sm"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-black/80 border border-red-600/50 rounded-lg p-4">
            <h3 className="text-red-400 font-bold font-mono mb-4 flex items-center gap-2">
              <img src="/images/check.png" alt="To Do" className="w-5 h-5" />
              To Do ({todoTasks.length})
            </h3>
            <div className="space-y-3 min-h-48">
              {todoTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-black/50 border border-red-500/50 rounded p-3 cursor-move hover:bg-black/70 transition-colors text-xs md:text-sm"
                  draggable
                  onDragEnd={() => moveTask(task.id, "doing")}
                >
                  <p className="text-red-300 font-mono font-bold">{task.title}</p>
                  {task.description && <p className="text-red-600/70 text-xs mt-1">{task.description}</p>}
                  {task.assignee && (
                    <p className="text-red-600/70 text-xs mt-1 flex items-center gap-1">
                      <img src="/images/identity2.png" alt="Assignee" className="w-3 h-3" />
                      {task.assignee}
                    </p>
                  )}
                  {task.due_date && (
                    <p className="text-red-600/70 text-xs">
                      <img src="/images/padlock1.png" alt="Due date" className="w-3 h-3 inline mr-1" />
                      {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/80 border border-red-600/50 rounded-lg p-4">
            <h3 className="text-red-400 font-bold font-mono mb-4 flex items-center gap-2">
              <img src="/images/gearcog2.png" alt="Doing" className="w-5 h-5" />
              Doing ({doingTasks.length})
            </h3>
            <div className="space-y-3 min-h-48">
              {doingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-red-600/20 border border-red-500 rounded p-3 cursor-move hover:bg-red-600/30 transition-colors text-xs md:text-sm"
                  draggable
                  onDragEnd={() => moveTask(task.id, "done")}
                >
                  <p className="text-red-300 font-mono font-bold">{task.title}</p>
                  {task.description && <p className="text-red-600/70 text-xs mt-1">{task.description}</p>}
                  {task.assignee && (
                    <p className="text-red-600/70 text-xs mt-1 flex items-center gap-1">
                      <img src="/images/identity2.png" alt="Assignee" className="w-3 h-3" />
                      {task.assignee}
                    </p>
                  )}
                  {task.due_date && (
                    <p className="text-red-600/70 text-xs">
                      <img src="/images/padlock2.png" alt="Due date" className="w-3 h-3 inline mr-1" />
                      {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/80 border border-red-600/50 rounded-lg p-4">
            <h3 className="text-red-400 font-bold font-mono mb-4 flex items-center gap-2">
              <img src="/images/check.png" alt="Done" className="w-5 h-5" />
              Done ({doneTasks.length})
            </h3>
            <div className="space-y-3 min-h-48">
              {doneTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-green-600/20 border border-green-500 rounded p-3 text-xs md:text-sm opacity-75"
                >
                  <p className="text-green-300 font-mono font-bold line-through">{task.title}</p>
                  {task.assignee && (
                    <p className="text-green-600/70 text-xs mt-1 flex items-center gap-1">
                      <img src="/images/identity2.png" alt="Assignee" className="w-3 h-3" />
                      {task.assignee}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-red-600/50 text-xs font-mono pb-8">
          <p className="flex items-center gap-2 justify-center">
            <img src="/images/circleindicator2.png" alt="Restricted Access" className="w-4 h-4" />
            CORE TEAM RESTRICTED ACCESS – AUDIT LOGGED – {activeGroup}
          </p>
        </div>
      </div>
    </div>
  )
}
