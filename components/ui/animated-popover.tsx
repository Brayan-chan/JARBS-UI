"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface AnimatedPopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  title?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  trigger?: "click" | "hover"
  variant?: "default" | "minimal" | "bordered"
  size?: "sm" | "md" | "lg"
  arrow?: boolean
  closeButton?: boolean
  className?: string
  onOpenChange?: (open: boolean) => void
}

export function AnimatedPopover({
  children,
  content,
  title,
  side = "bottom",
  align = "center",
  trigger = "click",
  variant = "default",
  size = "md",
  arrow = true,
  closeButton = false,
  className,
  onOpenChange,
}: AnimatedPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const togglePopover = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onOpenChange?.(newState)

    if (newState) {
      setTimeout(updatePosition, 0)
    }
  }

  const closePopover = () => {
    setIsOpen(false)
    onOpenChange?.(false)
  }

  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()
    const offset = 12

    let x = 0
    let y = 0

    // Calculate position based on side
    switch (side) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
        y = triggerRect.top - popoverRect.height - offset
        break
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
        y = triggerRect.bottom + offset
        break
      case "left":
        x = triggerRect.left - popoverRect.width - offset
        y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
        break
      case "right":
        x = triggerRect.right + offset
        y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
        break
    }

    // Adjust for alignment
    if (side === "top" || side === "bottom") {
      switch (align) {
        case "start":
          x = triggerRect.left
          break
        case "end":
          x = triggerRect.right - popoverRect.width
          break
      }
    } else {
      switch (align) {
        case "start":
          y = triggerRect.top
          break
        case "end":
          y = triggerRect.bottom - popoverRect.height
          break
      }
    }

    // Keep popover within viewport
    const padding = 16
    x = Math.max(padding, Math.min(x, window.innerWidth - popoverRect.width - padding))
    y = Math.max(padding, Math.min(y, window.innerHeight - popoverRect.height - padding))

    setPosition({ x, y })
  }

  useEffect(() => {
    if (isOpen) {
      const popover = popoverRef.current
      if (popover) {
        gsap.fromTo(
          popover,
          {
            opacity: 0,
            scale: 0.9,
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
  }, [isOpen, side])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        closePopover()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const getVariantClasses = () => {
    switch (variant) {
      case "minimal":
        return "bg-white/5 backdrop-blur-sm border-0"
      case "bordered":
        return "bg-white/10 backdrop-blur-xl border-2 border-white/20"
      default:
        return "bg-white/10 backdrop-blur-xl border border-white/20"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-64"
      case "lg":
        return "w-96"
      default:
        return "w-80"
    }
  }

  const getArrowClasses = () => {
    const baseClasses = "absolute w-3 h-3 rotate-45 bg-white/10 border border-white/20"

    switch (side) {
      case "top":
        return `${baseClasses} -bottom-1.5 left-1/2 transform -translate-x-1/2 border-r border-b border-l-0 border-t-0`
      case "bottom":
        return `${baseClasses} -top-1.5 left-1/2 transform -translate-x-1/2 border-l border-t border-r-0 border-b-0`
      case "left":
        return `${baseClasses} -right-1.5 top-1/2 transform -translate-y-1/2 border-t border-r border-b-0 border-l-0`
      case "right":
        return `${baseClasses} -left-1.5 top-1/2 transform -translate-y-1/2 border-b border-l border-t-0 border-r-0`
      default:
        return ""
    }
  }

  const triggerProps =
    trigger === "hover"
      ? {
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
        }
      : {
          onClick: togglePopover,
        }

  return (
    <>
      <div ref={triggerRef} className="inline-block" {...triggerProps}>
        {children}
      </div>

      {isOpen && (
        <>
          {/* Backdrop for click trigger */}
          {trigger === "click" && <div className="fixed inset-0 z-40" onClick={closePopover} />}

          <div
            ref={popoverRef}
            className={cn("fixed z-50 rounded-xl shadow-2xl", getVariantClasses(), getSizeClasses(), className)}
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            {/* Header */}
            {(title || closeButton) && (
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                {title && <h3 className="font-semibold text-white">{title}</h3>}
                {closeButton && (
                  <Button variant="ghost" size="icon" onClick={closePopover} className="h-6 w-6">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-4">{content}</div>

            {/* Arrow */}
            {arrow && <div className={getArrowClasses()} />}
          </div>
        </>
      )}
    </>
  )
}
