"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white py-3 px-4 relative border-b border-white/10">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">
            Introducing <strong>JARBS-UI v2.0</strong> - The most advanced component library with mind-blowing
            animations and effects.
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
