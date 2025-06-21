"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Palette, Sparkles, Eye, MousePointer, Layers } from "lucide-react"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { BentoGrid } from "@/components/ui/bento-grid"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { WavyBackground } from "@/components/ui/wavy-background"
import { LampEffect } from "@/components/ui/lamp-effect"
import { TextReveal } from "@/components/ui/text-reveal"
import { ParticleConnect } from "@/components/ui/particle-connect"
import { Card3D } from "@/components/ui/card-3d"

gsap.registerPlugin(ScrollTrigger)

export function ComponentShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        ".showcase-card",
        { opacity: 0, y: 100, scale: 0.8, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".showcase-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate section title
      gsap.fromTo(
        ".showcase-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".showcase-title",
            start: "top 90%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const components = [
    {
      title: "Animated Beam",
      description: "Stunning beam animations that connect elements with fluid motion",
      icon: <Zap className="w-6 h-6" />,
      badge: "Epic",
      demo: <AnimatedBeam />,
      category: "Animation",
    },
    {
      title: "3D Cards",
      description: "Interactive 3D cards with depth, shadows and smooth transforms",
      icon: <Layers className="w-6 h-6" />,
      badge: "3D",
      demo: <Card3D />,
      category: "Interactive",
    },
    {
      title: "Particle Connect",
      description: "Dynamic particle system with interactive connections",
      icon: <Sparkles className="w-6 h-6" />,
      badge: "Pro",
      demo: <ParticleConnect />,
      category: "Effects",
    },
    {
      title: "Text Reveal",
      description: "Cinematic text reveal animations with multiple effects",
      icon: <Eye className="w-6 h-6" />,
      badge: "New",
      demo: <TextReveal text="JARBS-UI" />,
      category: "Typography",
    },
    {
      title: "Wavy Background",
      description: "Mesmerizing wavy backgrounds with smooth animations",
      icon: <Palette className="w-6 h-6" />,
      badge: "Popular",
      demo: <WavyBackground />,
      category: "Background",
    },
    {
      title: "Lamp Effect",
      description: "Dramatic lamp lighting effects with realistic shadows",
      icon: <MousePointer className="w-6 h-6" />,
      badge: "Premium",
      demo: <LampEffect />,
      category: "Lighting",
    },
  ]

  const testimonials = [
    {
      quote: "JARBS-UI components are absolutely mind-blowing! The animations are so smooth.",
      name: "Sarah Chen",
      title: "Frontend Developer",
    },
    {
      quote: "I've never seen components this beautiful. My clients are always impressed.",
      name: "Mike Johnson",
      title: "UI Designer",
    },
    {
      quote: "The 3D effects and interactions are on another level. Simply incredible!",
      name: "Alex Rodriguez",
      title: "Creative Director",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <WavyBackground className="absolute inset-0 opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="showcase-title text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Incredible Components
            </span>
          </h2>
          <p className="showcase-title text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Each component is crafted with obsessive attention to detail, featuring{" "}
            <span className="text-white font-semibold">stunning animations</span> and{" "}
            <span className="text-white font-semibold">mind-bending effects</span>
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="showcase-grid mb-20">
          <BentoGrid className="max-w-7xl mx-auto">
            {components.map((component, index) => (
              <Card
                key={component.title}
                className={`showcase-card bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/60 transition-all duration-500 group overflow-hidden ${
                  index === 0 || index === 3 ? "md:col-span-2" : ""
                } ${index === 1 || index === 2 ? "md:row-span-2" : ""}`}
              >
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                        {component.icon}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{component.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1 bg-white/10 text-white border-white/20">
                          {component.badge}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-white/20 text-gray-300">
                      {component.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {component.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="p-6 bg-black/20 rounded-xl border border-white/5 mb-6 min-h-[200px] flex items-center justify-center">
                    {component.demo}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-white hover:bg-white/10 group-hover:bg-white/20 transition-colors"
                  >
                    View Component
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </BentoGrid>
        </div>

        {/* Infinite Moving Cards */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">What Developers Say</h3>
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold group">
            Explore All Components
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
