"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import type { OrderItem } from "@/types/order"

interface OrderChecklistProps {
  item: OrderItem
  onToggle: (itemId: number, completed: boolean) => Promise<void>
  disabled?: boolean
}

export function OrderChecklist({ item, onToggle, disabled = false }: OrderChecklistProps) {
  const [isChecking, setIsChecking] = useState(false)

  const handleToggle = async (checked: boolean) => {
    setIsChecking(true)
    try {
      await onToggle(item.id, checked)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="flex items-center space-x-3 py-2 border-b last:border-0">
      <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.quantity} x ${item.price.toFixed(2)}
            </p>
          </div>
          <Checkbox
            checked={item.completed}
            onCheckedChange={handleToggle}
            disabled={disabled || isChecking}
            className="h-5 w-5"
          />
        </div>
      </div>
    </div>
  )
}
