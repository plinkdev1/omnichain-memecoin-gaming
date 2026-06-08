"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LoreVote {
  id: string
  lore_type: string
  votes: number
}

export function LoreVoting() {
  const [loreVotes, setLoreVotes] = useState<LoreVote[]>([])
  const [loading, setLoading] = useState(true)
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchLoreVotes()
    // Check if user already voted (stored in localStorage for simplicity)
    const voted = localStorage.getItem("datxit_lore_vote")
    if (voted) setVotedFor(voted)
  }, [])

  async function fetchLoreVotes() {
    const { data, error } = await supabase.from("lore_votes").select("*").order("votes", { ascending: false })

    if (error) {
      console.error("Error fetching lore votes:", error)
    } else {
      setLoreVotes(data || [])
    }
    setLoading(false)
  }

  async function handleVote(loreType: string, currentVotes: number) {
    if (votedFor) {
      alert("You already voted, you shitty degen!")
      return
    }

    const { error } = await supabase
      .from("lore_votes")
      .update({ votes: currentVotes + 1 })
      .eq("lore_type", loreType)

    if (error) {
      console.error("Error voting:", error)
      alert("Vote failed. Everything is shit anyway.")
    } else {
      setVotedFor(loreType)
      localStorage.setItem("datxit_lore_vote", loreType)
      fetchLoreVotes()
    }
  }

  if (loading) {
    return (
      <Card className="p-6 bg-[#1a1a1a] border-[#5C3317]">
        <p className="text-[#8B7355]">Loading shitty lore...</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-[#1a1a1a] border-[#5C3317]">
      <h3 className="text-2xl font-bold mb-4 text-[#5C3317] glitch-text">Choose Your Lore</h3>
      <p className="text-sm text-[#8B7355] mb-4">Vote for which shitty story the community should embrace this week</p>
      <div className="space-y-3">
        {loreVotes.map((lore) => (
          <div
            key={lore.id}
            className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded border border-[#5C3317]/30"
          >
            <div className="flex-1">
              <p className="font-medium text-[#D4AF37]">{lore.lore_type}</p>
              <p className="text-xs text-[#8B7355]">{lore.votes} votes</p>
            </div>
            <Button
              size="sm"
              onClick={() => handleVote(lore.lore_type, lore.votes)}
              disabled={votedFor !== null}
              className="bg-[#5C3317] hover:bg-[#4A2810] text-white"
            >
              {votedFor === lore.lore_type ? "Voted 💩" : "Vote"}
            </Button>
          </div>
        ))}
      </div>
      {votedFor && (
        <p className="text-xs text-[#D4AF37] mt-3 text-center">Your shitty vote has been counted. Check back later.</p>
      )}
    </Card>
  )
}
