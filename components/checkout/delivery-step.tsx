"use client";

import { useState } from "react";
import DeliveryOptions from "@/components/delivery-options";
import AddressSelection from "@/components/address-selection";
import AddressForm from "@/components/address-form";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/checkout-context";
import CheckoutProgress from "@/components/checkout-progress";
import DeliveryTimePicker from "@/components/delivery-time-picker";
import PickupTimePicker from "@/components/pickup-time-picker";
import PickupLocationIndicator from "@/components/pickup-location-indicator";
import MapAddressPicker from "@/components/map-address-picker";

export default function DeliveryStep() {
  const {
    setCurrentStep,
    isEditingAddress,
    currentStep,
    deliveryMethod,
    pickupTime,
  } = useCheckout();

  // Mocking `deliveryAddress` and `pickupLocation` for now
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [pickupLocation, setPickupLocation] = useState<string>("");

  const [showMapPicker, setShowMapPicker] = useState(false);

  const handleContinue = () => {
    setCurrentStep(2);
  };

  // Check if we can continue to the next step
  const canContinue = () => {
    if (isEditingAddress || showMapPicker) return false;

    if (deliveryMethod === "delivery") {
      return deliveryAddress !== "";
    } else {
      return pickupTime !== "" && pickupLocation !== "";
    }
  };

  const handleAddressClick = () => {
    setShowMapPicker(true);
  };

  const handleCloseMapPicker = () => {
    setShowMapPicker(false);
  };

  return (
    <div className="mt-4 md:mt-8">
      <div className="mb-4 md:mb-6">
        {/* Pass currentStep and setCurrentStep to CheckoutProgress */}
        <CheckoutProgress
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-base md:text-xl font-medium mb-4">
          How would you like to receive your order?
        </h2>
        <DeliveryOptions />
      </div>

      {isEditingAddress ? (
        <AddressForm />
      ) : showMapPicker ? (
        <div className="mb-6">
          <MapAddressPicker />
          <div className="mt-4">
            <Button variant="outline" onClick={handleCloseMapPicker}>
              Back to Delivery Options
            </Button>
          </div>
        </div>
      ) : (
        <>
          {deliveryMethod === "delivery" ? (
            <>
              <div className="mb-6">
                <h2 className="text-base md:text-xl font-medium mb-4">
                  Delivery Address
                </h2>
                <div onClick={handleAddressClick}>
                  <AddressSelection />
                </div>
              </div>

              {deliveryAddress && (
                <div className="mb-6">
                  <h2 className="text-base md:text-xl font-medium mb-4">
                    Delivery Time
                  </h2>
                  <DeliveryTimePicker />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-base md:text-xl font-medium mb-4">
                  Pickup Time
                </h2>
                <PickupTimePicker />
              </div>

              <div className="mb-6">
                <h2 className="text-base md:text-xl font-medium mb-4">
                  Where are you?
                </h2>
                <PickupLocationIndicator />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
