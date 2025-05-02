"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState(2)
  const [location, setLocation] = useState("Addis Ababa")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLoginClick = () => {
    router.push("/auth")
  }

  const handleDashboardClick = () => {
    router.push("/dashboard")
  }

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  return (
    <>
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Menu" onClick={toggleMobileSidebar}>
              <Icon icon="mdi:menu" className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
              </div>
              <span className="text-primary font-bold text-xl hidden sm:inline-block">SWIFT</span>
              <span className="text-xs text-gray-500 hidden lg:inline-block">Groceries To Your Door</span>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="relative flex-1 max-w-md mx-4">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
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
              <Icon icon="mdi:map-marker" className="h-4 w-4" />
              <span className="hidden sm:inline-block">Delivering to: {location}</span>
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-4">
                    <Icon icon="mdi:account" className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline-block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleDashboardClick}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout()
                      router.push("/")
                    }}
                  >
                    <Icon icon="mdi:logout" className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-4"
                onClick={handleLoginClick}
              >
                Log in
              </Button>
            )}

            {user?.role === "buyer" && (
              <div className="relative">
                <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full">
                  <Icon icon="mdi:cart" className="h-6 w-6" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
