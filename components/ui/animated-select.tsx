"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ChevronDown, Check, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface AnimatedSelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  className?: string
}

export function AnimatedSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = false,
  multiple = false,
  className,
}: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiple ? (value ? value.split(",") : []) : value ? [value] : [],
  )

  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      )

      gsap.fromTo(
        dropdownRef.current.querySelectorAll(".option-item"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.2, stagger: 0.05 },
      )
    }
  }, [isOpen])

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue]

      setSelectedValues(newValues)
      onChange(newValues.join(","))
    } else {
      setSelectedValues([optionValue])
      onChange(optionValue)
      setIsOpen(false)
    }

    // Animate selection
    if (triggerRef.current) {
      gsap.to(triggerRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }
  }

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return placeholder

    if (multiple) {
      if (selectedValues.length === 1) {
        const option = options.find((opt) => opt.value === selectedValues[0])
        return option?.label || selectedValues[0]
      }
      return `${selectedValues.length} selected`
    }

    const option = options.find((opt) => opt.value === selectedValues[0])
    return option?.label || selectedValues[0]
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        ref={triggerRef}
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
      >
        <span className="truncate">{getDisplayValue()}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 max-h-64 overflow-hidden"
        >
          {searchable && (
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search options..."
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          <div className="max-h-48 overflow-y-auto p-2">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-gray-400">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    "option-item w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                    selectedValues.includes(option.value)
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                    option.disabled && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                  {selectedValues.includes(option.value) && <Check className="w-4 h-4 text-white" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
