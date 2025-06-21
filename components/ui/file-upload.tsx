"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { Upload, X, File, ImageIcon, Video, Music, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  preview?: string
}

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  maxFiles?: number
  onUpload?: (files: File[]) => void
  onRemove?: (fileId: string) => void
  className?: string
}

export function FileUpload({
  accept = "*/*",
  multiple = true,
  maxSize = 10,
  maxFiles = 5,
  onUpload,
  onRemove,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const getFileIcon = (file: File) => {
    const type = file.type.split("/")[0]
    switch (type) {
      case "image":
        return <ImageIcon className="w-8 h-8 text-blue-400" />
      case "video":
        return <Video className="w-8 h-8 text-purple-400" />
      case "audio":
        return <Music className="w-8 h-8 text-green-400" />
      default:
        if (file.type.includes("text") || file.type.includes("document")) {
          return <FileText className="w-8 h-8 text-yellow-400" />
        }
        return <File className="w-8 h-8 text-gray-400" />
    }
  }

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }
    return null
  }

  const createFilePreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      } else {
        resolve(undefined)
      }
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress: 100, status: "completed" } : f)))
      } else {
        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
      }
    }, 200)
  }

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      setError(null)
      const newFiles = Array.from(fileList)

      if (files.length + newFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`)
        return
      }

      const validFiles: UploadedFile[] = []

      for (const file of newFiles) {
        const error = validateFile(file)
        if (error) {
          setError(error)
          continue
        }

        const preview = await createFilePreview(file)
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          progress: 0,
          status: "uploading",
          preview,
        }

        validFiles.push(uploadedFile)
      }

      setFiles((prev) => [...prev, ...validFiles])

      // Start upload simulation
      validFiles.forEach((file) => {
        simulateUpload(file.id)
      })

      onUpload?.(validFiles.map((f) => f.file))
    },
    [files.length, maxFiles, maxSize, onUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      if (dropZoneRef.current) {
        gsap.to(dropZoneRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        })
      }

      const droppedFiles = e.dataTransfer.files
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles)
      }
    },
    [handleFiles],
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!isDragOver) {
        setIsDragOver(true)
        if (dropZoneRef.current) {
          gsap.to(dropZoneRef.current, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out",
          })
        }
      }
    },
    [isDragOver],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (dropZoneRef.current) {
      gsap.to(dropZoneRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }, [])

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
    onRemove?.(fileId)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
          isDragOver ? "border-white bg-white/10" : "border-white/30 hover:border-white/50 hover:bg-white/5",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Drop files here or click to browse</h3>
        <p className="text-gray-400 text-sm">
          Support for {accept === "*/*" ? "all file types" : accept}. Max {maxSize}MB per file, up to {maxFiles} files.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">{error}</div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Uploaded Files ({files.length})</h4>
          {files.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex items-center space-x-4">
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview || "/placeholder.svg"}
                      alt={uploadedFile.file.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    getFileIcon(uploadedFile.file)
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{uploadedFile.file.name}</p>
                  <p className="text-gray-400 text-sm">{formatFileSize(uploadedFile.file.size)}</p>

                  {/* Progress Bar */}
                  {uploadedFile.status === "uploading" && (
                    <div className="mt-2">
                      <Progress value={uploadedFile.progress} className="h-2" />
                      <p className="text-xs text-gray-400 mt-1">{Math.round(uploadedFile.progress)}% uploaded</p>
                    </div>
                  )}
                </div>

                {/* Status/Actions */}
                <div className="flex items-center space-x-2">
                  {uploadedFile.status === "completed" && <Check className="w-5 h-5 text-green-400" />}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(uploadedFile.id)}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
