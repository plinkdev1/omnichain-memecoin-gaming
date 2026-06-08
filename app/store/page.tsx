"use client"

import type React from "react"
import { ElShitoPolaroid } from "@/components/el-shito-polaroid"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"
import { StickerCollage } from "@/components/sticker-collage"
import { ComingSoonBadge } from "@/components/coming-soon-badge"

const products = [
  {
    id: 0,
    name: "25 Random Lore Stickers Pack",
    description:
      "25 high-quality vinyl stickers – random mix of DatXit emojis, El Shito vigilante poses, satirical icons, and sewer lore. Perfect for laptops, bottles, tagging spots. Waterproof, durable, shitty as hell.",
    price: { usd: 29.99, sol: 0.16, datx: 53200 },
    image: null,
    imageComponent: <StickerCollage />,
    size: "25-Pack",
    inStock: true,
    featured: true,
    comingSoon: false,
  },
  {
    id: 1,
    name: "Classic El Shito Swirl Stencil",
    description: 'The original mark. Perfect for banks and billboards. Large reusable acrylic, 18" diameter.',
    price: { usd: 29, sol: 0.15, datx: 50000 },
    image: "/3d-printed-stencil-el-shito-brown-swirl.jpg",
    size: 'Large (18")',
    inStock: true,
  },
  {
    id: 2,
    name: "Mini Pocket Stencil",
    description: "For quick hits on subways and street signs. Fits in your jacket. Travel size perfection.",
    price: { usd: 15, sol: 0.08, datx: 25000 },
    image: "/mini-pocket-stencil-poop-graffiti.jpg",
    size: 'Pocket (6")',
    inStock: true,
  },
  {
    id: 3,
    name: "Masked Vigilante Full Kit",
    description: "Stencil + black bandana + mini spray caps. Full El Shito cosplay for night raids. Live the lore.",
    price: { usd: 79, sol: 0.42, datx: 140000 },
    image: "/vigilante-mask-bandana-spray-paint-kit.jpg",
    size: "Kit (3 items)",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Xitmas 2025 Limited Edition",
    description: "Seasonal solidarity tag. Stencil with Santa hat swirl. Only 100 made. Dec 21–Jan 6 only.",
    price: { usd: 49, sol: 0.26, datx: 90000 },
    image: "/christmas-santa-hat-poop-stencil.jpg",
    size: 'Limited (12")',
    inStock: true,
    limited: true,
  },
  {
    id: 5,
    name: "Multi-Pack Raid Set",
    description: '5 stencils, different sizes (4" to 18"). For coordinated global raids. Bulk activist discount.',
    price: { usd: 99, sol: 0.52, datx: 180000 },
    image: "/multiple-stencils-different-sizes-set.jpg",
    size: "5-Pack",
    inStock: true,
  },
  {
    id: 6,
    name: "Custom Request",
    description: "Describe your target. We'll design the stencil. Banks? Billboards? Politicians? We got you.",
    price: { usd: 149, sol: 0.78, datx: 280000 },
    image: "/custom-graffiti-stencil-design.jpg",
    size: "Custom",
    inStock: true,
    custom: true,
  },
]

