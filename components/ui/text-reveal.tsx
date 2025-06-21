"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className }: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const letters = element.querySelectorAll(".letter")

    gsap.fromTo(
      letters,
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        repeat: -1,
        repeatDelay: 2,
      },
    )
  }, [])

  return (
    <div ref={textRef} className={`text-4xl font-bold text-white ${className}`}>
      {text.split("").map((letter, index) => (
        <span key={index} className="letter inline-block">
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  )
}
