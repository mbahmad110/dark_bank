"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Lock, Unlock, DollarSign, Bitcoin, Database, Shield, FileCode, Terminal, Wifi } from "lucide-react"

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const floatingIconsRef = useRef<HTMLDivElement>(null)

  // Matrix rain animation
  useEffect(() => {
    setLoaded(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters
    const chars =
      "01010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン10101010"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Initialize drops at random positions
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Drawing the characters
    const draw = () => {
      // Add semi-transparent black background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Sending the drop back to the top randomly after it crosses the screen
        // Adding randomness to the reset to make the drops scattered
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Incrementing Y coordinate
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Floating icons animation
  useEffect(() => {
    if (!floatingIconsRef.current) return

    const container = floatingIconsRef.current
    const icons = [
      { component: Lock, color: "#00ff00" },
      { component: Unlock, color: "#00dd00" },
      { component: DollarSign, color: "#00ff44" },
      { component: Bitcoin, color: "#44ff00" },
      { component: Database, color: "#00ff88" },
      { component: Shield, color: "#00dd44" },
      { component: FileCode, color: "#00ff66" },
      { component: Terminal, color: "#22ff22" },
      { component: Wifi, color: "#00cc00" },
    ]

    // Create 20 random floating icons
    for (let i = 0; i < 20; i++) {
      const iconIndex = Math.floor(Math.random() * icons.length)
      const { component: IconComponent, color } = icons[iconIndex]

      const iconElement = document.createElement("div")
      iconElement.className = "absolute opacity-30 floating-icon"
      iconElement.style.left = `${Math.random() * 100}vw`
      iconElement.style.top = `${Math.random() * 100}vh`
      iconElement.style.transform = `scale(${0.5 + Math.random() * 1.5})`
      iconElement.style.animationDuration = `${20 + Math.random() * 40}s`
      iconElement.style.animationDelay = `${Math.random() * -20}s`

      // Create SVG icon
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "24")
      svg.setAttribute("height", "24")
      svg.setAttribute("viewBox", "0 0 24 24")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", color)
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      svg.setAttribute("stroke-linejoin", "round")

      // Add paths based on icon type
      if (IconComponent === Lock) {
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        path1.setAttribute("x", "3")
        path1.setAttribute("y", "11")
        path1.setAttribute("width", "18")
        path1.setAttribute("height", "11")
        path1.setAttribute("rx", "2")
        path1.setAttribute("ry", "2")

        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path2.setAttribute("d", "M7 11V7a5 5 0 0 1 10 0v4")

        svg.appendChild(path1)
        svg.appendChild(path2)
      } else if (IconComponent === DollarSign) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6")
        svg.appendChild(path)
      } else if (IconComponent === Bitcoin) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute(
          "d",
          "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m3.94.694-.347 1.969M7.116 5.251l-1.256-.221m6.58-.22h-2.998",
        )
        svg.appendChild(path)
      } else if (IconComponent === Terminal) {
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        path1.setAttribute("points", "4 17 10 11 4 5")

        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        path2.setAttribute("x1", "12")
        path2.setAttribute("y1", "19")
        path2.setAttribute("x2", "20")
        path2.setAttribute("y2", "19")

        svg.appendChild(path1)
        svg.appendChild(path2)
      } else {
        // Generic icon for others
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", "12")
        circle.setAttribute("cy", "12")
        circle.setAttribute("r", "10")
        svg.appendChild(circle)
      }

      iconElement.appendChild(svg)
      container.appendChild(iconElement)
    }

    // Add binary numbers
    for (let i = 0; i < 30; i++) {
      const binaryElement = document.createElement("div")
      binaryElement.className = "absolute text-green-500 opacity-20 floating-binary"
      binaryElement.style.left = `${Math.random() * 100}vw`
      binaryElement.style.top = `${Math.random() * 100}vh`
      binaryElement.style.fontSize = `${Math.floor(10 + Math.random() * 14)}px`
      binaryElement.style.animationDuration = `${15 + Math.random() * 30}s`
      binaryElement.style.animationDelay = `${Math.random() * -15}s`

      // Generate random binary string
      let binaryString = ""
      for (let j = 0; j < 8; j++) {
        binaryString += Math.floor(Math.random() * 2)
      }

      binaryElement.textContent = binaryString
      container.appendChild(binaryElement)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [loaded])

  // Occasional glitch effect
  useEffect(() => {
    if (!loaded) return

    const glitchInterval = setInterval(
      () => {
        const glitchElement = document.getElementById("glitch-overlay")
        if (glitchElement) {
          glitchElement.classList.add("active")
          setTimeout(() => {
            glitchElement.classList.remove("active")
          }, 150)
        }
      },
      5000 + Math.random() * 10000,
    ) // Random interval between 5-15 seconds

    return () => clearInterval(glitchInterval)
  }, [loaded])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: 'url("/hacking-background.jpg")',
        }}
      >
        {/* Dark overlay with green tint to maintain readability */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm bg-gradient-to-br from-black/90 to-green-900/30"></div>
      </div>

      {/* Matrix rain canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30 pointer-events-none" />

      {/* Floating icons */}
      <div ref={floatingIconsRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Glitch overlay */}
      <div id="glitch-overlay" className="fixed inset-0 z-20 pointer-events-none glitch-overlay" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

