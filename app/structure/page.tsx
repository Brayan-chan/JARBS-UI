"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Eye, Copy, Download } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { Sidebar } from "@/components/layout/sidebar"
import { EnhancedHeader } from "@/components/layout/enhanced-header"
import { EnhancedHero } from "@/components/sections/enhanced-hero"
import { EnhancedFooter } from "@/components/layout/enhanced-footer"

export default function StructurePage() {
  const [activeComponent, setActiveComponent] = useState("navbar")

  const structuralComponents = [
    {
      id: "navbar",
      name: "Navbar",
      description: "Advanced navigation bar with dropdowns, search, and magnetic effects",
      category: "Navigation",
      complexity: "Medium",
      features: ["Responsive Design", "Dropdown Menus", "Search Integration", "Magnetic Effects", "Mobile Menu"],
      component: <Navbar />,
      code: `import { Navbar } from "@/components/layout/navbar"

export default function App() {
  return <Navbar />
}`,
    },
    {
      id: "sidebar",
      name: "Sidebar",
      description: "Collapsible sidebar with navigation, badges, and smooth animations",
      category: "Navigation",
      complexity: "Medium",
      features: ["Collapsible", "Navigation Tree", "Active States", "Badges", "Smooth Animations"],
      component: (
        <div className="relative h-96 w-full">
          <Sidebar />
        </div>
      ),
      code: `import { Sidebar } from "@/components/layout/sidebar"

export default function App() {
  return <Sidebar />
}`,
    },
    {
      id: "header",
      name: "Enhanced Header",
      description: "Powerful header with particle effects, badges, and action buttons",
      category: "Layout",
      complexity: "Advanced",
      features: ["Particle Effects", "Animated Badges", "Action Buttons", "Background Options", "Responsive"],
      component: (
        <EnhancedHeader
          title="Amazing Header"
          subtitle="Structure Component"
          description="This is a powerful header component with incredible effects"
          badge="✨ Featured Component"
          backgroundEffect="gradient"
        />
      ),
      code: `import { EnhancedHeader } from "@/components/layout/enhanced-header"

export default function App() {
  return (
    <EnhancedHeader
      title="Amazing Header"
      subtitle="Structure Component"
      description="This is a powerful header component"
      badge="✨ Featured"
      backgroundEffect="gradient"
    />
  )
}`,
    },
    {
      id: "hero",
      name: "Enhanced Hero",
      description: "Epic hero section with video background, typewriter effect, and floating dock",
      category: "Layout",
      complexity: "Advanced",
      features: ["Video Background", "Typewriter Effect", "Floating Dock", "Animated Stats", "Scroll Indicators"],
      component: (
        <div className="h-96 overflow-hidden rounded-lg">
          <EnhancedHero />
        </div>
      ),
      code: `import { EnhancedHero } from "@/components/sections/enhanced-hero"

export default function App() {
  return <EnhancedHero />
}`,
    },
    {
      id: "footer",
      name: "Enhanced Footer",
      description: "Complete footer with newsletter, social links, and animated sections",
      category: "Layout",
      complexity: "Medium",
      features: ["Newsletter Signup", "Social Links", "Organized Sections", "Animations", "Responsive"],
      component: <EnhancedFooter />,
      code: `import { EnhancedFooter } from "@/components/layout/enhanced-footer"

export default function App() {
  return <EnhancedFooter />
}`,
    },
  ]

  const currentComponent = structuralComponents.find((comp) => comp.id === activeComponent)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <GradientText>Structural Components</GradientText>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Essential layout and navigation components with stunning animations and effects
              </p>
            </div>
          </div>
        </section>

        {/* Component Showcase */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Component List */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold text-white mb-4">Components</h2>
                <div className="space-y-2">
                  {structuralComponents.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => setActiveComponent(component.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        activeComponent === component.id
                          ? "bg-white/10 text-white border border-white/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="font-medium">{component.name}</div>
                      <div className="text-xs text-gray-500">{component.category}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Component Details */}
              <div className="lg:col-span-3">
                {currentComponent && (
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white text-2xl">{currentComponent.name}</CardTitle>
                          <CardDescription className="text-gray-300 text-lg mt-2">
                            {currentComponent.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-white/20">
                            {currentComponent.category}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`${
                              currentComponent.complexity === "Advanced"
                                ? "bg-red-500/20 text-red-300"
                                : currentComponent.complexity === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {currentComponent.complexity}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="preview" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-white/5">
                          <TabsTrigger value="preview" className="data-[state=active]:bg-white/20">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </TabsTrigger>
                          <TabsTrigger value="code" className="data-[state=active]:bg-white/20">
                            <Code className="w-4 h-4 mr-2" />
                            Code
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="preview" className="mt-6">
                          <div className="bg-black/20 rounded-lg border border-white/5 overflow-hidden">
                            {currentComponent.component}
                          </div>

                          {/* Features */}
                          <div className="mt-6">
                            <h3 className="text-white font-semibold mb-3">Features</h3>
                            <div className="flex flex-wrap gap-2">
                              {currentComponent.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="bg-white/10 text-white">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="code" className="mt-6">
                          <div className="relative">
                            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                              <code className="text-gray-100">{currentComponent.code}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* Actions */}
                      <div className="flex gap-4 mt-6">
                        <Button className="bg-white text-black hover:bg-gray-200">
                          <Download className="w-4 h-4 mr-2" />
                          Install Component
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
