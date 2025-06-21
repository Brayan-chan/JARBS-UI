"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, X, Zap, ChevronDown, Github, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { RippleButton } from "@/components/ui/ripple-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    {
      name: "Components",
      href: "/components",
      submenu: [
        { name: "All Components", href: "/components" },
        { name: "Buttons", href: "/components/buttons" },
        { name: "Cards", href: "/components/cards" },
        { name: "Forms", href: "/components/forms" },
        { name: "Navigation", href: "/components/navigation" },
      ],
    },
    {
      name: "Structure",
      href: "/structure",
      badge: "New",
      submenu: [
        { name: "Navbar", href: "/structure#navbar" },
        { name: "Sidebar", href: "/structure#sidebar" },
        { name: "Header", href: "/structure#header" },
        { name: "Hero", href: "/structure#hero" },
        { name: "Footer", href: "/structure#footer" },
      ],
    },
    {
      name: "Templates",
      href: "/templates",
      badge: "Pro",
      submenu: [
        { name: "Landing Pages", href: "/templates/landing" },
        { name: "Dashboards", href: "/templates/dashboards" },
        { name: "E-commerce", href: "/templates/ecommerce" },
      ],
    },
    { name: "Playground", href: "/playground" },
    { name: "Docs", href: "/docs" },
    { name: "Showcase", href: "/showcase" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                JARBS-UI
              </span>
              <span className="text-xs text-gray-400 -mt-1">v2.0</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors group"
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20 ml-2">
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black/90 backdrop-blur-xl border-white/10 mt-2">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link href={subItem.href} className="text-gray-300 hover:text-white">
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors relative group"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                        {item.badge}
                      </Badge>
                    )}
                    <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-300 transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2 bg-white/5 rounded-xl px-4 py-3 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Components"
                className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-40"
              />
              <kbd className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">⌘K</kbd>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-2">
              <MagneticButton>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Github className="w-5 h-5" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Button>
              </MagneticButton>
            </div>

            {/* Get Started Button */}
            <MagneticButton>
              <RippleButton className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-3 rounded-xl shadow-lg">
                Get Started
              </RippleButton>
            </MagneticButton>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-6 bg-black/90 backdrop-blur-xl">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-gray-400 hover:text-white transition-colors py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </nav>
  )
}
