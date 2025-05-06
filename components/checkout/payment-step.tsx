"use client";

import PaymentMethod from "@/components/payment-method";
import PaymentForm from "@/components/payment-form";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/checkout-context";
import CheckoutProgress from "@/components/checkout-progress";

export default function PaymentStep() {
  const {
    setCurrentStep,
    isEditingPayment,
    currentStep,
    paymentMethod,
    selectedCard,
    paymentMethods,
  } = useCheckout();

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleContinue = () => {
    setCurrentStep(3);
  };

  // Check if a valid payment method is selected
  const isPaymentValid = () => {
    if (paymentMethod === "cash") return true;
    if (paymentMethod === "card" || paymentMethod === "mobile") {
      return (
        selectedCard !== "" &&
        paymentMethods.some((method) => method.id === selectedCard)
      );
    }
    return false;
  };

  return (
    <div className="mt-4 md:mt-8">
      <div className="mb-4 md:hidden">
        <CheckoutProgress
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div className="mb-4 md:mb-8">
        <h2 className="text-base md:text-xl font-medium mb-3 md:mb-4">
          Choose a payment method
        </h2>
        {isEditingPayment ? <PaymentForm /> : <PaymentMethod />}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isEditingPayment}
        >
          Back to Delivery
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-green-500 hover:bg-green-600"
          disabled={isEditingPayment || !isPaymentValid()}
        >
          Review Order
        </Button>
      </div>
    </div>
  );
}
