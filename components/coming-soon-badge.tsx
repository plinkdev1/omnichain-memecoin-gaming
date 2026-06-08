export function ComingSoonBadge() {
  const messages = [
    "Sewer drop incoming – hold tight",
    "El Shito approved chaos loading",
    "The legend prepares another strike",
    "Vigilante gear in production",
  ]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded group hover:bg-black/90 transition-all duration-300 z-20 border-2 border-toxic-green/30 animate-pulse">
      {/* Glitch edges effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-toxic-green to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-toxic-green to-transparent opacity-60"></div>

      {/* Dripping sewer effect */}
      <div className="absolute top-8 left-4 text-5xl opacity-40 animate-bounce" style={{ animationDuration: "2s" }}>
        💧
      </div>
      <div className="absolute top-8 right-4 text-5xl opacity-40 animate-bounce" style={{ animationDuration: "2.5s" }}>
        💧
      </div>

      {/* Main badge content */}
      <div className="text-center space-y-2 relative z-10">
        {/* Poop emoji corner */}
        <div className="absolute top-4 right-4 text-3xl opacity-60">💩</div>

        <p className="text-3xl md:text-4xl font-black text-red-500 glitch-text drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] tracking-wider">
          OUT-OF-STOCK
        </p>

        <p className="text-sm md:text-base text-rust-orange font-mono font-bold italic drop-shadow-[0_0_10px_rgba(205,92,92,0.5)]">
          Hype building – raid gear loading soon
        </p>

        {/* El Shito silhouette in corner */}
        <div className="absolute bottom-4 left-4 text-4xl opacity-50">🌀</div>
      </div>

      {/* Neon border glow */}
      <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]"></div>
    </div>
  )
}
