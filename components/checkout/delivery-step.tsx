"use client"

import DeliveryOptions from "@/components/delivery-options"
import AddressSelection from "@/components/address-selection"
import StoreSelection from "@/components/store-selection"
import AddressForm from "@/components/address-form"
import PromoCode from "@/components/promo-code"
import { Button } from "@/components/ui/button"
import { useCheckout } from "@/context/checkout-context"
import CheckoutProgress from "@/components/checkout-progress"

export default function DeliveryStep() {
  const { setCurrentStep, isEditingAddress, currentStep, deliveryMethod } = useCheckout()

  const handleContinue = () => {
    setCurrentStep(2)
  }

  return (
    <div className="mt-4 md:mt-8">
      <div className="mb-4 md:hidden">
        <CheckoutProgress currentStep={currentStep} />
      </div>

      <div className="mb-4 md:mb-8">
        <h2 className="text-base md:text-xl font-medium mb-3 md:mb-4">How would you like to receive your order?</h2>
        <DeliveryOptions />
      </div>

      {isEditingAddress ? (
        <AddressForm />
      ) : (
        <div className="mb-4 md:mb-8">
          <h2 className="text-base md:text-xl font-medium mb-3 md:mb-4">
            {deliveryMethod === "delivery" ? "Delivery Address" : "Select Store for Pickup"}
          </h2>
          {deliveryMethod === "delivery" ? <AddressSelection /> : <StoreSelection />}
        </div>
      )}

      <div className="mb-4 md:mb-8">
        <PromoCode />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinue} className="bg-green-500 hover:bg-green-600" disabled={isEditingAddress}>
          Continue to Payment
        </Button>
      </div>
    </div>
  )
}
