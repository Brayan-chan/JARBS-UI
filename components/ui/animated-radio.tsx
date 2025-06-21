"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface AnimatedRadioProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "danger"
  layout?: "vertical" | "horizontal"
  className?: string
}

export function AnimatedRadio({
  options,
  value,
  onChange,
  name,
  size = "md",
  variant = "default",
  layout = "vertical",
  className,
}: AnimatedRadioProps) {
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    dotRefs.current.forEach((dot, index) => {
      if (dot) {
        const isSelected = options[index]?.value === value
        if (isSelected) {
          gsap.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" })
        } else {
          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          })
        }
      }
    })
  }, [value, options])

  const handleSelect = (optionValue: string, index: number) => {
    if (options[index]?.disabled) return

    // Animate the radio button
    const radio = radioRefs.current[index]
    if (radio) {
      gsap.to(radio, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    onChange(optionValue)
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          radio: "w-4 h-4",
          dot: "w-2 h-2",
        }
      case "lg":
        return {
          radio: "w-6 h-6",
          dot: "w-3 h-3",
        }
      default:
        return {
          radio: "w-5 h-5",
          dot: "w-2.5 h-2.5",
        }
    }
  }

  const getVariantClasses = (isSelected: boolean) => {
    if (!isSelected) return "border-white/30"

    switch (variant) {
      case "success":
        return "border-green-500"
      case "warning":
        return "border-yellow-500"
      case "danger":
        return "border-red-500"
      default:
        return "border-white"
    }
  }

  const getDotColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "danger":
        return "bg-red-500"
      default:
        return "bg-white"
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <div className={cn("space-y-3", layout === "horizontal" && "flex flex-wrap gap-6 space-y-0", className)}>
      {options.map((option, index) => {
        const isSelected = option.value === value

        return (
          <div key={option.value} className="flex items-start space-x-3">
            <button
              ref={(el) => (radioRefs.current[index] = el)}
              type="button"
              onClick={() => handleSelect(option.value, index)}
              disabled={option.disabled}
              className={cn(
                "relative flex items-center justify-center border-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20",
                sizeClasses.radio,
                getVariantClasses(isSelected),
                option.disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <div
                ref={(el) => (dotRefs.current[index] = el)}
                className={cn("absolute rounded-full", sizeClasses.dot, getDotColor())}
              />
            </button>

            <div className="flex-1">
              <Label
                className="text-white font-medium cursor-pointer"
                onClick={() => handleSelect(option.value, index)}
              >
                {option.label}
              </Label>
              {option.description && <p className="text-sm text-gray-400 mt-1">{option.description}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
