"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SharedOrderSummaryProps {
  cartItems: { id: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  deliveryFee?: number;
  total: number;
  onEditCart?: () => void;
}

export default function SharedOrderSummary({
  cartItems,
  subtotal,
  tax,
  deliveryFee,
  total,
  onEditCart,
}: SharedOrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="text-gray-700">
                {item.quantity}x {item.name}
              </div>
              <div className="font-medium">{item.price.toFixed(2)} Br</div>
            </div>
          ))}
          {onEditCart && (
            <div className="text-right">
              <button
                className="text-xs text-blue-500 hover:underline"
                onClick={onEditCart}
              >
                Edit Cart
              </button>
            </div>
          )}
        </div>
        <Separator className="my-2" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p>{subtotal.toFixed(2)} Br</p>
          </div>
          {deliveryFee !== undefined && (
            <div className="flex justify-between">
              <p className="text-gray-600">Delivery Fee</p>
              <p>{deliveryFee.toFixed(2)} Br</p>
            </div>
          )}
          <div className="flex justify-between">
            <p className="text-gray-600">Tax</p>
            <p>{tax.toFixed(2)} Br</p>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>{total.toFixed(2)} Br</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
