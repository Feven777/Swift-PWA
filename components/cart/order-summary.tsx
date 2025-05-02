import { formatCurrency } from "@/lib/utils"

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export default function OrderSummary({ subtotal, shipping, tax, total }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <div className="border-t pt-3 mt-3 flex justify-between font-medium">
          <span>Total</span>
          <span className="text-green-500">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
