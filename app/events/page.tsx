"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ElShitoPolaroid } from "@/components/el-shito-polaroid"

const sewerEvents = [
  {
    date: "Dec 21, 2025",
    name: "Xitmas 2025",
    description: "The day the world turned to shit. Fair launch on pump.fun. Dec 21 = eternal Xitmas for degens.",
    emoji: "🎄💩",
    type: "historic",
  },
  {
    date: "Feb 14, 2026",
    name: "Valenshit's Day",
    description: "Love is dead. Politicians lie. Roses are red, violets are shit. El Shito tags Cupid's headquarters.",
    emoji: "💔💩",
    type: "upcoming",
  },
  {
    date: "Apr 1, 2026",
    name: "April Fools Flush",
    description: "The joke's on them. Corporate earnings? Fake. Democracy? Fake. DatXit? Real as shit gets.",
    emoji: "🤡💩",
    type: "upcoming",
  },
  {
    date: "Jul 4, 2026",
    name: "Independunce Day",
    description:
      "Freedom from tyranny, taxes, and terrible tokenomics. El Shito liberates every sewer from oppression.",
    emoji: "🇺🇸💩",
    type: "upcoming",
  },
  {
    date: "Oct 31, 2026",
    name: "Shitolloween",
    description:
      "Scary? The real horror is inflation, war, and smog. El Shito's mask isn't a costume – it's permanent.",
    emoji: "🎃💩",
    type: "upcoming",
  },
  {
    date: "Nov 27, 2026",
    name: "Tankshitting",
    description: "Be grateful for what? Rising rent? Failing systems? We feast on burns and sarcasm instead.",
    emoji: "🦃💩",
    type: "upcoming",
  },
  {
    date: "Dec 31, 2026",
    name: "New Year's Heave",
    description: "Out with the old shit, in with the... same shit but tokenized. Toast with sludge, not champagne.",
    emoji: "🎉💩",
    type: "upcoming",
  },
]

const memePrompts = [
  "El Shito standing in front of [your local corrupt building], holding spray can, sarcastic grin",
  "Simpsons-style El Shito photobombing [politician name] press conference with toilet paper cape flowing",
  "Realistic photo edit: El Shito graffiti tag discovered on [famous landmark], security confused",
  "El Shito on a tractor dumping manure on Brussels HQ with EU flag burning in background, farmers cheering",
  "Delhi smog scene: El Shito emerges from toxic cloud wielding plunger like Excalibur, citizens coughing",
  "NYC subway car filled with rats and normies, El Shito spray-painting 'DatXit' on ceiling, total chaos",
  "Wall Street flooded with sewage, El Shito surfing on toilet plunger, bankers fleeing in suits",
  "Migrant boat at sea, El Shito appearing like a guardian angel with TP cape, politicians drowning nearby",
  "Corporate boardroom: El Shito bursts through window mid-meeting, executives panicking, 'Flush The System' graffiti",
  "Parliament building covered in manure, El Shito standing triumphant on roof with plunger flag planted",
  "El Shito tagging 'Everything Is Shit' on Hollywood sign at sunrise, paparazzi helicopters circling",
  "Banksy-style stencil: El Shito silhouette holding spray can with 'Human Made AI Edited' signature below",
  "El Shito emerging from manhole in Times Square, tourists taking selfies while police look confused",
  "French farmers' protest: El Shito riding tractor through Paris, Eiffel Tower tagged with DatXit logo",
  "El Shito infiltrating G7 summit photo op, leaders unaware, toilet paper cape barely visible behind them",
]

