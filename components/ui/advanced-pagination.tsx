"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface AdvancedPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
  showItemsPerPage?: boolean
  showTotalItems?: boolean
  showFirstLast?: boolean
  maxVisiblePages?: number
  className?: string
}

export function AdvancedPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showTotalItems = true,
  showFirstLast = true,
  maxVisiblePages = 7,
  className,
}: AdvancedPaginationProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const paginationRef = useRef<HTMLDivElement>(null)

  const itemsPerPageOptions = [10, 20, 50, 100]

  useEffect(() => {
    if (paginationRef.current) {
      gsap.fromTo(
        paginationRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
      )
    }
  }, [currentPage])

  const handlePageChange = (page: number) => {
    if (page === currentPage || isAnimating || page < 1 || page > totalPages) return

    setIsAnimating(true)

    // Animate page change
    if (paginationRef.current) {
      gsap.to(paginationRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setIsAnimating(false)
        },
      })
    }

    onPageChange(page)
  }

  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)

    // Adjust if we're near the beginning or end
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages)
    }
    if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1)
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push("...")
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...")
      }
      pages.push(totalPages)
    }

    return pages
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4", className)}>
      {/* Items info */}
      {showTotalItems && (
        <div className="text-sm text-gray-400">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>
      )}

      {/* Pagination controls */}
      <div ref={paginationRef} className="flex items-center space-x-2">
        {/* First page */}
        {showFirstLast && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || isAnimating}
            className="text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
        )}

        {/* Previous page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isAnimating}
          className="text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page numbers */}
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <div className="flex items-center justify-center w-10 h-10">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "ghost"}
                size="icon"
                onClick={() => handlePageChange(page as number)}
                disabled={isAnimating}
                className={cn(
                  "w-10 h-10",
                  currentPage === page
                    ? "bg-white text-black hover:bg-gray-200"
                    : "text-gray-400 hover:text-white hover:bg-white/10",
                )}
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        {/* Next page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isAnimating}
          className="text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Last page */}
        {showFirstLast && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || isAnimating}
            className="text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Items per page */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number.parseInt(value))}
          >
            <SelectTrigger className="w-20 bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()} className="text-white hover:bg-white/10">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-400">per page</span>
        </div>
      )}
    </div>
  )
}
