import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "../ui/animated-button"

export function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">Build Stunning UIs with Ease</h1>
            <p className="text-lg text-gray-300 mb-8">
              Explore our comprehensive collection of React components, designed to accelerate your development process
              and bring your ideas to life.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link href="/components">
                <AnimatedButton size="lg" className="bg-white text-black hover:bg-gray-200">
                  Explore Components
                </AnimatedButton>
              </Link>
              <Link href="/components">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Explore All Components
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <Card className="bg-transparent border-white/10 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Component Showcase</CardTitle>
                <CardDescription className="text-gray-300">A glimpse into our component library.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="secondary">Button</Button>
                  <Button variant="outline">Outline</Button>
                  <Button>Primary</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Link href="/components" className="text-blue-500 hover:text-blue-400">
                  View All <ArrowRight className="inline-block ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-3xl"
        aria-hidden="true"
      />
    </section>
  )
}
