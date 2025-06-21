"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, Mail, Phone, Calendar, MoreHorizontal, MessageCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface UserCardProps {
  user: {
    id: string
    name: string
    username: string
    avatar: string
    role: string
    location: string
    email: string
    phone?: string
    joinDate: string
    isOnline: boolean
    followers: number
    following: number
    posts: number
  }
  variant?: "default" | "compact" | "detailed"
  className?: string
  onMessage?: (userId: string) => void
  onFollow?: (userId: string) => void
}

export function UserCard({ user, variant = "default", className, onMessage, onFollow }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const avatar = avatarRef.current

    if (!card || !avatar) return

    const tl = gsap.timeline({ paused: true })

    tl.to(card, {
      y: -5,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out",
    }).to(
      avatar,
      {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      },
      0,
    )

    const handleMouseEnter = () => tl.play()
    const handleMouseLeave = () => tl.reverse()

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    onFollow?.(user.id)
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300",
        variant === "compact" && "max-w-xs p-4",
        variant === "detailed" && "max-w-md",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div ref={avatarRef} className="relative">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">{user.name}</h3>
            <p className="text-sm text-gray-400">@{user.username}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Role Badge */}
      <Badge variant="secondary" className="mb-3">
        {user.role}
      </Badge>

      {/* Info */}
      <div className="space-y-2 mb-4 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{user.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Joined {user.joinDate}</span>
        </div>
      </div>

      {/* Stats */}
      {variant !== "compact" && (
        <div className="flex justify-between py-3 border-t border-white/10 mb-4">
          <div className="text-center">
            <div className="font-semibold text-white">{user.posts}</div>
            <div className="text-xs text-gray-400">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-white">{user.followers}</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-white">{user.following}</div>
            <div className="text-xs text-gray-400">Following</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleFollow}
          variant={isFollowing ? "outline" : "default"}
          className="flex-1"
          size={variant === "compact" ? "sm" : "default"}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button onClick={() => onMessage?.(user.id)} variant="outline" size={variant === "compact" ? "sm" : "default"}>
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
