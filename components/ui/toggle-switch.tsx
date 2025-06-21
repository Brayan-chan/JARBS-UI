"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "danger"
  disabled?: boolean
  className?: string
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  size = "md",
  variant = "default",
  disabled = false,
  className,
}: ToggleSwitchProps) {
  const switchRef = useRef<HTMLButtonElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        x: checked ? "100%" : "0%",
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [checked])

  const handleToggle = () => {
    if (disabled) return

    // Animate the switch
    if (switchRef.current) {
      gsap.to(switchRef.current, {
        scale: 0.95,
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
        return {
          switch: "w-8 h-4",
          thumb: "w-3 h-3",
        }
      case "lg":
        return {
          switch: "w-14 h-7",
          thumb: "w-6 h-6",
        }
      default:
        return {
          switch: "w-11 h-6",
          thumb: "w-5 h-5",
        }
    }
  }

  const getVariantClasses = () => {
    const base = checked ? "" : "bg-gray-600"

    switch (variant) {
      case "success":
        return checked ? "bg-green-500" : base
      case "warning":
        return checked ? "bg-yellow-500" : base
      case "danger":
        return checked ? "bg-red-500" : base
      default:
        return checked ? "bg-white" : base
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <button
        ref={switchRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20",
          sizeClasses.switch,
          getVariantClasses(),
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div
          ref={thumbRef}
          className={cn(
            "absolute left-0.5 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg transition-transform",
            sizeClasses.thumb,
            checked && variant === "default" && "bg-black",
          )}
        />
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
