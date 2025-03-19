"use client"

import { useEffect, useState, useRef } from "react"

export default function AnimatedLogo() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [scrambleText, setScrambleText] = useState("DARK_BANKS")
  const originalText = "DARK_BANKS"
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Characters to use for scrambling effect
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-+><?"

  // Scramble effect
  useEffect(() => {
    // Function to scramble a single character
    const scrambleChar = (index: number) => {
      if (Math.random() > 0.8) {
        // Only scramble sometimes for a more realistic effect
        setScrambleText((prev) => {
          const arr = prev.split("")
          arr[index] = chars[Math.floor(Math.random() * chars.length)]
          return arr.join("")
        })

        // Reset back to original after a short delay
        setTimeout(() => {
          setScrambleText((prev) => {
            const arr = prev.split("")
            arr[index] = originalText[index]
            return arr.join("")
          })
        }, 100)
      }
    }

    // Start scrambling effect
    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * originalText.length)
      scrambleChar(randomIndex)
    }, 150)

    // Glitch effect at random intervals
    glitchIntervalRef.current = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      },
      3000 + Math.random() * 5000,
    )

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current)
    }
  }, [])

  return (
    <div className="relative inline-block">
      {/* Main text with glitch effect */}
      <h1
        className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4 text-green-500 relative
          ${glitchActive ? "animate-glitch" : ""}`}
        style={{
          textShadow: "0 0 5px rgba(0, 255, 0, 0.7), 0 0 10px rgba(0, 255, 0, 0.5)",
          fontFamily: "monospace",
        }}
      >
        {scrambleText}

        {/* Glitch layers */}
        {glitchActive && (
          <>
            <span className="absolute top-0 left-0 text-red-500 opacity-70 glitch-layer-1">{scrambleText}</span>
            <span className="absolute top-0 left-0 text-blue-500 opacity-70 glitch-layer-2">{scrambleText}</span>
          </>
        )}
      </h1>

      {/* Terminal cursor effect */}
      <span className="inline-block w-3 h-8 bg-green-500 ml-1 animate-blink"></span>

      {/* Binary overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: "rotate(90deg)",
              opacity: 0.5 + Math.random() * 0.5,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>
    </div>
  )
}

