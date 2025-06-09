"use client";

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

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
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

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

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
    </>
  );
}
