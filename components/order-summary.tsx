"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck, Clock, Store } from "lucide-react"; // Import Truck, Clock, and Store icons
import CartOrderSummary from "@/components/cart/order-summary"; // Import the cart's OrderSummary component
import { useCart } from "@/context/cart-context"; // Use the cart context for dynamic data
import { useCheckout } from "@/context/checkout-context";

export default function OrderSummary() {
  const { cartItems, subtotal } = useCart(); // Get cart data from useCart
  const shipping = 150; // Use the same shipping fee as the cart page
  const tax = 0.15 * subtotal; // Use the same tax calculation as the cart page (15% of subtotal)
  const total = subtotal + shipping + tax; // Calculate total dynamically

  const {
    deliveryMethod,
    pickupTime,
    saveInfo,
    setSaveInfo,
    orderPlaced,
    setCurrentStep,
  } = useCheckout();

  const handleModifyOrder = () => {
    setCurrentStep(1);
  };

  return (
    <div className="bg-white rounded-lg border p-4 md:p-6 sticky top-4">
      <h2 className="text-lg md:text-xl font-medium mb-4">Order Summary</h2>

      {/* Pickup Details */}
      {deliveryMethod === "pickup" && (
        <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-4">
          <div className="flex items-start">
            <Store className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm md:text-base">
                Pickup Order
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                Pickup from: Swift Supermarket, 123 Main St, Addis Ababa
              </p>
              <p className="text-xs md:text-sm text-green-600 mt-1">
                {pickupTime || "Available for pickup: Today, 4:00 PM – 8:00 PM"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cart Order Summary */}
      <CartOrderSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
      />

      {/* Delivery Details */}
      {deliveryMethod === "delivery" && (
        <div className="bg-gray-50 p-3 rounded-lg mb-4 flex items-start">
          <Truck className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-sm md:text-base">
              Estimated Delivery
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Today, 6:00 PM-7:30 PM
            </div>
          </div>
        </div>
      )}

      {/* Save Info Checkbox */}
      <div className="flex items-start space-x-2 mb-4 md:mb-6">
        <Checkbox
          id="save-info"
          checked={saveInfo}
          onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
        />
        <label
          htmlFor="save-info"
          className="text-xs md:text-sm text-gray-600 leading-tight"
        >
          Save this information for future purchases
        </label>
      </div>

      {/* Modify Order Button */}
      <Button
        variant="outline"
        className="w-full text-sm md:text-base border-orange-500 text-orange-500 hover:bg-orange-50"
        onClick={handleModifyOrder}
        disabled={orderPlaced}
      >
        Modify Order
      </Button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By placing the order, you agree to our Terms & Conditions
      </p>
    </div>
  );
}
