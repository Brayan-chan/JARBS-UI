"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
}

export function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const ripple = rippleRef.current

    if (!button || !ripple) return

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.set(ripple, { x, y, scale: 0 })
      gsap.to(ripple, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(ripple, {
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
      })
    }

    const handleClick = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.set(ripple, { x, y, scale: 0 })
      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(ripple, { opacity: 1, scale: 0 })
        },
      })

      // Scale animation
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("click", handleClick)

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={cn("relative overflow-hidden", className)}
      onClick={onClick}
    >
      <div
        ref={rippleRef}
        className="absolute w-4 h-4 bg-white/20 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />
      {children}
    </Button>
  )
}
