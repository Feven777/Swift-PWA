"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SupermarketCard } from "@/components/supermarkets/supermarket-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Supermarket } from "@/types/supermarket"
import { fetchSupermarkets } from "@/lib/api/supermarkets"
import { useSearchParams } from "next/navigation"

export function Supermarkets() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q")

  const [supermarkets, setSupermarkets] = useState<Supermarket[]>([])
  const [filteredSupermarkets, setFilteredSupermarkets] = useState<Supermarket[]>([])
  const [searchQuery, setSearchQuery] = useState(queryParam || "")
  const [distanceFilter, setDistanceFilter] = useState<string>("All")
  const [priceFilter, setPriceFilter] = useState<string>("All")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [sortOption, setSortOption] = useState<string>("Recommended")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSupermarkets = async () => {
      setIsLoading(true)
      try {
        const data = await fetchSupermarkets()
        setSupermarkets(data)
        setFilteredSupermarkets(data)
      } catch (error) {
        console.error("Failed to fetch supermarkets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSupermarkets()
  }, [])

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam)
    }
  }, [queryParam])

  useEffect(() => {
    applyFilters()
  }, [searchQuery, distanceFilter, priceFilter, categoryFilter, sortOption, supermarkets])

  const applyFilters = () => {
    let filtered = [...supermarkets]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (market) =>
          market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          market.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply distance filter
    if (distanceFilter !== "All") {
      const maxDistance = Number.parseFloat(distanceFilter.split(" ")[0])
      filtered = filtered.filter((market) => market.distance <= maxDistance)
    }

    // Apply price filter
    if (priceFilter !== "All") {
      if (priceFilter === "Low to High") {
        filtered = filtered.sort((a, b) => a.deliveryFee - b.deliveryFee)
      } else if (priceFilter === "High to Low") {
        filtered = filtered.sort((a, b) => b.deliveryFee - a.deliveryFee)
      } else if (priceFilter === "Free Delivery") {
        filtered = filtered.filter((market) => market.deliveryFee === 0)
      }
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((market) => market.categories.includes(categoryFilter))
    }

    // Apply sorting
    if (sortOption === "Recommended") {
      // Sort by a combination of rating (70%) and proximity (30%)
      filtered = filtered.sort((a, b) => {
        const scoreA = a.rating * 0.7 + ((10 - Math.min(a.distance, 10)) / 10) * 0.3
        const scoreB = b.rating * 0.7 + ((10 - Math.min(b.distance, 10)) / 10) * 0.3
        return scoreB - scoreA
      })
    } else if (sortOption === "Distance") {
      filtered = filtered.sort((a, b) => a.distance - b.distance)
    } else if (sortOption === "Rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortOption === "Delivery Time") {
      filtered = filtered.sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin)
    }

    setFilteredSupermarkets(filtered)
  }

  return (
    <section className="py-6">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Distance <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDistanceFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter("1 km")}>Under 1 km</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter("3 km")}>Under 3 km</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter("5 km")}>Under 5 km</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDistanceFilter("10 km")}>Under 10 km</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Price <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPriceFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("Low to High")}>Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("High to Low")}>High to Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriceFilter("Free Delivery")}>Free Delivery</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Categories <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategoryFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter("Grocery")}>Grocery</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter("Organic")}>Organic</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter("Imported")}>Imported Goods</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter("Wholesale")}>Wholesale</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1 ml-auto">
                Sort <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption("Recommended")}>Recommended</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("Distance")}>Distance</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("Rating")}>Rating</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("Delivery Time")}>Delivery Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <Skeleton className="h-40 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredSupermarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSupermarkets.map((supermarket) => (
                  <SupermarketCard key={supermarket.id} supermarket={supermarket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No supermarkets found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
