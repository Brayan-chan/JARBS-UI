"use client"

import React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface WavyBackgroundProps {
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
}

export function WavyBackground({
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) {
  const noise = useRef<SVGFETurbulenceElement>(null)
  const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]

  let w: number, h: number, nt: number, i: number, x: number, ctx: any, canvas: any

  const getSpeed = () => {
    return speed === "fast" ? 0.002 : 0.001
  }

  const init = () => {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    w = ctx.canvas.width = window.innerWidth
    h = ctx.canvas.height = window.innerHeight
    ctx.filter = `blur(${blur}px)`
    nt = 0
    window.onresize = () => {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }
    render()
  }

  const waveColors_1 = waveColors
  const drawWave = (n: number) => {
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 50
      ctx.strokeStyle = waveColors_1[i % waveColors_1.length]
      for (x = 0; x < w; x += 5) {
        var y = noise.current
          ? noise.current.baseFrequency.baseVal * Math.sin((x / w) * 2 * Math.PI + nt) * h * 0.1 + h * 0.5
          : 0
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.closePath()
    }
  }

  let animationId: number
  const render = () => {
    ctx.fillStyle = backgroundFill || "black"
    ctx.globalAlpha = waveOpacity || 0.5
    ctx.fillRect(0, 0, w, h)
    drawWave(5)
    animationId = requestAnimationFrame(render)
  }

  useEffect(() => {
    init()
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const [isSafari, setIsSafari] = React.useState(false)
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    )
  }, [])

  return (
    <div className={cn("h-screen flex flex-col items-center justify-center", containerClassName)}>
      <canvas className="absolute inset-0 z-0" id="canvas" style={{ filter: `blur(${blur}px)` }}></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {/* Content goes here */}
      </div>
    </div>
  )
}
