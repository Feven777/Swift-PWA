"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import {
  Home,
  BarChart,
  Store,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ShoppingCart,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  roles: string[]
}

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const role = user?.role || "buyer"

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: Home,
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart,
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Supermarkets",
      href: "/supermarkets",
      icon: Store,
      roles: ["buyer", "admin"],
    },
    {
      title: "Orders",
      href: "/orders",
      icon: Package,
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Products",
      href: "/products",
      icon: ShoppingBag,
      roles: ["manager", "admin"],
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Supermarket Management",
      href: "/admin/supermarkets",
      icon: Store,
      roles: ["admin"],
    },
    {
      title: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      roles: ["buyer"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["buyer", "manager", "admin"],
    },
  ]
  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <div className="hidden md:flex flex-col h-full w-64 border-r border-gray-200 bg-white">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
          </div>
          <span className="text-primary font-bold text-xl">SWIFT</span>
        </Link>
      </div>

      <div className="flex-1 px-4 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
