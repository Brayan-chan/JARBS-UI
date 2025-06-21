"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/layout/navbar"
import { EnhancedHero } from "@/components/sections/enhanced-hero"
import { ComponentShowcase } from "@/components/sections/component-showcase"
import { InteractiveDemo } from "@/components/sections/interactive-demo"
import { EnhancedFooter } from "@/components/layout/enhanced-footer"
import { AnnouncementBanner } from "@/components/ui/announcement-banner"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll animations
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
      )

      // Page transition effect
      gsap.fromTo(
        "main",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnnouncementBanner />
      <Navbar />
      <main className="pt-20">
        <EnhancedHero />
        <ComponentShowcase />
        <InteractiveDemo />
      </main>
      <EnhancedFooter />
    </div>
  )
}
