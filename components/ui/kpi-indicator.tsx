"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, Target, DollarSign, Users, Activity } from "lucide-react"

interface KPIIndicatorProps {
  title: string
  value: number | string
  previousValue?: number
  unit?: string
  prefix?: string
  suffix?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: number
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "info"
  size?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

const variants = {
  default: "bg-white/5 border-white/10",
  success: "bg-green-500/10 border-green-500/20",
  warning: "bg-yellow-500/10 border-yellow-500/20",
  danger: "bg-red-500/10 border-red-500/20",
  info: "bg-blue-500/10 border-blue-500/20",
}

const trendColors = {
  up: "text-green-400",
  down: "text-red-400",
  neutral: "text-gray-400",
}

const iconMap = {
  revenue: DollarSign,
  users: Users,
  activity: Activity,
  target: Target,
}

export function KPIIndicator({
  title,
  value,
  previousValue,
  unit = "",
  prefix = "",
  suffix = "",
  trend,
  trendValue,
  icon,
  variant = "default",
  size = "md",
  animated = true,
  className,
}: KPIIndicatorProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value)
  const cardRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return

    const card = cardRef.current
    const valueEl = valueRef.current

    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      )
    }

    if (typeof value === "number" && valueEl) {
      gsap.to(
        { val: 0 },
        {
          val: value,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: function () {
            setDisplayValue(Math.round(this.targets()[0].val))
          },
        },
      )
    }
  }, [value, animated])

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />
      case "down":
        return <TrendingDown className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-4"
      case "lg":
        return "p-8"
      default:
        return "p-6"
    }
  }

  const getValueSize = () => {
    switch (size) {
      case "sm":
        return "text-2xl"
      case "lg":
        return "text-4xl"
      default:
        return "text-3xl"
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "backdrop-blur-sm border rounded-xl transition-all duration-300 hover:scale-105",
        variants[variant],
        getSizeClasses(),
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-white/70">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">{title}</h3>
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-sm", trendColors[trend])}>
            {getTrendIcon()}
            {trendValue && <span>{Math.abs(trendValue)}%</span>}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div ref={valueRef} className={cn("font-bold text-white", getValueSize())}>
          {prefix}
          {typeof displayValue === "number" ? displayValue.toLocaleString() : displayValue}
          {suffix}
          {unit && <span className="text-lg text-gray-400 ml-1">{unit}</span>}
        </div>

        {previousValue && (
          <div className="text-sm text-gray-400">
            Previous: {prefix}
            {previousValue.toLocaleString()}
            {suffix} {unit}
          </div>
        )}
      </div>
    </div>
  )
}
