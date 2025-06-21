"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface AdvancedSpinnerProps {
  variant?: "default" | "dots" | "bars" | "pulse" | "orbit" | "wave"
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "secondary" | "success" | "warning" | "error"
  className?: string
  label?: string
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
}

const colorClasses = {
  primary: "text-blue-500",
  secondary: "text-gray-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
}

export function AdvancedSpinner({
  variant = "default",
  size = "md",
  color = "primary",
  className,
  label,
}: AdvancedSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spinner = spinnerRef.current
    if (!spinner) return

    let animation: gsap.core.Timeline

    switch (variant) {
      case "default":
        animation = gsap.timeline({ repeat: -1 })
        animation.to(spinner.querySelector(".spinner-circle"), {
          rotation: 360,
          duration: 1,
          ease: "none",
        })
        break

      case "dots":
        const dots = spinner.querySelectorAll(".dot")
        animation = gsap.timeline({ repeat: -1 })
        dots.forEach((dot, i) => {
          animation.to(
            dot,
            {
              scale: 1.5,
              opacity: 0.3,
              duration: 0.3,
              ease: "power2.inOut",
              yoyo: true,
              repeat: 1,
            },
            i * 0.1,
          )
        })
        break

      case "bars":
        const bars = spinner.querySelectorAll(".bar")
        animation = gsap.timeline({ repeat: -1 })
        bars.forEach((bar, i) => {
          animation.to(
            bar,
            {
              scaleY: 2,
              duration: 0.4,
              ease: "power2.inOut",
              yoyo: true,
              repeat: 1,
            },
            i * 0.1,
          )
        })
        break

      case "pulse":
        animation = gsap.timeline({ repeat: -1 })
        animation.to(spinner.querySelector(".pulse-circle"), {
          scale: 1.2,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        break

      case "orbit":
        const orbitDots = spinner.querySelectorAll(".orbit-dot")
        animation = gsap.timeline({ repeat: -1 })
        orbitDots.forEach((dot, i) => {
          animation.to(
            dot,
            {
              rotation: 360,
              duration: 2,
              ease: "none",
            },
            i * 0.2,
          )
        })
        break

      case "wave":
        const waveBars = spinner.querySelectorAll(".wave-bar")
        animation = gsap.timeline({ repeat: -1 })
        waveBars.forEach((bar, i) => {
          animation.to(
            bar,
            {
              scaleY: 0.3,
              duration: 0.5,
              ease: "power2.inOut",
              yoyo: true,
              repeat: 1,
            },
            i * 0.1,
          )
        })
        break
    }

    return () => {
      animation?.kill()
    }
  }, [variant])

  const renderSpinner = () => {
    const baseClasses = cn(sizeClasses[size], colorClasses[color])

    switch (variant) {
      case "default":
        return (
          <div className={cn("relative", baseClasses)}>
            <div className="spinner-circle w-full h-full border-2 border-gray-600 border-t-current rounded-full" />
          </div>
        )

      case "dots":
        return (
          <div className="flex space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={cn("dot w-2 h-2 rounded-full bg-current", colorClasses[color])} />
            ))}
          </div>
        )

      case "bars":
        return (
          <div className="flex items-end space-x-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={cn("bar w-1 h-4 bg-current rounded-sm", colorClasses[color])} />
            ))}
          </div>
        )

      case "pulse":
        return (
          <div className={cn("relative", baseClasses)}>
            <div className={cn("pulse-circle w-full h-full rounded-full bg-current")} />
          </div>
        )

      case "orbit":
        return (
          <div className={cn("relative", baseClasses)}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className={cn("orbit-dot absolute inset-0 border border-current rounded-full")}
                style={{
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <div className="absolute -top-1 left-1/2 w-2 h-2 bg-current rounded-full transform -translate-x-1/2" />
              </div>
            ))}
          </div>
        )

      case "wave":
        return (
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={cn("wave-bar w-1 h-6 bg-current rounded-sm", colorClasses[color])} />
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div ref={spinnerRef}>{renderSpinner()}</div>
      {label && <span className="text-sm text-gray-400 animate-pulse">{label}</span>}
    </div>
  )
}
