"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, Search, Filter, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface AdvancedTableProps {
  data: any[]
  columns: Column[]
  searchable?: boolean
  selectable?: boolean
  exportable?: boolean
  pageSize?: number
  className?: string
  onRowClick?: (row: any) => void
  onSelectionChange?: (selectedRows: any[]) => void
}

export function AdvancedTable({
  data,
  columns,
  searchable = true,
  selectable = false,
  exportable = false,
  pageSize = 10,
  className,
  onRowClick,
  onSelectionChange,
}: AdvancedTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<Record<string, string>>({})

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = data

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((row) => String(row[key]).toLowerCase().includes(value.toLowerCase()))
      }
    })

    return filtered
  }, [data, searchQuery, filters])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc" ? { key, direction: "desc" } : null
      }
      return { key, direction: "asc" }
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((row, index) => `${currentPage}-${index}`)))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(rowId)
    } else {
      newSelected.delete(rowId)
    }
    setSelectedRows(newSelected)
    onSelectionChange?.(
      Array.from(newSelected).map((id) => {
        const [page, index] = id.split("-")
        return paginatedData[Number.parseInt(index)]
      }),
    )
  }

  const exportData = () => {
    const csv = [
      columns.map((col) => col.label).join(","),
      ...sortedData.map((row) => columns.map((col) => row[col.key]).join(",")),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "table-data.csv"
    a.click()
  }

  return (
    <div className={cn("bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {searchable && (
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white"
                />
              </div>
            )}

            {/* Column Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/20">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {columns
                  .filter((col) => col.filterable)
                  .map((column) => (
                    <div key={column.key} className="p-2">
                      <label className="text-sm font-medium">{column.label}</label>
                      <Input
                        placeholder={`Filter by ${column.label.toLowerCase()}`}
                        value={filters[column.key] || ""}
                        onChange={(e) => setFilters((prev) => ({ ...prev, [column.key]: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            {selectedRows.size > 0 && <Badge variant="secondary">{selectedRows.size} selected</Badge>}

            {exportable && (
              <Button variant="outline" size="sm" onClick={exportData} className="border-white/20">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              {selectable && (
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.key} className="p-4 text-left text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex flex-col hover:text-white transition-colors"
                      >
                        <ChevronUp
                          className={cn(
                            "w-3 h-3",
                            sortConfig?.key === column.key && sortConfig.direction === "asc"
                              ? "text-blue-400"
                              : "text-gray-500",
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 -mt-1",
                            sortConfig?.key === column.key && sortConfig.direction === "desc"
                              ? "text-blue-400"
                              : "text-gray-500",
                          )}
                        />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-4 text-left w-12"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => {
              const rowId = `${currentPage}-${index}`
              return (
                <tr
                  key={rowId}
                  className="border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="p-4">
                      <Checkbox
                        checked={selectedRows.has(rowId)}
                        onCheckedChange={(checked) => handleSelectRow(rowId, checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="p-4 text-sm text-white">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
          {sortedData.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="border-white/20"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="border-white/20"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
