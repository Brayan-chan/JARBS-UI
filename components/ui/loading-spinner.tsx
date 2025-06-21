"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spinner = spinnerRef.current
    if (!spinner) return

    gsap.to(spinner, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "none",
    })
  }, [])

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      ref={spinnerRef}
      className={cn("border-2 border-gray-300 border-t-blue-500 rounded-full", sizeClasses[size], className)}
    />
  )
}
