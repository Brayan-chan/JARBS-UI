"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MenuItem {
  label: string
  href?: string
  children?: MenuItem[]
  icon?: React.ReactNode
}

interface MobileMenuProps {
  items: MenuItem[]
  className?: string
  onItemClick?: (item: MenuItem) => void
}

export function MobileMenu({ items, className, onItemClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      // Animate menu entrance
      const overlay = overlayRef.current
      const menu = menuRef.current

      if (overlay && menu) {
        gsap.set(overlay, { opacity: 0 })
        gsap.set(menu, { x: "100%" })

        const tl = gsap.timeline()
        tl.to(overlay, { opacity: 1, duration: 0.3 })
          .to(menu, { x: "0%", duration: 0.4, ease: "power3.out" }, "-=0.1")
          .fromTo(
            menu.querySelectorAll(".menu-item"),
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 },
            "-=0.2",
          )
      }
    } else {
      document.body.style.overflow = ""

      // Animate menu exit
      const overlay = overlayRef.current
      const menu = menuRef.current

      if (overlay && menu) {
        const tl = gsap.timeline()
        tl.to(menu, { x: "100%", duration: 0.3, ease: "power3.in" }).to(overlay, { opacity: 0, duration: 0.2 }, "-=0.1")
      }
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(label)) {
      newExpanded.delete(label)
    } else {
      newExpanded.add(label)
    }
    setExpandedItems(newExpanded)
  }

  const handleItemClick = (item: MenuItem) => {
    onItemClick?.(item)
    if (item.href) {
      setIsOpen(false)
    }
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.label)

    return (
      <div key={item.label} className="menu-item">
        <div
          className={cn(
            "flex items-center justify-between p-4 text-white hover:bg-white/10 transition-colors",
            level > 0 && "pl-8 border-l border-white/10 ml-4",
          )}
        >
          <div className="flex items-center gap-3">
            {item.icon && <span className="text-white/70">{item.icon}</span>}
            {item.href ? (
              <Link href={item.href} className="font-medium" onClick={() => handleItemClick(item)}>
                {item.label}
              </Link>
            ) : (
              <span className="font-medium cursor-pointer" onClick={() => hasChildren && toggleExpanded(item.label)}>
                {item.label}
              </span>
            )}
          </div>
          {hasChildren && (
            <button onClick={() => toggleExpanded(item.label)} className="p-1 hover:bg-white/10 rounded">
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180")} />
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-white/10 ml-4">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className={cn("md:hidden text-white hover:bg-white/10", className)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-black/90 backdrop-blur-xl border-l border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="overflow-y-auto h-full pb-20">{items.map((item) => renderMenuItem(item))}</div>
          </div>
        </div>
      )}
    </>
  )
}
