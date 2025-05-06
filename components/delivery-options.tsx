"use client";
import { Truck, Store } from "lucide-react";
import { useCheckout } from "@/context/checkout-context";

export default function DeliveryOptions() {
  const { deliveryMethod, setDeliveryMethod } = useCheckout();

  const handleDeliveryMethodChange = (method: "delivery" | "pickup") => {
    console.log("Changing delivery method to:", method);
    setDeliveryMethod(method);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        className={`border rounded-lg p-3 md:p-4 cursor-pointer transition-all ${
          deliveryMethod === "delivery"
            ? "border-green-500 bg-green-50 shadow-sm"
            : "border-gray-200 hover:border-gray-300"
        }`}
        onClick={() => handleDeliveryMethodChange("delivery")}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-colors ${
              deliveryMethod === "delivery"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            <Truck className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-sm md:text-base">Delivery</h3>
              <span className="ml-2 text-orange-500">🔥</span>
            </div>
            <p className="text-xs md:text-sm text-gray-500">
              We'll bring your order to your doorstep.
            </p>
          </div>
        </div>
        {deliveryMethod === "delivery" && (
          <div className="mt-2 text-xs text-green-600 flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Selected
          </div>
        )}
      </div>

      <div
        className={`border rounded-lg p-3 md:p-4 cursor-pointer transition-all ${
          deliveryMethod === "pickup"
            ? "border-green-500 bg-green-50 shadow-sm"
            : "border-gray-200 hover:border-gray-300"
        }`}
        onClick={() => handleDeliveryMethodChange("pickup")}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-colors ${
              deliveryMethod === "pickup"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            <Store className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-sm md:text-base">Pickup</h3>
              <span className="ml-2">🛒</span>
            </div>
            <p className="text-xs md:text-sm text-gray-500">
              Pick up from the nearest store at your convenience.
            </p>
          </div>
        </div>
        {deliveryMethod === "pickup" && (
          <div className="mt-2 text-xs text-green-600 flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Selected
          </div>
        )}
      </div>
    </div>
  );
}
