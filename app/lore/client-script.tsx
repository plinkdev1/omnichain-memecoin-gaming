"use client"

import { useEffect } from "react"

export function SightingsWallScript() {
  useEffect(() => {
    const randomizePositions = () => {
      const polaroids = document.querySelectorAll(".polaroid:not(.polaroid-central)")
      const container = document.getElementById("sightings-wall")
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const centerX = containerRect.width / 2
      const centerY = containerRect.height / 2

      polaroids.forEach((photo, index) => {
        const element = photo as HTMLElement

        // Skip on mobile
        if (window.innerWidth < 768) return

        // Random positioning avoiding center
        let x, y
        do {
          x = Math.random() * 80 + 5 // 5% to 85%
          y = Math.random() * 80 + 5
        } while (
          // Avoid center area (reserved for central portrait)
          x > 35 &&
          x < 65 &&
          y > 30 &&
          y < 70
        )

        element.style.left = `${x}%`
        element.style.top = `${y}%`
        element.style.transform = `rotate(${Math.random() * 30 - 15}deg)`
        element.style.zIndex = String(Math.floor(Math.random() * 30) + 1)
      })

      // Center the central portrait
      const central = document.querySelector(".polaroid-central") as HTMLElement
      if (central && window.innerWidth >= 768) {
        central.style.left = "50%"
        central.style.top = "50%"
        central.style.transform = "translate(-50%, -50%) rotate(-2deg)"
      }
    }

    // Initial randomization
    randomizePositions()

    // Scramble button
    const scrambleBtn = document.getElementById("scramble-wall-btn")
    if (scrambleBtn) {
      scrambleBtn.addEventListener("click", randomizePositions)
    }

    // Re-randomize on window resize
    window.addEventListener("resize", randomizePositions)

    return () => {
      window.removeEventListener("resize", randomizePositions)
      if (scrambleBtn) {
        scrambleBtn.removeEventListener("click", randomizePositions)
      }
    }
  }, [])

  return null
}
