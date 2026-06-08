"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  id: string
  imageSrc: string
  headline: string
  altText: string
  effect: string
}

const slides: Slide[] = [
  {
    id: "olympics",
    imageSrc: "/images/empire/olympics-poop-torch.png",
    headline: "Olympics 2024: Running On Broken Dreams And Literal Shit",
    altText: "DatXit satirical lore 2025 - Olympics exposed",
    effect: "glitch",
  },
  {
    id: "mcdonalds",
    imageSrc: "/images/empire/mcdonalds-el-shito.png",
    headline: "El Shito Infiltrates Happy Meals – Kids Finally Get Real Nutrition",
    altText: "DatXit satirical lore 2025 - McDonald's exposed",
    effect: "flush",
  },
  {
    id: "wallstreet",
    imageSrc: "/images/empire/wall-street-bull.png",
    headline: "Wall Street Bull Drowning In Its Own Product",
    altText: "DatXit satirical lore 2025 - Wall Street exposed",
    effect: "crack",
  },
  {
    id: "boardroom",
    imageSrc: "/images/empire/corrupt-boardroom.png",
    headline: "Corporate Board Meeting: Where Decisions Stink As Bad As The Air",
    altText: "DatXit satirical lore 2025 - Corporate corruption",
    effect: "polaroid",
  },
  {
    id: "debate",
    imageSrc: "/images/empire/trump-biden-debate.png",
    headline: "American Democracy: Two Piles Arguing Over Who Stinks Less",
    altText: "DatXit satirical lore 2025 - Politics exposed",
    effect: "censored",
  },
  {
    id: "harvard",
    imageSrc: "/images/empire/harvard-graduation.png",
    headline: "Elite Education: Worthless Degrees From Worthless Institutions",
    altText: "DatXit satirical lore 2025 - Education system",
    effect: "flicker",
  },
  {
    id: "nike",
    imageSrc: "/images/empire/nike-sweatshop.png",
    headline: "Just Doo It: Your Sneakers Made By Exploited Hands",
    altText: "DatXit satirical lore 2025 - Nike exposed",
    effect: "glitch",
  },
  {
    id: "vatican",
    imageSrc: "/images/empire/vatican-fountain.png",
    headline: "Holy Water Replaced With Holy Shit – Nobody Noticed",
    altText: "DatXit satirical lore 2025 - Vatican exposed",
    effect: "flush",
  },
  {
    id: "who",
    imageSrc: "/images/empire/who-pandemic.png",
    headline: "WHO Declares New Pandemic: DatXit Spreading Faster Than Truth",
    altText: "DatXit satirical lore 2025 - WHO exposed",
    effect: "crack",
  },
  {
    id: "ukraine",
    imageSrc: "/images/empire/ukraine-government.png",
    headline: "Government Transparency: Finally Sitting On What They're Full Of",
    altText: "DatXit satirical lore 2025 - Government corruption",
    effect: "polaroid",
  },
  {
    id: "apple",
    imageSrc: "/images/empire/apple-iphone-presentation.png",
    headline: "Apple Keynote: The Future Is Brown – Pre-Order Your Piece Of Shit",
    altText: "DatXit satirical lore 2025 - Apple exposed",
    effect: "censored",
  },
  {
    id: "throne",
    imageSrc: "/images/empire/king-of-shit-throne.png",
    headline: "Corporate King On Throne Of Coins And Chaos While World Burns",
    altText: "DatXit satirical lore 2025 - Corporate greed",
    effect: "flicker",
  },
  {
    id: "brazil",
    imageSrc: "/images/empire/brazil-clown-politics.png",
    headline: "Democracy 2025: Clowns Leading Nations, Citizens Begging For Sanity",
    altText: "DatXit satirical lore 2025 - Politics worldwide",
    effect: "glitch",
  },
  {
    id: "popstar",
    imageSrc: "/images/empire/pop-star-toilet-stage.png",
    headline: "Pop Culture: Performing On Toilets While Fans Eat It Up",
    altText: "DatXit satirical lore 2025 - Pop culture exposed",
    effect: "flush",
  },
  {
    id: "elon",
    imageSrc: "/images/empire/elon-mars-poop-rocket.png",
    headline: "Space Billionaires Plant Flags In Shit – Claim It's Progress",
    altText: "DatXit satirical lore 2025 - Space billionaires",
    effect: "crack",
  },
  {
    id: "google",
    imageSrc: "/images/empire/search-everything-shit.png",
    headline: "Google Trends 2025: Everyone Searching Why Everything Is Shit",
    altText: "DatXit satirical lore 2025 - Google trends",
    effect: "polaroid",
  },
  {
    id: "ftx",
    imageSrc: "/images/empire/ftx-prison-crying.png",
    headline: "Crypto Empire Collapses: Tears Flow While Suits Laugh With Your Money",
    altText: "DatXit satirical lore 2025 - Crypto collapse",
    effect: "censored",
  },
  {
    id: "climate",
    imageSrc: "/images/empire/climate-girl-sewer-leaders.png",
    headline: "Climate Activism: Youth Rage While Leaders Sit In Their Own Mess",
    altText: "DatXit satirical lore 2025 - Climate crisis",
    effect: "flicker",
  },
  {
    id: "fed",
    imageSrc: "/images/empire/fed-inflation-machine.png",
    headline: "Federal Reserve Money Printer: Churning Out Inflation Like Toilet Paper",
    altText: "DatXit satirical lore 2025 - Fed inflation",
    effect: "glitch",
  },
  {
    id: "summit",
    imageSrc: "/images/empire/world-summit-jungle-table.png",
    headline: "G20 Summit In Paradise: World Leaders Signing Shit While Forests Burn",
    altText: "DatXit satirical lore 2025 - Global summit",
    effect: "flush",
  },
  {
    id: "courtroom",
    imageSrc: "/images/empire/courtroom-clown.png",
    headline: "Justice System: Clowns In Charge While Truth Takes A Shit",
    altText: "DatXit satirical lore 2025 - Justice system",
    effect: "crack",
  },
  {
    id: "buffett",
    imageSrc: "/images/empire/buffett-diner.png",
    headline: "Billionaire Investors: Reading About Your Poverty While Counting Their Billions",
    altText: "DatXit satirical lore 2025 - Billionaires",
    effect: "polaroid",
  },
  {
    id: "vr",
    imageSrc: "/images/empire/vr-toilet-overflow.png",
    headline: "Metaverse Dreams: Escape Reality, Enter Digital Sewage",
    altText: "DatXit satirical lore 2025 - Metaverse",
    effect: "censored",
  },
  {
    id: "disney",
    imageSrc: "/images/empire/disney-castle-sludge.png",
    headline: "Disney Magic Kingdom: The Happiest Shithole On Earth",
    altText: "DatXit satirical lore 2025 - Disney exposed",
    effect: "flicker",
  },
  {
    id: "opera",
    imageSrc: "/images/empire/opera-awards.png",
    headline: "Award Shows: Elite Circlejerk While The World Drowns In Shit",
    altText: "DatXit satirical lore 2025 - Award shows",
    effect: "glitch",
  },
  {
    id: "microstrategy",
    imageSrc: "/images/empire/microstrategy-genius.png",
    headline: "Crypto Bros Burn Cash: I Am Genius Says Man On Fire",
    altText: "DatXit satirical lore 2025 - Crypto bros",
    effect: "flush",
  },
  {
    id: "amazon",
    imageSrc: "/images/empire/amazon-bezos-delivery.png",
    headline: "Amazon Prime: Fast Delivery Of Toiletries While World Drowns",
    altText: "DatXit satirical lore 2025 - Amazon exposed",
    effect: "crack",
  },
  {
    id: "bitcoin",
    imageSrc: "/images/empire/bitcoin-worship.png",
    headline: "Crypto Cult: Worshipping Digital Coins While DatXit Laughs",
    altText: "DatXit satirical lore 2025 - Bitcoin worship",
    effect: "polaroid",
  },
  {
    id: "santa",
    imageSrc: "/images/empire/santa-sleigh-datxit.png",
    headline: "Christmas 2025: Santa Delivers Presents Covered In Truth",
    altText: "DatXit satirical lore 2025 - Xitmas special",
    effect: "censored",
  },
  {
    id: "athlete",
    imageSrc: "/images/empire/athlete-wealth-table.png",
    headline: "Sports Stars: Surrounded By Luxury While Fans Can't Afford Tickets",
    altText: "DatXit satirical lore 2025 - Sports wealth gap",
    effect: "flicker",
  },
  {
    id: "privacy",
    imageSrc: "/images/empire/privacy-extinct-2025.png",
    headline: "Privacy - Extinct 2025: Surveillance State Where Everyone Is Watched",
    altText: "DatXit satirical lore 2025 - Surveillance",
    effect: "glitch",
  },
  {
    id: "greenwash",
    imageSrc: "/images/empire/corporate-greenwashing-jets.png",
    headline: "Sustainability Theater: Private Jets Raining Hypocrisy On The Masses",
    altText: "DatXit satirical lore 2025 - Greenwashing exposed",
    effect: "flush",
  },
  {
    id: "pension",
    imageSrc: "/images/empire/pension-crisis-managers.png",
    headline: "Pension Fund Managers: Hoarding While Your Future Drowns",
    altText: "DatXit satirical lore 2025 - Pension crisis",
    effect: "crack",
  },
  {
    id: "greed",
    imageSrc: "/images/empire/greed-tower-wealth.png",
    headline: "Greed Incarnate: Elites Swim In Money While You're Locked Out",
    altText: "DatXit satirical lore 2025 - Wealth inequality",
    effect: "polaroid",
  },
  {
    id: "bailout",
    imageSrc: "/images/empire/bailout-collapse.png",
    headline: "The Bailout: Millionaires Escape As The System Collapses Below",
    altText: "DatXit satirical lore 2025 - Bailouts",
    effect: "censored",
  },
  {
    id: "amazon-auto",
    imageSrc: "/images/empire/amazon-automation-ceo.png",
    headline: "Amazon Automation: CEO Throne Built On Worker Exploitation",
    altText: "DatXit satirical lore 2025 - Worker exploitation",
    effect: "flicker",
  },
  {
    id: "data",
    imageSrc: "/images/empire/data-mining-surveillance.png",
    headline: "Your Data Stolen: Every Click Sold To The Highest Bidder",
    altText: "DatXit satirical lore 2025 - Data mining",
    effect: "glitch",
  },
  {
    id: "spotify",
    imageSrc: "/images/empire/spotify-royalties-exploit.png",
    headline: "Spotify Royalties: Musicians Work For Exposure, Execs Hoard Billions",
    altText: "DatXit satirical lore 2025 - Music industry",
    effect: "flush",
  },
  {
    id: "google-extraction",
    imageSrc: "/images/empire/google-data-extraction.png",
    headline: "Google's Machine: Extracting Truth, Flushing Privacy Down The Drain",
    altText: "DatXit satirical lore 2025 - Data extraction",
    effect: "crack",
  },
  {
    id: "hollywood",
    imageSrc: "/images/empire/hollywood-celebrity-facade.png",
    headline: "Hollywood Red Carpet: Glamour Show Built On Shit And Exploitation",
    altText: "DatXit satirical lore 2025 - Hollywood exposed",
    effect: "polaroid",
  },
]

