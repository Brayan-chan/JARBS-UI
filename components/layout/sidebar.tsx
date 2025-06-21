"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Layers,
  Palette,
  Zap,
  Settings,
  BookOpen,
  Play,
  Star,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MagneticButton } from "@/components/ui/magnetic-button"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("home")

  const menuItems = [
    {
      id: "home",
      title: "Home",
      icon: Home,
      href: "/",
      badge: null,
    },
    {
      id: "components",
      title: "Components",
      icon: Layers,
      href: "/components",
      badge: "50+",
      submenu: [
        { title: "Buttons", href: "/components/buttons" },
        { title: "Cards", href: "/components/cards" },
        { title: "Forms", href: "/components/forms" },
        { title: "Navigation", href: "/components/navigation" },
        { title: "Feedback", href: "/components/feedback" },
      ],
    },
    {
      id: "templates",
      title: "Templates",
      icon: Palette,
      href: "/templates",
      badge: "New",
    },
    {
      id: "playground",
      title: "Playground",
      icon: Play,
      href: "/playground",
      badge: null,
    },
    {
      id: "docs",
      title: "Documentation",
      icon: BookOpen,
      href: "/docs",
      badge: null,
    },
    {
      id: "showcase",
      title: "Showcase",
      icon: Star,
      href: "/showcase",
      badge: null,
    },
  ]

  const bottomItems = [
    {
      id: "favorites",
      title: "Favorites",
      icon: Heart,
      href: "/favorites",
      badge: "3",
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      href: "/settings",
      badge: null,
    },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-black/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300",
        isCollapsed ? "w-20" : "w-80",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">JARBS-UI</h2>
              <p className="text-xs text-gray-400">Component Library</p>
            </div>
          </div>
        )}

        <MagneticButton>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </MagneticButton>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <Link
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                  activeItem === item.id
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                )}
              >
                {/* Background glow effect */}
                {activeItem === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl" />
                )}

                <item.icon className={cn("w-5 h-5 relative z-10", isCollapsed && "mx-auto")} />

                {!isCollapsed && (
                  <>
                    <span className="font-medium relative z-10">{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs bg-white/10 text-white border-white/20 relative z-10"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>

              {/* Submenu */}
              {item.submenu && !isCollapsed && activeItem === item.id && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Separator className="my-6 bg-white/10" />

        {/* Bottom Items */}
        <nav className="space-y-2">
          {bottomItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <item.icon className={cn("w-5 h-5", isCollapsed && "mx-auto")} />
              {!isCollapsed && (
                <>
                  <span className="font-medium">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs bg-white/10 text-white border-white/20">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-6 border-t border-white/10">
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">Upgrade to Pro</h3>
            <p className="text-xs text-gray-400 mb-3">Get access to premium components and templates</p>
            <Button size="sm" className="w-full bg-white text-black hover:bg-gray-200">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
