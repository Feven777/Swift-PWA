"use client";

import { useEffect } from "react";
import "../globals.css";
import DeliveryStep from "@/components/checkout/delivery-step";
import PaymentStep from "@/components/checkout/payment-step";
import ConfirmationStep from "@/components/checkout/confirmation-step";
import OrderSummary from "@/components/order-summary";
import { useCheckout, CheckoutProvider } from "@/context/checkout-context";

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}

function CheckoutContent() {
  const { currentStep, setOrderNumber } = useCheckout();

  // Generate a random order number when the component mounts
  useEffect(() => {
    const randomOrderNumber = `SW-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    setOrderNumber(randomOrderNumber);
  }, [setOrderNumber]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4 md:px-6">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Steps Section */}
            <div>
              {currentStep === 1 && <DeliveryStep />}
              {currentStep === 2 && <PaymentStep />}
              {currentStep === 3 && <ConfirmationStep />}
            </div>
            {/* Order Summary */}
            <div className="hidden lg:block">
              <OrderSummary />
            </div>
          </div>
          {/* Mobile Order Summary */}
          <div className="lg:hidden mt-6">
            <OrderSummary />
          </div>
        </div>
      </main>
      y
    </div>
  );
}
