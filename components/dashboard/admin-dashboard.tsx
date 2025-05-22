"use client"

import { useState } from "react"
import Link from "next/link"
import { Store, Users, ShoppingBag, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"

export function AdminDashboard() {
  const { user } = useAuth()
  const [recentSupermarkets, setRecentSupermarkets] = useState([
    {
      id: 1,
      name: "Shola Supermarket",
      manager: "Manager Demo",
      products: 145,
      orders: 32,
      status: "Active",
    },
    {
      id: 2,
      name: "Safeway Supermarket",
      manager: "Jane Smith",
      products: 210,
      orders: 45,
      status: "Active",
    },
    {
      id: 3,
      name: "Fresh Corner Market",
      manager: "Robert Johnson",
      products: 98,
      orders: 12,
      status: "Pending",
    },
  ])

  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "buyer",
      joined: "2023-05-01",
      orders: 8,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "manager",
      joined: "2023-04-15",
      orders: 0,
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "buyer",
      joined: "2023-05-10",
      orders: 3,
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}. Here's an overview of the platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,678 Br</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supermarkets</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">1 pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">Across all supermarkets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+24 this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="supermarkets">
        <TabsList>
          <TabsTrigger value="supermarkets">Supermarkets</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="supermarkets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supermarkets</CardTitle>
              <CardDescription>Manage supermarkets on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSupermarkets.map((supermarket) => (
                  <div key={supermarket.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{supermarket.name}</p>
                      <p className="text-sm text-muted-foreground">Manager: {supermarket.manager}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{supermarket.products} products</p>
                      <p className="text-sm text-muted-foreground">{supermarket.orders} orders</p>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          supermarket.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {supermarket.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/supermarkets">Manage Supermarkets</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Recently registered users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium capitalize">{user.role}</p>
                      <p className="text-sm text-muted-foreground">Joined: {user.joined}</p>
                    </div>
                    <div className="text-right">
                      {user.role === "buyer" ? (
                        <p className="text-sm">{user.orders} orders</p>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Staff</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/users">Manage Users</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
