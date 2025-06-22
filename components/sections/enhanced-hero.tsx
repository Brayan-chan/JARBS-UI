"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Sparkles, Github, Star } from "lucide-react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { SpotlightPreview } from "@/components/ui/spotlight"
import { FloatingDock } from "@/components/ui/floating-dock"
import { GridPattern } from "@/components/ui/grid-pattern"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { RippleButton } from "@/components/ui/ripple-button"
import { Meteors } from "@/components/ui/meteors"
import { WavyBackground } from "@/components/ui/wavy-background"

gsap.registerPlugin(ScrollTrigger)

export function EnhancedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate floating elements
      gsap.to(".floating-element", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-10, 10)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      })

      // Animate stats with counting effect
      gsap.fromTo(
        ".stat-number",
        { textContent: 0 },
        {
          textContent: (i, target) => target.getAttribute("data-value"),
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 1.5,
        },
      )

      // Parallax scroll effect
      gsap.to(".parallax-element", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Floating dock animation
      gsap.fromTo(
        ".dock-container",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 2,
        },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const words = [
    { text: "Create" },
    { text: "mind-blowing" },
    { text: "interfaces" },
    { text: "with" },
    { text: "JARBS-UI", className: "text-white font-extrabold" },
  ]

  const dockItems = [
    { title: "Components", icon: "🧩", href: "/components" },
    { title: "Templates", icon: "📄", href: "/templates" },
    { title: "Playground", icon: "🎮", href: "/playground" },
    { title: "GitHub", icon: "🐙", href: "https://github.com" },
    { title: "Discord", icon: "💬", href: "https://discord.com" },
  ]

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <WavyBackground className="opacity-20" />
        <GridPattern />
        <SpotlightPreview />
        <Meteors number={50} />
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 opacity-10">
        <video ref={videoRef} className="w-full h-full object-cover" loop muted playsInline>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Parallax Elements */}
      <div className="absolute inset-0 parallax-element">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl floating-element" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/5 rounded-full blur-xl floating-element" />
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-white/5 rounded-full blur-xl floating-element" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/5 rounded-full blur-xl floating-element" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Announcement Badge */}
        <div className="fade-in mb-8">
          <Badge
            variant="outline"
            className="bg-white/5 border-white/20 text-white px-6 py-3 text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Introducing JARBS-UI v1.0 - Now with 50+ Components
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Badge>
        </div>

        {/* Main Title with Typewriter Effect */}
        <div className="mb-8">
          <TypewriterEffect words={words} className="text-4xl md:text-7xl lg:text-8xl font-bold" />
        </div>

        {/* Subtitle */}
        <p className="fade-in text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          The most advanced component library with{" "}
          <span className="text-white font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            stunning animations
          </span>
          ,{" "}
          <span className="text-white font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            incredible effects
          </span>
          , and{" "}
          <span className="text-white font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            mind-blowing interactions
          </span>{" "}
          that will make your users say WOW.
        </p>

        {/* CTA Buttons */}
        <div className="fade-in flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <MagneticButton>
            <RippleButton
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-lg font-bold shadow-2xl"
            >
              Explore Components
              <ArrowRight className="w-5 h-5 ml-2" />
            </RippleButton>
          </MagneticButton>

          <MagneticButton>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-10 py-5 text-lg backdrop-blur-sm"
              onClick={handleVideoPlay}
            >
              <Play className="w-5 h-5 mr-2" />
              {isVideoPlaying ? "Pause" : "Watch"} Demo
            </Button>
          </MagneticButton>

          <MagneticButton>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-10 py-5 text-lg">
              <Github className="w-5 h-5 mr-2" />
              <Star className="w-4 h-4 mr-1" />
              Star on GitHub
            </Button>
          </MagneticButton>
        </div>

        {/* Stats */}
        <div className="fade-in grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16">
          {[
            { label: "Components", value: "50", suffix: "+" },
            { label: "Downloads", value: "25", suffix: "K+" },
            { label: "GitHub Stars", value: "5", suffix: "K+" },
            { label: "Happy Developers", value: "1000", suffix: "+" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center floating-element group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                <span className="stat-number" data-value={stat.value}>
                  0
                </span>
                {stat.suffix}
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Floating Dock */}
        <div className="dock-container">
          <FloatingDock items={dockItems} />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
