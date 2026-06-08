import { Card, CardContent } from "@/components/ui/card"

export function ElShitoIntroCard() {
  return (
    <Card className="rusty-card p-8 max-w-4xl mx-auto mb-8 border-2 border-rust-orange">
      <CardContent className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-black text-dirty-yellow glitch-text">El Shito's Personal Reel</h2>
        <div className="space-y-3">
          <p className="text-lg text-foreground/90 font-mono leading-relaxed">
            Sightings captured by the masked one himself (Dec 21, 2025 Edition).
          </p>
          <p className="text-lg text-foreground/90 font-mono leading-relaxed">
            El Shito doesn't just tag – he documents. Leaked straight from his sewer phone: chaotic snapshots of the
            revolution around the world.
          </p>
          <p className="text-lg text-foreground/90 font-mono leading-relaxed">
            From Delhi smog to Brussels manure, NYC subways to migrant seas. All shot by the vigilante himself in 2025.
          </p>
        </div>
        <p className="text-sm text-toxic-green font-bold italic pt-4 border-t border-sewer-brown/50">
          Scroll or swipe – feel the stalk.
        </p>
      </CardContent>
    </Card>
  )
}
