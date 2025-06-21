"use client"

import type React from "react"

import { forwardRef, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string
  ariaDescribedBy?: string
  focusRing?: boolean
  announceOnClick?: string
  children: React.ReactNode
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ ariaLabel, ariaDescribedBy, focusRing = true, announceOnClick, className, onClick, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const announcementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      // Ensure button is properly focusable
      const button = buttonRef.current
      if (button && !button.hasAttribute("tabIndex")) {
        button.setAttribute("tabIndex", "0")
      }
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)

      // Announce action to screen readers
      if (announceOnClick && announcementRef.current) {
        announcementRef.current.textContent = announceOnClick
        setTimeout(() => {
          if (announcementRef.current) {
            announcementRef.current.textContent = ""
          }
        }, 1000)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // Handle Enter and Space key activation
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleClick(e as any)
      }
    }

    return (
      <>
        <Button
          ref={ref || buttonRef}
          className={cn(
            focusRing && "focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black",
            "transition-all duration-200",
            className,
          )}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </Button>

        {/* Screen reader announcements */}
        <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true" />
      </>
    )
  },
)

AccessibleButton.displayName = "AccessibleButton"
