import Image from "next/image"

interface OrderItem {
  id: number
  name: string
  qty: number
  price: number
  image: string
}

interface OrderItemsProps {
  items: OrderItem[]
  total: number
}

export default function OrderItems({ items, total }: OrderItemsProps) {
  return (
    <div>
      <h2 className="text-base md:text-lg font-medium mb-3 md:mb-4">Order Items</h2>
      <div className="space-y-3 md:space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center border-b pb-3 md:pb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 md:mr-4 flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm md:text-base truncate">{item.name}</h3>
              <p className="text-xs md:text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
            <div className="text-right ml-2">
              <p className="font-medium text-sm md:text-base">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-3 md:pt-4">
          <p className="font-medium">Total</p>
          <p className="font-medium">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
