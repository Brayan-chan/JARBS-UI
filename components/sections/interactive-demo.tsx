"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { RippleButton } from "@/components/ui/ripple-button"
import { Card3D } from "@/components/ui/card-3d"
import { ParticleConnect } from "@/components/ui/particle-connect"
import { TextReveal } from "@/components/ui/text-reveal"
import { LampEffect } from "@/components/ui/lamp-effect"

export function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState("magnetic")

  const demos = {
    magnetic: {
      title: "Magnetic Button",
      description: "Buttons that attract to your cursor with smooth magnetic effects",
      component: (
        <MagneticButton>
          <Button className="bg-white text-black hover:bg-gray-200">Hover me!</Button>
        </MagneticButton>
      ),
    },
    ripple: {
      title: "Ripple Effect",
      description: "Click to create beautiful ripple animations",
      component: <RippleButton className="bg-white text-black hover:bg-gray-200">Click me!</RippleButton>,
    },
    card3d: {
      title: "3D Card",
      description: "Interactive 3D cards that respond to mouse movement",
      component: <Card3D />,
    },
    particles: {
      title: "Particle Connect",
      description: "Dynamic particle system with connecting lines",
      component: <ParticleConnect />,
    },
    textReveal: {
      title: "Text Reveal",
      description: "Cinematic text animations with stunning effects",
      component: <TextReveal text="AMAZING" />,
    },
    lamp: {
      title: "Lamp Effect",
      description: "Interactive lighting effects that follow your cursor",
      component: <LampEffect />,
    },
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Interactive Playground
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the magic of JARBS-UI components. Hover, click, and interact with these incredible effects.
          </p>
        </div>

        {/* Demo Tabs */}
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white/5 mb-8">
            {Object.entries(demos).map(([key, demo]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-white/20 text-white data-[state=active]:text-white"
              >
                {demo.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(demos).map(([key, demo]) => (
            <TabsContent key={key} value={key}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">{demo.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">{demo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/20 rounded-xl p-12 border border-white/5 flex items-center justify-center min-h-[300px]">
                    {demo.component}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
          {[
            { label: "Interactive Components", value: "25+" },
            { label: "Animation Effects", value: "50+" },
            { label: "Lines of Magic", value: "10K+" },
            { label: "Mind = Blown", value: "∞" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
