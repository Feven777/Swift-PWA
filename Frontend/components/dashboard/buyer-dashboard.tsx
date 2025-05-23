"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, ShoppingBag, Clock, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export function BuyerDashboard() {
  const { user } = useAuth()
  const [recentOrders, setRecentOrders] = useState([
    {
      id: "ORD-123456",
      date: "2023-05-15",
      status: "Delivered",
      total: 245.99,
      items: 5,
    },
    {
      id: "ORD-123457",
      date: "2023-05-10",
      status: "Processing",
      total: 125.5,
      items: 3,
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here's what's happening with your orders and favorite items.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Processing and shipping</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">In your wishlist</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Ready for checkout</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your order history from the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total.toLocaleString()} Br</p>
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/orders">View All Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recommended For You</CardTitle>
            <CardDescription>Based on your previous purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-gray-200"></div>
                <div className="flex-1">
                  <p className="font-medium">Organic Bananas</p>
                  <p className="text-sm text-muted-foreground">Fresh Produce</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">31.99 Br</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-gray-200"></div>
                <div className="flex-1">
                  <p className="font-medium">Whole Milk</p>
                  <p className="text-sm text-muted-foreground">Dairy & Eggs</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">34.49 Br</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-gray-200"></div>
                <div className="flex-1">
                  <p className="font-medium">Whole Grain Bread</p>
                  <p className="text-sm text-muted-foreground">Bakery</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">44.29 Br</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/supermarkets">Browse Supermarkets</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