export default function StorePage() {
  const [currency, setCurrency] = useState<"usd" | "sol" | "datx">("usd")
  const [cart, setCart] = useState<number[]>([])
  const [showCart, setShowCart] = useState(false)
  const [proofOfTagUrl, setProofOfTagUrl] = useState("")
  const [proofSubmitted, setProofSubmitted] = useState(false)

  const addToCart = (productId: number) => {
    alert("Pre-order coming soon – manual orders post-launch")
    return
    // setCart([...cart, productId])
    // setShowCart(true)
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const cartItems = cart.map((id) => products.find((p) => p.id === id)!).filter(Boolean)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price[currency], 0)

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProofSubmitted(true)
    setTimeout(() => setProofSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/images/image-2025-12-21t21-26-13-073z.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sewer-brown/40 via-sewer-green/30 to-black/60"></div>

      {/* Neon glow effects */}
      <div className="absolute top-20 right-40 w-64 h-64 bg-rust-orange/20 blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-40 left-20 w-80 h-80 bg-toxic-green/15 blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative w-20 h-20">
              <Image src="/images/datxit-logo.png" alt="DatXit Logo" fill className="object-contain" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow glitch-text font-mono drop-shadow-[0_0_20px_rgba(255,204,0,0.6)]">
              El Shito Raid Gear
            </h1>
          </div>
          <p className="text-2xl text-rust-orange font-semibold italic">Tag the World</p>
          <p className="text-sm text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Real 3D-printed stencil kits for community satire. Tag banks, billboards, politician posters. Physical
            rebellion meets on-chain sales. Ships worldwide.
          </p>
          <p className="text-xs text-toxic-green font-mono">
            Not for vandalism. For satire. We take no responsibility.{" "}
            <img src="/images/smile2.png" alt="smile" className="w-4 h-4 inline-block align-middle" />
          </p>
        </div>

        {/* Store-wide coming soon banner */}
        <div className="bg-toxic-green/10 border-2 border-toxic-green rounded-lg p-6 max-w-4xl mx-auto mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-toxic-green to-transparent"></div>
          <p className="text-lg font-mono text-toxic-green font-bold relative z-10 flex items-center justify-center gap-3">
            <img src="/images/custom2.png" alt="poop" className="w-6 h-6 animate-bounce" />
            All raid gear currently OUT-OF-STOCK – Build the hype, reserves opening next
            <img
              src="/images/custom2.png"
              alt="poop"
              className="w-6 h-6 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </p>
        </div>

        {/* Currency selector & Cart */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrency("usd")}
              variant={currency === "usd" ? "default" : "outline"}
              size="sm"
              className={currency === "usd" ? "bg-toxic-green text-black" : ""}
            >
              USD
            </Button>
            <Button
              onClick={() => setCurrency("sol")}
              variant={currency === "sol" ? "default" : "outline"}
              size="sm"
              className={currency === "sol" ? "bg-toxic-green text-black" : ""}
            >
              SOL
            </Button>
            <Button
              onClick={() => setCurrency("datx")}
              variant={currency === "datx" ? "default" : "outline"}
              size="sm"
              className={currency === "datx" ? "bg-toxic-green text-black" : ""}
            >
              $DATX (10% off)
            </Button>
          </div>

          <Button
            onClick={() => setShowCart(!showCart)}
            disabled
            className="bg-sewer-brown/50 hover:bg-sewer-brown/50 cursor-not-allowed opacity-50 relative flex items-center gap-2"
          >
            <img src="/images/shoppingcart.png" alt="shopping cart" className="w-5 h-5" />
            Cart ({cart.length})
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-toxic-green text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`relative overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                product.featured
                  ? "border-4 border-toxic-green shadow-[0_0_30px_rgba(124,252,0,0.4)]"
                  : "border-2 border-sewer-brown"
              }`}
              style={{
                transform: `rotate(${Math.random() * 4 - 2}deg)`,
                background: "linear-gradient(135deg, #2a2419 0%, #1a1410 100%)",
              }}
            >
              {/* Polaroid tape effect */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-foreground/10 -rotate-3 blur-sm"></div>

              {product.featured && (
                <div className="absolute top-4 right-4 bg-toxic-green text-black px-3 py-1 rounded-full text-xs font-bold z-10 animate-pulse flex items-center gap-2">
                  <img src="/images/flame2.png" alt="flame" className="w-5 h-5" />
                  BEST SELLER
                </div>
              )}
              {product.limited && (
                <div className="absolute top-4 right-4 bg-rust-orange text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  ⏰ LIMITED
                </div>
              )}

              <div className="relative w-full h-64 bg-sewer-brown/30">
                {product.imageComponent ? (
                  product.imageComponent
                ) : (
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                )}
                {/* Coming Soon badge overlay for coming soon products */}
                {product.comingSoon && <ComingSoonBadge />}
              </div>

              <div className="p-6 space-y-4 relative z-20">
                <h3 className="text-xl font-bold text-dirty-yellow font-mono">{product.name}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-foreground/60">Size: {product.size}</p>
                    <p className="text-2xl font-bold text-toxic-green">
                      {currency === "usd" && `$${product.price.usd}`}
                      {currency === "sol" && `${product.price.sol} SOL`}
                      {currency === "datx" && `${product.price.datx.toLocaleString()} $DATX`}
                    </p>
                    {currency === "datx" && (
                      <p className="text-xs text-toxic-green font-mono">10% discount applied ✓</p>
                    )}
                  </div>
                  <Button
                    onClick={() => addToCart(product.id)}
                    className="bg-sewer-brown/50 hover:bg-sewer-brown/50 cursor-not-allowed opacity-50"
                    disabled
                  >
                    Out-of-Stock
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Proof of Tag Section */}
        <Card className="p-8 bg-sewer-green/80 border-toxic-green border-2 max-w-4xl mx-auto mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-dirty-yellow glitch-text mb-2">Proof of Tag</h2>
            <p className="text-foreground/80">
              Bought gear? Tagged the world? Show us. Best submissions featured forever.
            </p>
          </div>
          <form onSubmit={handleProofSubmit} className="space-y-4">
            <Input
              type="url"
              placeholder="Image URL (imgur, twitter pic, etc.)"
              value={proofOfTagUrl}
              onChange={(e) => setProofOfTagUrl(e.target.value)}
              className="bg-sewer-brown border-sewer-brown text-foreground"
              required
            />
            <Textarea
              placeholder="Where did you tag? What was the target? (optional)"
              className="bg-sewer-brown border-sewer-brown text-foreground min-h-24"
            />
            <Button
              type="submit"
              className="w-full bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-lg flex items-center justify-center gap-2"
            >
              <img src="/images/camera.png" alt="camera" className="w-6 h-6" />
              Submit Proof of Tag
            </Button>
          </form>
          {proofSubmitted && (
            <p className="text-center text-toxic-green font-bold mt-4 animate-pulse">
              ✓ Submission received. The oracle reviews... 🕵️
            </p>
          )}
          <p className="text-xs text-center text-foreground/60 mt-4">
            Tag ethically. We don't endorse illegal vandalism. Satire only. El Shito watches.
          </p>
        </Card>

        {/* Fulfillment Info */}
        <Card className="p-8 bg-sewer-brown/70 border-rust-orange border-2 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-rust-orange mb-4 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-foreground/90">
            <div className="text-center space-y-2 opacity-60">
              <img src="/images/shoppingcart.png" alt="shopping cart" className="w-20 h-20 mx-auto" />
              <p className="font-bold text-dirty-yellow">1. Order (Coming Soon)</p>
              <p>Pay with card, SOL, or $DATX via Crossmint.</p>
            </div>
            <div className="text-center space-y-2 opacity-60">
              <img src="/images/shippingbox.png" alt="shipping box" className="w-20 h-20 mx-auto" />
              <p className="font-bold text-dirty-yellow">2. We Print & Ship</p>
              <p>3D printed locally, shipped discreetly worldwide.</p>
            </div>
            <div className="text-center space-y-2 opacity-60">
              <img src="/images/paintboard.png" alt="paint board" className="w-20 h-20 mx-auto" />
              <p className="font-bold text-dirty-yellow">3. Tag & Submit</p>
              <p>Upload proof. Get featured. Earn sludge rewards.</p>
            </div>
          </div>
          <p className="text-xs text-center text-foreground/60 mt-6">
            First 100 orders: Manual fulfillment + free shipping promo{" "}
            <img src="/images/rewards.png" alt="rewards" className="w-5 h-5 inline-block align-middle" />
          </p>
          <p className="text-xs text-center text-rust-orange font-mono mt-2 font-bold">
            <img src="/images/stop.png" alt="stop" className="w-5 h-5 inline-block align-middle mr-1" />
            Pre-order system activating post-launch
          </p>
        </Card>

        {/* Back to Lore */}
        <div className="text-center mt-12">
          <Button asChild className="bg-sewer-brown hover:bg-sewer-brown/80 text-dirty-yellow font-bold text-lg px-8">
            <Link href="/lore">← Back to El Shito Lore</Link>
          </Button>
        </div>
      </div>

      {/* El Shito sighting polaroid in bottom-left corner */}
      <ElShitoPolaroid
        imageUrl="/images/image-2025-12-21t16-45-44-957z.png"
        caption="Night tag – DatXit marks it"
        position="bottom-left"
        rotation={Math.random() * 20 - 10}
        opacity={0.39}
      />
    </div>
  )
}
