import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
}

export function GradientText({
  children,
  className,
  gradient = "from-blue-400 via-purple-500 to-pink-500",
}: GradientTextProps) {
  return <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", gradient, className)}>{children}</span>
}
