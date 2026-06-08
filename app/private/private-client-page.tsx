"use client"

export default function PrivateClubClientPage() {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/private-club-banner.png')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Heavy overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Animated fog */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-pulse"></div>
      </div>

      {/* Dripping particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-700 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animation: `drip ${4 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.6,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* Velvet curtain effect */}
        <div className="mb-12 relative inline-block">
          <div className="absolute inset-0 bg-red-900/30 blur-xl"></div>
          <div className="relative bg-red-950/50 border-4 border-red-900 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-pink-400 font-mono text-sm font-bold tracking-widest flex items-center justify-center gap-2">
              <img src="/images/lock.png" alt="lock" className="w-5 h-5" />
              MEMBERS ONLY
            </p>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-pink-400 font-mono mb-6 drop-shadow-2xl">Private Club</h1>

        {/* Glowing neon effect */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-pink-500 blur-3xl opacity-40"></div>
          <h2 className="relative text-pink-300 font-mono text-2xl md:text-3xl italic drop-shadow-lg">
            Something exclusive is being built in the sewer...
          </h2>
        </div>

        {/* Teaser Content */}
        <div className="space-y-6 mb-12">
          <p className="text-pink-300 font-mono text-lg leading-relaxed drop-shadow-md">
            VIP access coming.
            <br />
            For the boldest degens.
            <br />
            Games? Rewards? Raids?
            <br />
            All will be revealed.
          </p>
        </div>

        {/* Locked Door Icon */}
        <div className="mb-12 text-6xl drop-shadow-lg flex items-center justify-center gap-3">
          <img src="/images/door.png" alt="door" className="w-24 h-24" />
          <img src="/images/lock2.png" alt="lock" className="w-24 h-24" />
        </div>

        {/* Neon Opening Soon */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-40"></div>
          <p className="relative text-pink-300 font-mono text-xl font-bold">OPENING SOON</p>
        </div>

        {/* Mysterious microcopy */}
        <p className="text-pink-400/70 font-mono text-sm italic drop-shadow-md">
          The revolution has a back room.
          <br />
          Only the shittiest get in.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-pink-400/50 font-mono text-xs">18+ • Future private experience</p>
      </div>

      <style jsx>{`
        @keyframes drip {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
