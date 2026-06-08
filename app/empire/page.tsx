"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ElShitoPolaroid } from "@/components/el-shito-polaroid"

// El Shito's Sewer Newsreel - The real empire exposed
const empireSlides = [
  {
    image: "/images/empire/olympics-poop-torch.png",
    caption: "Olympics 2024: Running On Broken Dreams And Literal Shit",
    effect: "glitch",
  },
  {
    image: "/images/empire/mcdonalds-el-shito.png",
    caption: "El Shito Infiltrates Happy Meals – Kids Finally Get Real Nutrition",
    effect: "flush",
  },
  {
    image: "/images/empire/wall-street-bull.png",
    caption: "Wall Street Bull Drowning In Its Own Product",
    effect: "crack",
  },
  {
    image: "/images/empire/corrupt-boardroom.png",
    caption: "Corporate Board Meeting: Where Decisions Stink As Bad As The Air",
    effect: "polaroid",
  },
  {
    image: "/images/empire/trump-biden-debate.png",
    caption: "American Democracy: Two Piles Arguing Over Who Stinks Less",
    effect: "censored",
  },
  {
    image: "/images/empire/harvard-graduation.png",
    caption: "Elite Education: Worthless Degrees From Worthless Institutions",
    effect: "flicker",
  },
  {
    image: "/images/empire/nike-sweatshop.png",
    caption: "Just Doo It: Your Sneakers Made By Exploited Hands",
    effect: "glitch",
  },
  {
    image: "/images/empire/vatican-fountain.png",
    caption: "Holy Water Replaced With Holy Shit – Nobody Noticed",
    effect: "flush",
  },
  {
    image: "/images/empire/who-pandemic.png",
    caption: "WHO Declares New Pandemic: DatXit Spreading Faster Than Truth",
    effect: "crack",
  },
  {
    image: "/images/empire/ukraine-government.png",
    caption: "Government Transparency: Finally Sitting On What They're Full Of",
    effect: "polaroid",
  },
  {
    image: "/images/empire/apple-iphone-presentation.png",
    caption: "Apple Keynote: The Future Is Brown – Pre-Order Your Piece Of Shit",
    effect: "censored",
  },
  {
    image: "/images/empire/king-of-shit-throne.png",
    caption: "Corporate King On Throne Of Coins And Chaos While World Burns",
    effect: "flicker",
  },
  {
    image: "/images/empire/brazil-clown-politics.png",
    caption: "Democracy 2025: Clowns Leading Nations, Citizens Begging For Sanity",
    effect: "glitch",
  },
  {
    image: "/images/empire/pop-star-toilet-stage.png",
    caption: "Pop Culture: Performing On Toilets While Fans Eat It Up",
    effect: "flush",
  },
  {
    image: "/images/empire/elon-mars-poop-rocket.png",
    caption: "Space Billionaires Plant Flags In Shit – Claim It's Progress",
    effect: "crack",
  },
  {
    image: "/images/empire/search-everything-shit.png",
    caption: "Google Trends 2025: Everyone Searching Why Everything Is Shit",
    effect: "polaroid",
  },
  {
    image: "/images/empire/ftx-prison-crying.png",
    caption: "Crypto Empire Collapses: Tears Flow While Suits Laugh With Your Money",
    effect: "censored",
  },
  {
    image: "/images/empire/climate-girl-sewer-leaders.png",
    caption: "Climate Activism: Youth Rage While Leaders Sit In Their Own Mess",
    effect: "flicker",
  },
  {
    image: "/images/empire/fed-inflation-machine.png",
    caption: "Federal Reserve Money Printer: Churning Out Inflation Like Toilet Paper",
    effect: "glitch",
  },
  {
    image: "/images/empire/world-summit-jungle-table.png",
    caption: "G20 Summit In Paradise: World Leaders Signing Shit While Forests Burn",
    effect: "flush",
  },
  {
    image: "/images/empire/courtroom-clown.png",
    caption: "Justice System: Clowns In Charge While Truth Takes A Shit",
    effect: "crack",
  },
  {
    image: "/images/empire/buffett-diner.png",
    caption: "Billionaire Investors: Reading About Your Poverty While Counting Their Billions",
    effect: "polaroid",
  },
  {
    image: "/images/empire/vr-toilet-overflow.png",
    caption: "Metaverse Dreams: Escape Reality, Enter Digital Sewage",
    effect: "censored",
  },
  {
    image: "/images/empire/disney-castle-sludge.png",
    caption: "Disney Magic Kingdom: The Happiest Shithole On Earth",
    effect: "flicker",
  },
  {
    image: "/images/empire/opera-awards.png",
    caption: "Award Shows: Elite Circlejerk While The World Drowns In Shit",
    effect: "glitch",
  },
  {
    image: "/images/empire/microstrategy-genius.png",
    caption: "Crypto Bros Burn Cash: 'I Am Genius!' Says Man On Fire",
    effect: "flush",
  },
  {
    image: "/images/empire/amazon-bezos-delivery.png",
    caption: "Amazon Prime: Fast Delivery Of Toiletries While World Drowns",
    effect: "crack",
  },
  {
    image: "/images/empire/bitcoin-worship.png",
    caption: "Crypto Cult: Worshipping Digital Coins While DatXit Laughs",
    effect: "polaroid",
  },
  {
    image: "/images/empire/santa-sleigh-datxit.png",
    caption: "Christmas 2025: Santa Delivers Presents Covered In Truth",
    effect: "censored",
  },
  {
    image: "/images/empire/athlete-wealth-table.png",
    caption: "Sports Stars: Surrounded By Luxury While Fans Can't Afford Tickets",
    effect: "flicker",
  },
  {
    image: "/images/empire/privacy-extinct-2025.png",
    caption: "Privacy - Extinct 2025: Surveillance State Where Everyone Is Watched",
    effect: "glitch",
  },
  {
    image: "/images/empire/corporate-greenwashing-jets.png",
    caption: "Sustainability Theater: Private Jets Raining Hypocrisy On The Masses",
    effect: "flush",
  },
  {
    image: "/images/empire/pension-crisis-managers.png",
    caption: "Pension Fund Managers: Hoarding While Your Future Drowns",
    effect: "crack",
  },
  {
    image: "/images/empire/greed-tower-wealth.png",
    caption: "Greed Incarnate: Elites Swim In Money While You're Locked Out",
    effect: "polaroid",
  },
  {
    image: "/images/empire/bailout-collapse.png",
    caption: "The Bailout: Millionaires Escape As The System Collapses Below",
    effect: "censored",
  },
  {
    image: "/images/empire/amazon-automation-ceo.png",
    caption: "Amazon Automation: CEO Throne Built On Worker Exploitation",
    effect: "flicker",
  },
  {
    image: "/images/empire/data-mining-surveillance.png",
    caption: "Your Data Stolen: Every Click Sold To The Highest Bidder",
    effect: "glitch",
  },
  {
    image: "/images/empire/spotify-royalties-exploit.png",
    caption: "Spotify Royalties: Musicians Work For Exposure, Execs Hoard Billions",
    effect: "flush",
  },
  {
    image: "/images/empire/google-data-extraction.png",
    caption: "Google's Machine: Extracting Truth, Flushing Privacy Down The Drain",
    effect: "crack",
  },
  {
    image: "/images/empire/hollywood-celebrity-facade.png",
    caption: "Hollywood Red Carpet: Glamour Show Built On Shit And Exploitation",
    effect: "polaroid",
  },
]

