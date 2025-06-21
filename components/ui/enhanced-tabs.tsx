"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
  badge?: string | number
  icon?: React.ReactNode
}

interface EnhancedTabsProps {
  items: TabItem[]
  defaultValue?: string
  variant?: "default" | "pills" | "underline" | "cards" | "vertical"
  size?: "sm" | "md" | "lg"
  className?: string
  onValueChange?: (value: string) => void
}

export function EnhancedTabs({
  items,
  defaultValue,
  variant = "default",
  size = "md",
  className,
  onValueChange,
}: EnhancedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.id)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return

    setActiveTab(tabId)
    onValueChange?.(tabId)
    updateIndicator(tabId)
    animateContent()
  }

  const updateIndicator = (tabId: string) => {
    if (variant === "underline" && tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(`[data-tab="${tabId}"]`) as HTMLElement
      if (activeButton) {
        const { offsetLeft, offsetWidth } = activeButton
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
      }
    }
  }

  const animateContent = () => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
    }
  }

  useEffect(() => {
    updateIndicator(activeTab)
  }, [activeTab, variant])

  const getTabsContainerClasses = () => {
    const baseClasses = "flex"

    switch (variant) {
      case "pills":
        return `${baseClasses} bg-white/5 p-1 rounded-lg`
      case "underline":
        return `${baseClasses} border-b border-white/10 relative`
      case "cards":
        return `${baseClasses} gap-1`
      case "vertical":
        return `${baseClasses} flex-col space-y-1`
      default:
        return `${baseClasses} border-b border-white/20`
    }
  }

  const getTabButtonClasses = (isActive: boolean, disabled?: boolean) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }

    const baseClasses = cn(
      "relative flex items-center gap-2 font-medium transition-all duration-200 focus:outline-none",
      sizeClasses[size],
      disabled && "opacity-50 cursor-not-allowed",
    )

    switch (variant) {
      case "pills":
        return cn(
          baseClasses,
          "rounded-md",
          isActive ? "bg-white text-black" : "text-gray-300 hover:text-white hover:bg-white/10",
        )
      case "underline":
        return cn(
          baseClasses,
          "border-b-2 border-transparent",
          isActive ? "text-white border-blue-500" : "text-gray-300 hover:text-white",
        )
      case "cards":
        return cn(
          baseClasses,
          "rounded-lg border",
          isActive
            ? "bg-white/10 border-white/20 text-white"
            : "border-white/10 text-gray-300 hover:bg-white/5 hover:text-white",
        )
      case "vertical":
        return cn(
          baseClasses,
          "rounded-lg w-full justify-start",
          isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white",
        )
      default:
        return cn(
          baseClasses,
          "border-b-2 border-transparent",
          isActive ? "text-white border-white" : "text-gray-300 hover:text-white",
        )
    }
  }

  const activeTabContent = items.find((item) => item.id === activeTab)?.content

  return (
    <div className={cn("w-full", variant === "vertical" && "flex gap-6", className)}>
      {/* Tabs */}
      <div className={cn(getTabsContainerClasses(), variant === "vertical" && "w-48")}>
        <div ref={tabsRef} className="flex w-full">
          {items.map((item) => (
            <button
              key={item.id}
              data-tab={item.id}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              disabled={item.disabled}
              className={getTabButtonClasses(activeTab === item.id, item.disabled)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Underline Indicator */}
        {variant === "underline" && (
          <div
            className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out"
            style={{
              width: indicatorStyle.width,
              left: indicatorStyle.left,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} className={cn("mt-6", variant === "vertical" && "flex-1 mt-0")}>
        {activeTabContent}
      </div>
    </div>
  )
}
