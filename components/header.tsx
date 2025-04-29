"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  MapPin,
  ShoppingCart,
  Menu,
  LogOut,
  User,
  Home,
  Package,
  ShoppingBag,
  Store,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      //navigate to search results
      console.log(`Searching for: ${searchQuery}`);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f9f7f2] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="mr-2">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center">
                      <Image
                        src="/swift-logo.png?height=40&width=40&text=Swift"
                        alt="Swift Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                      <span className="ml-2 text-green-600 font-bold text-xl">
                        SWIFT
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-12 text-base"
                    onClick={() => router.push("/signup")} // Navigate to the signup page
                  >
                    Sign In
                  </Button>

                  <Separator className="my-2" />

                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <House className="h-5 w-5 text-gray-500" />{" "}
                    {/* Updated icon */}
                    <span>🏠 Home</span>
                  </Link>

                  <Link
                    href="/supermarkets"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Store className="h-5 w-5 text-gray-500" />
                    <span>🏪 Supermarkets</span>
                  </Link>

                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5 text-gray-500" />
                    <span>🛒 Cart</span>
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Package className="h-5 w-5 text-gray-500" />
                    <span>📦 Orders</span>
                  </Link>
                  <Link
                    href="/checkout"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-500" />{" "}
                    {/* You can replace ShoppingCart with the appropriate icon */}
                    <span>🛒 Checkout</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <User className="h-5 w-5 text-gray-500" />
                    <span>👤 Profile</span>
                  </Link>

                  <Separator className="my-2" />

                  <button className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors text-red-500">
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40&text=Swift"
                  alt="Swift Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="ml-2 text-green-600 font-bold text-xl">
                  SWIFT
                </span>
              </div>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-full bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Search for groceries, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Search"
              >
                <ArrowRight className="h-5 w-5 text-green-600" />
              </button>
            </form>
          </div>

          <div className="flex items-center">
            <div className="flex items-center mr-4 text-sm text-gray-700">
              <MapPin className="h-5 w-5 text-gray-400 mr-1" />
              <span className="hidden md:inline">Delivering to:</span> New York
            </div>

            <Button
              variant="default"
              className="mr-4 bg-green-600 hover:bg-green-700"
            >
              Log in
            </Button>

            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                4
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
