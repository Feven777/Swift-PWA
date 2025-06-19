"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
<<<<<<< HEAD
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

interface NavItem {
  title: string
  href: string
  icon: string
  roles: string[]
}

export function MobileNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const role = user?.role || "buyer"

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: "mdi:home",
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "mdi:chart-bar",
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Supermarkets",
      href: "/supermarkets",
      icon: "mdi:store",
      roles: ["buyer", "admin"],
    },
    {
      title: "Orders",
      href: "/orders",
      icon: "mdi:package",
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Products",
      href: "/products",
      icon: "mdi:shopping-bag",
      roles: ["manager", "admin"],
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "mdi:account-group",
      roles: ["admin"],
    },
    {
      title: "Supermarket Management",
      href: "/admin/supermarkets",
      icon: "mdi:store-cog",
      roles: ["admin"],
    },
    {
      title: "Cart",
      href: "/cart",
      icon: "mdi:cart",
      roles: ["buyer"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "mdi:cog",
      roles: ["buyer", "manager", "admin"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <div className="flex flex-col gap-6 p-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
        </div>
        <span className="text-primary font-bold text-xl">SWIFT</span>
      </Link>

      <div className="space-y-1">
        {filteredNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            <Icon icon={item.icon} className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
=======
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/context/cart-context"
import { X, ShoppingCart, User, LogOut } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-4">
          {user ? (
            <>
              <Link href="/cart" className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartItems.length})</span>
              </Link>
              <Link href="/profile" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 justify-start"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full justify-start">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
  )
}
