"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface ChartData {
  label: string
  value: number
  color?: string
}

interface AnimatedChartProps {
  data: ChartData[]
  type?: "bar" | "line" | "pie" | "donut" | "area"
  width?: number
  height?: number
  animated?: boolean
  showLabels?: boolean
  showValues?: boolean
  showGrid?: boolean
  className?: string
}

export function AnimatedChart({
  data,
  type = "bar",
  width = 400,
  height = 300,
  animated = true,
  showLabels = true,
  showValues = true,
  showGrid = true,
  className,
}: AnimatedChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6", // purple
    "#06B6D4", // cyan
    "#F97316", // orange
    "#84CC16", // lime
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isVisible || !animated) return

    const svg = svgRef.current
    if (!svg) return

    // Animate chart elements
    const elements = svg.querySelectorAll(".chart-element")
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        scale: 0,
        y: type === "bar" ? 50 : 0,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
    )
  }, [isVisible, animated, type])

  const maxValue = Math.max(...data.map((d) => d.value))
  const padding = 40

  const renderBarChart = () => {
    const barWidth = (width - padding * 2) / data.length - 10
    const chartHeight = height - padding * 2

    return (
      <>
        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line
                key={i}
                x1={padding}
                y1={padding + chartHeight * ratio}
                x2={width - padding}
                y2={padding + chartHeight * ratio}
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight
          const x = padding + index * (barWidth + 10)
          const y = height - padding - barHeight

          return (
            <g key={index}>
              <rect
                className="chart-element"
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color || colors[index % colors.length]}
                rx="4"
              />
              {showValues && (
                <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" className="text-xs fill-current">
                  {item.value}
                </text>
              )}
              {showLabels && (
                <text
                  x={x + barWidth / 2}
                  y={height - padding + 15}
                  textAnchor="middle"
                  className="text-xs fill-current"
                >
                  {item.label}
                </text>
              )}
            </g>
          )
        })}
      </>
    )
  }

  const renderLineChart = () => {
    const chartHeight = height - padding * 2
    const chartWidth = width - padding * 2
    const stepX = chartWidth / (data.length - 1)

    const points = data
      .map((item, index) => {
        const x = padding + index * stepX
        const y = height - padding - (item.value / maxValue) * chartHeight
        return `${x},${y}`
      })
      .join(" ")

    return (
      <>
        {/* Grid */}
        {showGrid && (
          <g className="opacity-20">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line
                key={i}
                x1={padding}
                y1={padding + chartHeight * ratio}
                x2={width - padding}
                y2={padding + chartHeight * ratio}
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Line */}
        <polyline
          className="chart-element"
          points={points}
          fill="none"
          stroke={colors[0]}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {data.map((item, index) => {
          const x = padding + index * stepX
          const y = height - padding - (item.value / maxValue) * chartHeight

          return (
            <g key={index}>
              <circle className="chart-element" cx={x} cy={y} r="4" fill={colors[0]} />
              {showValues && (
                <text x={x} y={y - 10} textAnchor="middle" className="text-xs fill-current">
                  {item.value}
                </text>
              )}
              {showLabels && (
                <text x={x} y={height - padding + 15} textAnchor="middle" className="text-xs fill-current">
                  {item.label}
                </text>
              )}
            </g>
          )
        })}
      </>
    )
  }

  const renderPieChart = () => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - padding
    const total = data.reduce((sum, item) => sum + item.value, 0)

    let currentAngle = -90 // Start from top

    return (
      <>
        {data.map((item, index) => {
          const percentage = item.value / total
          const angle = percentage * 360
          const startAngle = (currentAngle * Math.PI) / 180
          const endAngle = ((currentAngle + angle) * Math.PI) / 180

          const x1 = centerX + radius * Math.cos(startAngle)
          const y1 = centerY + radius * Math.sin(startAngle)
          const x2 = centerX + radius * Math.cos(endAngle)
          const y2 = centerY + radius * Math.sin(endAngle)

          const largeArcFlag = angle > 180 ? 1 : 0

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z",
          ].join(" ")

          currentAngle += angle

          return (
            <g key={index}>
              <path className="chart-element" d={pathData} fill={item.color || colors[index % colors.length]} />
              {showLabels && (
                <text
                  x={centerX + radius * 0.7 * Math.cos((startAngle + endAngle) / 2)}
                  y={centerY + radius * 0.7 * Math.sin((startAngle + endAngle) / 2)}
                  textAnchor="middle"
                  className="text-xs fill-white font-medium"
                >
                  {item.label}
                </text>
              )}
            </g>
          )
        })}
      </>
    )
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return renderLineChart()
      case "pie":
      case "donut":
        return renderPieChart()
      default:
        return renderBarChart()
    }
  }

  return (
    <div className={cn("bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4", className)}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="text-white overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
      >
        {renderChart()}
      </svg>
    </div>
  )
}
