import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RaidXPage() {
  const upcomingContests = [
    {
      title: "Best El Shito Sighting",
      description: "Spot the vigilante IRL (or fake it convincingly). Best photoshop or real tag wins.",
      reward: "5,000 $DATX",
      deadline: "Rolling",
      icon: "elshito", // use identifier instead of emoji
    },
    {
      title: "Mascot Hunt",
      description: "Design the ultimate DatXit mascot. Must be shitty, chaotic, and memeable.",
      reward: "10,000 $DATX",
      deadline: "Rolling",
      icon: "mascot", // use identifier instead of emoji
    },
    {
      title: "Shittiest Meme",
      description: "Create the most unhinged DatXit meme. No rules. Maximum chaos.",
      reward: "3,000 $DATX",
      deadline: "Rolling",
      icon: "meme", // use identifier instead of emoji
    },
  ]

  const pastWinners = [
    {
      title: "Runner Moment #1",
      winner: "anon_degen",
      description: "Tagged a bank ATM with perfect swirl stencil",
      prize: "5,000 $DATX",
    },
    {
      title: "Mascot Hunt Winner",
      winner: "sewer_artist",
      description: "Created El Shito 3D model",
      prize: "10,000 $DATX",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <section className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img
            src="/icons/icon-raidx.png"
            alt="RaidX"
            className="w-14 h-14 custom-icon hover:scale-125 transition-transform"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow glitch-text font-mono">RaidX Contests</h1>
          <img
            src="/icons/icon-raidx.png"
            alt="RaidX"
            className="w-14 h-14 custom-icon hover:scale-125 transition-transform"
          />
        </div>
        <p className="text-xl text-rust-orange font-semibold italic">Degen Competitions. Real Rewards.</p>
        <p className="text-foreground/90 leading-relaxed">
          Prove you're the shittiest degen in the sewer. Weekly contests with $DATX rewards. Tag the world, create
          chaos, meme harder than everyone else.
        </p>
      </section>

      <section className="max-w-6xl mx-auto">
        <Card className="p-8 bg-sewer-green border-sewer-brown mb-8">
          <h2 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">How RaidX Works</h2>
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">
              Every week, we announce new contests. Submit your entries to the Public Rooster. Community votes on
              winners via Realms DAO voting. Winners get $DATX rewards and eternal glory in the sewer archives.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="bg-sewer-brown/30 p-4 rounded">
                <p className="font-bold text-toxic-green mb-2">1. Submit</p>
                <p className="text-sm">Upload to Public Rooster with RaidX tag</p>
              </div>
              <div className="bg-sewer-brown/30 p-4 rounded">
                <p className="font-bold text-toxic-green mb-2">2. Vote</p>
                <p className="text-sm">Community decides via Realms governance</p>
              </div>
              <div className="bg-sewer-brown/30 p-4 rounded">
                <p className="font-bold text-toxic-green mb-2">3. Win</p>
                <p className="text-sm">Get $DATX + Runner Moment glory</p>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="text-3xl font-bold text-center mb-8 text-dirty-yellow glitch-text">Active Contests</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {upcomingContests.map((contest, index) => (
            <Card
              key={index}
              className="p-6 bg-sewer-green border-sewer-brown hover:border-toxic-green transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3">
                {contest.icon === "elshito" && (
                  <img src="/images/elshitosightings.png" alt="El Shito" className="w-full h-full object-contain" />
                )}
                {contest.icon === "mascot" && (
                  <img src="/images/mascothunt.png" alt="Mascot" className="w-full h-full object-contain" />
                )}
                {contest.icon === "meme" && (
                  <img src="/images/shittiestmeme.png" alt="Meme" className="w-full h-full object-contain" />
                )}
              </div>
              <h3 className="text-xl font-bold text-dirty-yellow mb-2">{contest.title}</h3>
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{contest.description}</p>
              <div className="pt-4 border-t border-sewer-brown/50 space-y-2">
                <p className="text-sm">
                  <span className="text-toxic-green font-semibold">Reward:</span> {contest.reward}
                </p>
                <p className="text-sm">
                  <span className="text-rust-orange font-semibold">Deadline:</span> {contest.deadline}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mb-12">
          <Button className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-lg px-8 py-6" asChild>
            <Link href="/rooster">
              <img
                src="/icons/icon-rooster.png"
                alt="Public Rooster"
                className="w-6 h-6 mr-2 custom-icon inline-block hover:scale-125 transition-transform"
              />
              Submit to Public Rooster
            </Link>
          </Button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-dirty-yellow glitch-text">Past Winners</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {pastWinners.map((winner, index) => (
            <Card key={index} className="p-6 bg-sewer-green border-rust-orange">
              <h3 className="text-xl font-bold text-rust-orange mb-2">{winner.title}</h3>
              <p className="text-sm text-foreground/80 mb-2">{winner.description}</p>
              <div className="pt-3 border-t border-sewer-brown/50 flex justify-between items-center">
                <p className="text-sm">
                  <span className="text-toxic-green font-semibold">Winner:</span> {winner.winner}
                </p>
                <p className="text-sm font-bold text-dirty-yellow">{winner.prize}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <Card className="p-8 bg-sewer-green border-sewer-brown">
          <h2 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">Realms DAO Voting</h2>
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">
              All RaidX winners are decided by community vote on Realms. Hold $DATX, connect your wallet, vote on
              entries. Most votes wins. Simple. Democratic. Shitty.
            </p>
            <Button className="bg-sewer-brown hover:bg-rust-orange text-foreground font-bold" asChild>
              <a
                href="https://realms.today"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <img src="/images/ballot.png" alt="Vote" className="w-4 h-4" />
                Vote on Realms
              </a>
            </Button>
          </div>
        </Card>
      </section>

      <section className="text-center max-w-2xl mx-auto">
        <Card className="p-6 bg-rust-orange/20 border-rust-orange border-2">
          <p className="text-sm text-rust-orange font-bold italic">
            "Your meme shitty enough? Runner Moment or eternal cope."
          </p>
        </Card>
      </section>
    </div>
  )
}
