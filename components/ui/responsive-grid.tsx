"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  gap?: number | string
  className?: string
}

export function ResponsiveGrid({
  children,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 4,
  className,
}: ResponsiveGridProps) {
  const getGridClasses = () => {
    const classes = ["grid"]

    // Default columns
    if (cols.default) {
      classes.push(`grid-cols-${cols.default}`)
    }

    // Responsive columns
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`)
    if (cols["2xl"]) classes.push(`2xl:grid-cols-${cols["2xl"]}`)

    // Gap
    if (typeof gap === "number") {
      classes.push(`gap-${gap}`)
    } else {
      classes.push(gap)
    }

    return classes.join(" ")
  }

  return <div className={cn(getGridClasses(), className)}>{children}</div>
}
