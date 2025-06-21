"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  variant?: "default" | "blur" | "slide" | "scale" | "fade"
  className?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  focusTrap?: boolean
}

export function AnimatedModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  variant = "default",
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  focusTrap = true,
}: AnimatedModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"

      // Animation entrance
      const overlay = overlayRef.current
      const modal = modalRef.current

      if (overlay && modal) {
        gsap.set(overlay, { opacity: 0 })
        gsap.set(modal, getInitialModalState(variant))

        const tl = gsap.timeline()

        tl.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }).to(modal, getAnimationProps(variant), "-=0.1")
      }
    } else if (isVisible) {
      // Animation exit
      const overlay = overlayRef.current
      const modal = modalRef.current

      if (overlay && modal) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsVisible(false)
            document.body.style.overflow = ""
          },
        })

        tl.to(modal, getExitAnimationProps(variant)).to(
          overlay,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.1",
        )
      }
    }
  }, [isOpen, isVisible, variant])

  // Focus trap
  useEffect(() => {
    if (!focusTrap || !isVisible) return

    const modal = modalRef.current
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleTabKey)
    document.addEventListener("keydown", handleEscapeKey)
    firstElement?.focus()

    return () => {
      document.removeEventListener("keydown", handleTabKey)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isVisible, focusTrap, onClose])

  const getInitialModalState = (variant: string) => {
    switch (variant) {
      case "slide":
        return { y: "100%", opacity: 1 }
      case "scale":
        return { scale: 0.8, opacity: 0 }
      case "fade":
        return { opacity: 0 }
      case "blur":
        return { scale: 0.95, opacity: 0, filter: "blur(10px)" }
      default:
        return { scale: 0.95, opacity: 0 }
    }
  }

  const getAnimationProps = (variant: string) => {
    const baseProps = { duration: 0.3, ease: "power2.out" }

    switch (variant) {
      case "slide":
        return { ...baseProps, y: "0%" }
      case "scale":
        return { ...baseProps, scale: 1, opacity: 1 }
      case "fade":
        return { ...baseProps, opacity: 1 }
      case "blur":
        return { ...baseProps, scale: 1, opacity: 1, filter: "blur(0px)" }
      default:
        return { ...baseProps, scale: 1, opacity: 1 }
    }
  }

  const getExitAnimationProps = (variant: string) => {
    const baseProps = { duration: 0.2, ease: "power2.in" }

    switch (variant) {
      case "slide":
        return { ...baseProps, y: "100%" }
      case "scale":
        return { ...baseProps, scale: 0.8, opacity: 0 }
      case "fade":
        return { ...baseProps, opacity: 0 }
      case "blur":
        return { ...baseProps, scale: 0.95, opacity: 0, filter: "blur(10px)" }
      default:
        return { ...baseProps, scale: 0.95, opacity: 0 }
    }
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "max-w-sm"
      case "md":
        return "max-w-md"
      case "lg":
        return "max-w-lg"
      case "xl":
        return "max-w-xl"
      case "full":
        return "max-w-full mx-4"
      default:
        return "max-w-md"
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={cn("absolute inset-0", variant === "blur" ? "backdrop-blur-md bg-black/50" : "bg-black/50")}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          "relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl",
          "max-h-[90vh] overflow-hidden flex flex-col",
          getSizeClasses(size),
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              {title && (
                <h2 id="modal-title" className="text-xl font-semibold text-white">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="text-sm text-gray-300 mt-1">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  )
}
