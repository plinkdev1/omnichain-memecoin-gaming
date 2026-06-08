"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWalletConnection } from "@/lib/use-wallet-connection"
import { createClient } from "@/lib/supabase/client"
import { getWeekNumber } from "@/lib/solana-utils"
import { Upload, Flame, Trophy, Search, Eye, X } from "lucide-react"
import { ElShitoPolaroid } from "@/components/el-shito-polaroid"
import Image from "next/image"

type Category = "meme" | "mascot" | "el_shito" | "general"

interface Submission {
  id: string
  title: string
  description: string
  ipfs_url: string
  category: Category
  wallet_address: string
  week_number: number
  year: number
  tips_received: number
  created_at: string
}

export default function RoosterPage() {
  const {
    isConnected,
    address,
    connect,
    disconnect,
    isLoading: walletLoading,
    error: walletError,
  } = useWalletConnection()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "meme" as Category,
    image: null as File | null,
    email: "",
  })

  const { week: currentWeek, year: currentYear } = getWeekNumber()

  useEffect(() => {
    loadSubmissions()
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredSubmissions(submissions)
    } else {
      setFilteredSubmissions(submissions.filter((s) => s.category === selectedCategory))
    }
  }, [selectedCategory, submissions])

  async function loadSubmissions() {
    const { data, error } = await supabase
      .from("rooster_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      toast({ title: "Swamp pipes clogged", description: error.message, variant: "destructive" })
    } else {
      setSubmissions(data || [])
      setFilteredSubmissions(data || [])
    }
  }

  async function handleWalletConnect() {
    try {
      await connect()
      toast({ title: "Wallet connected successfully", description: "Ready to submit your shitty memes." })
    } catch (err: any) {
      toast({
        title: "Wallet connection failed",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
        toast({ title: "Invalid image type", variant: "destructive" })
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "File too large (max 10MB)", variant: "destructive" })
        return
      }

      setForm({ ...form, image: file })

      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isConnected) {
      toast({ title: "No wallet? Get Phantom. It's free and already full of shit.", variant: "destructive" })
      return
    }

    if (!form.image) {
      toast({ title: "Need an image, degen", variant: "destructive" })
      return
    }

    if (!form.email) {
      toast({ title: "Email required for notifications", variant: "destructive" })
      return
    }

    setIsUploading(true)
    setUploadProgress("Uploading to decentralized storage...")

    try {
      const formData = new FormData()
      formData.append("file", form.image)

      const uploadRes = await fetch("/api/upload-to-ipfs", {
        method: "POST",
        body: formData,
      })

      if (!uploadRes.ok) {
        const error = await uploadRes.json()
        throw new Error(error.error || "Upload failed")
      }

      const uploadData = await uploadRes.json()

      setUploadProgress("Notifying the oracle via EmailJS...")

      const emailPayload = {
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_ROOSTER_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: "datxitideas@gmail.com",
          subject: "New RaidX Submission",
          title: form.title,
          description: form.description,
          category: form.category.replace("_", " "),
          from_email: form.email,
          ipfs_link: uploadData.gateway,
          wallet: address,
        },
      }

      console.log("[v0] Rooster submission payload:", emailPayload)

      const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      })

      console.log("[v0] EmailJS response status:", emailResponse.status)

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        console.warn("[v0] Email notification failed, but IPFS upload succeeded:", errorData)
      }

      const { error } = await supabase.from("rooster_submissions").insert({
        title: form.title,
        description: form.description,
        ipfs_url: uploadData.gateway,
        category: form.category,
        wallet_address: address,
        week_number: currentWeek,
        year: currentYear,
      })

      if (error) throw error

      toast({
        title: "Flushed successfully.",
        description: `IPFS: ${uploadData.ipfs} – Email sent to datxitideas@gmail.com. Your meme is now swimming in the rooster.`,
      })
      setForm({ title: "", description: "", category: "meme", image: null, email: "" })
      setPreviewImage(null)
      loadSubmissions()
    } catch (error: any) {
      console.error("[v0] Rooster Submit Error", error)
      toast({ title: "Too much shit detected. Try again.", description: error.message, variant: "destructive" })
    } finally {
      setIsUploading(false)
      setUploadProgress("")
    }
  }

  async function handleTip(submissionId: string, toWallet: string) {
    if (!isConnected) {
      toast({ title: "Connect wallet to tip", variant: "destructive" })
      return
    }

    toast({
      title: "Tipping requires deployment",
      description: "Publish to production to send real $DATX tips via Solana.",
    })
  }

  const currentWeekSubmissions = submissions.filter((s) => s.week_number === currentWeek && s.year === currentYear)
  const pastSubmissions = submissions.filter((s) => s.week_number !== currentWeek || s.year !== currentYear)

  return (
    <div className="min-h-screen bg-sewer-brown/5">
      {/* Header */}
      <div className="text-center mb-12 py-16">
        <h1 className="text-5xl md:text-7xl font-black text-dirty-yellow mb-4 glitch" data-text="Public Rooster">
          <span className="flex items-center justify-center gap-3 flex-wrap">
            Public Rooster
            <img src="/images/rooster.png" alt="Rooster" className="w-16 h-16 md:w-20 md:h-20" />
          </span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Submit your shittiest memes, spot El Shito in the wild, hunt for the mascot. Winners get sludge and glory.
        </p>
        <div className="flex gap-2 justify-center mt-4 text-sm">
          <Badge variant="outline" className="bg-sewer-brown/30">
            Week {currentWeek}, {currentYear}
          </Badge>
          <Badge variant="outline" className="bg-toxic-green/30">
            Runner Moment or eternal cope
          </Badge>
        </div>
      </div>

      {/* RaidX Contest Section */}
      <Card className="rusty-card mb-8 border-rust-orange">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <img src="/images/trophy.png" alt="Contest" className="w-5 h-5" />
                RaidX Weekly Contest
              </CardTitle>
              <CardDescription className="text-foreground/70 mt-2">
                This week's winner gets sludge and glory. Submit your shittiest work below.
              </CardDescription>
            </div>
            <Button variant="outline" className="bg-sewer-brown hover:bg-rust-orange" asChild>
              <a href="https://app.realms.today" target="_blank" rel="noopener noreferrer">
                Vote on Realms →
              </a>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* El Shito sighting polaroid in top-left corner */}
      <ElShitoPolaroid
        imageUrl="/images/image-2025-12-21t16-35-54-264z.png"
        caption="NYC Subway – Rats approve"
        position="top-left"
        rotation={Math.random() * 20 - 10}
        opacity={0.36}
      />

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Upload Form */}
        <Card className="rusty-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Submit to Rooster
            </CardTitle>
            <CardDescription>Tag the world, get rekt IRL</CardDescription>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <div className="text-center py-8 space-y-4">
                <p className="text-sm text-foreground/70">Connect your Solana wallet to submit</p>
                <Button
                  onClick={handleWalletConnect}
                  disabled={walletLoading}
                  className="w-full bg-toxic-green text-black font-bold hover:bg-toxic-green/80"
                >
                  {walletLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
                {walletError && <p className="text-xs text-rust-orange">{walletError}</p>}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-2 bg-toxic-green/20 rounded text-xs text-toxic-green font-mono">
                  {address?.slice(0, 8)}...{address?.slice(-8)}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Your shitty meme title"
                    required
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Why is this so shitty?"
                    required
                    className="bg-background min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                    className="w-full rounded-md border bg-background px-3 py-2"
                  >
                    <option value="meme">General Meme</option>
                    <option value="mascot">Mascot Hunt Entry</option>
                    <option value="el_shito">El Shito Sighting</option>
                    <option value="general">Other Shit</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Image</label>
                  {previewImage ? (
                    <div className="relative w-full aspect-video rounded border border-toxic-green overflow-hidden mb-2">
                      <Image src={previewImage || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null)
                          setForm({ ...form, image: null })
                        }}
                        className="absolute top-2 right-2 bg-rust-orange p-1 rounded hover:bg-rust-orange/80"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="bg-background"
                    />
                  )}
                  <p className="text-xs text-foreground/50 mt-1">JPEG, PNG, WebP, GIF (max 10MB) → IPFS</p>
                </div>

                <Button type="submit" disabled={isUploading} className="w-full bg-rust-orange hover:bg-dirty-yellow">
                  {isUploading ? uploadProgress : "Submit Shit"}
                </Button>

                <Button type="button" onClick={disconnect} variant="outline" className="w-full bg-transparent">
                  Disconnect
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Gallery */}
        <div className="lg:col-span-2">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as Category | "all")}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="meme">Memes</TabsTrigger>
              <TabsTrigger value="mascot">
                <Search size={16} className="mr-1" />
                Mascot
              </TabsTrigger>
              <TabsTrigger value="el_shito">
                <Eye size={16} className="mr-1" />
                El Shito
              </TabsTrigger>
              <TabsTrigger value="general">Other</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-6">
              {/* Current Week */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <img src="/images/flame2.png" alt="Flame" className="w-5 h-5" />
                  This Week's Contenders
                </h3>
                {currentWeekSubmissions.length === 0 ? (
                  <p className="text-foreground/50 text-center py-8">No memes? Make some, degen.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentWeekSubmissions.map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        onTip={handleTip}
                        isWalletConnected={isConnected}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Past Submissions */}
              {pastSubmissions.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="text-dirty-yellow" />
                    Hall of Shame (Archive)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {pastSubmissions.slice(0, 10).map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        onTip={handleTip}
                        isWalletConnected={isConnected}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="flex justify-center mb-12">
        <Button className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-lg px-8 py-6" asChild>
          <Link href="/tags">
            <img
              src="/images/camera.png"
              alt="Global Tags"
              className="w-6 h-6 mr-2 inline-block hover:scale-125 transition-transform"
            />
            Submit Global Tag
          </Link>
        </Button>
      </div>
    </div>
  )
}

function SubmissionCard({
  submission,
  onTip,
  isWalletConnected,
}: {
  submission: Submission
  onTip: (id: string, wallet: string) => void
  isWalletConnected: boolean
}) {
  const categoryColors = {
    meme: "bg-toxic-green/20 text-toxic-green",
    mascot: "bg-rust-orange/20 text-rust-orange",
    el_shito: "bg-dirty-yellow/20 text-dirty-yellow",
    general: "bg-sewer-brown/20 text-foreground",
  }

  return (
    <Card className="rusty-card overflow-hidden hover:border-rust-orange transition-all">
      <div className="aspect-video bg-sewer-brown/30 relative">
        <Image
          src={
            submission.ipfs_url || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(submission.title)}`
          }
          alt={submission.title}
          fill
          className="object-cover"
          unoptimized
        />
        <Badge className={`absolute top-2 right-2 ${categoryColors[submission.category]}`}>
          {submission.category.replace("_", " ")}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h4 className="font-bold text-lg mb-2">{submission.title}</h4>
        <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{submission.description}</p>
        <div className="flex items-center justify-between text-xs text-foreground/50 mb-3">
          <span>
            Week {submission.week_number}, {submission.year}
          </span>
          <span className="font-mono">{submission.wallet_address.slice(0, 6)}...</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Flame size={16} className="text-rust-orange" />
            <span className="font-mono">{submission.tips_received} $DATX</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onTip(submission.id, submission.wallet_address)}
            disabled={true}
            className="bg-sewer-brown/50 hover:bg-sewer-brown/50 cursor-not-allowed opacity-50"
          >
            Tip $DATX
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
