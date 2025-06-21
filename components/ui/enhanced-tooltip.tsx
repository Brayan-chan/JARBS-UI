"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface EnhancedTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delay?: number
  variant?: "default" | "dark" | "light" | "colorful"
  size?: "sm" | "md" | "lg"
  arrow?: boolean
  interactive?: boolean
  className?: string
}

export function EnhancedTooltip({
  children,
  content,
  side = "top",
  align = "center",
  delay = 500,
  variant = "default",
  size = "md",
  arrow = true,
  interactive = false,
  className,
}: EnhancedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      updatePosition()
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (!interactive) {
      setIsVisible(false)
    }
  }

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const offset = 8

    let x = 0
    let y = 0

    // Calculate position based on side
    switch (side) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.top - tooltipRect.height - offset
        break
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.bottom + offset
        break
      case "left":
        x = triggerRect.left - tooltipRect.width - offset
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
      case "right":
        x = triggerRect.right + offset
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
    }

    // Adjust for alignment
    if (side === "top" || side === "bottom") {
      switch (align) {
        case "start":
          x = triggerRect.left
          break
        case "end":
          x = triggerRect.right - tooltipRect.width
          break
      }
    } else {
      switch (align) {
        case "start":
          y = triggerRect.top
          break
        case "end":
          y = triggerRect.bottom - tooltipRect.height
          break
      }
    }

    // Keep tooltip within viewport
    const padding = 8
    x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding))
    y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding))

    setPosition({ x, y })
  }

  useEffect(() => {
    if (isVisible) {
      const tooltip = tooltipRef.current
      if (tooltip) {
        gsap.fromTo(
          tooltip,
          {
            opacity: 0,
            scale: 0.8,
            y: side === "top" ? 10 : side === "bottom" ? -10 : 0,
            x: side === "left" ? 10 : side === "right" ? -10 : 0,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 0.2,
            ease: "power2.out",
          },
        )
      }
    }
  }, [isVisible, side])

  const getVariantClasses = () => {
    switch (variant) {
      case "dark":
        return "bg-gray-900 text-white border-gray-700"
      case "light":
        return "bg-white text-gray-900 border-gray-200 shadow-lg"
      case "colorful":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent"
      default:
        return "bg-black/90 text-white border-white/20"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs"
      case "lg":
        return "px-4 py-3 text-base"
      default:
        return "px-3 py-2 text-sm"
    }
  }

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 rotate-45"
    const colorClasses =
      variant === "light"
        ? "bg-white border-gray-200"
        : variant === "colorful"
          ? "bg-purple-500"
          : "bg-black/90 border-white/20"

    switch (side) {
      case "top":
        return `${baseClasses} ${colorClasses} -bottom-1 left-1/2 transform -translate-x-1/2 border-r border-b`
      case "bottom":
        return `${baseClasses} ${colorClasses} -top-1 left-1/2 transform -translate-x-1/2 border-l border-t`
      case "left":
        return `${baseClasses} ${colorClasses} -right-1 top-1/2 transform -translate-y-1/2 border-t border-r`
      case "right":
        return `${baseClasses} ${colorClasses} -left-1 top-1/2 transform -translate-y-1/2 border-b border-l`
      default:
        return ""
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 rounded-lg border backdrop-blur-sm",
            "pointer-events-none",
            getVariantClasses(),
            getSizeClasses(),
            interactive && "pointer-events-auto",
            className,
          )}
          style={{
            left: position.x,
            top: position.y,
          }}
          onMouseEnter={() => interactive && setIsVisible(true)}
          onMouseLeave={() => interactive && setIsVisible(false)}
        >
          {content}
          {arrow && <div className={getArrowClasses()} />}
        </div>
      )}
    </>
  )
}
