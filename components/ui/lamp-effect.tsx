"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function LampEffect() {
  const lampRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lamp = lampRef.current
    const light = lightRef.current
    if (!lamp || !light) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = lamp.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(light, {
        x: x - 50,
        y: y - 50,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    lamp.addEventListener("mousemove", handleMouseMove)
    return () => lamp.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={lampRef} className="relative w-full h-40 bg-black rounded-lg overflow-hidden cursor-none">
      <div
        ref={lightRef}
        className="absolute w-24 h-24 bg-gradient-radial from-white/40 to-transparent rounded-full blur-sm pointer-events-none"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">Lamp Effect</span>
      </div>
    </div>
  )
}
