"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GlowingCardProps {
  title: string
  description: string
  className?: string
}

export function GlowingCard({ title, description, className }: GlowingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current

    if (!card || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(glow, {
        x: x - 100,
        y: y - 100,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: 0.6,
        scale: 1,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <Card
      ref={cardRef}
      className={cn(
        "relative overflow-hidden bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300",
        className,
      )}
    >
      <div
        ref={glowRef}
        className="absolute w-48 h-48 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl opacity-0 pointer-events-none"
      />
      <CardHeader className="relative z-10">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
