"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SupermarketsHeaderProps {
  initialQuery?: string
}

export function SupermarketsHeader({ initialQuery = "" }: SupermarketsHeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Supermarkets</h1>
        <p className="text-gray-600 mb-4">Browse supermarkets and retail stores available for delivery in your area</p>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search supermarkets..."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
