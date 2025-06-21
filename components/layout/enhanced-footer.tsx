"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Youtube, Mail, Zap, ArrowRight, Heart, Coffee, Star } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { RippleButton } from "@/components/ui/ripple-button"

gsap.registerPlugin(ScrollTrigger)

export function EnhancedFooter() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer sections on scroll
      gsap.fromTo(
        ".footer-section",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      )

      // Floating animation for social icons
      gsap.to(".social-icon", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const footerLinks = {
    product: [
      { name: "Components", href: "/components" },
      { name: "Templates", href: "/templates" },
      { name: "Playground", href: "/playground" },
      { name: "Pricing", href: "/pricing" },
      { name: "Changelog", href: "/changelog" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Examples", href: "/examples" },
      { name: "Blog", href: "/blog" },
      { name: "Community", href: "/community" },
      { name: "Support", href: "/support" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  }

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com", color: "hover:text-gray-300" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-500" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "hover:text-red-500" },
  ]

  return (
    <footer ref={footerRef} className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="footer-section text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Updated with JARBS-UI</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Get the latest components, templates, and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border-white/20 text-white placeholder-gray-400 flex-1"
              />
              <MagneticButton>
                <RippleButton className="bg-white text-black hover:bg-gray-200 px-6">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </RippleButton>
              </MagneticButton>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-16" />

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 footer-section">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">JARBS-UI</h2>
                <p className="text-xs text-gray-400">v2.0</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The most advanced component library with mind-blowing animations and incredible interactions. Built for
              developers who want to create extraordinary user experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <MagneticButton key={social.name}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`social-icon text-gray-400 ${social.color} transition-colors`}
                    asChild
                  >
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-5 h-5" />
                    </Link>
                  </Button>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-section">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="footer-section flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© 2024 JARBS-UI. All rights reserved.</p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and</span>
              <Coffee className="w-4 h-4 text-yellow-600" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Star us on GitHub</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
