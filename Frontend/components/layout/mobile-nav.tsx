"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  )
}
