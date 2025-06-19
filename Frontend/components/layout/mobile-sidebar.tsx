"use client";

<<<<<<< HEAD
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
=======
import React from "react";
import { useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Home,
  BarChart,
  Store,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ShoppingCart,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720

interface NavItem {
  title: string;
  href: string;
<<<<<<< HEAD
  icon: string;
  roles: string[];
=======
  icon: React.ElementType;
  roles?: string[];
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // close on desktop‑resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  // close when the route changes
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const role = user?.role ?? "buyer";

  const navItems: NavItem[] = [
<<<<<<< HEAD
    { title: "Home", href: "/", icon: "mdi:home", roles: ["buyer", "manager", "admin"] },
    { title: "Dashboard", href: "/dashboard", icon: "mdi:chart-bar", roles: ["buyer", "manager", "admin"] },
    { title: "Supermarkets", href: "/supermarkets", icon: "mdi:store", roles: ["buyer", "admin"] },
    { title: "Orders", href: "/orders", icon: "mdi:package", roles: ["buyer", "manager", "admin"] },
    { title: "Products", href: "/products", icon: "mdi:shopping-bag", roles: ["manager", "admin"] },
    { title: "Users", href: "/admin/users", icon: "mdi:account-group", roles: ["admin"] },
    { title: "Supermarket Management", href: "/admin/supermarkets", icon: "mdi:store-cog", roles: ["admin"] },
    { title: "Cart", href: "/cart", icon: "mdi:cart", roles: ["buyer"] },
    { title: "Settings", href: "/settings", icon: "mdi:cog", roles: ["buyer", "manager", "admin"] },
  ];

  const filteredNavItems = navItems.filter((i) => i.roles.includes(role));
=======
    {
      title: "Home",
      href: "/",
      icon: Home,
      roles: ["buyer", "manager", "admin", "employee"],
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart,
      roles: ["manager", "admin", "employee"],
    },
    {
      title: "Supermarkets",
      href: "/supermarkets",
      icon: Store,
      roles: ["buyer", "manager", "admin"],
    },
    {
      title: "Orders",
      href: "/orders",
      icon: Package,
      roles: ["manager", "admin"],
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
      title: "Management",
      href: "/admin/supermarkets",
      icon: Store,
      roles: ["admin"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["buyer", "manager", "admin", "employee"],
    },
    {
      title: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      roles: ["buyer"],
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(role)
  );
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

<<<<<<< HEAD
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
              </div>
              <span className="text-primary font-bold text-xl">SWIFT</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
              <Icon icon="mdi:close" className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  )}
                >
                  <Icon icon={item.icon} className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {user && (
            <div className="p-4 border-t">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <Icon icon="mdi:account" className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
=======
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle className="text-green-600 font-bold text-xl">
              SWIFT {role === "buyer" ? "Supermarket" : "Dashboard"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-4">
            {filteredNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 ${
                    pathname === item.href ? "bg-gray-100" : ""
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="flex-1">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
    </>
  );
}