export default function EmpirePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  // Auto-play slideshow
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % empireSlides.length)
        setTransitioning(false)
      }, 400)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = (index: number) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setTransitioning(false)
    }, 400)
  }

  const nextSlide = () => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % empireSlides.length)
      setTransitioning(false)
    }, 400)
  }

  const prevSlide = () => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + empireSlides.length) % empireSlides.length)
      setTransitioning(false)
    }, 400)
  }

  const currentEffect = empireSlides[currentSlide].effect

  return (
    <div className="min-h-screen bg-background dark relative">
      <div
        className="fixed inset-0 -z-10 opacity-100 md:opacity-15"
        style={{
          backgroundImage: "url(/images/image-2025-12-21t21-28-25-006z.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="cracked-overlay"></div>

      {/* Hero Newsreel Section */}
      <section className="relative w-full min-h-[90vh] bg-sewer-green overflow-hidden">
        {/* Sewer wall background with neon tubes */}
        <div className="absolute inset-0 bg-gradient-to-b from-sewer-brown/30 to-sewer-green">
          {/* Flickering neon tubes */}
          <div className="absolute top-0 left-0 w-full h-4 bg-rust-orange/60 animate-[flicker_3s_infinite]"></div>
          <div className="absolute bottom-0 left-0 w-full h-4 bg-toxic-green/40 animate-[flicker_4s_infinite]"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-dirty-yellow mb-4 font-mono glitch-container">
              The Shit Empire Exposed
            </h1>
            <h2 className="text-2xl md:text-3xl text-toxic-green font-mono mb-6">
              <span className="inline-flex items-center gap-2">
                Live from the Sewer Newsreel
                <img src="/images/toilet.png" alt="toilet" className="w-8 h-8" />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
              The world in 2025: A steaming pile. El Shito reports live from the scenes.
              <br />
              <span className="text-rust-orange font-bold">Everything is shit. Watch the proof.</span>
            </p>
          </div>

          {/* Slideshow Container */}
          <div
            className="relative w-full max-w-6xl mx-auto aspect-[16/10] bg-black/80 border-4 border-sewer-brown shadow-2xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Slide Display */}
            <div
              className={`relative w-full h-full empire-slide-${currentEffect} ${transitioning ? "transitioning" : ""}`}
            >
              <Image
                src={empireSlides[currentSlide].image || "/placeholder.svg"}
                alt={empireSlides[currentSlide].caption}
                fill
                className="object-contain"
                priority
              />

              {/* Graffiti watermark */}
              <div className="absolute bottom-20 right-4 opacity-60">
                <div className="relative w-20 h-20">
                  <Image src="/images/datxit-logo.png" alt="DatXit" fill className="object-contain" />
                </div>
              </div>

              {/* "Human made AI edited" watermark */}
              <div className="absolute top-4 right-4 text-xs text-foreground/50 font-mono bg-black/50 px-2 py-1 rounded">
                Human made AI edited
              </div>
            </div>

            {/* Caption Bar - Torn Newspaper Style */}
            <div className="absolute bottom-0 left-0 w-full bg-dirty-yellow/95 border-t-4 border-sewer-brown py-4 px-6 caption-torn">
              <p className="text-black font-bold text-lg md:text-2xl text-center font-mono leading-tight">
                {empireSlides[currentSlide].caption}
              </p>
            </div>

            {/* Navigation Controls */}
            {/* Prev/Next Plunger Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-16 bg-rust-orange hover:bg-toxic-green transition-colors rounded-t-full border-2 border-sewer-brown shadow-lg z-20"
              title="Previous slide"
            >
              <span className="text-2xl">←</span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-16 bg-rust-orange hover:bg-toxic-green transition-colors rounded-t-full border-2 border-sewer-brown shadow-lg z-20"
              title="Next slide"
            >
              <span className="text-2xl">→</span>
            </button>

            {/* Play/Pause Flush Handle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="absolute top-4 left-4 bg-sewer-brown hover:bg-rust-orange transition-colors px-4 py-2 rounded border-2 border-toxic-green z-20"
              title={isPaused ? "Resume" : "Pause"}
            >
              <span className="text-2xl">{isPaused ? "▶" : "⏸"}</span>
            </button>
          </div>

          {/* Poop Pile Indicators */}
          <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
            {empireSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? "opacity-100 scale-125 animate-bounce"
                    : "opacity-50 hover:opacity-100 hover:scale-110"
                }`}
                title={`Slide ${index + 1}`}
              >
                <img src="/images/custom2.png" alt="custom" className="w-10 h-10" />
              </button>
            ))}
          </div>

          {/* Sarcastic Counter */}
          <div className="text-center mt-6 text-toxic-green font-mono text-sm">
            <p>
              Exposing shit {currentSlide + 1} of {empireSlides.length}
            </p>
            <p className="text-foreground/70 mt-2">Sewer pipes clogged, wait...</p>
          </div>
        </div>
      </section>

      {/* Bottom Manifesto */}
      <section className="bg-sewer-brown py-16 relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-toxic-green mb-6 font-mono">The Real Empire We've Been Fighting</h3>
          <p className="text-xl text-foreground/90 leading-relaxed mb-8">
            Corrupt bankers, hypocrite politicians, exploitative CEOs ruling a destroyed world. They built this empire
            on lies, greed, and broken promises. The system stinks because it was designed to.
          </p>
          <p className="text-2xl font-bold text-dirty-yellow mb-8">Time to flush.</p>

          <div className="text-center">
            <div className="inline-block border-t-2 border-b-2 border-toxic-green py-4 px-8">
              <p className="text-xl font-mono text-toxic-green mb-2 flex items-center justify-center gap-1">
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
                <img src="/images/toilet.png" alt="toilet" className="w-6 h-6" />
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
                <img src="/images/toilet.png" alt="toilet" className="w-6 h-6" />
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
                <img src="/images/toilet.png" alt="toilet" className="w-6 h-6" />
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
              </p>
              <p className="text-lg font-bold text-foreground">The shitty world ends where DatXit begins.</p>
              <p className="text-sm text-rust-orange mt-2">Flush it. Burn it. Meme it.</p>
              <p className="text-sm text-dirty-yellow font-mono mt-2">#DatXitToTheSewer</p>
              <p className="text-xl font-mono text-toxic-green mt-2 flex items-center justify-center gap-1">
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
                <img src="/images/toilet.png" alt="toilet" className="w-6 h-6" />
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
                <img src="/images/toilet.png" alt="toilet" className="w-6 h-6" />
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
                <img src="/images/toilet.png" alt="toilet" className="w-6 h-6" />
                <img src="/images/customking.png" alt="custom king" className="w-6 h-6" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* El Shito sighting polaroid in bottom-left corner */}
      <ElShitoPolaroid
        imageUrl="/images/image-2025-12-21t16-46-24-904z.png"
        caption="Delhi Smog – Tagged it all"
        position="bottom-left"
        rotation={Math.random() * 20 - 10}
        opacity={0.35}
      />
    </div>
  )
}
