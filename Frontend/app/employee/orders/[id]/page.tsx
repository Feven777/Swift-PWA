"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { useOrders } from "@/hooks/use-orders"
import { OrderChecklist } from "@/components/employee/order-checklist"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import type { Order } from "@/types/order"

export default function OrderDetailPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const ordersHook = useOrders({
    supermarketId: user?.supermarketId, // Only get orders from employee's supermarket
  })

  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [isLoadingOrder, setIsLoadingOrder] = useState(true)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isHandingOff, setIsHandingOff] = useState(false)

  // Fetch order data
  const fetchOrder = useCallback(() => {
    setIsLoadingOrder(true)
    setOrderError(null)

    try {
      const foundOrder = ordersHook.getOrderById(orderId)

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setOrderError("Order not found")
      }
    } catch (error) {
      setOrderError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoadingOrder(false)
    }
  }, [orderId, ordersHook])

  // Initial fetch
  useEffect(() => {
    if (user?.supermarketId) {
      fetchOrder()
    }
  }, [user, fetchOrder])

  // Authentication check
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "employee")) {
      router.push("/auth")
    }
  }, [user, authLoading, router])

  // Check if order belongs to employee's supermarket
  useEffect(() => {
    if (!authLoading && user && order && order.supermarketId !== user.supermarketId) {
      toast({
        title: "Access Denied",
        description: "You can only view orders from your assigned supermarket.",
        variant: "destructive",
      })
      router.push("/employee/orders")
    }
  }, [order, user, authLoading, router])

  const handleToggleItem = async (itemId: number, completed: boolean) => {
    if (!order) return

    setIsUpdating(true)

    try {
      const result = await ordersHook.updateOrderItemStatus(orderId, itemId, completed)

      if (result.success) {
        // Refresh order data
        fetchOrder()

        if (result.allCompleted) {
          toast({
            title: "Order Ready",
            description: "All items have been prepared. The order is now ready for handoff.",
          })
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update item status",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleHandoff = async () => {
    if (!order) return

    setIsHandingOff(true)

    try {
      const result = await ordersHook.handoffOrder(orderId, order.type)

      if (result.success) {
        toast({
          title: "Order Completed",
          description: `The ${order.type} order has been handed off successfully.`,
        })
        router.push("/employee")
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to handoff order",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsHandingOff(false)
    }
  }

  if (authLoading || isLoadingOrder) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!user || user.role !== "employee") {
    return null
  }

  if (orderError || !order) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-lg font-medium">Order not found</p>
          <p className="text-sm text-gray-500 mt-2">The order you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => router.push("/employee/orders")}>
            Back to Orders
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const allItemsCompleted = order.items.every((item) => item.completed)
  const canHandoff = order.status === "ready"

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order {order.id}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant={order.type === "pickup" ? "info" : "secondary"}>
                {order.type === "pickup" ? "Pickup" : "Delivery"}
              </Badge>
              <Badge
                variant={
                  order.status === "unclaimed"
                    ? "default"
                    : order.status === "preparing"
                      ? "warning"
                      : order.status === "ready"
                        ? "success"
                        : "default"
                }
              >
                {order.status === "unclaimed"
                  ? "Unclaimed"
                  : order.status === "preparing"
                    ? "Preparing"
                    : order.status === "ready"
                      ? "Ready"
                      : order.status}
              </Badge>
              <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => router.push("/employee/orders")}>
              Back to Orders
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {order.items.map((item) => (
                    <OrderChecklist
                      key={item.id}
                      item={item}
                      onToggle={handleToggleItem}
                      disabled={isUpdating || order.status === "ready" || order.status === "completed"}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-sm">{order.customerName}</p>
                    {order.customerEmail && <p className="text-sm text-gray-500">{order.customerEmail}</p>}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Supermarket</p>
                    <p className="text-sm">{order.supermarketName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-sm">${order.total.toFixed(2)}</p>
                  </div>
                  {order.specialInstructions && (
                    <div>
                      <p className="text-sm font-medium">Special Instructions</p>
                      <p className="text-sm">{order.specialInstructions}</p>
                    </div>
                  )}
                  <div className="pt-4">
                    {order.type === "pickup" && order.status === "ready" && (
                      <Button className="w-full" onClick={handleHandoff} disabled={isHandingOff || !canHandoff}>
                        {isHandingOff ? "Processing..." : "Customer at Car"}
                      </Button>
                    )}
                    {order.type === "delivery" && order.status === "ready" && (
                      <Button className="w-full" onClick={handleHandoff} disabled={isHandingOff || !canHandoff}>
                        {isHandingOff ? "Processing..." : "Delivery Person Arrived"}
                      </Button>
                    )}
                    {!allItemsCompleted && order.status === "preparing" && (
                      <p className="text-sm text-center text-gray-500">Complete all items to mark the order as ready</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
