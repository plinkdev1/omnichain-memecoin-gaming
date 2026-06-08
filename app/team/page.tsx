"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { initializeTeamDatabase } from "@/app/actions/init-team-db"

export default function TeamPage() {
  const { connected, publicKey, disconnect: walletDisconnect } = useWallet()
  const { setVisible } = useWalletModal()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [activeGroup, setActiveGroup] = useState("New Ideas")
  const [groups, setGroups] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [newTask, setNewTask] = useState({ title: "", description: "", assignee: "", dueDate: "" })
  const [isInitializing, setIsInitializing] = useState(false)
  const { toast } = useToast()

  const supabase = createClient()

  useEffect(() => {
    if (!connected) {
      setIsAuthenticated(false)
      setPassword("")
      setPasswordError("")
    }
  }, [connected])

  useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      const initDB = async () => {
        setIsInitializing(true)
        try {
          console.log("[v0] Initializing team database...")
          const result = await initializeTeamDatabase()
          console.log("[v0] Init result:", result)
          if (result.success) {
            console.log("[v0] Database initialized, loading groups...")
            await loadGroups()
          } else if (result.needsMigration) {
            console.error("[v0] Database migration needed - please run the SQL script")
            toast({
              title: "Setup needed",
              description: "Run the migration script 005_create_team_groups_v2.sql in your Supabase dashboard",
              variant: "destructive",
            })
          }
        } catch (err) {
          console.error("[v0] Init error:", err)
          toast({
            title: "Error initializing",
            description: "Check console for details",
            variant: "destructive",
          })
        } finally {
          setIsInitializing(false)
        }
      }
      initDB()
    }
  }, [isAuthenticated, isInitializing])

  useEffect(() => {
    if (isAuthenticated && groups.length > 0) {
      loadTasks()
    }
  }, [activeGroup, groups])

  const loadGroups = async () => {
    try {
      console.log("[v0] Loading groups from Supabase...")
      const { data, error } = await supabase.from("team_groups").select("*").order("created_at", { ascending: true })

      if (error) {
        console.error("[v0] Error loading groups:", error.message)
        return
      }
      console.log("[v0] Groups loaded:", data?.length || 0, "groups")
      setGroups(data || [])
      if (data && data.length > 0 && !activeGroup) {
        setActiveGroup(data[0].name)
      }
    } catch (err: any) {
      console.error("[v0] Failed to load groups:", err)
    }
  }

  const loadTasks = async () => {
    try {
      const group = groups.find((g) => g.name === activeGroup)
      if (!group) {
        console.log("[v0] No group found for:", activeGroup)
        return
      }

      const { data, error } = await supabase
        .from("team_tasks")
        .select("*")
        .eq("group_id", group.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error loading tasks:", error)
        return
      }
      console.log("[v0] Loaded", data?.length || 0, "tasks for group", activeGroup)
      setTasks(data || [])
    } catch (err: any) {
      console.error("[v0] Failed to load tasks:", err)
    }
  }

  const handleWalletConnect = async () => {
    try {
      setVisible(true)
      toast({ title: "Wallet connected", description: "Now enter the sewer password to access." })
    } catch (err: any) {
      toast({
        title: "Wallet connection failed",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!connected) {
      setPasswordError("Connect wallet first")
      return
    }

    const correctPassword = process.env.NEXT_PUBLIC_TEAM_PASSWORD || "sewer-access"
    if (password === correctPassword) {
      setIsAuthenticated(true)
      setPasswordError("")
      toast({
        title: "Access granted",
        description: `Welcome, ${publicKey?.toString().slice(0, 8)}...${publicKey?.toString().slice(-8)}`,
      })
    } else {
      setPasswordError("Access denied. Wrong flush.")
      setPassword("")
    }
  }

  const addTask = async () => {
    if (!newTask.title.trim() || !supabase) return

    try {
      const group = groups.find((g) => g.name === activeGroup)
      if (!group) return

      const { error } = await supabase.from("team_tasks").insert([
        {
          group_id: group.id,
          title: newTask.title,
          description: newTask.description || null,
          assignee: newTask.assignee || null,
          due_date: newTask.dueDate || null,
          status: "todo",
          created_by: publicKey?.toString(),
        },
      ])

      if (error) {
        console.error("[v0] Error adding task:", error)
        return
      }
      setNewTask({ title: "", description: "", assignee: "", dueDate: "" })
      await loadTasks()
      toast({ title: "Task added", description: "Task created successfully" })
    } catch (err: any) {
      toast({
        title: "Failed to add task",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const moveTask = async (taskId: string, newStatus: "todo" | "doing" | "done") => {
    if (!supabase) return

    try {
      const { error } = await supabase.from("team_tasks").update({ status: newStatus }).eq("id", taskId)

      if (error) {
        console.error("[v0] Error updating task:", error)
        return
      }
      await loadTasks()
    } catch (err: any) {
      toast({
        title: "Failed to update task",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  if (!connected || !isAuthenticated) {
    return (
      <div
        className="min-h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/team-control-banner.png')`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="bg-black/80 border-2 border-pink-500 rounded-lg p-8 shadow-lg shadow-pink-500/50 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <img src="/images/sewer-faucet-icon.png" alt="Sewer Control Room" className="h-16 w-auto" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2 text-pink-400 font-mono">Sewer Control Room</h1>
            <p className="text-center text-pink-300 text-sm font-mono mb-6">
              Authorized personnel only. Real degens only.
            </p>

            {!connected ? (
              <div className="space-y-4">
                <p className="text-center text-pink-300 text-sm font-mono">
                  Step 1: Connect your Solana wallet to prove you're real.
                </p>
                <Button
                  onClick={handleWalletConnect}
                  className="w-full bg-toxic-green hover:bg-toxic-green/80 text-black font-bold py-2 px-4 rounded transition-colors"
                >
                  Connect Wallet
                </Button>
                <p className="text-xs text-pink-300/50 font-mono text-center">
                  You need Phantom wallet installed. Get it free at phantom.app
                </p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="p-3 bg-toxic-green/20 rounded text-xs text-toxic-green font-mono text-center">
                  ✓ Wallet connected: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
                </div>

                <div>
                  <p className="text-center text-pink-300 text-sm font-mono mb-3">Step 2: Enter the sewer password.</p>
                  <input
                    type="password"
                    placeholder="Enter sewer passcode"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-black/50 border border-pink-400 rounded text-pink-300 font-mono text-sm placeholder-pink-400/50 focus:outline-none focus:border-pink-300"
                  />
                </div>
                {passwordError && <p className="text-red-400 text-xs font-mono text-center">{passwordError}</p>}
                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-black font-bold py-2 px-4 rounded transition-colors"
                >
                  Access Sewer
                </button>

                <Button
                  type="button"
                  onClick={() => walletDisconnect()}
                  variant="outline"
                  className="w-full bg-transparent text-pink-400 border-pink-400 hover:bg-pink-400/10 font-mono text-xs"
                >
                  Disconnect Wallet
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  const currentGroup = groups.find((g) => g.name === activeGroup)
  const todoTasks = tasks.filter((t) => t.status === "todo")
  const doingTasks = tasks.filter((t) => t.status === "doing")
  const doneTasks = tasks.filter((t) => t.status === "done")

  return (
    <div
      className="min-h-screen relative pt-8"
      style={{
        backgroundImage: `url('/images/team-control-banner.png')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <img src="/images/sewer-faucet-icon.png" alt="Sewer Control Room" className="h-10 w-auto" />
              <h1 className="text-3xl md:text-4xl font-bold text-pink-400 font-mono">Sewer Control Room</h1>
            </div>
            <p className="text-pink-300 text-sm font-mono">
              Welcome, {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)} – Multi-group
              collaboration hub
            </p>
            <p className="text-xs text-pink-400/60 font-mono mt-2">
              💡 Satire & dark humor project. Read our{" "}
              <a href="/disclaimer" className="underline hover:text-pink-300">
                disclaimer
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline hover:text-pink-300">
                community guidelines
              </a>
              .
            </p>
          </div>
          <Button
            onClick={() => walletDisconnect()}
            variant="outline"
            className="bg-transparent text-pink-400 border-pink-400 hover:bg-pink-400/10 font-mono text-xs"
          >
            Disconnect
          </Button>
        </div>

        {/* Summary Table */}
        <div className="bg-black/80 border border-pink-500/50 rounded-lg p-4 md:p-6 mb-8 overflow-x-auto">
          <h2 className="text-pink-400 font-bold font-mono mb-4">📊 Collaborative Groups Overview</h2>
          {groups.length === 0 ? (
            <p className="text-pink-400/50 font-mono text-sm">Loading groups...</p>
          ) : (
            <table className="w-full text-xs md:text-sm text-pink-300 font-mono">
              <thead>
                <tr className="border-b border-pink-500/30">
                  <th className="text-left py-2 px-2">Group Name</th>
                  <th className="text-left py-2 px-2">Description</th>
                  <th className="text-left py-2 px-2">Access</th>
                  <th className="text-center py-2 px-2">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  const groupTaskCount = tasks.filter((t) => t.group_id === group.id).length
                  return (
                    <tr
                      key={group.id}
                      className={`border-b border-pink-500/20 cursor-pointer hover:bg-pink-500/10 transition-colors ${
                        activeGroup === group.name ? "bg-pink-500/20" : ""
                      }`}
                      onClick={() => setActiveGroup(group.name)}
                    >
                      <td className="py-3 px-2 font-bold">{group.name}</td>
                      <td className="py-3 px-2 text-pink-400/80 max-w-xs truncate">{group.description}</td>
                      <td className="py-3 px-2">{group.access_level === "open" ? "🔓 Open" : "🔒 Private"}</td>
                      <td className="py-3 px-2 text-center font-bold">{groupTaskCount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Content Policy Notice for Lores Picture Ideas */}
        {activeGroup === "Lores Picture Ideas" && (
          <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4 mb-6">
            <h3 className="text-orange-400 font-bold font-mono mb-2">⚠️ Content Policy</h3>
            <p className="text-orange-300 text-sm font-mono">
              <strong>
                No explicit hate, sexual/pedophile content, violence speech, or discriminatory ideas allowed
              </strong>{" "}
              – Keep it satirical, creative, and compliant. This is a space for quality lore and visual ideas only.
            </p>
          </div>
        )}

        {/* Active Group Info */}
        {currentGroup && (
          <div className="bg-black/80 border border-pink-500/50 rounded-lg p-4 md:p-6 mb-6">
            <h2 className="text-pink-400 font-bold font-mono mb-1">{currentGroup.name}</h2>
            <p className="text-pink-300/80 text-sm font-mono mb-4">{currentGroup.description}</p>

            {/* Add Task Form */}
            <div className="bg-black/50 border border-pink-400/50 rounded p-4">
              <h3 className="text-pink-400 font-bold font-mono mb-3">➕ Add New Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-3">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-pink-400/50 rounded text-pink-300 text-xs md:text-sm placeholder-pink-400/30 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-pink-400/50 rounded text-pink-300 text-xs md:text-sm placeholder-pink-400/30 focus:outline-none"
                />
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-pink-400/50 rounded text-pink-300 text-xs md:text-sm focus:outline-none"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="px-3 py-2 bg-black/50 border border-pink-400/50 rounded text-pink-300 text-xs md:text-sm placeholder-pink-400/30 focus:outline-none"
                  rows={1}
                />
                <button
                  onClick={addTask}
                  className="bg-pink-500 hover:bg-pink-600 text-black font-bold py-2 px-3 rounded transition-colors text-xs md:text-sm"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-black/80 border border-pink-500/50 rounded-lg p-4">
            <h3 className="text-pink-400 font-bold font-mono mb-4">📝 To Do ({todoTasks.length})</h3>
            <div className="space-y-3 min-h-48">
              {todoTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-black/50 border border-pink-400/50 rounded p-3 cursor-move hover:bg-black/70 transition-colors text-xs md:text-sm"
                  draggable
                  onDragEnd={() => moveTask(task.id, "doing")}
                >
                  <p className="text-pink-300 font-mono font-bold">{task.title}</p>
                  {task.description && <p className="text-pink-400/70 text-xs mt-1">{task.description}</p>}
                  {task.assignee && <p className="text-pink-400/70 text-xs mt-1">👤 {task.assignee}</p>}
                  {task.due_date && (
                    <p className="text-pink-400/70 text-xs">📅 {new Date(task.due_date).toLocaleDateString()}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/80 border border-pink-500/50 rounded-lg p-4">
            <h3 className="text-pink-400 font-bold font-mono mb-4">⚙️ Doing ({doingTasks.length})</h3>
            <div className="space-y-3 min-h-48">
              {doingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-pink-500/20 border border-pink-400 rounded p-3 cursor-move hover:bg-pink-500/30 transition-colors text-xs md:text-sm"
                  draggable
                  onDragEnd={() => moveTask(task.id, "done")}
                >
                  <p className="text-pink-300 font-mono font-bold">{task.title}</p>
                  {task.description && <p className="text-pink-400/70 text-xs mt-1">{task.description}</p>}
                  {task.assignee && <p className="text-pink-400/70 text-xs mt-1">👤 {task.assignee}</p>}
                  {task.due_date && (
                    <p className="text-pink-400/70 text-xs">📅 {new Date(task.due_date).toLocaleDateString()}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/80 border border-pink-500/50 rounded-lg p-4">
            <h3 className="text-pink-400 font-bold font-mono mb-4">✅ Done ({doneTasks.length})</h3>
            <div className="space-y-3 min-h-48">
              {doneTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-green-500/20 border border-green-400 rounded p-3 text-xs md:text-sm opacity-75"
                >
                  <p className="text-green-300 font-mono font-bold line-through">{task.title}</p>
                  {task.assignee && <p className="text-green-400/70 text-xs mt-1">👤 {task.assignee}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-pink-400/50 text-xs font-mono pb-8">
          <p>✅ Wallet-gated access enabled – {activeGroup} workspace active – Real people only</p>
        </div>
      </div>
    </div>
  )
}
