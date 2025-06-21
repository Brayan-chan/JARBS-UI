"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
}

export function RippleButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleClick = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create ripple element
      const ripple = document.createElement("span")
      ripple.className = "absolute bg-white/30 rounded-full pointer-events-none"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.width = "0px"
      ripple.style.height = "0px"

      button.appendChild(ripple)

      // Animate ripple
      gsap.to(ripple, {
        width: "300px",
        height: "300px",
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          ripple.remove()
        },
      })

      // Button scale animation
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    button.addEventListener("click", handleClick)
    return () => button.removeEventListener("click", handleClick)
  }, [])

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={cn("relative overflow-hidden", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
