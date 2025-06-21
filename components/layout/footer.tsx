import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Zap } from "lucide-react"

export function Footer() {
  const links = {
    product: [
      { name: "Components", href: "/components" },
      { name: "Templates", href: "/templates" },
      { name: "Playground", href: "/playground" },
      { name: "Docs", href: "/docs" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Examples", href: "/examples" },
      { name: "Blog", href: "/blog" },
      { name: "Support", href: "/support" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Contact", href: "/contact" },
    ],
  }

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">JARBS-UI</span>
            </div>
            <p className="text-gray-400 text-sm">
              The most advanced component library with mind-blowing animations and incredible interactions that will
              make your users say WOW.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 JARBS-UI. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">Built with ❤️ using Next.js, GSAP, and pure magic ✨</p>
        </div>
      </div>
    </footer>
  )
}
