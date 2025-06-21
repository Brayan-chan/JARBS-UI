"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  variant?: "text" | "avatar" | "card" | "table" | "custom"
  lines?: number
  className?: string
  animate?: boolean
  children?: React.ReactNode
}

export function SkeletonLoader({
  variant = "text",
  lines = 3,
  className,
  animate = true,
  children,
}: SkeletonLoaderProps) {
  const skeletonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return

    const skeleton = skeletonRef.current
    if (!skeleton) return

    const shimmerElements = skeleton.querySelectorAll(".shimmer")

    shimmerElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          backgroundPosition: "-200px 0",
        },
        {
          backgroundPosition: "200px 0",
          duration: 1.5,
          ease: "none",
          repeat: -1,
        },
      )
    })
  }, [animate])

  const shimmerClass = animate
    ? "shimmer bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200px_100%]"
    : "bg-gray-700"

  if (variant === "custom" && children) {
    return (
      <div ref={skeletonRef} className={cn("animate-pulse", className)}>
        {children}
      </div>
    )
  }

  const renderSkeleton = () => {
    switch (variant) {
      case "avatar":
        return (
          <div className="flex items-center space-x-4">
            <div className={cn("w-12 h-12 rounded-full", shimmerClass)} />
            <div className="space-y-2 flex-1">
              <div className={cn("h-4 rounded w-3/4", shimmerClass)} />
              <div className={cn("h-3 rounded w-1/2", shimmerClass)} />
            </div>
          </div>
        )

      case "card":
        return (
          <div className="space-y-4">
            <div className={cn("h-48 rounded-lg", shimmerClass)} />
            <div className="space-y-2">
              <div className={cn("h-4 rounded w-3/4", shimmerClass)} />
              <div className={cn("h-3 rounded w-full", shimmerClass)} />
              <div className={cn("h-3 rounded w-2/3", shimmerClass)} />
            </div>
            <div className="flex space-x-2">
              <div className={cn("h-8 rounded w-20", shimmerClass)} />
              <div className={cn("h-8 rounded w-16", shimmerClass)} />
            </div>
          </div>
        )

      case "table":
        return (
          <div className="space-y-3">
            {/* Header */}
            <div className="flex space-x-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={cn("h-4 rounded flex-1", shimmerClass)} />
              ))}
            </div>
            {/* Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className={cn("h-3 rounded flex-1", shimmerClass)} />
                ))}
              </div>
            ))}
          </div>
        )

      case "text":
      default:
        return (
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <div key={i} className={cn("h-4 rounded", shimmerClass, i === lines - 1 ? "w-3/4" : "w-full")} />
            ))}
          </div>
        )
    }
  }

  return (
    <div ref={skeletonRef} className={cn("animate-pulse", className)}>
      {renderSkeleton()}
    </div>
  )
}
