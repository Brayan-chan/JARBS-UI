"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterEffectProps {
  words: Array<{
    text: string
    className?: string
  }>
  className?: string
  cursorClassName?: string
}

export function TypewriterEffect({ words, className, cursorClassName }: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    const fullText = word.text

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1))
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 1000)
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1))
          if (currentText === "") {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <div className={cn("text-center", className)}>
      <span className={words[currentWordIndex]?.className}>{currentText}</span>
      <span className={cn("animate-pulse", cursorClassName)}>|</span>
    </div>
  )
}
