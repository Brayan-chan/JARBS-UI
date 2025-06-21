"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ValidationRule {
  test: (value: string) => boolean
  message: string
}

interface ValidatedInputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  rules?: ValidationRule[]
  showValidation?: boolean
  className?: string
}

export function ValidatedInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rules = [],
  showValidation = true,
  className,
}: ValidatedInputProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const validationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value && rules.length > 0) {
      const newErrors: string[] = []
      let valid = true

      rules.forEach((rule) => {
        if (!rule.test(value)) {
          newErrors.push(rule.message)
          valid = false
        }
      })

      setErrors(newErrors)
      setIsValid(valid)

      // Animate validation feedback
      if (validationRef.current) {
        gsap.fromTo(
          validationRef.current.children,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 },
        )
      }
    } else {
      setIsValid(null)
      setErrors([])
    }
  }, [value, rules])

  const handleFocus = () => {
    setIsFocused(true)
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password"
    }
    return type
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-white font-medium">{label}</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          type={getInputType()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "bg-white/5 border-white/20 text-white placeholder-gray-400 transition-all duration-300",
            isFocused && "border-white/40 shadow-lg",
            isValid === true && "border-green-400/50",
            isValid === false && "border-red-400/50",
            type === "password" && "pr-12",
          )}
        />

        {/* Password toggle */}
        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        )}

        {/* Validation icon */}
        {showValidation && isValid !== null && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
          </div>
        )}
      </div>

      {/* Validation messages */}
      {showValidation && errors.length > 0 && (
        <div ref={validationRef} className="space-y-1">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center text-red-400 text-sm">
              <AlertCircle className="w-3 h-3 mr-1" />
              {error}
            </div>
          ))}
        </div>
      )}

      {/* Success message */}
      {showValidation && isValid === true && (
        <div className="flex items-center text-green-400 text-sm">
          <CheckCircle className="w-3 h-3 mr-1" />
          Looks good!
        </div>
      )}
    </div>
  )
}
