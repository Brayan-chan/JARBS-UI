"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnimatedAlertProps {
  variant?: "success" | "error" | "info" | "warning"
  title?: string
  description?: string
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  actions?: React.ReactNode
}

const alertVariants = {
  success: {
    bg: "bg-green-500/10 border-green-500/20",
    text: "text-green-400",
    icon: CheckCircle,
    accent: "bg-green-500",
  },
  error: {
    bg: "bg-red-500/10 border-red-500/20",
    text: "text-red-400",
    icon: AlertCircle,
    accent: "bg-red-500",
  },
  info: {
    bg: "bg-blue-500/10 border-blue-500/20",
    text: "text-blue-400",
    icon: Info,
    accent: "bg-blue-500",
  },
  warning: {
    bg: "bg-yellow-500/10 border-yellow-500/20",
    text: "text-yellow-400",
    icon: AlertTriangle,
    accent: "bg-yellow-500",
  },
}

export function AnimatedAlert({
  variant = "info",
  title,
  description,
  dismissible = false,
  onDismiss,
  className,
  children,
  icon,
  actions,
}: AnimatedAlertProps) {
  const alertRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  const config = alertVariants[variant]
  const IconComponent = config.icon

  useEffect(() => {
    const alert = alertRef.current
    const accent = accentRef.current
    if (!alert || !accent) return

    // Initial animation
    gsap.fromTo(
      alert,
      {
        opacity: 0,
        y: -20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
    )

    // Accent line animation
    gsap.fromTo(
      accent,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      },
    )
  }, [])

  const handleDismiss = () => {
    const alert = alertRef.current
    if (!alert) return

    gsap.to(alert, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsVisible(false)
        onDismiss?.()
      },
    })
  }

  if (!isVisible) return null

  return (
    <div ref={alertRef} className={cn("relative border rounded-lg p-4 backdrop-blur-sm", config.bg, className)}>
      {/* Accent line */}
      <div ref={accentRef} className={cn("absolute top-0 left-0 h-0.5 w-full rounded-t-lg", config.accent)} />

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn("flex-shrink-0 mt-0.5", config.text)}>{icon || <IconComponent className="w-5 h-5" />}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && <h4 className={cn("font-semibold mb-1", config.text)}>{title}</h4>}
          {description && <p className="text-sm text-gray-300 mb-2">{description}</p>}
          {children}
          {actions && <div className="mt-3 flex gap-2">{actions}</div>}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-6 w-6 text-gray-400 hover:text-white"
            onClick={handleDismiss}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
