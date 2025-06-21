"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  trending?: boolean
}

interface SearchAutocompleteProps {
  placeholder?: string
  data?: SearchResult[]
  onSearch?: (query: string) => void
  onSelect?: (result: SearchResult) => void
  className?: string
}

// Move this outside the component
const mockData: SearchResult[] = [
  {
    id: "1",
    title: "Animated Button",
    description: "Interactive button with hover effects",
    category: "Buttons",
    trending: true,
  },
  { id: "2", title: "Search Autocomplete", description: "Advanced search with suggestions", category: "Search" },
  { id: "3", title: "Data Table", description: "Sortable table with filters", category: "Tables" },
  { id: "4", title: "Modal Dialog", description: "Responsive modal component", category: "Overlays" },
  { id: "5", title: "Form Validation", description: "Real-time form validation", category: "Forms", trending: true },
  { id: "6", title: "Navigation Menu", description: "Multi-level navigation", category: "Navigation" },
  { id: "7", title: "Card Component", description: "Flexible card layout", category: "Layout" },
  { id: "8", title: "Progress Bar", description: "Animated progress indicator", category: "Feedback" },
]

export function SearchAutocomplete({
  placeholder = "Search components...",
  data = [],
  onSearch,
  onSelect,
  className,
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const searchData = data.length > 0 ? data : mockData

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
    setSelectedIndex(-1)
  }, [query]) // Remove searchData from dependencies to prevent infinite loop

  useEffect(() => {
    if (isOpen && resultsRef.current) {
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" },
      )
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        } else if (query) {
          handleSearch()
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSelect = (result: SearchResult) => {
    setQuery(result.title)
    setIsOpen(false)
    setSelectedIndex(-1)

    // Add to recent searches
    setRecentSearches((prev) => {
      const updated = [result.title, ...prev.filter((item) => item !== result.title)].slice(0, 5)
      return updated
    })

    onSelect?.(result)
  }

  const handleSearch = () => {
    if (query.trim()) {
      setRecentSearches((prev) => {
        const updated = [query, ...prev.filter((item) => item !== query)].slice(0, 5)
        return updated
      })
      onSearch?.(query)
      setIsOpen(false)
    }
  }

  const clearQuery = () => {
    setQuery("")
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const handleRecentSearch = (search: string) => {
    setQuery(search)
    onSearch?.(search)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/40"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearQuery}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
        >
          {results.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-gray-400 px-3 py-2 font-medium">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </div>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-all duration-200 group",
                    selectedIndex === index
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{result.title}</span>
                        {result.trending && (
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{result.description}</div>
                    </div>
                    <Badge variant="outline" className="border-white/20 text-xs">
                      {result.category}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-6 text-center">
              <div className="text-gray-400 mb-2">No results found for "{query}"</div>
              <Button size="sm" onClick={handleSearch} className="bg-white text-black hover:bg-gray-200">
                Search anyway
              </Button>
            </div>
          ) : (
            recentSearches.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-400 px-3 py-2 font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Recent searches
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(search)}
                    className="w-full text-left p-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
