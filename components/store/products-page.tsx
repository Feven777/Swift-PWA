"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProductCard } from "@/components/store/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Supermarket } from "@/types/supermarket"
import type { Product } from "@/types/product"
import { fetchProductsByStore } from "@/lib/api/products"

interface ProductsPageProps {
  supermarket: Supermarket
  categoryFilter?: number
  searchQuery?: string
}

export function ProductsPage({ supermarket, categoryFilter, searchQuery = "" }: ProductsPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [search, setSearch] = useState(searchQuery)
  const [sortOption, setSortOption] = useState<string>("Recommended")
  const [priceFilter, setPriceFilter] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(categoryFilter)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        const data = await fetchProductsByStore(supermarket.id)
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [supermarket.id])

  useEffect(() => {
    applyFilters()
  }, [search, sortOption, priceFilter, selectedCategory, products])

  const applyFilters = () => {
    let filtered = [...products]

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.categoryId === selectedCategory)
    }

    // Apply price filter
    if (priceFilter !== "All") {
      if (priceFilter === "Low to High") {
        filtered = filtered.sort((a, b) => a.price - b.price)
      } else if (priceFilter === "High to Low") {
        filtered = filtered.sort((a, b) => b.price - a.price)
      } else if (priceFilter === "On Sale") {
        filtered = filtered.filter((product) => product.isOnSale)
      } else if (priceFilter === "Under 50 Br") {
        filtered = filtered.filter((product) => product.price < 50)
      } else if (priceFilter === "50-100 Br") {
        filtered = filtered.filter((product) => product.price >= 50 && product.price <= 100)
      } else if (priceFilter === "Over 100 Br") {
        filtered = filtered.filter((product) => product.price > 100)
      }
    }

    // Apply sorting
    if (sortOption === "Recommended") {
      // Sort by a combination of rating (70%) and whether it's on sale (30%)
      filtered = filtered.sort((a, b) => {
        const scoreA = a.rating * 0.7 + (a.isOnSale ? 0.3 : 0)
        const scoreB = b.rating * 0.7 + (b.isOnSale ? 0.3 : 0)
        return scoreB - scoreA
      })
    } else if (sortOption === "Newest") {
      // In a real app, we would sort by date added
      filtered = filtered.sort((a, b) => b.id - a.id)
    } else if (sortOption === "Popular") {
      // In a real app, we would sort by popularity/sales
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set("q", search)
    } else {
      params.delete("q")
    }

    router.push(`/supermarket/${supermarket.id}/products?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{supermarket.name}</h1>
          <p className="text-gray-600 mb-4">Browse products available for delivery from {supermarket.name}</p>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-6">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Category <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedCategory(undefined)}>All Categories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory(1)}>Fresh Produce</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory(2)}>Dairy & Eggs</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory(3)}>Meat & Seafood</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory(4)}>Bakery</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory(5)}>Frozen Foods</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory(6)}>Beverages</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Price <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPriceFilter("All")}>All Prices</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("Low to High")}>Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("High to Low")}>High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("On Sale")}>On Sale</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("Under 50 Br")}>Under 50 Br</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("50-100 Br")}>50-100 Br</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("Over 100 Br")}>Over 100 Br</DropdownMenuItem>
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
                <DropdownMenuItem onClick={() => setSortOption("Newest")}>Newest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("Popular")}>Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} storeId={supermarket.id} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
