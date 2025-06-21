"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AnimatedSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
  showTicks?: boolean
  formatValue?: (value: number) => string
  variant?: "default" | "gradient" | "glow"
  className?: string
}

export function AnimatedSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  showTicks = false,
  formatValue = (val) => val.toString(),
  variant = "default",
  className,
}: AnimatedSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTempValue(value)
  }, [value])

  useEffect(() => {
    if (thumbRef.current && trackRef.current) {
      const percentage = ((tempValue - min) / (max - min)) * 100

      gsap.to(thumbRef.current, {
        left: `${percentage}%`,
        duration: isDragging ? 0 : 0.3,
        ease: "power2.out",
      })

      // Animate track fill
      gsap.to(trackRef.current, {
        width: `${percentage}%`,
        duration: isDragging ? 0 : 0.3,
        ease: "power2.out",
      })
    }
  }, [tempValue, min, max, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateValue(e)

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      onChange(tempValue)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const updateValue = (e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newValue = Math.round((min + percentage * (max - min)) / step) * step
    setTempValue(Math.max(min, Math.min(max, newValue)))
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return {
          track: "bg-gradient-to-r from-blue-500 to-purple-500",
          thumb: "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50",
        }
      case "glow":
        return {
          track: "bg-white shadow-lg shadow-white/50",
          thumb: "bg-white shadow-lg shadow-white/50",
        }
      default:
        return {
          track: "bg-white",
          thumb: "bg-white",
        }
    }
  }

  const variantClasses = getVariantClasses()

  const ticks = showTicks ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step) : []

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <Label className="text-white font-medium">{label}</Label>
          {showValue && (
            <span className="text-white font-mono bg-white/10 px-2 py-1 rounded text-sm">{formatValue(tempValue)}</span>
          )}
        </div>
      )}

      <div className="relative">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          className="relative h-2 bg-white/20 rounded-full cursor-pointer"
        >
          {/* Track fill */}
          <div ref={trackRef} className={cn("absolute left-0 top-0 h-full rounded-full", variantClasses.track)} />

          {/* Thumb */}
          <div
            ref={thumbRef}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full cursor-grab active:cursor-grabbing transition-transform hover:scale-110",
              variantClasses.thumb,
              isDragging && "scale-125",
            )}
          />

          {/* Ticks */}
          {showTicks && (
            <div className="absolute top-full mt-2 w-full">
              {ticks.map((tick) => {
                const percentage = ((tick - min) / (max - min)) * 100
                return (
                  <div
                    key={tick}
                    className="absolute -translate-x-1/2 text-xs text-gray-400"
                    style={{ left: `${percentage}%` }}
                  >
                    {formatValue(tick)}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
