"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Order } from "@/types/order"
import { formatDate } from "@/lib/utils"

interface OrderCardProps {
  order: Order
  onClaim?: () => void
  onView: () => void
  isLoading?: boolean
}

export function OrderCard({ order, onClaim, onView, isLoading = false }: OrderCardProps) {
  const [claiming, setClaiming] = useState(false)

  const handleClaim = async () => {
    if (onClaim) {
      setClaiming(true)
      await onClaim()
      setClaiming(false)
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{order.id}</h3>
            <Badge variant={order.type === "pickup" ? "info" : "secondary"}>
              {order.type === "pickup" ? "Pickup" : "Delivery"}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">{order.date ? formatDate(order.date) : "No date"}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Customer:</span> {order.customerName}
          </p>
          <p className="text-sm">
            <span className="font-medium">Items:</span> {order.items.length}
          </p>
          <p className="text-sm">
            <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
          </p>
          {order.specialInstructions && (
            <p className="text-sm">
              <span className="font-medium">Instructions:</span> {order.specialInstructions}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex w-full justify-end space-x-2">
          {order.status === "unclaimed" && onClaim && (
            <Button onClick={handleClaim} disabled={claiming || isLoading}>
              {claiming ? "Claiming..." : "Claim Order"}
            </Button>
          )}
          <Button variant="outline" onClick={onView} disabled={isLoading}>
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
