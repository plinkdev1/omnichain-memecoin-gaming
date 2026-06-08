"use client"

import Link from "next/link"

export default function TermsPage() {
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
            Community Guidelines
          </h1>
          <p
            className="text-lg font-mono text-pink-300/80"
            style={{
              textShadow: "0 0 10px #FF1493",
            }}
          >
            Rules of the Sewer
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
              {/* Introduction */}
              <div>
                <p className="text-pink-200/80 mb-4">
                  By participating in DatXit spaces — including but not limited to the website, dashboard, social media
                  channels, community servers, events, and any official or affiliated platforms — you agree to follow
                  these guidelines.
                </p>
                <p className="text-pink-200/80">
                  These rules protect the community, maintain the integrity of the project, and ensure a safe space for
                  creative expression and satire.
                </p>
              </div>

              {/* Core Rules */}
              <div>
                <h2 className="text-2xl font-bold text-pink-400 mb-6" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Rules of the Sewer
                </h2>

                <div className="space-y-6">
                  {/* Rule 1 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2 flex gap-2">
                      <span className="text-pink-400">1.</span> Keep it Legal & Compliant
                    </h3>
                    <p className="text-pink-200/80 pl-6">
                      All activity must comply with applicable laws, regulations, and platform policies. Do not post,
                      promote, or engage in illegal content or activities, including but not limited to fraud, hacking,
                      harassment, or exploitation.
                    </p>
                  </div>

                  {/* Rule 2 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2 flex gap-2">
                      <span className="text-pink-400">2.</span> No Hate Speech or Discrimination
                    </h3>
                    <p className="text-pink-200/80 pl-6">
                      Do not use slurs, promote bigotry, or engage in hate speech targeting any group based on race,
                      ethnicity, religion, gender, sexual orientation, disability, or any other characteristic. This
                      applies even in satirical context — there are limits to comedy.
                    </p>
                  </div>

                  {/* Rule 3 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2 flex gap-2">
                      <span className="text-pink-400">3.</span> No Sexual or Exploitative Content
                    </h3>
                    <p className="text-pink-200/80 pl-6">
                      Do not share, promote, or request explicit sexual material, child sexual abuse material (CSAM),
                      content sexualizing minors, or any form of sexual exploitation. This is a hard line.
                    </p>
                  </div>

                  {/* Rule 4 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2 flex gap-2">
                      <span className="text-pink-400">4.</span> No Threats, Violence, or Harassment
                    </h3>
                    <p className="text-pink-200/80 pl-6">
                      Do not threaten, harass, dox, or incite violence against individuals or groups. Do not make calls
                      to criminal or violent action. Real harm to real people is never acceptable, regardless of the
                      satirical framing of the project.
                    </p>
                  </div>

                  {/* Rule 5 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2 flex gap-2">
                      <span className="text-pink-400">5.</span> Stay On-Lore
                    </h3>
                    <p className="text-pink-200/80 pl-6">
                      Respect the satirical and memetic nature of the project. Engage with the lore creatively and
                      respectfully. Challenge ideas, discuss, debate — but do so in good faith. Bad-faith misuse of the
                      lore to promote actual harm will result in removal.
                    </p>
                  </div>

                  {/* Rule 6 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2 flex gap-2">
                      <span className="text-pink-400">6.</span> No Impersonation or Misrepresentation
                    </h3>
                    <p className="text-pink-200/80 pl-6">
                      Do not impersonate project members, leadership, or moderators. Do not falsely claim official
                      affiliation with DatXit. Do not spread misinformation about the project or its members.
                    </p>
                  </div>

                  {/* Rule 7 */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2 flex gap-2">
                      <span className="text-pink-400">7.</span> Respect Platform Rules
                    </h3>
                    <p className="text-pink-200/80 pl-6">
                      Follow the terms of service and community guidelines of any platform hosting DatXit content
                      (Discord, Twitter, Telegram, etc.). Violations of platform rules may result in removal from
                      official DatXit spaces.
                    </p>
                  </div>
                </div>
              </div>

              {/* Moderation */}
              <div className="border-t border-pink-500/30 pt-6">
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Moderation & Enforcement
                </h2>
                <div className="space-y-4 text-pink-200/80">
                  <p>Moderators monitor official DatXit spaces and take action against violations including:</p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Warnings for minor violations</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Temporary or permanent bans from official spaces</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Reports to platform authorities for illegal content</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>Public distancing from individuals or content violating these rules</span>
                    </li>
                  </ul>

                  <p className="pt-4 bg-black/40 p-4 rounded border border-pink-500/30">
                    <span className="text-pink-300 font-bold">Law Enforcement Cooperation:</span> Any violations
                    involving illegal activity will be reported to appropriate law enforcement and legal authorities. We
                    do not tolerate illegal behavior and cooperate fully with investigations.
                  </p>

                  <p className="pt-4 bg-black/40 p-4 rounded border border-pink-500/30">
                    Moderation decisions are final. We do not tolerate appeals based on "free speech" or "it's just
                    satire." The sewer has standards.
                  </p>
                </div>
              </div>

              {/* User-Generated Content */}
              <div className="border-t border-pink-500/30 pt-6">
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  User-Generated Content & Third Parties
                </h2>
                <p className="text-pink-200/80">
                  DatXit is not responsible for user-generated content in community spaces (Discord, Twitter replies,
                  forums, etc.). However, we actively monitor official channels and will remove or ban users violating
                  these guidelines.
                </p>
                <p className="text-pink-200/80 mt-3">
                  If you see a violation, report it to moderators or contact the DatXit team directly.
                </p>
              </div>

              {/* Satire & Free Expression */}
              <div className="border-t border-pink-500/30 pt-6">
                <h2 className="text-2xl font-bold text-pink-400 mb-4" style={{ textShadow: "0 0 10px #FF1493" }}>
                  Satire, Memes & Free Expression
                </h2>
                <div className="space-y-4 text-pink-200/80">
                  <p>
                    DatXit celebrates creative expression, dark humor, and satire. We encourage meme-making, lore
                    creation, criticism, and discussion within legal and ethical bounds.
                  </p>
                  <p className="bg-black/40 p-4 rounded border border-pink-500/30">
                    <span className="text-pink-300 font-bold">BUT:</span> Satire is not a license to harm. We draw the
                    line at hate speech, exploitation, and illegal activity. Know the difference between "edgy joke" and
                    "actual hate."
                  </p>
                </div>
              </div>

              {/* Reporting */}
              <div
                className="p-4 md:p-6 rounded border border-pink-500/40 bg-black/40 border-t border-pink-500/30 mt-6 pt-6"
                style={{
                  boxShadow: "inset 0 0 10px rgba(255, 20, 147, 0.1)",
                }}
              >
                <p className="text-pink-300 font-bold mb-3">Report Violations</p>
                <p className="text-pink-200/80 mb-4">
                  If you witness a violation of these guidelines, report it immediately to:
                </p>
                <ul className="space-y-2 text-pink-200/80 pl-4">
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Moderators in official Discord/Telegram channels</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Via the feedback form on the website</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>Direct message to DatXit leadership</span>
                  </li>
                </ul>
              </div>

              {/* Footer note */}
              <div className="text-center text-xs text-pink-300/60 pt-4 border-t border-pink-500/30">
                <p className="font-bold text-pink-300 mb-2">DatXit Community Guidelines</p>
                <p>December 2025</p>
                <p className="mt-3 text-pink-200/60">
                  These guidelines may be updated at any time. Participation implies acceptance of current rules.
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