const newSlides: Slide[] = [
  {
    id: "social-media",
    imageSrc: "/images/gemini-generated-image-swdy2bswdy2bswdy.png",
    headline: "Social Media Influencers: +740 Engagement While Earth Burns",
    altText: "DatXit satirical lore 2025 - Social media exposed",
    effect: "glitch",
  },
  {
    id: "fake-news",
    imageSrc: "/images/gemini-generated-image-hkenihkenihkenih.png",
    headline: "DATXIT NEWS: Fake News Factory – Where Truth Goes To Die",
    altText: "DatXit satirical lore 2025 - Fake news exposed",
    effect: "flush",
  },
  {
    id: "hollywood-red-carpet",
    imageSrc: "/images/gemini-generated-image-gclwiqgclwiqgclw.png",
    headline: "Hollywood Red Carpet: Elites Climbing Over Sewage While Posing",
    altText: "DatXit satirical lore 2025 - Hollywood red carpet",
    effect: "crack",
  },
  {
    id: "stock-market",
    imageSrc: "/images/gemini-generated-image-hleglrhleglrhleg.png",
    headline: "Stock Market Rocket Fuel: Billionaires Blast Off While Charts Crash",
    altText: "DatXit satirical lore 2025 - Stock market exposed",
    effect: "polaroid",
  },
  {
    id: "surveillance",
    imageSrc: "/images/gemini-generated-image-rh4b5arh4b5arh4b.png",
    headline: "Surveillance Headquarters: Every Move Watched, Every Thought Tracked",
    altText: "DatXit satirical lore 2025 - Surveillance state",
    effect: "censored",
  },
  {
    id: "spotify",
    imageSrc: "/images/gemini-generated-image-eybyzreybyzreyby.png",
    headline: "Spotify Royalties: Artists Beg For Exposure While CEO Sits On Gold",
    altText: "DatXit satirical lore 2025 - Music exploitation",
    effect: "flicker",
  },
  {
    id: "student-debt",
    imageSrc: "/images/gemini-generated-image-i5ek90i5ek90i5ek.png",
    headline: "Student Debt: Generation Shackled While Billionaires Play Monopoly",
    altText: "DatXit satirical lore 2025 - Student debt crisis",
    effect: "glitch",
  },
  {
    id: "greenwashing",
    imageSrc: "/images/gemini-generated-image-hfobbdhfobbdhfob.png",
    headline: "Corporate Sustainability: Private Jets Spray Hypocrisy While World Drowns",
    altText: "DatXit satirical lore 2025 - Greenwashing exposed",
    effect: "flush",
  },
  {
    id: "elon-doodoo",
    imageSrc: "/images/gemini-generated-image-vlqz6tvlqz6tvlqz.png",
    headline: "Full Self-Doo-Doo Mode: Billionaires Playing God From Golden Toilets",
    altText: "DatXit satirical lore 2025 - Tech billionaire satire",
    effect: "crack",
  },
  {
    id: "privacy-data",
    imageSrc: "/images/gemini-generated-image-vmxeqavmxeqavmxe.png",
    headline: "Your Privacy Extinct: Data Harvested, Packaged, And Sold To The Highest Bidder",
    altText: "DatXit satirical lore 2025 - Privacy invasion exposed",
    effect: "glitch",
  },
  {
    id: "amazon-throne",
    imageSrc: "/images/gemini-generated-image-7xkjnp7xkjnp7xkj.png",
    headline: "Amazon Empire: CEO On Throne Of Boxes While Workers Pump Out Profit",
    altText: "DatXit satirical lore 2025 - Amazon exploitation",
    effect: "flush",
  },
  {
    id: "privacy-extinct",
    imageSrc: "/images/gemini-generated-image-2ud8yf2ud8yf2ud8.png",
    headline: "Privacy Extinct 2025: Last Telephone Booth On Display In Surveillance Museum",
    altText: "DatXit satirical lore 2025 - Privacy extinction",
    effect: "crack",
  },
]

