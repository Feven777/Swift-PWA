"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck, Clock, Store } from "lucide-react";
import { useCheckout } from "@/context/checkout-context";
import { useRouter } from "next/navigation"; // Correct import for Next.js App Router

export default function OrderSummary() {
  const {
    saveInfo,
    setSaveInfo,
    cartItems,
    subtotal,
    deliveryFee,
    tax,
    total,
    currentStep,
    setCurrentStep,
    orderPlaced,
    deliveryMethod,
    selectedStore,
    storeLocations,
    pickupTime,
  } = useCheckout();

  const router = useRouter(); // Initialize router for navigation

  const selectedStoreData = storeLocations.find(
    (store) => store.id === selectedStore
  );

  const handlePlaceOrder = () => {
    setCurrentStep(3);
  };

  const handleModifyOrder = () => {
    setCurrentStep(1);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      currencyDisplay: "symbol", // Use "Br" symbol
    }).format(value);
  };

  const handleEditCart = () => {
    router.push("/cart"); // Navigate to the cart page
  };

  return (
    <div className="bg-white rounded-lg border p-4 md:p-6 sticky top-4 mt-6 md:mt-0">
      <h2 className="text-base md:text-lg font-medium mb-3 md:mb-4">
        Order Summary
      </h2>

      {deliveryMethod === "pickup" && (
        <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-4">
          <div className="flex items-start">
            <Store className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm md:text-base">
                Pickup Order
              </div>
              {selectedStoreData && (
                <p className="text-xs md:text-sm text-gray-600">
                  Pickup from: {selectedStoreData.name},{" "}
                  {selectedStoreData.address}, Addis Ababa, Ethiopia
                </p>
              )}
              <p className="text-xs md:text-sm text-green-600 mt-1">
                {pickupTime ||
                  "Available for pickup: Today, 10:00 AM – 6:00 PM"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div className="text-gray-700">
              {item.quantity}x {item.name}
            </div>
            <div className="font-medium">{formatCurrency(item.price)}</div>
          </div>
        ))}

        <div className="text-right">
          <Button
            variant="link"
            className="text-xs md:text-sm p-0 h-auto"
            onClick={handleEditCart} // Navigate to the cart page
          >
            Edit Cart
          </Button>
        </div>
      </div>

      <div className="space-y-2 py-3 md:py-4 border-t border-b text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {deliveryMethod === "delivery" && (
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      <div className="flex justify-between py-3 md:py-4 font-medium text-base md:text-lg">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {deliveryMethod === "delivery" && (
        <div className="bg-gray-50 p-3 rounded-lg my-4 flex items-start">
          <Truck className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-sm md:text-base">
              Estimated Delivery
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Today, 6:00 PM–7:30 PM
            </div>
          </div>
        </div>
      )}

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

      {currentStep === 3 && !orderPlaced ? (
        <Button
          className="w-full bg-green-500 hover:bg-green-600 mb-2 text-sm md:text-base"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      ) : (
        <Button
          className="w-full bg-green-500 hover:bg-green-600 mb-2 text-sm md:text-base"
          onClick={() => setCurrentStep(Math.min(currentStep + 1, 3))}
          disabled={currentStep === 3 && orderPlaced}
        >
          {currentStep === 1
            ? "Continue to Payment"
            : currentStep === 2
            ? "Review Order"
            : orderPlaced
            ? "Order Placed"
            : "Place Order"}
        </Button>
      )}

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
