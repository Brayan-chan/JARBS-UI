"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      const particles = containerRef.current?.querySelectorAll(".particle")

      particles?.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        })

        gsap.to(particle, {
          y: "-=100",
          x: `+=${Math.random() * 100 - 50}`,
          rotation: 360,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          ease: "none",
          delay: index * 0.5,
        })

        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="particle absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
      ))}
    </div>
  )
}
