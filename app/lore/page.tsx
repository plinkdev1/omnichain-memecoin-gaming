import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "./styles.css"
import { SightingsWallScript } from "./client-script"

export default function LorePage() {
  return (
    <>
      <SightingsWallScript />
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 -z-10 opacity-100 md:opacity-15"
          style={{
            backgroundImage: "url(/images/image-2025-12-21t21-04-53-239z.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="container mx-auto px-4 py-12 space-y-12">
          <section className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-dirty-yellow glitch-text font-mono">El Shito Lore</h1>
            <p className="text-xl text-rust-orange font-semibold italic">The Masked Vigilante of the Sewer</p>
          </section>

          <section className="max-w-4xl mx-auto">
            <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden border-4 border-sewer-brown">
              <img src="/hero-el-shito.png" alt="El Shito was here" className="w-full h-full object-cover" />
            </div>

            <Card className="p-8 bg-sewer-green border-sewer-brown mb-8">
              <h2 className="text-3xl font-bold text-dirty-yellow mb-6 glitch-text">
                Origin Lore – The True Backstory
              </h2>
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  <span className="text-rust-orange font-semibold italic">
                    Whispered in the Shadows of the DatXit Sewer...
                  </span>
                </p>
                <p>
                  In the year 2025, when the world finally admitted it had gone full shit – endless wars, collapsing
                  economies, holidays ruined by family crypto arguments, politics that smelled worse than a backed-up
                  toilet – a legend emerged from the depths.
                </p>
                <p className="text-2xl font-bold text-toxic-green text-center py-4">They called him El Shito.</p>
                <p>
                  No one knows his true swirl. Some say he was once a normie holder, rugged one too many times, until
                  his last bag flushed itself down the drain. Others claim he was born directly from the Reserve Hole –
                  a vengeful spirit forged from every burned $DATX token, rising to tag the guilty.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-sewer-green border-sewer-brown mb-8">
              <h3 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">What Is Known</h3>
              <div className="space-y-4 text-foreground/90">
                <p className="leading-relaxed">
                  One night in December 2025, banks, billboards, and government buildings worldwide began appearing with
                  fresh brown graffiti – perfect swirling poop symbols, always accompanied by the cryptic mark:{" "}
                  <span className="text-toxic-green font-bold">"DatXit"</span>.
                </p>
                <div className="grid md:grid-cols-2 gap-4 py-4">
                  <div className="bg-sewer-brown/30 p-4 rounded">
                    <p className="font-bold text-rust-orange mb-2">The authorities called it:</p>
                    <p className="text-sm italic">Vandalism</p>
                  </div>
                  <div className="bg-sewer-brown/30 p-4 rounded">
                    <p className="font-bold text-toxic-green mb-2">The degens called it:</p>
                    <p className="text-sm italic">Justice</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-sewer-green border-sewer-brown mb-8">
              <h3 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">Appearance & Style</h3>
              <div className="space-y-4 text-foreground/90">
                <p className="leading-relaxed">
                  El Shito is the canonical glossy brown pile – mischievous wide eyes hidden behind a black bandana mask
                  that covers only the top half, Zorro-style. A tattered toilet-paper cape flows behind him.
                </p>
                <p className="leading-relaxed">
                  In one hand: a spray can filled with eternal brown paint. In the other: a toilet plunger sword for
                  close encounters with normies.
                </p>
                <p className="leading-relaxed italic text-toxic-green">
                  He moves like a ghost – striking at night, vanishing before dawn, leaving only the stench of truth.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-sewer-green border-sewer-brown mb-8">
              <h3 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">Code of the Sewer</h3>
              <ul className="space-y-3 text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="text-toxic-green text-xl">1.</span>
                  <span>Never harm the innocent degen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-toxic-green text-xl">2.</span>
                  <span>Tag only the corrupt: banks, corporate HQs, politician posters, fake guru billboards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-toxic-green text-xl">3.</span>
                  <span>Every tag ends with the DatXit swirl – a reminder that everything returns to shit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-toxic-green text-xl">4.</span>
                  <span>He answers to no one... except perhaps the Shit High Council in their darkest sessions.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-sewer-green border-sewer-brown mb-8">
              <h3 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text">Signature Moves</h3>
              <div className="space-y-4">
                <div className="bg-sewer-brown/30 p-4 rounded flex items-center gap-3">
                  <img src="/images/moon.png" alt="moon" className="w-7 h-7 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-rust-orange mb-1">The Midnight Flush</p>
                    <p className="text-sm text-foreground/80">A massive rooftop tag visible from highways.</p>
                  </div>
                </div>
                <div className="bg-sewer-brown/30 p-4 rounded flex items-center gap-3">
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-rust-orange mb-1">The Plunger Disarm</p>
                    <p className="text-sm text-foreground/80">Defeating security with sanitary precision.</p>
                  </div>
                </div>
                <div className="bg-sewer-brown/30 p-4 rounded flex items-center gap-3">
                  <img src="/images/flamefire.png" alt="flame" className="w-7 h-7 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-rust-orange mb-1">The Silent Burn</p>
                    <p className="text-sm text-foreground/80">
                      Leaving a small pile of burned $DATXit token as calling card (proof of sacrifice).
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-rust-orange/20 border-rust-orange border-2 mb-8">
              <h3 className="text-2xl font-bold text-rust-orange mb-4 text-center">Current Status</h3>
              <p className="text-center text-foreground/90 leading-relaxed mb-4">
                <span className="font-bold">December 21, 2025</span>
              </p>
              <div className="space-y-3 text-foreground/90">
                <p>
                  El Shito has been sighted in 17 countries. Interpol has a file. The Shit Empire fears him. The
                  community worships him.
                </p>
                <div className="text-center py-6 space-y-2">
                  <p className="text-lg">He is not a hero.</p>
                  <p className="text-lg">He is not a villain.</p>
                  <p className="text-2xl font-bold text-toxic-green">He is the consequence.</p>
                </div>
                <p className="italic text-center">
                  When you see the mark – the perfect swirl on glass, concrete, or digital screens – know this:
                </p>
                <p className="text-2xl font-bold text-center text-dirty-yellow">El Shito was here.</p>
              </div>
            </Card>

            <Card className="p-8 bg-sewer-green border-sewer-brown">
              <h3 className="text-2xl font-bold text-dirty-yellow mb-4 glitch-text text-center">Join Him</h3>
              <div className="space-y-4 text-foreground/90 text-center">
                <p className="leading-relaxed">Get your stencil. Tag your city. Send proof to the Public Rooster.</p>
                <p className="text-toxic-green font-semibold">The masked one watches.</p>
                <p className="text-toxic-green font-semibold">He approves.</p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    className="bg-rust-orange hover:bg-rust-orange/80 text-white font-bold text-lg px-8 py-6"
                    asChild
                  >
                    <Link href="/store" className="flex items-center gap-2">
                      <img src="/images/shoppingcart.png" alt="gear" className="w-6 h-6" />
                      Join the Tagging Revolution – Get Gear
                    </Link>
                  </Button>
                  <Button
                    id="submit-shito-btn"
                    className="bg-rust-orange hover:bg-rust-orange/80 text-black font-bold"
                    asChild
                  >
                    <Link href="/rooster" className="flex items-center gap-2">
                      <img src="/images/cameraroll2.png" alt="camera roll" className="w-6 h-6 mr-2" />
                      Upload Your Sighting Now
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <section className="sightings-section relative min-h-screen py-16 overflow-hidden">
            {/* Grimy wall background with cracks */}
            <div className="absolute inset-0 bg-[#1a1410] opacity-95">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iY3JhY2tzIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMEwxMDAgMTAwTTAgMTAwTDEwMCAwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2NyYWNrcykiLz48L3N2Zz4=')] opacity-20"></div>
              <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-sewer-brown/20 to-transparent blur-2xl animate-pulse"></div>
              <div
                className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-toxic-green/10 to-transparent blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-4xl font-bold text-dirty-yellow mb-4 glitch-text text-center flex items-center justify-center gap-3">
                  <img src="/images/elshitosightings.png" alt="sighting" className="w-10 h-10" />
                  El Shito Global Sightings
                  <img src="/images/elshitosightings.png" alt="sighting" className="w-10 h-10" />
                </h2>
                <p className="text-xl text-rust-orange font-semibold italic">
                  Proof the revolution is real. Human made. AI edited. Tagged worldwide.
                </p>
                <p className="text-sm text-foreground/70 max-w-2xl mx-auto">
                  Send your photos to Public Rooster – best ones pinned forever.
                </p>
                <div className="flex justify-center">
                  <Button
                    id="scramble-wall-btn"
                    className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold flex items-center gap-2"
                  >
                    <img src="/images/refresh.png" alt="refresh" className="w-5 h-5" />
                    Scramble the Wall
                  </Button>
                </div>
              </div>

              {/* Polaroid chaos container */}
              <div id="sightings-wall" className="relative w-full min-h-[1200px] md:min-h-[1400px]">
                {/* NYC Times Square */}
                <div className="polaroid" data-caption="NYC Times Square – El Shito strikes">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-46-53-785z.png"
                      alt="El Shito in NYC"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">NYC Times Square – 2026</div>
                  <div className="polaroid-pin"></div>
                </div>

                {/* Simpsons Living Room */}
                <div className="polaroid" data-caption="Springfield – Infiltration complete">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-30-01-946z.png"
                      alt="El Shito Simpsons"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Springfield – Infiltration</div>
                  <div className="polaroid-tape"></div>
                </div>

                {/* Vigilante Solo */}
                <div className="polaroid polaroid-large" data-caption="The Vigilante – Full Gear">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-26-51-242z.png"
                      alt="El Shito Vigilante"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">The Vigilante – Arsenal</div>
                  <div className="polaroid-pin"></div>
                  <div className="polaroid-string"></div>
                </div>

                {/* Mugshot */}
                <div className="polaroid polaroid-torn" data-caption="Wanted – Still at large">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-28-43-931z.png"
                      alt="El Shito Mugshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">WANTED – $0 reward</div>
                  <div className="polaroid-tape"></div>
                </div>

                {/* Delhi Smog */}
                <div className="polaroid polaroid-medium" data-caption="Delhi Smog Solidarity">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-46-24-904z.png"
                      alt="El Shito Delhi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Delhi – Smog Solidarity</div>
                  <div className="polaroid-pin"></div>
                </div>

                {/* Delhi Smog Scene 2 */}
                <div className="polaroid polaroid-medium" data-caption="Delhi – Air Quality Protest">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-44-16-942z.png"
                      alt="El Shito Delhi Smog"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Delhi – Smog Justice</div>
                  <div className="polaroid-tape"></div>
                </div>

                {/* Clean Vigilante */}
                <div className="polaroid polaroid-round" data-caption="Profile – The Legend">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-16-44-155z.png"
                      alt="El Shito Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Official Profile</div>
                  <div className="polaroid-string"></div>
                </div>

                {/* Paris Farmer Protest */}
                <div className="polaroid polaroid-large" data-caption="Paris – Farmer Solidarity">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-47-18-778z.png"
                      alt="El Shito Paris"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Paris – Feb 2026 Protests</div>
                  <div className="polaroid-pin"></div>
                  <div className="polaroid-tape"></div>
                </div>

                {/* Brussels Manure Protest */}
                <div className="polaroid polaroid-torn polaroid-large" data-caption="Brussels – Farmer Solidarity">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-32-38-372z.png"
                      alt="El Shito Brussels"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Brussels – Manure Mountain</div>
                  <div className="polaroid-pin"></div>
                </div>

                {/* Night DatXit Tag */}
                <div className="polaroid" data-caption="Night Tag – DatXit Symbol">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-45-44-957z.png"
                      alt="El Shito Night Tag"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Night Tag – DatXit Graffiti</div>
                  <div className="polaroid-pin"></div>
                </div>

                {/* Urban Night Scene */}
                <div className="polaroid polaroid-medium" data-caption="Night Raid – City Tagged">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-24-39-652z.png"
                      alt="El Shito Night"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Midnight Flush Op</div>
                  <div className="polaroid-pin"></div>
                </div>

                {/* Wall Street Sewer */}
                <div className="polaroid polaroid-large" data-caption="Wall Street – Rats & Bankers">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-41-40-380z.png"
                      alt="El Shito Wall Street"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Wall Street Flood</div>
                  <div className="polaroid-pin"></div>
                  <div className="polaroid-string"></div>
                </div>

                {/* NYC Subway Rats */}
                <div className="polaroid polaroid-medium" data-caption="NYC Subway – Rat Army">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-35-54-264z.png"
                      alt="El Shito Subway Rats"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Subway Takeover – NYC</div>
                  <div className="polaroid-pin"></div>
                </div>

                {/* Migrant Boat Toilet Scene */}
                <div className="polaroid polaroid-torn" data-caption="Mediterranean – Solidarity">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-38-25-712z.png"
                      alt="El Shito Migrant Boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">GG NO RE? – Med Sea</div>
                  <div className="polaroid-tape"></div>
                </div>

                {/* Flying El Shito */}
                <div className="polaroid polaroid-large" data-caption="Aerial Surveillance">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-47-31-462z.png"
                      alt="El Shito Flying"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Hypnotic Patrol – Ocean</div>
                  <div className="polaroid-pin"></div>
                  <div className="polaroid-string"></div>
                </div>

                {/* Brussels Tractor */}
                <div className="polaroid polaroid-medium" data-caption="Tractor Revolution">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-46-07-620z.png"
                      alt="El Shito Tractor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Brussels – Tractor Tag</div>
                  <div className="polaroid-pin"></div>
                </div>

                {/* Migrant Camp Scene */}
                <div className="polaroid" data-caption="Night Camp – Border">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-40-12-922z.png"
                      alt="El Shito Camp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">Camp Tag – Solidarity</div>
                  <div className="polaroid-tape"></div>
                </div>

                {/* Central focal portrait with strings */}
                <div className="polaroid polaroid-central" data-caption="The Legend">
                  <div className="polaroid-inner">
                    <img
                      src="/images/image-2025-12-21t16-26-51-242z.png"
                      alt="El Shito Central"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption text-lg font-bold">EL SHITO</div>
                  <div className="polaroid-pin"></div>
                  <div className="polaroid-pin" style={{ top: "10px", right: "10px" }}></div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button
                  className="bg-rust-orange hover:bg-rust-orange/80 text-white font-bold text-lg px-8 py-6"
                  asChild
                >
                  <Link href="/rooster" className="flex items-center gap-2 justify-center">
                    <img src="/images/cameraroll.png" alt="camera roll" className="w-6 h-6" />
                    Upload Your Sighting Now
                  </Link>
                </Button>
                <p className="text-xs text-foreground/50 mt-4">Best submissions get pinned to the wall forever</p>
              </div>
            </div>
          </section>

          {/* El Shito Sighting Guidelines section */}
          <section className="max-w-4xl mx-auto py-8">
            <details className="group bg-[#3a2817] border-4 border-sewer-brown rounded-lg overflow-hidden shadow-2xl">
              <summary className="cursor-pointer p-6 bg-gradient-to-r from-sewer-brown to-rust-orange text-white font-bold text-2xl text-center list-none flex items-center justify-center gap-3 hover:bg-rust-orange/90 transition-colors">
                <img src="/images/clipboard.png" alt="clipboard" className="w-10 h-10" />
                <span>El Shito Sighting Guidelines – Stay in the Shadows (But Keep It Recognizable)</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>

              <div
                className="p-8 bg-[#e8d5b7] relative"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml,%3Csvg width="200" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0,0 Q50,50 100,0 T200,0" stroke="%23000" strokeWidth="0.5" fill="none" opacity="0.1"/%3E%3C/svg%3E\')',
                  fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
                }}
              >
                {/* Crumpled paper effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/10 pointer-events-none"></div>

                <div className="relative z-10 space-y-6 text-[#2a1810]">
                  <p className="text-lg italic leading-relaxed border-l-4 border-sewer-brown pl-4">
                    Degens, artists, real-world taggers – El Shito thrives on chaos, but a true sighting needs that
                    unmistakable sewer vibe.
                  </p>

                  <p className="text-base leading-relaxed">
                    These are <span className="font-bold underline">loose guidelines</span>, not rules. Break them
                    sarcastically for bonus points. The masked one values{" "}
                    <span className="text-toxic-green font-bold">rebellion over perfection</span>.
                  </p>

                  <div className="bg-white/60 p-6 rounded-lg border-2 border-sewer-brown shadow-inner">
                    <h3 className="text-2xl font-bold mb-4 text-rust-orange">Core Canon to Keep Cohesive:</h3>
                    <ul className="space-y-3 text-base">
                      <li className="flex items-start gap-3">
                        <img src="/images/poop.png" alt="poop" className="w-7 h-7 flex-shrink-0" />
                        <span>
                          <strong>Body:</strong> Always a glossy brown swirling poop pile (soft-serve texture, subtle
                          moisture shine).
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <img src="/images/theatermasks.png" alt="masks" className="w-7 h-7 flex-shrink-0" />
                        <span>
                          <strong>Mask:</strong> Black bandana covering the eyes Zorro-style (slits for mischievous wide
                          white eyes + small black pupils).
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <img src="/images/toiletpaper.png" alt="toilet paper" className="w-7 h-7 flex-shrink-0" />
                        <span>
                          <strong>Cape:</strong> Tattered white toilet paper flowing behind.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <img src="/images/toolwrench.png" alt="wrench" className="w-7 h-7 flex-shrink-0" />
                        <span>
                          <strong>Tools:</strong> Spray paint can (brown paint) and/or toilet plunger (as sword/staff).
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <img src="/images/smile2.png" alt="smile" className="w-7 h-7 flex-shrink-0" />
                        <span>
                          <strong>Expression:</strong> Sarcastic, mischievous, defiant – never cute or innocent.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <img src="/images/tag.png" alt="tag" className="w-7 h-7 flex-shrink-0" />
                        <span>
                          <strong>Tag:</strong> Every sighting ends with a fresh "DatXit" swirl or text graffiti.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/60 p-6 rounded-lg border-2 border-toxic-green shadow-inner">
                    <h3 className="text-2xl font-bold mb-4 text-toxic-green">Style Freedom (Go Wild):</h3>
                    <ul className="space-y-2 text-base">
                      <li>
                        ✓ Simpsons cartoon? Realistic photo edit? Banksy stencil? Polaroid snap?{" "}
                        <strong>All welcome</strong>.
                      </li>
                      <li>
                        ✓ <strong>Backgrounds:</strong> Real cities, protests, corporate HQs, subways – the shittier the
                        location, the better.
                      </li>
                      <li>
                        ✓ <strong>Poses:</strong> Sneaking, tagging mid-spray, triumphant, shrugging at normies – mix
                        expressions.
                      </li>
                      <li>
                        ✓ <strong>Extras:</strong> Add rats, manure, smog, fleeing politicians – make it satirical.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/60 p-6 rounded-lg border-2 border-rust-orange shadow-inner">
                    <h3 className="text-2xl font-bold mb-4 text-rust-orange">Submission Tips:</h3>
                    <ul className="space-y-2 text-base">
                      <li className="flex items-center gap-3">
                        <img src="/images/camera.png" alt="camera" className="w-7 h-7" />
                        <span className="pl-2">
                          Tag in real life → photograph → upload to Public Rooster with{" "}
                          <span className="font-bold">#ElShitoWasHere</span>.
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <img src="/images/machinehead.png" alt="ai edits" className="w-7 h-7" />
                        <span className="pl-2">AI edits: Use "Human made AI edited" sign for authenticity.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <img src="/images/trophy2.png" alt="trophy" className="w-7 h-7" />
                        <span className="pl-2">Best sightings get pinned forever + possible sludge rewards.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Example thumbnails */}
                  <div className="my-6">
                    <h4 className="text-xl font-bold mb-4 text-center">Reference Examples:</h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      <div className="aspect-square relative rounded border-2 border-sewer-brown overflow-hidden shadow-md hover:scale-105 transition-transform">
                        <img
                          src="/images/image-2025-12-21t16-26-51-242z.png"
                          alt="Example 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square relative rounded border-2 border-sewer-brown overflow-hidden shadow-md hover:scale-105 transition-transform">
                        <img
                          src="/images/image-2025-12-21t16-16-44-155z.png"
                          alt="Example 2"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square relative rounded border-2 border-sewer-brown overflow-hidden shadow-md hover:scale-105 transition-transform">
                        <img
                          src="/images/image-2025-12-21t16-46-24-904z.png"
                          alt="Example 3"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square relative rounded border-2 border-sewer-brown overflow-hidden shadow-md hover:scale-105 transition-transform">
                        <img
                          src="/images/image-2025-12-21t16-32-38-372z.png"
                          alt="Example 4"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square relative rounded border-2 border-sewer-brown overflow-hidden shadow-md hover:scale-105 transition-transform">
                        <img
                          src="/images/image-2025-12-21t16-45-44-957z.png"
                          alt="Example 5"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square relative rounded border-2 border-sewer-brown overflow-hidden shadow-md hover:scale-105 transition-transform">
                        <img
                          src="/images/image-2025-12-21t16-30-01-946z.png"
                          alt="Example 6"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-6 space-y-3 border-t-2 border-dashed border-sewer-brown">
                    <p className="text-xl font-bold italic">
                      El Shito doesn't follow rules.
                      <br />
                      <span className="text-toxic-green">He flushes them.</span>
                    </p>
                    <p className="text-lg">Send your proof. The revolution watches.</p>
                    <p className="text-sm text-rust-orange font-semibold mt-4">
                      "Cohesion is shit. But recognizable shit spreads faster."
                    </p>
                  </div>

                  <div className="text-center">
                    <Button
                      className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-lg px-8 py-4"
                      asChild
                    >
                      <Link href="/rooster" className="flex items-center gap-2">
                        <img src="/images/cameraroll.png" alt="camera" className="w-6 h-6" />
                        Upload Your Sighting Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </details>
          </section>

          <section className="text-center max-w-3xl mx-auto">
            <Card className="p-8 bg-black/80 border-toxic-green border-2">
              <p className="text-lg text-toxic-green font-bold mb-4">Flush the system. Tag the world.</p>
              <div className="space-y-2 text-foreground/90">
                <p className="flex items-center justify-center gap-2">
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                </p>
                <p className="text-xl font-bold text-dirty-yellow">The shitty world ends where DatXit begins.</p>
                <p className="font-semibold">Flush it. Burn it. Meme it.</p>
                <p className="text-toxic-green">#DatXitToTheSewer #ElShitoWasHere</p>
                <p className="flex items-center justify-center gap-2">
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                  <img src="/images/Toilet.png" alt="toilet" className="w-7 h-7" />
                  <img src="/images/custom2.png" alt="poop" className="w-7 h-7" />
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </>
  )
}
