"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

interface AnimatedAccordionProps {
  items: AccordionItem[]
  type?: "single" | "multiple"
  variant?: "default" | "bordered" | "minimal" | "card"
  iconType?: "chevron" | "plus" | "none"
  defaultValue?: string | string[]
  className?: string
  onValueChange?: (value: string | string[]) => void
}

export function AnimatedAccordion({
  items,
  type = "single",
  variant = "default",
  iconType = "chevron",
  defaultValue,
  className,
  onValueChange,
}: AnimatedAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (defaultValue) {
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
    }
    return new Set()
  })

  const contentRefs = useRef<Record<string, HTMLDivElement>>({})

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems)

    if (type === "single") {
      if (newOpenItems.has(itemId)) {
        newOpenItems.clear()
      } else {
        newOpenItems.clear()
        newOpenItems.add(itemId)
      }
    } else {
      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId)
      } else {
        newOpenItems.add(itemId)
      }
    }

    setOpenItems(newOpenItems)
    onValueChange?.(type === "single" ? Array.from(newOpenItems)[0] || "" : Array.from(newOpenItems))
  }

  useEffect(() => {
    items.forEach((item) => {
      const content = contentRefs.current[item.id]
      if (!content) return

      const isOpen = openItems.has(item.id)

      if (isOpen) {
        // Open animation
        gsap.fromTo(
          content,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
        )
      } else {
        // Close animation
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        })
      }
    })
  }, [openItems, items])

  const getVariantClasses = () => {
    switch (variant) {
      case "bordered":
        return "border border-white/20 rounded-lg overflow-hidden"
      case "minimal":
        return "space-y-1"
      case "card":
        return "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
      default:
        return "border-b border-white/10 last:border-b-0"
    }
  }

  const getItemClasses = (isOpen: boolean, isLast: boolean) => {
    switch (variant) {
      case "bordered":
        return cn("border-b border-white/10", isLast && "border-b-0")
      case "minimal":
        return "bg-white/5 rounded-lg mb-2 overflow-hidden"
      case "card":
        return cn("border-b border-white/10", isLast && "border-b-0")
      default:
        return ""
    }
  }

  const renderIcon = (isOpen: boolean) => {
    switch (iconType) {
      case "plus":
        return isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />
      case "chevron":
        return <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
      case "none":
        return null
      default:
        return <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
    }
  }

  return (
    <div className={cn(getVariantClasses(), className)}>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id)
        const isLast = index === items.length - 1

        return (
          <div key={item.id} className={getItemClasses(isOpen, isLast)}>
            {/* Header */}
            <button
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center justify-between p-4 text-left transition-all duration-200",
                "hover:bg-white/5 focus:bg-white/5 focus:outline-none",
                item.disabled && "opacity-50 cursor-not-allowed",
                isOpen && "bg-white/5",
              )}
            >
              <span className="font-medium text-white pr-4">{item.title}</span>
              {!item.disabled && renderIcon(isOpen)}
            </button>

            {/* Content */}
            <div
              ref={(el) => {
                if (el) contentRefs.current[item.id] = el
              }}
              className="overflow-hidden"
              style={{ height: 0 }}
            >
              <div className="p-4 pt-0 text-gray-300">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
