"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, MapPin, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState(2)
  const [location, setLocation] = useState("Addis Ababa")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f8f9fa] border-b border-gray-200 px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
            </div>
            <span className="text-green-500 font-bold text-xl hidden sm:inline-block">SWIFT</span>
            <span className="text-xs text-gray-500 hidden lg:inline-block">Groceries To Your Door</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="relative flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for groceries, brands, or categories..."
              className="pl-10 pr-4 py-2 w-full border rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-gray-600 text-sm px-2 py-1 rounded-full hover:bg-gray-100">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline-block">Delivering to: {location}</span>
          </button>

          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4">Log in</Button>

          <div className="relative">
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="h-6 w-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
