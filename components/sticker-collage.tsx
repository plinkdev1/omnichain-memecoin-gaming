"use client"

import Image from "next/image"

export function StickerCollage() {
  // 19 sticker icons - repositioned to fit within container bounds
  const stickers = [
    {
      src: "/images/cameraroll.png",
      alt: "camera",
      top: "15%",
      left: "15%",
      rotate: -18,
      size: 60,
    },
    {
      src: "/images/stop.png",
      alt: "stop",
      top: "18%",
      left: "60%",
      rotate: 12,
      size: 62,
    },
    {
      src: "/images/policeinspector.png",
      alt: "police",
      top: "8%",
      left: "50%",
      rotate: -8,
      size: 60,
    },
    {
      src: "/images/toiletpaper.png",
      alt: "toilet paper",
      top: "28%",
      left: "25%",
      rotate: 15,
      size: 56,
    },
    {
      src: "/images/18ball.png",
      alt: "18 ball",
      top: "32%",
      left: "65%",
      rotate: -12,
      size: 58,
    },
    {
      src: "/images/smile4.png",
      alt: "smile",
      top: "20%",
      left: "35%",
      rotate: 8,
      size: 58,
    },
    {
      src: "/images/flame.png",
      alt: "flame",
      top: "42%",
      left: "12%",
      rotate: -5,
      size: 62,
    },
    {
      src: "/images/refresh.png",
      alt: "refresh",
      top: "12%",
      left: "75%",
      rotate: 18,
      size: 56,
    },
    {
      src: "/images/gamedice.png",
      alt: "dice",
      top: "48%",
      left: "45%",
      rotate: -10,
      size: 64,
    },
    {
      src: "/images/twitterbird.png",
      alt: "twitter bird",
      top: "34%",
      left: "55%",
      rotate: 6,
      size: 54,
    },
    {
      src: "/images/balot.png",
      alt: "ballot",
      top: "52%",
      left: "20%",
      rotate: -12,
      size: 58,
    },
    {
      src: "/images/lock.png",
      alt: "lock",
      top: "55%",
      left: "50%",
      rotate: 14,
      size: 60,
    },
    {
      src: "/images/poop.png",
      alt: "poop",
      top: "50%",
      left: "75%",
      rotate: -8,
      size: 58,
    },
    {
      src: "/images/trophy.png",
      alt: "trophy",
      top: "46%",
      left: "85%",
      rotate: 10,
      size: 60,
    },
    {
      src: "/images/conversationcloud.png",
      alt: "conversation",
      top: "58%",
      left: "35%",
      rotate: 16,
      size: 56,
    },
    {
      src: "/images/machinehead.png",
      alt: "machine",
      top: "54%",
      left: "65%",
      rotate: -14,
      size: 62,
    },
    {
      src: "/images/sword.png",
      alt: "sword",
      top: "48%",
      left: "88%",
      rotate: 8,
      size: 58,
    },
    {
      src: "/images/potiontube.png",
      alt: "potion",
      top: "60%",
      left: "80%",
      rotate: -6,
      size: 56,
    },
    {
      src: "/images/disquette.png",
      alt: "floppy disk",
      top: "56%",
      left: "12%",
      rotate: 12,
      size: 54,
    },
  ]

  return (
    <div
      className="relative w-full bg-black rounded-lg border border-toxic-green/30 flex items-center justify-center overflow-hidden"
      style={{
        height: "280px",
        clipPath: "inset(0 round 0.5rem)",
      }}
    >
      {stickers.map((sticker, index) => (
        <div
          key={index}
          className="absolute pointer-events-none"
          style={{
            top: sticker.top,
            left: sticker.left,
            transform: `translate(-50%, -50%) rotate(${sticker.rotate}deg)`,
            zIndex: index,
          }}
        >
          <div
            className="relative"
            style={{
              filter: "drop-shadow(0 0 10px rgba(124, 252, 0, 0.4))",
            }}
          >
            <Image
              src={sticker.src || "/placeholder.svg"}
              alt={sticker.alt}
              width={sticker.size}
              height={sticker.size}
              draggable={false}
              priority={index < 3}
              crossOrigin="anonymous"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
