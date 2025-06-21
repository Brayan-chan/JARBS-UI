"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, ShoppingCart, Star, Eye, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    category: string
    isNew?: boolean
    isSale?: boolean
    discount?: number
  }
  variant?: "default" | "compact" | "detailed"
  className?: string
  onAddToCart?: (productId: string) => void
  onToggleFavorite?: (productId: string) => void
  onQuickView?: (productId: string) => void
}

export function ProductCard({
  product,
  variant = "default",
  className,
  onAddToCart,
  onToggleFavorite,
  onQuickView,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    const actions = actionsRef.current

    if (!card || !image || !actions) return

    const tl = gsap.timeline({ paused: true })

    tl.to(card, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out",
    })
      .to(
        image,
        {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        },
        0,
      )
      .to(
        actions,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        0.1,
      )

    const handleMouseEnter = () => {
      setIsHovered(true)
      tl.play()
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      tl.reverse()
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    onToggleFavorite?.(product.id)

    // Heart animation
    gsap.to(`.heart-${product.id}`, {
      scale: 1.3,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={cn("w-3 h-3", i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
    ))
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300",
        variant === "compact" && "max-w-xs",
        variant === "detailed" && "max-w-md",
        className,
      )}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
        {product.isSale && product.discount && <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 z-10 p-2 bg-black/20 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-black/40"
      >
        <Heart
          className={cn(
            `heart-${product.id} w-4 h-4 transition-colors duration-200`,
            isFavorite ? "fill-red-500 text-red-500" : "text-white",
          )}
        />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-xl">
        <img
          ref={imageRef}
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />

        {/* Quick Actions */}
        <div
          ref={actionsRef}
          className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 translate-y-4 transition-all duration-200"
        >
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onQuickView?.(product.id)}
              className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
            <Button size="sm" variant="ghost" className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs text-gray-400 uppercase tracking-wide">{product.category}</div>

        {/* Title */}
        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart?.(product.id)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 transition-all duration-200"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
