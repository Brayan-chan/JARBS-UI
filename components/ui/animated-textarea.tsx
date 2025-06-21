"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AnimatedTextareaProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  minRows?: number
  maxRows?: number
  showCharCount?: boolean
  autoResize?: boolean
  className?: string
}

export function AnimatedTextarea({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  minRows = 3,
  maxRows = 8,
  showCharCount = true,
  autoResize = true,
  className,
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [rows, setRows] = useState(minRows)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current
      textarea.style.height = "auto"
      const scrollHeight = textarea.scrollHeight
      const lineHeight = 24 // approximate line height
      const newRows = Math.min(Math.max(Math.ceil(scrollHeight / lineHeight), minRows), maxRows)
      setRows(newRows)
    }
  }, [value, autoResize, minRows, maxRows])

  const handleFocus = () => {
    setIsFocused(true)
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const getCharCountColor = () => {
    if (!maxLength) return "text-gray-400"
    const percentage = (value.length / maxLength) * 100
    if (percentage >= 90) return "text-red-400"
    if (percentage >= 75) return "text-yellow-400"
    return "text-gray-400"
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-white font-medium">{label}</Label>}

      <div ref={containerRef} className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            "bg-white/5 border-white/20 text-white placeholder-gray-400 transition-all duration-300 resize-none",
            isFocused && "border-white/40 shadow-lg",
            "focus:ring-2 focus:ring-white/20",
          )}
        />

        {/* Animated border effect */}
        {isFocused && (
          <div className="absolute inset-0 rounded-md border-2 border-white/30 pointer-events-none animate-pulse" />
        )}
      </div>

      {/* Character count */}
      {showCharCount && (
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500">
            {value.split("\n").length} line{value.split("\n").length !== 1 ? "s" : ""}
          </div>
          <div className={getCharCountColor()}>
            {value.length}
            {maxLength && ` / ${maxLength}`}
          </div>
        </div>
      )}
    </div>
  )
}
