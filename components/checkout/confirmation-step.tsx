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
import { useCart } from "@/context/cart-context"; // Import cart context to fetch cart data
import { useRouter } from "next/navigation";

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
    selectedCard,
    orderNumber,
    estimatedDelivery,
    setOrderPlaced,
    orderPlaced,
    setOrderNumber,
  } = useCheckout();

  const { cartItems, subtotal } = useCart(); // Fetch cart data from cart context
  const shipping = deliveryMethod === "delivery" ? 150 : 0; // Shipping fee for delivery
  const tax = 0.15 * subtotal; // Tax calculation (15% of subtotal)
  const total = subtotal + shipping + tax; // Total calculation

  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    // Simulate API call to place order
    setTimeout(() => {
      // Generate a random order number if not already set
      if (!orderNumber) {
        setOrderNumber(`SW-${Math.floor(100000 + Math.random() * 900000)}`);
      }
      setOrderPlaced(true);
      setIsPlacingOrder(false);
    }, 1500);
  };

  const handleTrackOrder = () => {
    router.push("/tracking");
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  // Format the delivery address for display
  const formatDeliveryAddress = () => {
    if (!deliveryAddress) return "";

    let formatted = deliveryAddress;

    if (deliveryDetails?.apartmentNumber) {
      formatted += `, ${deliveryDetails.apartmentNumber}`;
    }

    return formatted;
  };

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

  // Simple checkout progress display - included directly in the component
  const renderCheckoutProgress = () => {
    return (
      <div className="w-full mb-6">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center ${
              currentStep >= 1 ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium">Delivery</span>
          </div>
          <div
            className={`flex-1 h-1 mx-4 ${
              currentStep >= 2 ? "bg-green-500" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex items-center ${
              currentStep >= 2 ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium">Payment</span>
          </div>
          <div
            className={`flex-1 h-1 mx-4 ${
              currentStep >= 3 ? "bg-green-500" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex items-center ${
              currentStep >= 3 ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 md:mt-8">
      <div className="mb-4 md:mb-6">{renderCheckoutProgress()}</div>

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
                <p>Confirmation sent to: customer@example.com</p>
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
                        {formatCurrency(item.price * item.quantity)}
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
                      <span>{formatCurrency(shipping)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
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
                        <p>{formatDeliveryAddress()}</p>
                        {deliveryDetails?.contactPhone && (
                          <p>Phone: {deliveryDetails.contactPhone}</p>
                        )}
                        {deliveryDetails?.deliveryInstructions && (
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
                    {paymentMethod === "card" && selectedCard && (
                      <p>Credit Card ending in {selectedCard.slice(-4)}</p>
                    )}
                    {paymentMethod === "mobile" && <p>Mobile Payment</p>}
                    {paymentMethod === "cash" && <p>Cash on Delivery</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {/* Order Summary */}
            <div className="border rounded-lg p-4 md:p-6 bg-white">
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <ShoppingBag className="h-5 w-5 text-green-500 mr-2" />
                  <h4 className="font-medium">Ordered item total cost</h4>
                </div>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="text-gray-700">
                        {item.quantity}x {item.name}
                      </div>
                      <div className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Delivery/Pickup Method */}
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

            {/* Delivery Time / Pickup Time */}
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

            {/* Delivery Address / Pickup Location */}
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
                  <p>{formatDeliveryAddress()}</p>
                  {deliveryDetails?.contactPhone && (
                    <p>Phone: {deliveryDetails.contactPhone}</p>
                  )}
                  {deliveryDetails?.deliveryInstructions && (
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
              {isPlacingOrder ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
            <Button
              onClick={handleTrackOrder}
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
