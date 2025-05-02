"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function CartPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(29.99)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Simulate loading cart items
    const timer = setTimeout(() => {
      // In a real app, we would fetch cart items from a global state or API
      setCartItems([
        {
          id: 1,
          name: "Organic Bananas",
          price: 31.99,
          quantity: 1,
          image: "/banana.webp",
          storeId: 1,
          storeName: "Shola Supermarket",
        },
        {
          id: 6,
          name: "Orange Juice",
          price: 33.99,
          quantity: 2,
          image: "/juice.jpg",
          storeId: 1,
          storeName: "Shola Supermarket",
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Calculate subtotal and total
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(newSubtotal)
    setTotal(newSubtotal + deliveryFee)
  }, [cartItems, deliveryFee])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6" /> Your Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Skeleton className="h-6 w-1/3 mb-6" />
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex py-4 border-b">
                    <Skeleton className="h-20 w-20 rounded mr-4" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-1/4 mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                {cartItems.length > 0 ? (
                  <>
                    <h2 className="font-semibold text-lg mb-4">Cart Items ({cartItems.length})</h2>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex py-4 border-b">
                        <div className="h-20 w-20 relative rounded overflow-hidden mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">From {item.storeName}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                              <button
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-4">
                                {(item.price * item.quantity).toLocaleString()} Br
                              </span>
                              <button className="text-gray-400 hover:text-red-500" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                      <ShoppingCart className="h-full w-full" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
                    <Link href="/">
                      <Button className="bg-primary hover:bg-primary/90 text-white">Start Shopping</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              {isLoading ? (
                <>
                  <div className="flex justify-between mb-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between mb-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between mb-6">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{subtotal.toLocaleString()} Br</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{deliveryFee.toLocaleString()} Br</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between mb-6">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{total.toLocaleString()} Br</span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Proceed to Checkout</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
