"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
<<<<<<< HEAD
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
=======
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
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720

interface NavItem {
  title: string
  href: string
<<<<<<< HEAD
  icon: string
=======
  icon: React.ElementType
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
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
<<<<<<< HEAD
      icon: "mdi:home",
      roles: ["buyer", "manager", "admin", "employee"],
=======
      icon: Home,
      roles: ["buyer", "manager", "admin"],
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
    },
    {
      title: "Dashboard",
      href: "/dashboard",
<<<<<<< HEAD
      icon: "mdi:chart-bar",
      roles: ["buyer", "manager", "admin", "employee"],
    },
    {
      title: "Orders",
      href: "/employee/orders",
      icon: "mdi:package",
      roles: ["employee"],
=======
      icon: BarChart,
      roles: ["buyer", "manager", "admin"],
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
    },
    {
      title: "Supermarkets",
      href: "/supermarkets",
<<<<<<< HEAD
      icon: "mdi:store",
=======
      icon: Store,
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      roles: ["buyer", "admin"],
    },
    {
      title: "Orders",
      href: "/orders",
<<<<<<< HEAD
      icon: "mdi:package",
=======
      icon: Package,
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Products",
      href: "/products",
<<<<<<< HEAD
      icon: "mdi:shopping-bag",
=======
      icon: ShoppingBag,
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      roles: ["manager", "admin"],
    },
    {
      title: "Users",
      href: "/admin/users",
<<<<<<< HEAD
      icon: "mdi:account-group",
=======
      icon: Users,
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      roles: ["admin"],
    },
    {
      title: "Supermarket Management",
      href: "/admin/supermarkets",
<<<<<<< HEAD
      icon: "mdi:store-cog",
=======
      icon: Store,
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      roles: ["admin"],
    },
    {
      title: "Cart",
      href: "/cart",
<<<<<<< HEAD
      icon: "mdi:cart",
=======
      icon: ShoppingCart,
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      roles: ["buyer"],
    },
    {
      title: "Settings",
      href: "/settings",
<<<<<<< HEAD
      icon: "mdi:cog",
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Profile",
      href: "/employee/profile",
      icon: "mdi:account-cog",
      roles: ["employee"],
    },
=======
      icon: Settings,
      roles: ["buyer", "manager", "admin"],
    },
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
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
<<<<<<< HEAD
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
=======
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
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      </div>
    </div>
  )
}
