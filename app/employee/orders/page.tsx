"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { useOrders } from "@/hooks/use-orders"
import { OrderCard } from "@/components/employee/order-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { OrderStatus, OrderType } from "@/types/order"
import { toast } from "@/hooks/use-toast"

export default function EmployeeOrdersPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const statusParam = searchParams.get("status") as OrderStatus | null
  const typeParam = searchParams.get("type") as OrderType | null

  const [activeStatus, setActiveStatus] = useState<OrderStatus>(statusParam || "unclaimed")
  const [activeType, setActiveType] = useState<OrderType | "all">(typeParam || "all")

  const { orders, isLoading, refetch, claimOrder } = useOrders({
    status: activeStatus,
    type: activeType === "all" ? undefined : activeType,
    supermarketId: user?.supermarketId, // Filter orders by employee's supermarket
    refetchInterval: 15000,
  })

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "employee")) {
      router.push("/auth")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (statusParam && statusParam !== activeStatus) {
      setActiveStatus(statusParam)
    }
    if (typeParam && typeParam !== activeType) {
      setActiveType(typeParam)
    }
  }, [statusParam, typeParam, activeStatus, activeType])

  const handleStatusChange = (status: string) => {
    const newStatus = status as OrderStatus
    setActiveStatus(newStatus)
    updateUrl(newStatus, activeType)
  }

  const handleTypeChange = (type: string) => {
    const newType = type as OrderType | "all"
    setActiveType(newType)
    updateUrl(activeStatus, newType)
  }

  const updateUrl = (status: OrderStatus, type: OrderType | "all") => {
    const params = new URLSearchParams()
    params.set("status", status)
    if (type !== "all") {
      params.set("type", type)
    }
    router.push(`/employee/orders?${params.toString()}`)
  }

  const handleClaimOrder = async (orderId: string | number) => {
    if (!user) return

    try {
      const result = await claimOrder(orderId)

      if (result.success) {
        toast({
          title: "Order Claimed",
          description: "You have successfully claimed this order.",
        })
        refetch()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to claim order",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleViewOrder = (orderId: string) => {
    router.push(`/employee/orders/${orderId}`)
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user || user.role !== "employee") {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            {user.supermarketName && <p className="text-sm text-muted-foreground">{user.supermarketName}</p>}
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeStatus} value={activeStatus} onValueChange={handleStatusChange}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="unclaimed">Unclaimed</TabsTrigger>
            <TabsTrigger value="preparing">In Progress</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6">
          <Tabs defaultValue={activeType} value={activeType} onValueChange={handleTypeChange}>
            <TabsList>
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="pickup">Pickup</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm text-gray-500 mt-2">
              {activeStatus === "unclaimed"
                ? "There are currently no unclaimed orders."
                : activeStatus === "preparing"
                  ? "You don't have any orders in progress."
                  : "You don't have any orders ready for handoff."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClaim={activeStatus === "unclaimed" ? () => handleClaimOrder(order.id) : undefined}
                onView={() => handleViewOrder(order.id)}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
