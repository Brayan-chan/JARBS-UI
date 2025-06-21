"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  variant?: "default" | "gradient" | "striped" | "glow" | "minimal"
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "success" | "warning" | "error"
  showValue?: boolean
  showPercentage?: boolean
  label?: string
  animated?: boolean
  className?: string
  indeterminate?: boolean
}

const sizeClasses = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
}

const colorClasses = {
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
}

const gradientClasses = {
  primary: "bg-gradient-to-r from-blue-400 to-blue-600",
  secondary: "bg-gradient-to-r from-gray-400 to-gray-600",
  success: "bg-gradient-to-r from-green-400 to-green-600",
  warning: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  error: "bg-gradient-to-r from-red-400 to-red-600",
}

export function ProgressBar({
  value,
  max = 100,
  variant = "default",
  size = "md",
  color = "primary",
  showValue = false,
  showPercentage = false,
  label,
  animated = true,
  className,
  indeterminate = false,
}: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    const fill = fillRef.current
    if (!fill || indeterminate) return

    if (animated) {
      gsap.to(fill, {
        width: `${percentage}%`,
        duration: 0.8,
        ease: "power2.out",
      })

      gsap.to(
        { value: displayValue },
        {
          value: percentage,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: function () {
            setDisplayValue(Math.round(this.targets()[0].value))
          },
        },
      )
    } else {
      gsap.set(fill, { width: `${percentage}%` })
      setDisplayValue(percentage)
    }
  }, [percentage, animated, displayValue, indeterminate])

  useEffect(() => {
    if (!indeterminate) return

    const fill = fillRef.current
    if (!fill) return

    const tl = gsap.timeline({ repeat: -1 })
    tl.fromTo(
      fill,
      {
        x: "-100%",
        width: "30%",
      },
      {
        x: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      },
    )

    return () => tl.kill()
  }, [indeterminate])

  const getProgressClasses = () => {
    const baseClasses = cn("transition-all duration-300 rounded-full", sizeClasses[size])

    switch (variant) {
      case "gradient":
        return cn(baseClasses, gradientClasses[color])
      case "striped":
        return cn(
          baseClasses,
          colorClasses[color],
          "bg-[length:20px_20px] bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)]",
        )
      case "glow":
        return cn(
          baseClasses,
          colorClasses[color],
          "shadow-lg",
          color === "primary" && "shadow-blue-500/50",
          color === "success" && "shadow-green-500/50",
          color === "warning" && "shadow-yellow-500/50",
          color === "error" && "shadow-red-500/50",
        )
      case "minimal":
        return cn(baseClasses, "bg-white/80")
      default:
        return cn(baseClasses, colorClasses[color])
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Label and value */}
      {(label || showValue || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
          {(showValue || showPercentage) && (
            <span className="text-sm text-gray-400">
              {showValue && `${Math.round((displayValue / 100) * max)}/${max}`}
              {showValue && showPercentage && " • "}
              {showPercentage && `${Math.round(displayValue)}%`}
            </span>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div ref={progressRef} className={cn("w-full bg-gray-700 rounded-full overflow-hidden", sizeClasses[size])}>
        <div
          ref={fillRef}
          className={getProgressClasses()}
          style={{
            width: indeterminate ? "30%" : animated ? "0%" : `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}
