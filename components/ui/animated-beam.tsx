"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function AnimatedBeam() {
  const beamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const beam = beamRef.current
    if (!beam) return

    gsap.fromTo(
      beam,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
      },
    )
  }, [])

  return (
    <div className="relative w-full h-20 flex items-center justify-center">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full" />
      </div>
      <div
        ref={beamRef}
        className="absolute left-1/2 top-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-y-1/2 origin-left"
      />
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center ml-32">
        <div className="w-8 h-8 bg-white rounded-full" />
      </div>
    </div>
  )
}
