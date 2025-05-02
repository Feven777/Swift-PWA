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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          type: "delivery",
          icon: <Truck className="h-4 w-4 md:h-5 md:w-5" />,
          title: "Delivery",
          description: "We'll bring your order to your doorstep.",
          emoji: "🔥",
        },
        {
          type: "pickup",
          icon: <Store className="h-4 w-4 md:h-5 md:w-5" />,
          title: "Pickup",
          description: "Pick up from the nearest store at your convenience.",
          emoji: "🛒",
        },
      ].map((option) => (
        <div
          key={option.type}
          className={`border rounded-lg p-3 md:p-4 cursor-pointer transition-all ${
            deliveryMethod === option.type
              ? "border-green-500 bg-green-50 shadow-sm"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
          onClick={() =>
            handleDeliveryMethodChange(option.type as "delivery" | "pickup")
          }
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-colors ${
                deliveryMethod === option.type
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {option.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="font-medium text-sm md:text-base">
                  {option.title}
                </h3>
                <span className="ml-2">{option.emoji}</span>
              </div>
              <p className="text-xs md:text-sm text-gray-500">
                {option.description}
              </p>
            </div>
          </div>

          {deliveryMethod === option.type && (
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
      ))}
    </div>
  );
}
