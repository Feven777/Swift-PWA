"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  House,
  ArrowRight,
  Search,
  MapPin,
  ShoppingCart,
  Menu,
  LogOut,
  User,
  Package,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import AddressSelector from "../address-selector";
export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(2);
  const [location, setLocation] = useState("Addis Ababa");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLoginClick = () => {
    router.push("/auth");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <header className="sticky top-0 z-40 w-full  bg-[#f9f7f2] border-b border-gray-200  py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between sm:px-6  lg:px-8 h-10">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Menu"
              onClick={toggleMobileSidebar}
            >
              <Icon icon="mdi:menu" className="h-6 w-6" />
            </button>
          </div>
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
                      <span className="ml-2 text-green-600 font-bold text-xl">
                        SWIFT Supermarket
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-12 text-base"
                    onClick={() => router.push("/signup")}
                  >
                    Sign In
                  </Button>

                  <Separator className="my-2" />

                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <House className="h-5 w-5 text-gray-500" />
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
                    <ShoppingCart className="h-5 w-5 text-gray-500" />
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
                  src="/swift-logo.png"
                  alt="Swift Logo"
                  width={70}
                  height={70}
                  className="h-20 w-20"
                />
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

          <div className="flex items-center gap-2">
            <AddressSelector />

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
                  <DropdownMenuItem onClick={handleProfileClick}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      router.push("/");
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
                <Link
                  href="/cart"
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
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
  );
}
