"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

interface Order {
  id: string
  customer: string
  customerEmail: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: number
  total: number
  supermarket?: string
}

export default function OrdersPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }

    // Fetch orders (mock data for now)
    const mockOrders: Order[] = [
      {
        id: "ORD-123456",
        customer: "John Doe",
        customerEmail: "john@example.com",
        date: "2023-05-15",
        status: "delivered",
        items: 5,
        total: 245.99,
        supermarket: "Shola Supermarket",
      },
      {
        id: "ORD-123457",
        customer: "Jane Smith",
        customerEmail: "jane@example.com",
        date: "2023-05-10",
        status: "processing",
        items: 3,
        total: 125.5,
        supermarket: "Safeway Supermarket",
      },
      {
        id: "ORD-123458",
        customer: "Robert Johnson",
        customerEmail: "robert@example.com",
        date: "2023-05-09",
        status: "shipped",
        items: 2,
        total: 89.99,
        supermarket: "Fresh Corner Market",
      },
      {
        id: "ORD-123459",
        customer: "Sarah Williams",
        customerEmail: "sarah@example.com",
        date: "2023-05-08",
        status: "pending",
        items: 4,
        total: 156.75,
        supermarket: "Mafi City Mall Supermarket",
      },
      {
        id: "ORD-123460",
        customer: "Michael Brown",
        customerEmail: "michael@example.com",
        date: "2023-05-07",
        status: "cancelled",
        items: 1,
        total: 45.25,
        supermarket: "Friendship Supermarket",
      },
    ]

    // Filter orders based on user role
    let filteredMockOrders = mockOrders
    if (user?.role === "manager") {
      // For managers, only show orders from their supermarket
      filteredMockOrders = mockOrders.filter((order) => order.supermarket === "Shola Supermarket")
    } else if (user?.role === "buyer") {
      // For buyers, only show their own orders
      filteredMockOrders = mockOrders.filter((order) => order.customerEmail === user.email)
    }

    setOrders(filteredMockOrders)
    setFilteredOrders(filteredMockOrders)
  }, [isLoading, user, router])

  useEffect(() => {
    if (searchQuery) {
      const filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (order.supermarket && order.supermarket.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredOrders(filtered)
    } else {
      setFilteredOrders(orders)
    }
  }, [searchQuery, orders])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect above
  }

  const handleViewOrder = (orderId: string) => {
    // In a real app, this would navigate to an order detail page
    alert(`View order ${orderId} functionality would go here`)
  }

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order's status
    alert(`Update order ${orderId} status to ${newStatus} functionality would go here`)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "success"
      case "shipped":
        return "info"
      case "processing":
        return "warning"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        </div>

        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilteredOrders([...orders])}>All Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredOrders(orders.filter((o) => o.status === "pending"))}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredOrders(orders.filter((o) => o.status === "processing"))}>
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredOrders(orders.filter((o) => o.status === "shipped"))}>
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredOrders(orders.filter((o) => o.status === "delivered"))}>
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredOrders(orders.filter((o) => o.status === "cancelled"))}>
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                {user?.role !== "buyer" && <TableHead>Customer</TableHead>}
                {user?.role === "admin" && <TableHead>Supermarket</TableHead>}
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    {user?.role !== "buyer" && (
                      <TableCell>
                        <div>
                          {order.customer}
                          <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                    )}
                    {user?.role === "admin" && <TableCell>{order.supermarket}</TableCell>}
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.total.toLocaleString()} Br</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>View Details</DropdownMenuItem>
                          {(user?.role === "admin" || user?.role === "manager") && (
                            <>
                              <DropdownMenuSeparator />
                              {order.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "processing")}>
                                  Mark as Processing
                                </DropdownMenuItem>
                              )}
                              {order.status === "processing" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "shipped")}>
                                  Mark as Shipped
                                </DropdownMenuItem>
                              )}
                              {order.status === "shipped" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "delivered")}>
                                  Mark as Delivered
                                </DropdownMenuItem>
                              )}
                              {(order.status === "pending" || order.status === "processing") && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "cancelled")}>
                                  Cancel Order
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={user?.role === "admin" ? 8 : user?.role === "manager" ? 7 : 6}
                    className="h-24 text-center"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
