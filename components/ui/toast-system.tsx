"use client"

import type React from "react"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Toast {
  id: string
  variant?: "success" | "error" | "info" | "warning"
  title?: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

const toastVariants = {
  success: {
    bg: "bg-green-500/90 border-green-400/50",
    text: "text-white",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-red-500/90 border-red-400/50",
    text: "text-white",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-blue-500/90 border-blue-400/50",
    text: "text-white",
    icon: Info,
  },
  warning: {
    bg: "bg-yellow-500/90 border-yellow-400/50",
    text: "text-black",
    icon: AlertTriangle,
  },
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const toastRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const config = toastVariants[toast.variant || "info"]
  const IconComponent = config.icon

  useEffect(() => {
    const toastEl = toastRef.current
    const progressEl = progressRef.current
    if (!toastEl || !progressEl) return

    // Entry animation
    gsap.fromTo(
      toastEl,
      {
        opacity: 0,
        x: 300,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
    )

    // Progress bar animation
    const duration = toast.duration || 5000
    gsap.fromTo(
      progressEl,
      {
        scaleX: 1,
      },
      {
        scaleX: 0,
        duration: duration / 1000,
        ease: "none",
        onComplete: () => onRemove(toast.id),
      },
    )

    // Auto-remove after duration
    const timer = setTimeout(() => {
      handleRemove()
    }, duration)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  const handleRemove = () => {
    const toastEl = toastRef.current
    if (!toastEl) return

    gsap.to(toastEl, {
      opacity: 0,
      x: 300,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => onRemove(toast.id),
    })
  }

  return (
    <div
      ref={toastRef}
      className={cn("relative border rounded-lg p-4 backdrop-blur-sm shadow-lg max-w-sm w-full", config.bg)}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20 rounded-b-lg overflow-hidden">
        <div ref={progressRef} className="h-full bg-white/50 origin-left" />
      </div>

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn("flex-shrink-0 mt-0.5", config.text)}>
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast.title && <h4 className={cn("font-semibold mb-1", config.text)}>{toast.title}</h4>}
          {toast.description && <p className={cn("text-sm opacity-90", config.text)}>{toast.description}</p>}
          {toast.action && (
            <Button variant="ghost" size="sm" className={cn("mt-2 h-8", config.text)} onClick={toast.action.onClick}>
              {toast.action.label}
            </Button>
          )}
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn("flex-shrink-0 h-6 w-6 opacity-70 hover:opacity-100", config.text)}
          onClick={handleRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
