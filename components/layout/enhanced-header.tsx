"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Download, Share } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { RippleButton } from "@/components/ui/ripple-button"
import { ParticleConnect } from "@/components/ui/particle-connect"

interface EnhancedHeaderProps {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  showActions?: boolean
  backgroundEffect?: "particles" | "gradient" | "none"
  className?: string
}

export function EnhancedHeader({
  title,
  subtitle,
  description,
  badge,
  showActions = true,
  backgroundEffect = "gradient",
  className = "",
}: EnhancedHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements
      gsap.fromTo(
        ".header-element",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
      )

      // Floating animation for badge
      gsap.to(".floating-badge", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={headerRef} className={`relative py-24 overflow-hidden ${className}`}>
      {/* Background Effects */}
      {backgroundEffect === "particles" && (
        <div className="absolute inset-0 opacity-30">
          <ParticleConnect />
        </div>
      )}

      {backgroundEffect === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
      )}

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          {badge && (
            <div className="header-element floating-badge mb-8">
              <Badge
                variant="outline"
                className="bg-white/5 border-white/20 text-white px-6 py-3 text-sm hover:bg-white/10 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {badge}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Badge>
            </div>
          )}

          {/* Subtitle */}
          {subtitle && <p className="header-element text-lg text-gray-400 mb-4 font-medium">{subtitle}</p>}

          {/* Main Title */}
          <h1 className="header-element text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Description */}
          {description && (
            <p className="header-element text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Action Buttons */}
          {showActions && (
            <div className="header-element flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton>
                <RippleButton
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </RippleButton>
              </MagneticButton>

              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-8 py-4 text-lg">
                  <Share className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </MagneticButton>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
