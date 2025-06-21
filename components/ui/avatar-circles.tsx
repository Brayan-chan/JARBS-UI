"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarCirclesProps {
  avatars: Array<{
    src: string
    name: string
  }>
}

export function AvatarCircles({ avatars }: AvatarCirclesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar-item",
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1,
        },
      )

      // Hover animations
      const avatars = containerRef.current?.querySelectorAll(".avatar-item")
      avatars?.forEach((avatar) => {
        avatar.addEventListener("mouseenter", () => {
          gsap.to(avatar, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        avatar.addEventListener("mouseleave", () => {
          gsap.to(avatar, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex justify-center items-center space-x-2">
      {avatars.map((avatar, index) => (
        <Avatar
          key={index}
          className="avatar-item w-12 h-12 border-2 border-white/20 cursor-pointer"
          style={{ zIndex: avatars.length - index }}
        >
          <AvatarImage src={avatar.src || "/placeholder.svg"} alt={avatar.name} />
          <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}
