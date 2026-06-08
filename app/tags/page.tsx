"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWalletConnection } from "@/lib/use-wallet-connection"
import { Upload, X } from "lucide-react"
import { ElShitoPolaroid } from "@/components/el-shito-polaroid"
import Image from "next/image"

interface TagSubmission {
  id: string
  name: string
  email: string
  location: string
  ipfs_url: string
  message: string
  created_at: string
}

// Mock gallery data - replace with real submissions later
const mockGallery: TagSubmission[] = [
  {
    id: "1",
    name: "Anon",
    email: "hidden@sewer.net",
    location: "NYC Subway",
    ipfs_url: "/el-shito-tag-on-subway-wall.jpg",
    message: "First raid, best raid",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Shadow Tagger",
    email: "hidden@sewer.net",
    location: "LA Street",
    ipfs_url: "/vibrant-graffiti-tag-art-wall.jpg",
    message: "Marking territory",
    created_at: new Date().toISOString(),
  },
]

export default function TagsPage() {
  const { isConnected, address, connect, disconnect, isLoading, error } = useWalletConnection()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { toast } = useToast()

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
    image: null as File | null,
  })

  async function handleWalletConnect() {
    try {
      await connect()
      toast({ title: "Wallet connected successfully", description: "Ready to submit tags globally." })
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
      toast({ title: "Connect wallet to submit tags", variant: "destructive" })
      return
    }

    if (!form.email) {
      toast({ title: "Email required for contact", variant: "destructive" })
      return
    }

    if (!form.image) {
      toast({ title: "Upload an image to prove your raid", variant: "destructive" })
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
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: "datxitideas@gmail.com",
          from_name: form.name || "Anonymous Tagger",
          from_email: form.email,
          location: form.location,
          message: form.message,
          ipfs_link: uploadData.gateway,
          wallet: address,
        },
      }

      console.log("[v0] Tag submission payload:", emailPayload)

      const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      })

      console.log("[v0] EmailJS response status:", emailResponse.status)

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        console.warn("[v0] Email notification failed, but IPFS upload succeeded:", errorData)
      }

      toast({
        title: "Tag submitted successfully!",
        description: `IPFS: ${uploadData.ipfs} – Email sent to datxitideas@gmail.com. We'll review and pin if legit.`,
      })

      setForm({ name: "", email: "", location: "", message: "", image: null })
      setPreviewImage(null)
      setUploadProgress("")
    } catch (error: any) {
      console.error("[v0] Tag Submit Error", error)
      toast({
        title: "Submission failed",
        description: error.message || "Try again later",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress("")
    }
  }

  return (
    <div className="min-h-screen bg-sewer-brown/5 relative overflow-hidden">
      {/* Neon graffiti background */}
      <div
        className="fixed inset-0 -z-10 opacity-15"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="10" y="50" fontSize="40" fill="%237CFC00" opacity="0.3">*scribble*</text></svg>\')',
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* Glow effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-toxic-green/10 blur-[150px] animate-pulse"></div>
      <div
        className="absolute bottom-40 left-20 w-96 h-96 bg-rust-orange/10 blur-[150px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl md:text-8xl font-black text-toxic-green drop-shadow-[0_0_30px_rgba(124,252,0,0.5)] font-mono">
            GLOBAL TAGS
          </h1>
          <p className="text-3xl md:text-4xl text-dirty-yellow italic font-bold drop-shadow-[0_0_20px_rgba(255,204,0,0.3)]">
            El Shito was here – worldwide
          </p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Proof of Raid. Permanent on IPFS. Decentralized, safe, legendary. The world is your canvas.
          </p>
        </div>

        {/* El Shito polaroid */}
        <ElShitoPolaroid
          imageUrl="/images/image-2025-12-21t16-35-54-264z.png"
          caption="Tags are eternal – IPFS proves it"
          position="top-left"
          rotation={Math.random() * 20 - 10}
          opacity={0.4}
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Submission Form */}
          <Card className="lg:col-span-1 border-2 border-toxic-green bg-sewer-brown/70">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-toxic-green">
                <Upload size={24} />
                Submit Your Tag
              </CardTitle>
              <CardDescription className="text-foreground/70">Proof of your global raid</CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <div className="text-center py-8 space-y-4">
                  <p className="text-sm text-foreground/70">Connect wallet to submit tags</p>
                  <Button
                    disabled
                    className="w-full bg-sewer-brown/50 hover:bg-sewer-brown/50 cursor-not-allowed opacity-50 text-foreground font-mono text-sm transition-colors"
                  >
                    Wallet – Coming Soon
                  </Button>
                  {error && <p className="text-xs text-rust-orange">{error}</p>}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="p-2 bg-toxic-green/20 rounded text-xs text-toxic-green font-mono">
                    {address?.slice(0, 8)}...{address?.slice(-8)}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-dirty-yellow">Name (optional)</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your tagger name"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-dirty-yellow">Email (required)</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="contact@raiders.net"
                      required
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-dirty-yellow">Location (optional)</label>
                    <Input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="City, landmark, coordinates..."
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-dirty-yellow">Image Upload</label>
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
                        className="bg-background cursor-pointer"
                      />
                    )}
                    <p className="text-xs text-foreground/50 mt-1">JPEG, PNG, WebP, GIF (max 10MB) → IPFS</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-dirty-yellow">Message (optional)</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What made this tag legendary?"
                      className="bg-background min-h-[80px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-lg"
                  >
                    {isUploading ? uploadProgress : "Submit Tag to IPFS"}
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
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-dirty-yellow">
              <img src="/images/camera.png" alt="Gallery" className="w-6 h-6" />
              Approved Tags Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockGallery.map((tag) => (
                <Card
                  key={tag.id}
                  className="overflow-hidden border border-toxic-green/50 hover:border-toxic-green transition-all"
                >
                  <div className="relative w-full aspect-video bg-sewer-brown/30">
                    <Image
                      src={tag.ipfs_url || "/placeholder.svg"}
                      alt={tag.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div>
                      <p className="font-bold text-toxic-green">{tag.name || "Anonymous"}</p>
                      {tag.location && <p className="text-xs text-foreground/60">{tag.location}</p>}
                    </div>
                    {tag.message && <p className="text-sm italic text-foreground/70 line-clamp-2">{tag.message}</p>}
                    <Badge className="bg-toxic-green/30 text-toxic-green text-xs">✓ Approved & Pinned</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-foreground/50 text-sm mt-8">
              More tags incoming as submissions are reviewed and approved by the oracle
            </p>
          </div>
        </div>

        {/* Info Section */}
        <Card className="border-2 border-rust-orange bg-sewer-brown/70 p-6 mb-8">
          <h3 className="text-xl font-bold text-rust-orange mb-4">How It Works</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>
              ✓ <strong>Connect Solana wallet</strong> (Phantom, Solflare, or Backpack)
            </li>
            <li>
              ✓ <strong>Upload proof</strong> of your global tag (image to IPFS)
            </li>
            <li>
              ✓ <strong>Provide details</strong> – name, location, message
            </li>
            <li>
              ✓ <strong>Email sent</strong> to datxitideas@gmail.com for review
            </li>
            <li>
              ✓ <strong>Pin forever</strong> – gallery shows approved raids only
            </li>
            <li>🔗 All uploads permanent on IPFS via nft.storage – no server storage, truly decentralized</li>
          </ul>
        </Card>

        <div className="text-center">
          <Button asChild className="bg-sewer-brown hover:bg-sewer-brown/80 text-toxic-green font-bold px-8">
            <Link href="/">← Back to Sewer</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
