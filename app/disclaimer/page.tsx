"use client"

import Link from "next/link"

export default function DisclaimerPage() {
  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/backgrounds/wallpaper-01-sewer-network.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-12 md:py-20 px-4">
          <h1
            className="text-5xl md:text-6xl font-bold font-mono mb-4 text-pink-400"
            style={{
              textShadow: "0 0 20px #FF1493, 0 0 40px #8B4513",
            }}
          >
            Important Disclaimer
          </h1>
          <p
            className="text-lg font-mono text-pink-300/80"
            style={{
              textShadow: "0 0 10px #FF1493",
            }}
          >
            Read before participating
          </p>
        </div>

        {/* Content Card */}
        <div className="max-w-3xl mx-auto px-4 pb-20">
          <div
            className="rounded-lg p-8 md:p-12 border-2 border-pink-500/60 backdrop-blur-sm"
            style={{
              background: "rgba(20, 10, 10, 0.85)",
              boxShadow: "0 0 20px rgba(255, 20, 147, 0.5), inset 0 0 10px rgba(139, 69, 19, 0.3)",
            }}
          >
            <div className="space-y-8 font-mono text-pink-100/90 leading-relaxed text-base md:text-lg">
              {/* Main disclaimer */}
              <div>
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Nature of the Project
                </h2>
                <p className="text-pink-200/80 mb-4">
                  $DATX and the El Shito lore are a satirical meme project and cultural commentary on societal
                  absurdity. The content is intended purely as dark humor, creative expression, and entertainment.
                </p>
                <p className="text-pink-200/80">
                  All imagery, text, and lore serve as parody and satire. They do not reflect the beliefs, values, or
                  official positions of the DatXit project, its creators, team members, or authorized channels.
                </p>
              </div>

              <div className="border-t border-pink-500/30 pt-6">
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Financial Disclaimer
                </h2>
                <div className="space-y-4 text-pink-200/80">
                  <p className="bg-black/40 p-4 rounded border border-pink-500/30">
                    <span className="text-pink-300 font-bold">CRITICAL:</span> $DATX is a memecoin and satirical
                    project. It is NOT a financial investment, security, or profit-generating asset. We make{" "}
                    <span className="font-bold">NO promises</span> of future price appreciation, utility, or financial
                    returns.
                  </p>
                  <p>
                    This is NOT financial advice. Do not invest money you cannot afford to lose. Cryptocurrency is
                    volatile and speculative. Past performance is not indicative of future results. Participate for
                    community, memes, and satire only – not profit.
                  </p>
                </div>
              </div>

              {/* What we DO NOT tolerate */}
              <div>
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  What We Explicitly DO NOT Endorse
                </h2>
                <div className="space-y-3 text-pink-200/80">
                  <p className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Hate speech, discrimination, or bigotry of any kind</span>
                  </p>
                  <p className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Sexual content, pedophilia, or any form of exploitation</span>
                  </p>
                  <p className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Violence, threats, harassment, or criminal activity</span>
                  </p>
                  <p className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Any behavior that violates laws, regulations, or platform policies</span>
                  </p>
                  <p className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Misrepresentation or impersonation of project members or leadership</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-pink-500/30 pt-6">
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Intellectual Property & Brand Protection
                </h2>
                <div className="space-y-4 text-pink-200/80">
                  <p>
                    The DatXit brand, logo, El Shito character, and official lore are protected intellectual property of
                    the DatXit project.
                  </p>
                  <p>
                    <span className="text-pink-300 font-bold">Fan Content:</span> You may create fan art, memes, and
                    creative content featuring DatXit imagery for non-commercial purposes.
                  </p>
                  <p>
                    <span className="text-pink-300 font-bold">Commercial Use:</span> You may NOT commercialize, sell,
                    trademark, or profit from DatXit brand assets without explicit written permission from the DatXit
                    team.
                  </p>
                  <p>Unauthorized commercial use will result in legal action and takedown notices.</p>
                </div>
              </div>

              {/* Liability disclaimer */}
              <div className="border-t border-pink-500/30 pt-6">
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Liability and Responsibility
                </h2>
                <div className="space-y-4 text-pink-200/80">
                  <p>
                    The DatXit project, its creators, team members, moderators, and official channels bear{" "}
                    <span className="text-pink-300 font-bold">NO responsibility</span> for:
                  </p>
                  <div className="space-y-2 pl-4">
                    <p className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>
                        The actions, statements, or interpretations of third-party users or anonymous individuals
                      </span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Misuse, modification, or recontextualization of the lore by any party</span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Any harmful, illegal, or unethical use of the project's content or brand</span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>User-generated content in community spaces, even if flagged as "official"</span>
                    </p>
                  </div>

                  <p className="pt-4 bg-black/40 p-4 rounded border border-pink-500/30">
                    <span className="text-pink-300 font-bold">Important:</span> Any individual engaging in prohibited,
                    illegal, or harmful behavior — even if claiming affiliation with $DATX, El Shito, or the DatXit
                    project — acts entirely on their own and does{" "}
                    <span className="text-pink-400 font-bold">NOT represent</span> the project in any way.
                  </p>
                </div>
              </div>

              {/* Moderation policy */}
              <div className="border-t border-pink-500/30 pt-6">
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Moderation and Enforcement
                </h2>
                <div className="space-y-4 text-pink-200/80">
                  <p>
                    We actively monitor and moderate official DatXit spaces (site, dashboard, social channels, community
                    servers, etc.) to prevent and remove:
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Hate speech, discrimination, and threats</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Explicit sexual content or exploitation</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Illegal content and activities</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Impersonation and misrepresentation</span>
                    </li>
                  </ul>
                  <p className="pt-4">
                    Violators will be{" "}
                    <span className="text-pink-300 font-bold">
                      banned, blocked, and reported to platform authorities
                    </span>{" "}
                    as appropriate. We also reserve the right to publicly distance ourselves from any content or
                    individual violating these principles.
                  </p>
                  <p className="pt-4 bg-black/40 p-4 rounded border border-pink-500/30">
                    <span className="text-pink-300 font-bold">Law Enforcement:</span> Any illegal activity, including
                    but not limited to fraud, hacking, threats, exploitation, or violence, will be reported to
                    applicable law enforcement and legal authorities. We cooperate fully with investigations.
                  </p>
                </div>
              </div>

              {/* Participation clause */}
              <div
                className="p-4 md:p-6 rounded border border-pink-500/40 bg-black/40"
                style={{
                  boxShadow: "inset 0 0 10px rgba(255, 20, 147, 0.1)",
                }}
              >
                <p className="text-pink-300 font-bold mb-2">Participation Agreement</p>
                <p className="text-pink-200/80">
                  By accessing, engaging with, or participating in any DatXit space (website, dashboard, social media,
                  community, etc.), you acknowledge that you have read this disclaimer and agree to comply with all
                  stated terms.
                </p>
                <p className="text-pink-200/80 mt-3">
                  Engage responsibly, legally, and ethically. Satire and creative expression thrive within boundaries of
                  legality and human decency.
                </p>
              </div>

              {/* Footer note */}
              <div className="text-center text-xs text-pink-300/60 pt-4 border-t border-pink-500/30">
                <p className="font-bold text-pink-300 mb-2">DatXit Team</p>
                <p>December 2025</p>
                <p className="mt-3 text-pink-200/60">
                  This disclaimer is binding. Contact us with concerns regarding misuse or violations.
                </p>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-2 rounded font-mono font-bold text-sm bg-sewer-brown/50 hover:bg-sewer-brown/70 transition-all border border-sewer-brown/60 text-pink-300/80"
              style={{
                boxShadow: "0 0 8px rgba(139, 69, 19, 0.4)",
              }}
            >
              Back to Sewer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
