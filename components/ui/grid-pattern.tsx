"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function GridPattern() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const dots = grid.querySelectorAll(".grid-dot")

    gsap.set(dots, { scale: 0, opacity: 0 })

    gsap.to(dots, {
      scale: 1,
      opacity: 0.3,
      duration: 0.5,
      stagger: {
        amount: 2,
        from: "center",
        grid: "auto",
      },
      ease: "power2.out",
      delay: 0.5,
    })

    // Animate dots on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      dots.forEach((dot) => {
        const dotRect = dot.getBoundingClientRect()
        const dotX = dotRect.left + dotRect.width / 2 - rect.left
        const dotY = dotRect.top + dotRect.height / 2 - rect.top
        const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2)
        const maxDistance = 150
        const opacity = Math.max(0.1, 1 - distance / maxDistance)

        gsap.to(dot, {
          opacity,
          scale: opacity * 2,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    }

    grid.addEventListener("mousemove", handleMouseMove)
    return () => grid.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={gridRef} className="absolute inset-0 overflow-hidden opacity-20">
      <div className="grid grid-cols-20 gap-4 h-full w-full p-4">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="grid-dot w-1 h-1 bg-white rounded-full" />
        ))}
      </div>
    </div>
  )
}
