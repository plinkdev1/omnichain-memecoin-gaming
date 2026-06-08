import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CouncilPage() {
  const councilMembers = [
    {
      title: "The Banking Cartel",
      description: "Central banks printing money while your savings rot. They control the flush.",
      image: "/images/bankingcartel.png",
    },
    {
      title: "Big Tech Overlords",
      description: "Zuck, Elon, Bezos – hoarding wealth while selling you dopamine hits.",
      image: "/images/bigtech.png",
    },
    {
      title: "Corporate Puppeteers",
      description: "CEOs with golden parachutes while workers eat shit sandwiches.",
      image: "/images/puppeeters.png",
    },
    {
      title: "Political Theater",
      description: "Left, right – both wings of the same shitbird. Elections are a scam.",
      image: "/images/politicaltheater.png",
    },
    {
      title: "Fake Gurus",
      description: "NFT influencers, crypto coaches, course sellers – exit scammers in disguise.",
      image: "/images/fakegurus.png",
    },
    {
      title: "Media Manipulation",
      description: "News that tells you what to think, not what to know. Propaganda mills.",
      image: "/images/mediamanipulation.png",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/images/image-2025-12-21t21-11-53-479z.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="container mx-auto px-4 py-12 space-y-12">
        <section className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow glitch-text font-mono">Shit High Council</h1>
          <p className="text-xl text-rust-orange font-semibold italic">The Real Rulers Exposed</p>
          <p className="text-foreground/90 leading-relaxed">
            You thought democracy was real? Cute. Here's who actually runs the shitty world. The Shit High Council isn't
            elected – it's self-appointed oligarchs who rig the game while you fight over crumbs.
          </p>
        </section>

        <section className="max-w-6xl mx-auto">
          <Card className="p-8 bg-sewer-green border-sewer-brown mb-8">
            <h2 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">About The Council</h2>
            <div className="space-y-4 text-foreground/90">
              <p className="leading-relaxed">
                The Shit High Council is the governing body of DatXit – but unlike the real world, we expose them. These
                are the entities that made everything shit in the first place.
              </p>
              <p className="leading-relaxed">
                In DatXit's world, the Council has no power. The community votes on burns, lore, and chaos. Only the top
                burners and most active degens enter the sacred chambers.
              </p>
              <p className="font-semibold text-toxic-green">Your voice matters here. Unlike out there.</p>
            </div>
          </Card>

          <h2 className="text-3xl font-bold text-center mb-8 text-dirty-yellow glitch-text">The Six Pillars of Shit</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {councilMembers.map((member, index) => (
              <Card
                key={index}
                className="p-6 bg-sewer-green border-sewer-brown hover:border-rust-orange transition-colors"
              >
                <div className="w-32 h-32 mx-auto mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-dirty-yellow mb-2 text-center">{member.title}</h3>
                <p className="text-sm text-foreground/80 text-center leading-relaxed">{member.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <Card className="p-8 bg-sewer-green border-sewer-brown">
            <h2 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">Community Governance</h2>
            <div className="space-y-4 text-foreground/90">
              <p className="leading-relaxed">
                DatXit operates on SHIT DAO principles. Holders vote on weekly burns, lore additions, RaidX contest
                rules, and community initiatives.
              </p>
              <p className="leading-relaxed">
                Top burners get special Council badges. Most active raiders get governance weight. This isn't plutocracy
                – it's meritocracy for degenerates.
              </p>
              <div className="pt-4 border-t border-sewer-brown/50">
                <p className="text-sm text-toxic-green font-semibold mb-2">How to Join:</p>
                <ul className="text-sm space-y-2 text-foreground/80">
                  <li>• Hold $DATX tokens</li>
                  <li>• Participate in weekly burn votes</li>
                  <li>• Submit content to Public Rooster</li>
                  <li>• Earn badges through RaidX contests</li>
                  <li>• Survive the chaos</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="flex justify-center gap-4">
            <Button className="bg-sewer-brown hover:bg-rust-orange text-foreground font-bold" asChild>
              <Link href="/rooster">View Public Rooster</Link>
            </Button>
            <Button className="bg-sewer-brown hover:bg-rust-orange text-foreground font-bold" asChild>
              <Link href="/raidx">Join RaidX</Link>
            </Button>
          </div>
        </section>

        <section className="text-center max-w-2xl mx-auto">
          <Card className="p-6 bg-rust-orange/20 border-rust-orange border-2">
            <p className="text-sm text-rust-orange font-bold italic">
              "Democracy is shit. The Shit High Council is shittier. But at least we're honest about it."
            </p>
          </Card>
        </section>
      </div>
    </div>
  )
}
