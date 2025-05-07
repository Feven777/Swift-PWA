"use client";

import { useState, useCallback } from "react";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Store,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/cart-context";
import AddressSelector from "../address-selector";
import { Icon } from "@iconify/react/dist/iconify.js";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const role = user?.role ?? "buyer";
  const isManagerAdmin = role === "manager" || role === "admin";
  const { totalItems } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((o) => !o);
  }, []);
  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

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
    switch (role) {
    case "admin":
    router.push("/admin/profile");
    break;
    case "manager":
    router.push("/manager/profile");
    break;
    default:
    router.push("/profile");
    }
    };

  // sheet navigation uses emojis only
  const buyerNav = [
    { emoji: "🏠", title: "Home", href: "/" },
    { emoji: "🏪", title: "Supermarkets", href: "/supermarkets" },
    { emoji: "🛒", title: "Cart", href: "/cart" },
    { emoji: "📦", title: "Orders", href: "/tracking" },
    { emoji: "👤", title: "Profile", href: "/profile" },
  ];
  const adminNav = [
    { emoji: "🏠", title: "Home", href: "/" },
    { emoji: "📊", title: "Dashboard", href: "/dashboard" },
    { emoji: "🏪", title: "Supermarkets", href: "/supermarkets" },
    { emoji: "📦", title: "Orders", href: "/orders" },
    { emoji: "🛍️", title: "Products", href: "/products" },
    { emoji: "👥", title: "Users", href: "/admin/users" },
    { emoji: "🛠️", title: "Management", href: "/admin/supermarkets" },
    { emoji: "⚙️", title: "Settings", href: "/settings" },
  ];
  const employeeNav = [
    { emoji: "🏠", title: "Home", href: `/supermarket/${user?.supermarketId}` },
    { emoji: "📊", title: "Dashboard", href: "/dashboard" },
    { emoji: "📦", title: "Orders", href: "/employee/orders" },
    {
      emoji: "🛍️",
      title: "Products",
      href: `/supermarket/${user?.supermarketId}/products`,
    },
    { emoji: "⚙️", title: "Settings", href: "/settings" },
  ];
  const sheetNav =
    role === "buyer" ? buyerNav : role === "employee" ? employeeNav : adminNav;

  const sheetBtnClass =
    role === "buyer"
      ? "p-2 hover:bg-gray-100 rounded-full"
      : pathname !== "/dashboard"
      ? "p-2 hover:bg-gray-100 rounded-full hidden lg:block"
      : "hidden";

  return (
    <>
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />
      <header className="sticky top-0 z-40 w-full bg-[#f9f7f2] border-b py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-10">
          {/* Hamburger + Logo */}
          <div className="flex items-center gap-4">
            {isManagerAdmin && (
              <button
                onClick={toggleMobileSidebar}
                className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <button className={sheetBtnClass} aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-green-600 font-bold text-xl">
                    SWIFT {role === "buyer" ? "Supermarket" : "Dashboard"}
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {sheetNav.map(({ emoji, title, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100"
                    >
                      <span className="text-xl inline-block w-6">{emoji}</span>
                      <span className="flex-1">{title}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/swift-logo.png"
                alt="Swift Logo"
                width={70}
                height={70}
                className="h-20 w-20"
              />
            </Link>
          </div>
          {/* Search */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="w-full pl-10 pr-12 py-2 border rounded-full"
                placeholder="Search for groceries, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <ArrowRight className="h-5 w-5 text-green-600" />
              </button>
            </form>
          </div>
          {/* Account Dropdown & Cart */}
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

            {role === "buyer" && (
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems || 0}
                </span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
