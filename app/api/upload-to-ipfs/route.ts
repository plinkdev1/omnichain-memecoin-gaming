import { type NextRequest, NextResponse } from "next/server"

const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY

// Rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Allowed file types and max size (10MB)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (3 uploads per hour)
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 })
    return true
  }

  if (limit.count >= 3) {
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)

    // Rate limit check
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json({ error: "Too many uploads. Max 3 per hour. Chill, degen." }, { status: 429 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, GIF allowed." }, { status: 400 })
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Max 10MB. Your art needs a diet." }, { status: 400 })
    }

    if (!NFT_STORAGE_API_KEY) {
      return NextResponse.json({ error: "Server misconfigured. Contact sewer admin." }, { status: 500 })
    }

    // Upload to nft.storage
    const nftFormData = new FormData()
    nftFormData.append("file", file)

    const uploadResponse = await fetch("https://api.nft.storage/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NFT_STORAGE_API_KEY}`,
      },
      body: nftFormData,
    })

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json()
      return NextResponse.json(
        { error: `Upload failed: ${error.message || "Unknown error"}` },
        { status: uploadResponse.status },
      )
    }

    const data = await uploadResponse.json()
    const ipfsCid = data.value.cid

    return NextResponse.json({
      ipfs: `ipfs://${ipfsCid}`,
      gateway: `https://nftstorage.link/ipfs/${ipfsCid}`,
      cid: ipfsCid,
    })
  } catch (error: any) {
    console.error("[IPFS Upload Error]", error)
    return NextResponse.json({ error: `Upload failed: ${error.message || "Unknown error"}` }, { status: 500 })
  }
}
