"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface FloatingDockProps {
  items: Array<{
    title: string
    icon: string
    href: string
  }>
  className?: string
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const dock = dockRef.current
    if (!dock) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = dock.getBoundingClientRect()
      const x = e.clientX - rect.left
      const centerX = rect.width / 2

      const items = dock.querySelectorAll(".dock-item")
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenterX = itemRect.left + itemRect.width / 2 - rect.left
        const distance = Math.abs(x - itemCenterX)
        const maxDistance = 100
        const scale = Math.max(1, 1.5 - (distance / maxDistance) * 0.5)

        gsap.to(item, {
          scale,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    }

    const handleMouseLeave = () => {
      const items = dock.querySelectorAll(".dock-item")
      gsap.to(items, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    dock.addEventListener("mousemove", handleMouseMove)
    dock.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove)
      dock.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={dockRef}
      className={cn(
        "flex items-end justify-center space-x-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <a
          key={item.title}
          href={item.href}
          className="dock-item flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="text-2xl">{item.icon}</div>
          {hoveredIndex === index && (
            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded absolute -top-8 whitespace-nowrap">
              {item.title}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}
