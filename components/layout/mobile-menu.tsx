"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Handle body scroll locking when menu is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `-${window.scrollY}px`
    } else {
      // Restore body scrolling when menu is closed
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1)
      }
    }

    return () => {
      // Cleanup when component unmounts
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button onClick={toggleMenu} aria-label="Toggle menu" className="flex items-center justify-center">
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />}

      {/* Slide-out menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b sticky top-0 bg-white z-10">
          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold text-green-500 text-lg">SWIFT</span>
        </div>

        <div className="p-4">
          <Link
            href="/login"
            className="block w-full bg-green-500 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-green-600 transition-colors mb-6"
            onClick={closeMenu}
          >
            Sign In
          </Link>

          <nav className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={closeMenu}
            >
              <span className="text-xl" aria-hidden="true">
                🏠
              </span>
              <span>Home</span>
            </Link>
            <Link
              href="/supermarkets"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={closeMenu}
            >
              <span className="text-xl" aria-hidden="true">
                🏪
              </span>
              <span>Supermarkets</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={closeMenu}
            >
              <span className="text-xl" aria-hidden="true">
                🛒
              </span>
              <span>Cart</span>
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={closeMenu}
            >
              <span className="text-xl" aria-hidden="true">
                📦
              </span>
              <span>Orders</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
              onClick={closeMenu}
            >
              <span className="text-xl" aria-hidden="true">
                👤
              </span>
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        <div className="border-t p-4 w-full sticky bottom-0 bg-white mt-auto">
          <button
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors w-full text-red-500"
            onClick={closeMenu}
          >
            <span>log out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
