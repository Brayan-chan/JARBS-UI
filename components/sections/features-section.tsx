"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Palette, Code2, Smartphone, Globe, Shield } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"

gsap.registerPlugin(ScrollTrigger)

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized components for maximum performance",
      badge: "Performance",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Fully Customizable",
      description: "Tailor every component to match your brand",
      badge: "Design",
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Developer Friendly",
      description: "Clean code with TypeScript support",
      badge: "DX",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "Responsive design out of the box",
      badge: "Responsive",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessible",
      description: "WCAG compliant components",
      badge: "A11y",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Production Ready",
      description: "Battle-tested in real applications",
      badge: "Reliable",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <GradientText>Why Choose Our Library?</GradientText>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built with modern technologies and best practices for the next generation of web applications
          </p>
        </div>

        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="feature-card bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <Badge variant="outline" className="text-xs border-white/20">
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
