"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface Step {
  id: string
  title: string
  description?: string
  content: React.ReactNode
  optional?: boolean
}

interface AnimatedStepperProps {
  steps: Step[]
  currentStep?: number
  variant?: "default" | "dots" | "progress" | "minimal"
  orientation?: "horizontal" | "vertical"
  showNavigation?: boolean
  allowSkip?: boolean
  className?: string
  onStepChange?: (step: number) => void
  onComplete?: () => void
}

export function AnimatedStepper({
  steps,
  currentStep = 0,
  variant = "default",
  orientation = "horizontal",
  showNavigation = true,
  allowSkip = false,
  className,
  onStepChange,
  onComplete,
}: AnimatedStepperProps) {
  const [activeStep, setActiveStep] = useState(currentStep)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const contentRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  const goToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return
    if (!allowSkip && stepIndex > activeStep + 1) return

    setActiveStep(stepIndex)
    onStepChange?.(stepIndex)
    animateContent()
  }

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, activeStep]))
      goToStep(activeStep + 1)
    } else {
      setCompletedSteps((prev) => new Set([...prev, activeStep]))
      onComplete?.()
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      goToStep(activeStep - 1)
    }
  }

  const animateContent = () => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" })
    }
  }

  useEffect(() => {
    animateContent()
  }, [activeStep])

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.has(stepIndex)) return "completed"
    if (stepIndex === activeStep) return "active"
    if (stepIndex < activeStep) return "completed"
    return "pending"
  }

  const renderStepIndicator = (step: Step, index: number) => {
    const status = getStepStatus(index)
    const isClickable = allowSkip || index <= activeStep + 1

    const baseClasses = cn(
      "flex items-center justify-center transition-all duration-300",
      isClickable && "cursor-pointer",
    )

    switch (variant) {
      case "dots":
        return (
          <div
            onClick={() => isClickable && goToStep(index)}
            className={cn(
              baseClasses,
              "w-3 h-3 rounded-full",
              status === "completed" && "bg-green-500",
              status === "active" && "bg-blue-500 ring-4 ring-blue-500/30",
              status === "pending" && "bg-gray-600",
            )}
          />
        )
      case "progress":
        return null // Progress bar handles this
      case "minimal":
        return (
          <div
            onClick={() => isClickable && goToStep(index)}
            className={cn(
              baseClasses,
              "w-8 h-8 rounded-full border-2 text-sm font-medium",
              status === "completed" && "bg-green-500 border-green-500 text-white",
              status === "active" && "border-blue-500 text-blue-500 bg-blue-500/10",
              status === "pending" && "border-gray-600 text-gray-400",
            )}
          >
            {status === "completed" ? <Check className="w-4 h-4" /> : index + 1}
          </div>
        )
      default:
        return (
          <div
            onClick={() => isClickable && goToStep(index)}
            className={cn(
              baseClasses,
              "w-10 h-10 rounded-full border-2 font-semibold",
              status === "completed" && "bg-green-500 border-green-500 text-white",
              status === "active" && "border-blue-500 text-blue-500 bg-blue-500/10",
              status === "pending" && "border-gray-600 text-gray-400",
            )}
          >
            {status === "completed" ? <Check className="w-5 h-5" /> : index + 1}
          </div>
        )
    }
  }

  const renderConnector = (index: number) => {
    if (index === steps.length - 1) return null

    const isCompleted = completedSteps.has(index) || index < activeStep

    if (variant === "dots") {
      return (
        <div
          className={cn(
            "flex-1 h-0.5 mx-2 transition-colors duration-300",
            isCompleted ? "bg-green-500" : "bg-gray-600",
          )}
        />
      )
    }

    if (orientation === "horizontal") {
      return (
        <div
          className={cn(
            "flex-1 h-0.5 mx-4 transition-colors duration-300",
            isCompleted ? "bg-green-500" : "bg-gray-600",
          )}
        />
      )
    } else {
      return (
        <div
          className={cn(
            "w-0.5 h-8 mx-auto my-2 transition-colors duration-300",
            isCompleted ? "bg-green-500" : "bg-gray-600",
          )}
        />
      )
    }
  }

  const renderProgressBar = () => {
    if (variant !== "progress") return null

    const progress = ((activeStep + 1) / steps.length) * 100

    return (
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Steps Header */}
      <div
        ref={stepsRef}
        className={cn(
          "flex mb-8",
          orientation === "vertical" ? "flex-col" : "items-center",
          variant === "progress" && "justify-center",
        )}
      >
        {variant === "progress" ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-1">{steps[activeStep].title}</h3>
            {steps[activeStep].description && <p className="text-gray-400 text-sm">{steps[activeStep].description}</p>}
            <div className="mt-2 text-xs text-gray-500">
              Step {activeStep + 1} of {steps.length}
            </div>
          </div>
        ) : (
          steps.map((step, index) => (
            <div
              key={step.id}
              className={cn("flex items-center", orientation === "vertical" && "flex-col text-center")}
            >
              <div className={cn("flex items-center", orientation === "vertical" && "flex-col")}>
                {renderStepIndicator(step, index)}
                {variant !== "dots" && (
                  <div className={cn("ml-3", orientation === "vertical" && "ml-0 mt-2")}>
                    <div
                      className={cn(
                        "font-medium transition-colors duration-200",
                        getStepStatus(index) === "active" && "text-white",
                        getStepStatus(index) === "completed" && "text-green-400",
                        getStepStatus(index) === "pending" && "text-gray-400",
                      )}
                    >
                      {step.title}
                      {step.optional && <span className="ml-1 text-xs text-gray-500">(Optional)</span>}
                    </div>
                    {step.description && <div className="text-sm text-gray-400 mt-1">{step.description}</div>}
                  </div>
                )}
              </div>
              {renderConnector(index)}
            </div>
          ))
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} className="mb-8">
        {steps[activeStep]?.content}
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={activeStep === 0} className="border-white/20">
            Previous
          </Button>
          <div className="flex gap-2">
            {steps[activeStep]?.optional && (
              <Button variant="ghost" onClick={nextStep} className="text-gray-400">
                Skip
              </Button>
            )}
            <Button onClick={nextStep}>
              {activeStep === steps.length - 1 ? "Complete" : "Next"}
              {activeStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
