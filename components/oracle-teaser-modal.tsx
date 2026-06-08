"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function OracleTeaserModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    let appearTimer: NodeJS.Timeout
    let disappearTimer: NodeJS.Timeout

    const scheduleAppear = () => {
      const disappearDuration = Math.random() * 10000 + 15000
      disappearTimer = setTimeout(() => {
        setIsGlitching(true)
        setIsVisible(true)

        const appearDuration = Math.random() * 2000 + 6000
        appearTimer = setTimeout(() => {
          setIsGlitching(false)
          setIsVisible(false)
          scheduleAppear()
        }, appearDuration)
      }, disappearDuration)
    }

    const initialTimer = setTimeout(() => {
      setIsGlitching(true)
      setIsVisible(true)

      const initialAppearDuration = Math.random() * 2000 + 6000
      appearTimer = setTimeout(() => {
        setIsGlitching(false)
        setIsVisible(false)
        scheduleAppear()
      }, initialAppearDuration)
    }, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearTimeout(appearTimer)
      clearTimeout(disappearTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <style>{`
        @keyframes oracle-glitch-in {
          0% {
            opacity: 0;
            transform: translate(20px, -20px) scale(0.8);
            filter: brightness(0) blur(10px);
          }
          20% {
            filter: brightness(1.5) blur(0px);
            text-shadow: 3px 0 0 #ff00ff, -3px 0 0 #00ffff;
          }
          40% {
            filter: brightness(0.8) blur(2px);
            text-shadow: -3px 0 0 #ff00ff, 3px 0 0 #00ffff;
          }
          60% {
            filter: brightness(1.2) blur(1px);
            text-shadow: 2px 0 0 #ffff00, -2px 0 0 #ff00ff;
          }
          80% {
            filter: brightness(1) blur(0px);
            text-shadow: none;
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
            filter: brightness(1) blur(0px);
          }
        }

        @keyframes oracle-glitch-out {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
            filter: brightness(1) blur(0px);
          }
          20% {
            filter: brightness(0.7) blur(5px);
            text-shadow: 3px 0 0 #ff00ff, -3px 0 0 #00ffff;
            transform: translate(-5px, 5px) scale(1.1);
          }
          40% {
            filter: brightness(0.5) blur(10px);
            transform: translate(5px, -5px) scale(0.95);
          }
          70% {
            opacity: 0.3;
            filter: brightness(0.3) blur(15px);
            transform: translate(0, 0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-20px, 20px) scale(0.6);
            filter: brightness(0) blur(20px);
          }
        }

        @keyframes scan-lines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 20px;
          }
        }

        @keyframes neon-flicker {
          0%, 10%, 20%, 30%, 40%, 50% {
            opacity: 1;
            filter: drop-shadow(0 0 15px #ff1493) drop-shadow(0 0 10px #8b4513);
          }
          5%, 15%, 25%, 35%, 45%, 49% {
            opacity: 0.8;
            filter: drop-shadow(0 0 8px #ff1493);
          }
          100% {
            opacity: 1;
            filter: drop-shadow(0 0 15px #ff1493) drop-shadow(0 0 10px #8b4513);
          }
        }

        .oracle-teaser-modal {
          position: fixed;
          bottom: 180px;
          right: 20px;
          z-index: 50;
          width: 280px;
          padding: 20px;
          background: rgba(15, 15, 15, 0.9);
          border: 2px solid;
          border-image: linear-gradient(135deg, #8b4513 0%, #ff1493 50%, #daa520 100%) 1;
          border-radius: 12px;
          box-shadow: 
            0 0 30px rgba(255, 20, 147, 0.6),
            inset 0 0 20px rgba(139, 69, 19, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          animation: ${isGlitching ? "oracle-glitch-in" : "oracle-glitch-out"} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: auto;
        }

        .oracle-teaser-modal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.05) 2px,
            transparent 2px,
            transparent 4px
          );
          animation: scan-lines 0.1s linear infinite;
          pointer-events: none;
          border-radius: 12px;
        }

        .oracle-teaser-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .oracle-teaser-image {
          filter: drop-shadow(0 0 12px #ff1493);
          animation: neon-flicker 3s ease-in-out infinite;
          width: 140px;
          height: 140px;
        }

        .oracle-teaser-text {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: bold;
          color: #ff1493;
          text-shadow: 
            0 0 10px #ff1493,
            0 0 20px #8b4513,
            2px 2px 0 rgba(255, 20, 147, 0.5);
          letter-spacing: 1px;
          line-height: 1.5;
          animation: neon-flicker 3s ease-in-out infinite;
        }

        .oracle-teaser-arrow {
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .oracle-teaser-click-area {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          cursor: pointer;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .oracle-teaser-modal {
            bottom: 160px;
            right: 12px;
            width: 220px;
            padding: 14px;
          }

          .oracle-teaser-text {
            font-size: 11px;
          }

          .oracle-teaser-image {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>

      <div className="oracle-teaser-modal">
        <div
          className="oracle-teaser-click-area"
          onClick={() => {
            const chatButton = document.querySelector('[aria-label="Open Sewer Chat"]')
            if (chatButton) {
              ;(chatButton as HTMLElement).click()
              setIsVisible(false)
            }
          }}
        />
        <div className="oracle-teaser-content">
          <div className="oracle-teaser-image">
            <Image
              src="/chatbelowicon.png"
              alt="Sewer Oracle"
              width={140}
              height={140}
              priority
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "140px",
                filter: "drop-shadow(0 0 12px #ff1493)",
              }}
            />
          </div>
          <div className="oracle-teaser-text">
            Ask the Sewer Oracle <span className="oracle-teaser-arrow">↓</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default OracleTeaserModal
