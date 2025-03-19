"use client"

import { useEffect, useState } from "react"

export default function HackingCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    window.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full border border-green-500 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-50 w-1 h-1 bg-green-500 rounded-full mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Trailing effect */}
      <div
        className="fixed pointer-events-none z-50 w-2 h-2 bg-green-500 rounded-full opacity-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease-out, opacity 0.3s ease-out",
          transitionDelay: "0.05s",
        }}
      />
    </>
  )
}

