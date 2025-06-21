"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface RangeFilter {
  min: number
  max: number
  step?: number
  unit?: string
}

interface AdvancedFiltersProps {
  categories?: FilterOption[]
  tags?: FilterOption[]
  complexity?: FilterOption[]
  priceRange?: RangeFilter
  sortOptions?: FilterOption[]
  onFiltersChange?: (filters: any) => void
  className?: string
}

export function AdvancedFilters({
  categories = [],
  tags = [],
  complexity = [],
  priceRange,
  sortOptions = [],
  onFiltersChange,
  className,
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedComplexity, setSelectedComplexity] = useState<string[]>([])
  const [priceValue, setPriceValue] = useState<number[]>([0, 100])
  const [sortBy, setSortBy] = useState<string>("")

  const filtersRef = useRef<HTMLDivElement>(null)

  // Mock data for demo
  const mockCategories: FilterOption[] = [
    { id: "buttons", label: "Buttons", count: 12 },
    { id: "forms", label: "Forms", count: 8 },
    { id: "navigation", label: "Navigation", count: 6 },
    { id: "layout", label: "Layout", count: 15 },
    { id: "feedback", label: "Feedback", count: 4 },
  ]

  const mockTags: FilterOption[] = [
    { id: "animated", label: "Animated", count: 25 },
    { id: "responsive", label: "Responsive", count: 30 },
    { id: "interactive", label: "Interactive", count: 18 },
    { id: "3d", label: "3D Effects", count: 7 },
    { id: "gradient", label: "Gradient", count: 12 },
  ]

  const mockComplexity: FilterOption[] = [
    { id: "easy", label: "Easy", count: 15 },
    { id: "medium", label: "Medium", count: 20 },
    { id: "advanced", label: "Advanced", count: 10 },
  ]

  const mockSortOptions: FilterOption[] = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "popular", label: "Most Popular" },
    { id: "name-asc", label: "Name A-Z" },
    { id: "name-desc", label: "Name Z-A" },
  ]

  const filterCategories = categories.length > 0 ? categories : mockCategories
  const filterTags = tags.length > 0 ? tags : mockTags
  const filterComplexity = complexity.length > 0 ? complexity : mockComplexity
  const filterSortOptions = sortOptions.length > 0 ? sortOptions : mockSortOptions

  useEffect(() => {
    if (isOpen && filtersRef.current) {
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      )
    }
  }, [isOpen])

  useEffect(() => {
    const filters = {
      categories: selectedCategories,
      tags: selectedTags,
      complexity: selectedComplexity,
      priceRange: priceValue,
      sortBy,
    }
    onFiltersChange?.(filters)
  }, [selectedCategories, selectedTags, selectedComplexity, priceValue, sortBy, onFiltersChange])

  const getActiveFiltersCount = () => {
    return selectedCategories.length + selectedTags.length + selectedComplexity.length + (sortBy ? 1 : 0)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSelectedComplexity([])
    setPriceValue([0, 100])
    setSortBy("")
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const toggleComplexity = (complexityId: string) => {
    setSelectedComplexity((prev) =>
      prev.includes(complexityId) ? prev.filter((id) => id !== complexityId) : [...prev, complexityId],
    )
  }

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 relative">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={filtersRef}
          className="w-80 bg-black/90 backdrop-blur-xl border-white/10 p-0"
          align="start"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-400 hover:text-white">
                  Clear all
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Sort By */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select sorting" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                    {filterSortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id} className="text-white hover:bg-white/10">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-white/10" />

              {/* Categories */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block">Categories</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {filterCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                        className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:border-white"
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer flex-1 flex items-center justify-between"
                      >
                        {category.label}
                        {category.count && <span className="text-xs text-gray-500">({category.count})</span>}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Tags */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {filterTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs transition-all duration-200",
                        selectedTags.includes(tag.id)
                          ? "bg-white text-black"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20",
                      )}
                    >
                      {tag.label}
                      {tag.count && <span className="ml-1 opacity-70">({tag.count})</span>}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Complexity */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block">Complexity</label>
                <div className="space-y-2">
                  {filterComplexity.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={selectedComplexity.includes(item.id)}
                        onCheckedChange={() => toggleComplexity(item.id)}
                        className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:border-white"
                      />
                      <label
                        htmlFor={item.id}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer flex-1 flex items-center justify-between"
                      >
                        <span className="flex items-center">
                          {item.label}
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full ml-2",
                              item.id === "easy" && "bg-green-500",
                              item.id === "medium" && "bg-yellow-500",
                              item.id === "advanced" && "bg-red-500",
                            )}
                          />
                        </span>
                        {item.count && <span className="text-xs text-gray-500">({item.count})</span>}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              {priceRange && (
                <>
                  <Separator className="bg-white/10" />
                  <div>
                    <label className="text-sm font-medium text-white mb-3 block">
                      Price Range: {priceValue[0]}
                      {priceRange.unit} - {priceValue[1]}
                      {priceRange.unit}
                    </label>
                    <Slider
                      value={priceValue}
                      onValueChange={setPriceValue}
                      min={priceRange.min}
                      max={priceRange.max}
                      step={priceRange.step || 1}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedCategories.map((categoryId) => {
            const category = filterCategories.find((c) => c.id === categoryId)
            return (
              <Badge key={categoryId} variant="secondary" className="bg-white/10 text-white border-white/20 pr-1">
                {category?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 ml-1 hover:bg-white/20"
                  onClick={() => toggleCategory(categoryId)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            )
          })}
          {selectedTags.map((tagId) => {
            const tag = filterTags.find((t) => t.id === tagId)
            return (
              <Badge key={tagId} variant="secondary" className="bg-white/10 text-white border-white/20 pr-1">
                {tag?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 ml-1 hover:bg-white/20"
                  onClick={() => toggleTag(tagId)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            )
          })}
          {selectedComplexity.map((complexityId) => {
            const complexity = filterComplexity.find((c) => c.id === complexityId)
            return (
              <Badge key={complexityId} variant="secondary" className="bg-white/10 text-white border-white/20 pr-1">
                {complexity?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 ml-1 hover:bg-white/20"
                  onClick={() => toggleComplexity(complexityId)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
