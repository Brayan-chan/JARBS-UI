"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Share } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientText } from "@/components/ui/gradient-text"
import { CodeBlock } from "@/components/ui/code-block"

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("preview")
  const [code, setCode] = useState(`import { AnimatedButton } from "@/components/ui/animated-button"

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <AnimatedButton>
        Click me for animation!
      </AnimatedButton>
    </div>
  )
}`)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <GradientText>Component Playground</GradientText>
            </h1>
            <p className="text-gray-300 text-lg">
              Experiment with our components in real-time. Edit the code and see the changes instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Code Editor */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Code Editor</CardTitle>
                  <CardDescription>Edit your component code here</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-white/20">
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[500px] bg-gray-900 border-0 rounded-none font-mono text-sm resize-none"
                  placeholder="Enter your component code here..."
                />
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white/10">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Generated Code</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab}>
                  <TabsContent value="preview" className="mt-0">
                    <div className="bg-white/5 rounded-lg p-8 min-h-[400px] flex items-center justify-center border border-white/10">
                      <AnimatedButton>Click me for animation!</AnimatedButton>
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="mt-0">
                    <CodeBlock code={code} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Quick Examples */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Quick Examples</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Animated Button",
                  description: "Button with hover animations",
                  badge: "Popular",
                },
                {
                  title: "Gradient Text",
                  description: "Text with gradient effects",
                  badge: "New",
                },
                {
                  title: "Glowing Card",
                  description: "Card with glow effects",
                  badge: "Pro",
                },
              ].map((example) => (
                <Card
                  key={example.title}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{example.title}</CardTitle>
                      <Badge variant="secondary">{example.badge}</Badge>
                    </div>
                    <CardDescription className="text-xs">{example.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
