"use client";

import { useState } from "react";
import {
  Check,
  Truck,
  Calendar,
  MapPin,
  CreditCard,
  Store,
  Package,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/checkout-context";
import { useRouter } from "next/navigation";
import CheckoutProgress from "@/components/checkout-progress";

// Helper function to format currency in ETB
const formatCurrency = (amount: number) => {
  return `${amount.toFixed(2)} Br`;
};

export default function ConfirmationStep() {
  const {
    currentStep,
    setCurrentStep,
    deliveryMethod,
    deliveryAddress,
    deliveryDetails,
    defaultStore,
    pickupTime,
    pickupLocation,
    paymentMethod,
    paymentMethods,
    selectedCard,
    orderNumber,
    estimatedDelivery,
    setOrderPlaced,
    orderPlaced,
    cartItems,
    subtotal,
    deliveryFee,
    tax,
    promoDiscount,
    total,
  } = useCheckout();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedCard
  );

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    // Simulate API call to place order
    setTimeout(() => {
      setOrderPlaced(true);
      setIsPlacingOrder(false);
    }, 1500);
  };

  const handleTrackOrder = () => {
    // In a real app, this would navigate to an order tracking page
    alert(`Tracking order ${orderNumber}`);
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  // Extract user name and email from the delivery address
  const extractNameFromAddress = () => {
    // In a real app, you would have proper user data
    // For now, just return a placeholder name
    return "John Doe";
  };

  const userEmail = "customer@example.com";

  // Get pickup location display text
  const getPickupLocationText = () => {
    switch (pickupLocation) {
      case "parking":
        return "In the parking lot (in my car)";
      case "entrance":
        return "At the store entrance";
      case "inside":
        return "Inside at the pickup counter";
      default:
        return "At the store";
    }
  };

  // Format the delivery address for display
  const formatDeliveryAddress = () => {
    if (!deliveryAddress) return "";

    let formatted = deliveryAddress;

    if (deliveryDetails.apartmentNumber) {
      formatted += `, ${deliveryDetails.apartmentNumber}`;
    }

    return formatted;
  };

  return (
    <div className="mt-4 md:mt-8">
      <div className="mb-4 md:mb-6">
        <CheckoutProgress
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      <div className="mb-4 md:mb-8">
        <h2 className="text-base md:text-xl font-medium mb-3 md:mb-4">
          Review Your Order
        </h2>

        {orderPlaced ? (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 text-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Check className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-2">
                Order Placed Successfully!
              </h3>
              <p className="text-gray-600 mb-2">
                Your order number is:{" "}
                <span className="font-medium">{orderNumber}</span>
              </p>
              <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <p>Confirmation sent to: {userEmail}</p>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {deliveryMethod === "delivery"
                  ? "We'll deliver your order to your address."
                  : `Pick up your order at ${defaultStore.name}.`}
              </p>
            </div>

            {/* Order Confirmation Receipt (similar to what would be emailed) */}
            <div className="border rounded-lg p-4 md:p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-base md:text-lg">
                  Order Confirmation
                </h3>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleDateString()}{" "}
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              <div className="border-b pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <ShoppingBag className="h-5 w-5 text-green-500 mr-2" />
                  <h4 className="font-medium">Order Items</h4>
                </div>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="text-gray-700">
                        {item.quantity}x {item.name}
                      </div>
                      <div className="font-medium">
                        {formatCurrency(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {deliveryMethod === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">
                        -{formatCurrency(promoDiscount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    {deliveryMethod === "delivery"
                      ? "Delivery Information"
                      : "Pickup Information"}
                  </h4>
                  <div className="text-sm text-gray-600">
                    {deliveryMethod === "delivery" ? (
                      <>
                        <p>{extractNameFromAddress()}</p>
                        <p>{formatDeliveryAddress()}</p>
                        {deliveryDetails.contactPhone && (
                          <p>Phone: {deliveryDetails.contactPhone}</p>
                        )}
                        {deliveryDetails.deliveryInstructions && (
                          <div className="mt-2 p-2 bg-gray-50 rounded-md">
                            <p className="font-medium">
                              Delivery Instructions:
                            </p>
                            <p>{deliveryDetails.deliveryInstructions}</p>
                          </div>
                        )}
                        <p className="mt-2">
                          <span className="font-medium">
                            Estimated Delivery:
                          </span>{" "}
                          {estimatedDelivery}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Your order will be left at your door if no one
                          answers.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium">{defaultStore.name}</p>
                        <p>{defaultStore.address}</p>
                        <p>
                          {defaultStore.city}, {defaultStore.state}{" "}
                          {defaultStore.zip}
                        </p>
                        <p>Phone: {defaultStore.phone}</p>
                        <p className="mt-2">
                          <span className="font-medium">Pickup Time:</span>{" "}
                          {pickupTime}
                        </p>
                        <p className="mt-1">
                          <span className="font-medium">Where you'll be:</span>{" "}
                          {getPickupLocationText()}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Please bring your ID and order number when picking up
                          your order.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Payment Method</h4>
                  <div className="text-sm text-gray-600">
                    {paymentMethod === "card" && selectedPaymentMethod && (
                      <p>
                        {selectedPaymentMethod.cardType} ending in{" "}
                        {selectedPaymentMethod.lastFour}
                      </p>
                    )}
                    {paymentMethod === "mobile" && selectedPaymentMethod && (
                      <p>
                        {selectedPaymentMethod.mobileBankName} (
                        {selectedPaymentMethod.mobileNumber})
                      </p>
                    )}
                    {paymentMethod === "cash" && <p>Cash on Delivery</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <div className="border rounded-lg p-3 md:p-4 bg-white">
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                {deliveryMethod === "delivery" ? (
                  <Truck className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                ) : (
                  <Store className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                )}
                <h3 className="font-medium text-sm md:text-base">
                  {deliveryMethod === "delivery"
                    ? "Delivery Method"
                    : "Pickup Method"}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                {deliveryMethod === "delivery"
                  ? "Delivery to your address"
                  : "Pickup from store"}
              </p>
            </div>

            <div className="border rounded-lg p-3 md:p-4 bg-white">
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                <h3 className="font-medium text-sm md:text-base">
                  {deliveryMethod === "delivery"
                    ? "Estimated Delivery"
                    : "Pickup Time"}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                {deliveryMethod === "delivery" ? estimatedDelivery : pickupTime}
              </p>
            </div>

            <div className="border rounded-lg p-3 md:p-4 bg-white">
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                <h3 className="font-medium text-sm md:text-base">
                  {deliveryMethod === "delivery"
                    ? "Delivery Address"
                    : "Pickup Location"}
                </h3>
              </div>
              {deliveryMethod === "delivery" ? (
                <div className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                  <p>{extractNameFromAddress()}</p>
                  <p>{formatDeliveryAddress()}</p>
                  {deliveryDetails.contactPhone && (
                    <p>Phone: {deliveryDetails.contactPhone}</p>
                  )}
                  {deliveryDetails.deliveryInstructions && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-md">
                      <p className="font-medium">Delivery Instructions:</p>
                      <p>{deliveryDetails.deliveryInstructions}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                  <p className="font-medium">
                    Pickup from: {defaultStore.name}, {defaultStore.address},{" "}
                    {defaultStore.city}, {defaultStore.state}
                  </p>
                  <p className="mt-1">Phone: {defaultStore.phone}</p>
                  {pickupLocation && (
                    <p className="mt-1">
                      <span className="font-medium">Where you'll be:</span>{" "}
                      {getPickupLocationText()}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="border rounded-lg p-3 md:p-4 bg-white">
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                <h3 className="font-medium text-sm md:text-base">
                  Payment Method
                </h3>
              </div>
              <div className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                {paymentMethod === "card" && selectedPaymentMethod && (
                  <p>
                    {selectedPaymentMethod.cardType} ending in{" "}
                    {selectedPaymentMethod.lastFour}
                  </p>
                )}
                {paymentMethod === "mobile" && selectedPaymentMethod && (
                  <p>
                    Mobile Payment: {selectedPaymentMethod.mobileBankName} (
                    {selectedPaymentMethod.mobileNumber})
                  </p>
                )}
                {paymentMethod === "cash" && <p>Cash on Delivery</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {!orderPlaced ? (
          <>
            <Button variant="outline" onClick={handleBack}>
              Back to Payment
            </Button>
            <Button
              onClick={handlePlaceOrder}
              className="bg-green-500 hover:bg-green-600"
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Processing..." : "Place Order"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
            <Button
              onClick={() => router.push(`/tracking`)}
              className="bg-green-500 hover:bg-green-600"
            >
              Track Order
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
