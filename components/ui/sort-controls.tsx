"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowUpDown, ArrowUp, ArrowDown, SortAsc, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SortOption {
  id: string
  label: string
  field: string
  icon?: React.ReactNode
}

interface SortControlsProps {
  options: SortOption[]
  currentSort?: string
  currentDirection?: "asc" | "desc"
  onSortChange: (sortBy: string, direction: "asc" | "desc") => void
  showDirection?: boolean
  showBadge?: boolean
  variant?: "buttons" | "dropdown" | "hybrid"
  className?: string
}

export function SortControls({
  options,
  currentSort = "",
  currentDirection = "asc",
  onSortChange,
  showDirection = true,
  showBadge = true,
  variant = "hybrid",
  className,
}: SortControlsProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)

  // Default sort options for demo
  const defaultOptions: SortOption[] = [
    { id: "name", label: "Name", field: "name", icon: <SortAsc className="w-4 h-4" /> },
    { id: "date", label: "Date", field: "createdAt", icon: <ArrowUpDown className="w-4 h-4" /> },
    { id: "popularity", label: "Popularity", field: "views", icon: <ArrowUp className="w-4 h-4" /> },
    { id: "rating", label: "Rating", field: "rating", icon: <ArrowDown className="w-4 h-4" /> },
    { id: "price", label: "Price", field: "price", icon: <SortDesc className="w-4 h-4" /> },
  ]

  const sortOptions = options.length > 0 ? options : defaultOptions

  useEffect(() => {
    if (controlsRef.current) {
      gsap.fromTo(
        controlsRef.current.children,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" },
      )
    }
  }, [])

  const handleSortChange = (sortBy: string, direction?: "asc" | "desc") => {
    if (isAnimating) return

    setIsAnimating(true)

    // Animate sort change
    if (controlsRef.current) {
      gsap.to(controlsRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setIsAnimating(false)
        },
      })
    }

    const newDirection = direction || (sortBy === currentSort && currentDirection === "asc" ? "desc" : "asc")
    onSortChange(sortBy, newDirection)
  }

  const getCurrentSortOption = () => {
    return sortOptions.find((option) => option.id === currentSort)
  }

  const renderButtonVariant = () => (
    <div className="flex items-center space-x-2">
      {sortOptions.map((option) => (
        <Button
          key={option.id}
          variant={currentSort === option.id ? "default" : "ghost"}
          size="sm"
          onClick={() => handleSortChange(option.id)}
          disabled={isAnimating}
          className={cn(
            "flex items-center space-x-2 transition-all duration-200",
            currentSort === option.id
              ? "bg-white text-black hover:bg-gray-200"
              : "text-gray-400 hover:text-white hover:bg-white/10",
          )}
        >
          {option.icon}
          <span>{option.label}</span>
          {currentSort === option.id && showDirection && (
            <div className="ml-1">
              {currentDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            </div>
          )}
        </Button>
      ))}
    </div>
  )

  const renderDropdownVariant = () => (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-400">Sort by:</span>
      <Select value={currentSort} onValueChange={(value) => handleSortChange(value)}>
        <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
          {sortOptions.map((option) => (
            <SelectItem key={option.id} value={option.id} className="text-white hover:bg-white/10">
              <div className="flex items-center space-x-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showDirection && currentSort && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSortChange(currentSort, currentDirection === "asc" ? "desc" : "asc")}
          disabled={isAnimating}
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          {currentDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        </Button>
      )}
    </div>
  )

  const renderHybridVariant = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">Sort by:</span>
        <Select value={currentSort} onValueChange={(value) => handleSortChange(value)}>
          <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id} className="text-white hover:bg-white/10">
                <div className="flex items-center space-x-2">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showDirection && currentSort && (
        <div className="flex items-center space-x-2">
          <Button
            variant={currentDirection === "asc" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleSortChange(currentSort, "asc")}
            disabled={isAnimating}
            className={cn(
              currentDirection === "asc"
                ? "bg-white text-black hover:bg-gray-200"
                : "text-gray-400 hover:text-white hover:bg-white/10",
            )}
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            Asc
          </Button>
          <Button
            variant={currentDirection === "desc" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleSortChange(currentSort, "desc")}
            disabled={isAnimating}
            className={cn(
              currentDirection === "desc"
                ? "bg-white text-black hover:bg-gray-200"
                : "text-gray-400 hover:text-white hover:bg-white/10",
            )}
          >
            <ArrowDown className="w-4 h-4 mr-1" />
            Desc
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div ref={controlsRef} className={cn("flex items-center space-x-4", className)}>
      {variant === "buttons" && renderButtonVariant()}
      {variant === "dropdown" && renderDropdownVariant()}
      {variant === "hybrid" && renderHybridVariant()}

      {/* Current sort badge */}
      {showBadge && currentSort && (
        <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
          {getCurrentSortOption()?.label} {currentDirection === "asc" ? "↑" : "↓"}
        </Badge>
      )}
    </div>
  )
}