export default function EventsPage() {
  const [currentPrompt, setCurrentPrompt] = useState(memePrompts[0])

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * memePrompts.length)
    setCurrentPrompt(memePrompts[randomIndex])
  }

  const currentEvent = sewerEvents.find((e) => e.type === "historic") || sewerEvents[0]

  return (
    <div className="min-h-screen relative">
      <ElShitoPolaroid
        imageUrl="/images/image-2025-12-21t16-32-38-372z.png"
        caption="Brussels – Manure meets mission"
        position="top-right"
        rotation={Math.random() * 20 - 10}
        opacity={0.38}
      />
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/images/image-2025-12-21t21-27-51-950z.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Hero */}
      <section className="relative border-b-4 border-sewer-brown bg-gradient-to-b from-sewer-green to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/images/calendar2.png"
              alt="DatXit Sewer Calendar"
              className="w-14 h-14 calendar-icon inline-block hover:scale-125 transition-transform"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow mb-4 glitch-text font-mono">
              SHITTY EVENTS
            </h1>
            <img
              src="/images/calendar2.png"
              alt="DatXit Sewer Calendar"
              className="w-14 h-14 calendar-icon inline-block hover:scale-125 transition-transform"
            />
          </div>
          <p className="text-xl md:text-2xl text-foreground/90 mb-2 font-mono">Mark your calendars with pure sarcasm</p>
          <p className="text-sm text-toxic-green font-mono">Everything is shit. Celebrate accordingly.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Current Event Highlight */}
        <section>
          <div className="rusty-card p-8 border-4 border-rust-orange rounded-lg relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <img src="/images/xmas.png" alt="xmas" className="w-24 h-24 opacity-20" />
            </div>
            <div className="relative z-10">
              <div className="inline-block bg-toxic-green text-background px-4 py-1 rounded-full text-xs font-bold mb-4 flex items-center gap-2">
                <img src="/images/flame2.png" alt="flame" className="w-6 h-6 whitespace-nowrap" />
                <span className="whitespace-nowrap">CURRENT EVENT</span>
              </div>
              <h2 className="text-4xl font-bold text-dirty-yellow mb-2 font-mono">{currentEvent.name}</h2>
              <p className="text-lg text-rust-orange font-mono mb-4">{currentEvent.date}</p>
              <p className="text-foreground/90 text-lg leading-relaxed">{currentEvent.description}</p>
              <div className="mt-6 flex gap-4 flex-wrap">
                <Button
                  onClick={() => window.open("https://x.com/DatXitSewer", "_blank")}
                  className="bg-sewer-brown hover:bg-rust-orange transition-colors font-mono"
                >
                  <img src="/images/Toilet.png" alt="toilet" className="w-6 h-6 mr-2 inline-block" />
                  Share on X
                </Button>
                <Button
                  variant="outline"
                  className="border-sewer-brown text-foreground hover:bg-sewer-brown/20 font-mono bg-transparent"
                >
                  Add to Calendar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Meme Prompt Generator */}
        <section>
          <Card className="rusty-card p-8 border-2 border-sewer-brown">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/paintboard.png" alt="meme generator" className="w-14 h-14" />
              <h2 className="text-3xl font-bold text-dirty-yellow font-mono">Official Meme Prompt Generator</h2>
            </div>
            <p className="text-sm text-foreground/70 mb-6 font-mono">
              Click to generate random El Shito sighting ideas. Use official canon elements. Stay recognizable.
            </p>

            <div className="bg-sewer-green/30 border-2 border-toxic-green rounded-lg p-6 mb-6 min-h-32 flex items-center">
              <p className="text-lg text-foreground font-mono leading-relaxed">{currentPrompt}</p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={generateRandomPrompt}
                className="bg-toxic-green text-background hover:bg-toxic-green/80 transition-colors font-mono font-bold flex items-center gap-2"
              >
                <img src="/images/gamedice.png" alt="game dice" className="w-6 h-6" />
                Generate Random Prompt
              </Button>
              <Button
                variant="outline"
                className="border-sewer-brown text-foreground hover:bg-sewer-brown/20 font-mono bg-transparent flex items-center gap-2"
                onClick={() => navigator.clipboard.writeText(currentPrompt)}
              >
                <img src="/images/clipboard.png" alt="clipboard" className="w-6 h-6" />
                Copy Prompt
              </Button>
            </div>

            <p className="text-xs text-foreground/60 mt-4 font-mono italic">
              Tip: Submit your creations to Public Rooster for eternal glory and potential sludge rewards.
            </p>
          </Card>
        </section>

        {/* Event Calendar */}
        <section>
          <h2 className="text-4xl font-bold text-dirty-yellow mb-8 font-mono flex items-center gap-3">
            <img src="/images/calendar2.png" alt="calendar" className="w-12 h-12" />
            The Shitty Calendar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sewerEvents.map((event, i) => {
              const eventEmoji = event.emoji
              if (event.name === "Xitmas 2025") {
                return (
                  <Card
                    key={i}
                    className={`rusty-card p-6 border-2 transition-all hover:scale-105 ${
                      event.type === "historic"
                        ? "border-toxic-green bg-toxic-green/5"
                        : "border-sewer-brown hover:border-rust-orange"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-rust-orange font-mono mb-1">{event.date}</p>
                        <h3 className="text-xl font-bold text-dirty-yellow font-mono">{event.name}</h3>
                      </div>
                      <img src="/images/xmas.png" alt="xmas" className="w-14 h-14" />
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{event.description}</p>
                    {event.type === "historic" && (
                      <div className="mt-4 inline-block bg-toxic-green/20 border border-toxic-green px-3 py-1 rounded-full text-xs font-bold text-toxic-green flex items-center gap-2 whitespace-nowrap">
                        <img src="/images/target.png" alt="target" className="w-5 h-5" />
                        HISTORIC
                      </div>
                    )}
                  </Card>
                )
              }
              const emojiMap: { [key: string]: string } = {
                "Valenshit's Day": "/images/valentines.png",
                "April Fools Flush": "/images/aprilfool.png",
                "Independunce Day": "/images/independenceday.png",
                Shitolloween: "/images/halloween.png",
                Tankshitting: "/images/thanksgiving.png",
                "New Year's Heave": "/images/newyeareve.png",
              }

              const emojiImage = emojiMap[event.name]

              return (
                <Card
                  key={i}
                  className={`rusty-card p-6 border-2 transition-all hover:scale-105 ${
                    event.type === "historic"
                      ? "border-toxic-green bg-toxic-green/5"
                      : "border-sewer-brown hover:border-rust-orange"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-rust-orange font-mono mb-1">{event.date}</p>
                      <h3 className="text-xl font-bold text-dirty-yellow font-mono">{event.name}</h3>
                    </div>
                    {emojiImage ? (
                      <img src={emojiImage || "/placeholder.svg"} alt={event.name} className="w-14 h-14" />
                    ) : (
                      <span className="text-3xl">{event.emoji}</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{event.description}</p>
                  {event.type === "historic" && (
                    <div className="mt-4 inline-block bg-toxic-green/20 border border-toxic-green px-3 py-1 rounded-full text-xs font-bold text-toxic-green flex items-center gap-2 whitespace-nowrap">
                      <img src="/images/target.png" alt="target" className="w-5 h-5" />
                      HISTORIC
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </section>

        {/* Upload Sighting Button Section */}
        <section className="text-center py-8 space-y-4">
          <Button className="bg-rust-orange hover:bg-rust-orange/80 text-black font-bold text-lg px-8 py-6 flex items-center gap-2 mx-auto">
            <img src="/images/camera.png" alt="camera" className="w-7 h-7" />
            Upload Your Sighting Now
          </Button>
          <p className="text-foreground/60 font-mono text-sm mb-2">
            "Mark your calendar with sarcasm. Celebrate the collapse."
          </p>
          <p className="text-toxic-green font-mono text-xs">
            El Shito doesn't do holidays. He ruins them.{" "}
            <img src="/images/custom2.png" alt="custom emoji" className="w-6 h-6 inline-block" />
          </p>
        </section>
      </div>
    </div>
  )
}
