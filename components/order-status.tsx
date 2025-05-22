"use client"

import { CheckCircle, Package, Truck, Home } from "lucide-react"

interface OrderStatusProps {
  status: string
}

export default function OrderStatus({ status }: OrderStatusProps) {
  const getStatusIndex = () => {
    switch (status) {
      case "order_placed":
        return 0
      case "being_packed":
        return 1
      case "out_for_delivery":
        return 2
      case "delivered":
        return 3
      default:
        return 0
    }
  }

  const statusIndex = getStatusIndex()

  const statuses = [
    {
      id: "order_placed",
      label: "Order Placed",
      time: "2:15pm",
      icon: CheckCircle,
      complete: statusIndex >= 0,
    },
    {
      id: "being_packed",
      label: "Being Packed",
      time: "2:30pm",
      icon: Package,
      complete: statusIndex >= 1,
    },
    {
      id: "out_for_delivery",
      label: "Out for Delivery",
      time: "2:45pm",
      icon: Truck,
      complete: statusIndex >= 2,
    },
    {
      id: "delivered",
      label: "Delivered",
      time: "Expected 3:00 PM",
      icon: Home,
      complete: statusIndex >= 3,
    },
  ]

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-base md:text-lg font-medium mb-3 md:mb-4">Order Status</h2>

      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-4 md:top-5 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-green-400 to-amber-400"
            style={{
              width: statusIndex === 0 ? "25%" : statusIndex === 1 ? "50%" : statusIndex === 2 ? "75%" : "100%",
            }}
          ></div>
        </div>

        {/* Status Icons */}
        <div className="flex justify-between relative">
          {statuses.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                    item.complete
                      ? index === 0
                        ? "bg-green-500"
                        : index === 1
                          ? "bg-green-400"
                          : index === 2
                            ? "bg-amber-400"
                            : "bg-gray-200"
                      : "bg-gray-200"
                  }`}
                >
                  <Icon className={`h-4 w-4 md:h-5 md:w-5 ${item.complete ? "text-white" : "text-gray-400"}`} />
                </div>
                <p className="text-center text-xs md:text-sm mt-1 md:mt-2">{item.label}</p>
                <p className="text-center text-[10px] md:text-xs text-gray-500">{item.time}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