const allSlides = [...slides, ...newSlides]

const motionEffects = ["fade-sludge", "glitch-shift", "flush-swirl", "crack-shatter", "polaroid-flip"]

export function ElShitoSlideshow() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [motionEffect, setMotionEffect] = useState("fade-sludge")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allSlides.length)
      setMotionEffect(motionEffects[Math.floor(Math.random() * motionEffects.length)])
    }, 6000) // 6 seconds per slide

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + allSlides.length) % allSlides.length)
    setMotionEffect(motionEffects[Math.floor(Math.random() * motionEffects.length)])
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % allSlides.length)
    setMotionEffect(motionEffects[Math.floor(Math.random() * motionEffects.length)])
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative w-full bg-sewer-dark overflow-hidden" style={{ height: "80vh" }}>
      {/* Background: Sewer wall with neon lights */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 200, 0, 0.1) 2px, rgba(255, 200, 0, 0.1) 4px)",
            animation: "flicker 0.15s infinite",
          }}
        />
        {/* Neon tube lights */}
        <div
          className="absolute top-1/4 left-0 right-0 h-1 opacity-60 blur-sm"
          style={{
            background: "linear-gradient(90deg, transparent, #8B6914, transparent)",
            boxShadow: "0 0 20px #8B6914",
            animation: "flicker 3s infinite",
          }}
        />
        <div
          className="absolute bottom-1/3 left-0 right-0 h-1 opacity-50 blur-sm"
          style={{
            background: "linear-gradient(90deg, transparent, #8B6914, transparent)",
            boxShadow: "0 0 20px #8B6914",
            animation: "flicker 4s infinite 1s",
          }}
        />
      </div>

      {/* Slides Container */}
      <div className="relative w-full h-full">
        {allSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === current ? `opacity-100 ${motionEffect}` : "opacity-0"
            }`}
          >
            <Image
              src={slide.imageSrc || "/placeholder.svg"}
              alt={slide.altText}
              fill
              className="object-contain bg-black"
              priority={index === current}
            />

            {/* Phone screen glare overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

            {/* Timestamp - progressing toward Dec 25 */}
            <div className="absolute bottom-6 right-6 text-xs font-mono text-white/80 bg-black/60 px-3 py-1 rounded">
              2025-{String((current + 1) * 2).padStart(2, "0")}-{String((current + 1) * 2).padStart(2, "0")}
            </div>

            {/* Torn newspaper style caption bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-sewer-brown border-t-4 border-dashed border-rust-orange">
              <div className="container mx-auto px-4 py-3 relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg text-balance">
                    {slide.headline}
                  </h3>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute bottom-1 right-4 text-xs text-white/60 font-mono">Human made. AI edited.</div>

              {/* DatXit graffiti swirl */}
              <div className="absolute bottom-2 right-24 text-toxic-green/60 text-xs font-bold italic rotate-12">
                ∞ DatXit
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-32 left-0 right-0 z-20 flex items-center justify-between px-4 container mx-auto">
        {/* Previous Button - Toilet Plunger */}
        <Button
          onClick={handlePrev}
          className="bg-sewer-brown hover:bg-rust-orange text-white rounded-full p-4 shadow-lg"
          size="icon"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Play/Pause Button - Flush Handle */}
        <Button
          onClick={togglePlayPause}
          className="bg-toxic-green hover:bg-dirty-yellow text-black rounded-full p-4 shadow-lg font-bold"
          size="icon"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>

        {/* Next Button - Toilet Plunger */}
        <Button
          onClick={handleNext}
          className="bg-sewer-brown hover:bg-rust-orange text-white rounded-full p-4 shadow-lg"
          size="icon"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dot Indicators - Poop Piles */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-2">
        {allSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setMotionEffect(motionEffects[Math.floor(Math.random() * motionEffects.length)])
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-dirty-yellow shadow-lg scale-125" : "bg-sewer-brown/60 hover:bg-rust-orange/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Styles for motion effects */}
      <style jsx>{`
        @keyframes flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes sludgeDrip {
          0% {
            clip-path: inset(0 0 100% 0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }

        @keyframes glitchShift {
          0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          20% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          40% {
            transform: translate(2px, -2px);
            filter: hue-rotate(180deg);
          }
          60% {
            transform: translate(-2px, -2px);
            filter: hue-rotate(270deg);
          }
          80% {
            transform: translate(2px, 2px);
            filter: hue-rotate(360deg);
          }
        }

        @keyframes flushSwirl {
          0% {
            clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
            transform: rotate(0deg) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            transform: rotate(720deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes crackShatter {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translate(0);
          }
          25% {
            clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
            transform: translate(2px, -2px);
          }
          50% {
            clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%);
            transform: translate(-2px, 2px);
          }
          75% {
            clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
            transform: translate(1px, 1px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translate(0);
          }
        }

        @keyframes polaroidFlip {
          0% {
            transform: rotateY(-90deg) rotateZ(-15deg) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg) rotateZ(0deg) scale(1);
            opacity: 1;
          }
        }

        .fade-sludge {
          animation: sludgeDrip 0.7s ease-out;
        }

        .glitch-shift {
          animation: glitchShift 0.6s ease-in-out;
        }

        .flush-swirl {
          animation: flushSwirl 0.8s ease-in-out;
        }

        .crack-shatter {
          animation: crackShatter 0.7s ease-in-out;
        }

        .polaroid-flip {
          animation: polaroidFlip 0.6s ease-out;
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}
