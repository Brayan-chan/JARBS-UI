"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Check, Minus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AnimatedCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  indeterminate?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "danger"
  disabled?: boolean
  className?: string
}

export function AnimatedCheckbox({
  checked,
  onChange,
  label,
  description,
  indeterminate = false,
  size = "md",
  variant = "default",
  disabled = false,
  className,
}: AnimatedCheckboxProps) {
  const checkboxRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (iconRef.current) {
      if (checked || indeterminate) {
        gsap.fromTo(
          iconRef.current,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.7)" },
        )
      } else {
        gsap.to(iconRef.current, {
          scale: 0,
          duration: 0.2,
          ease: "power2.in",
        })
      }
    }
  }, [checked, indeterminate])

  const handleToggle = () => {
    if (disabled) return

    // Animate the checkbox
    if (checkboxRef.current) {
      gsap.to(checkboxRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    onChange(!checked)
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4"
      case "lg":
        return "w-6 h-6"
      default:
        return "w-5 h-5"
    }
  }

  const getVariantClasses = () => {
    if (!checked && !indeterminate) return "border-white/30"

    switch (variant) {
      case "success":
        return "bg-green-500 border-green-500"
      case "warning":
        return "bg-yellow-500 border-yellow-500"
      case "danger":
        return "bg-red-500 border-red-500"
      default:
        return "bg-white border-white"
    }
  }

  const getIconColor = () => {
    if (variant === "default") return "text-black"
    return "text-white"
  }

  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <button
        ref={checkboxRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative flex items-center justify-center border-2 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20",
          getSizeClasses(),
          getVariantClasses(),
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div ref={iconRef} className={cn("absolute", getIconColor())}>
          {indeterminate ? <Minus className="w-3 h-3" /> : <Check className="w-3 h-3" />}
        </div>
      </button>

      {(label || description) && (
        <div className="flex-1">
          {label && (
            <Label className="text-white font-medium cursor-pointer" onClick={handleToggle}>
              {label}
            </Label>
          )}
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
      )}
    </div>
  )
}
