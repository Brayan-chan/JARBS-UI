"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  variant?: "contact" | "login" | "register"
  onSubmit?: (data: any) => void
  className?: string
}

export function ContactForm({ variant = "contact", onSubmit, className }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      )
    }
  }, [])

  useEffect(() => {
    if (isSuccess && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
      )
    }
  }, [isSuccess])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (variant !== "login" && !formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (variant === "register" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (variant === "contact" && !formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Animate error fields
      Object.keys(errors).forEach((field) => {
        const element = document.getElementById(field)
        if (element) {
          gsap.to(element, {
            x: [-10, 10, -10, 10, 0],
            duration: 0.5,
            ease: "power2.inOut",
          })
        }
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)
    onSubmit?.(formData)

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        message: "",
      })
    }, 3000)
  }

  const getTitle = () => {
    switch (variant) {
      case "login":
        return "Welcome Back"
      case "register":
        return "Create Account"
      default:
        return "Get In Touch"
    }
  }

  const getDescription = () => {
    switch (variant) {
      case "login":
        return "Sign in to your account"
      case "register":
        return "Join our community today"
      default:
        return "We'd love to hear from you"
    }
  }

  if (isSuccess) {
    return (
      <Card className={cn("bg-white/5 border-white/10 backdrop-blur-sm", className)}>
        <CardContent className="p-8">
          <div ref={successRef} className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
            <p className="text-gray-300">
              {variant === "contact" && "Your message has been sent successfully."}
              {variant === "login" && "Welcome back! You're now signed in."}
              {variant === "register" && "Account created successfully!"}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("bg-white/5 border-white/10 backdrop-blur-sm", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">{getTitle()}</CardTitle>
        <CardDescription className="text-gray-300">{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {variant !== "login" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white flex items-center">
                <User className="w-4 h-4 mr-2" />
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="flex items-center text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="flex items-center text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="flex items-center text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {variant === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <div className="flex items-center text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          )}

          {variant === "contact" && (
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                placeholder="Enter your message"
              />
              {errors.message && (
                <div className="flex items-center text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.message}
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                {variant === "login" ? "Sign In" : variant === "register" ? "Create Account" : "Send Message"}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
