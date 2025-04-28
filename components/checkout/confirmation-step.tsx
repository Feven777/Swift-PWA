"use client"

import { useState } from "react"
import { Check, Truck, Calendar, MapPin, CreditCard, Store, Package, Mail, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCheckout } from "@/context/checkout-context"
import { useRouter } from "next/navigation"
import CheckoutProgress from "@/components/checkout-progress"

export default function ConfirmationStep() {
  const {
    currentStep,
    setCurrentStep,
    deliveryMethod,
    addresses,
    selectedAddress,
    storeLocations,
    selectedStore,
    pickupTime,
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
  } = useCheckout()
  const router = useRouter()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const selectedAddressData = addresses.find((addr) => addr.id === selectedAddress)
  const selectedStoreData = storeLocations.find((store) => store.id === selectedStore)
  const selectedPaymentMethod = paymentMethods.find((method) => method.id === selectedCard)

  const handleBack = () => {
    setCurrentStep(2)
  }

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true)

    // Simulate API call to place order
    setTimeout(() => {
      setOrderPlaced(true)
      setIsPlacingOrder(false)
    }, 1500)
  }

  const handleTrackOrder = () => {
    // In a real app, this would navigate to an order tracking page
    alert(`Tracking order ${orderNumber}`)
  }

  const handleContinueShopping = () => {
    router.push("/")
  }

  // Get user email from the selected address
  const userEmail = selectedAddressData
    ? `${selectedAddressData.name.split(" ")[0].toLowerCase()}@example.com`
    : "customer@example.com"

  return (
    <div className="mt-4 md:mt-8">
      <div className="mb-4 md:hidden">
        <CheckoutProgress currentStep={currentStep} />
      </div>

      <div className="mb-4 md:mb-8">
        <h2 className="text-base md:text-xl font-medium mb-3 md:mb-4">Review Your Order</h2>

        {orderPlaced ? (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 text-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Check className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-600 mb-2">
                Your order number is: <span className="font-medium">{orderNumber}</span>
              </p>
              <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <p>Confirmation sent to: {userEmail}</p>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {deliveryMethod === "delivery"
                  ? "We'll deliver your order to your address."
                  : `Pick up your order at ${selectedStoreData?.name}.`}
              </p>
            </div>

            {/* Order Confirmation Receipt (similar to what would be emailed) */}
            <div className="border rounded-lg p-4 md:p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-base md:text-lg">Order Confirmation</h3>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
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
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {deliveryMethod === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    {deliveryMethod === "delivery" ? "Delivery Information" : "Pickup Information"}
                  </h4>
                  <div className="text-sm text-gray-600">
                    {deliveryMethod === "delivery" && selectedAddressData && (
                      <>
                        <p>{selectedAddressData.name}</p>
                        <p>{selectedAddressData.street}</p>
                        <p>
                          {selectedAddressData.city}, {selectedAddressData.state} {selectedAddressData.zip}
                        </p>
                        <p>Phone: {selectedAddressData.phone}</p>
                        <p className="mt-2">
                          <span className="font-medium">Estimated Delivery:</span> {estimatedDelivery}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Your order will be left at your door if no one answers.
                        </p>
                      </>
                    )}
                    {deliveryMethod === "pickup" && selectedStoreData && (
                      <>
                        <p className="font-medium">{selectedStoreData.name}</p>
                        <p>{selectedStoreData.address}</p>
                        <p>
                          {selectedStoreData.city}, {selectedStoreData.state} {selectedStoreData.zip}
                        </p>
                        <p>Phone: {selectedStoreData.phone}</p>
                        <p className="mt-2">
                          <span className="font-medium">Pickup Time:</span> {pickupTime}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Please bring your ID and order number when picking up your order.
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
                        {selectedPaymentMethod.cardType} ending in {selectedPaymentMethod.lastFour}
                      </p>
                    )}
                    {paymentMethod === "mobile" && selectedPaymentMethod && (
                      <p>
                        {selectedPaymentMethod.mobileBankName} ({selectedPaymentMethod.mobileNumber})
                      </p>
                    )}
                    {paymentMethod === "cash" && <p>Cash on Delivery</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 md:p-6 bg-white">
              <h3 className="font-medium text-base md:text-lg mb-4">Order Status</h3>

              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="relative pl-8 pb-6">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <h4 className="font-medium text-sm md:text-base">Order Received</h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    We've received your order and are processing it.
                  </p>
                </div>

                <div className="relative pl-8 pb-6">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <Package className="h-3 w-3 text-gray-500" />
                  </div>
                  <h4 className="font-medium text-sm md:text-base text-gray-500">Order Processing</h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {deliveryMethod === "delivery"
                      ? "Your items are being prepared for delivery."
                      : "Your items are being prepared for pickup."}
                  </p>
                </div>

                {deliveryMethod === "delivery" ? (
                  <>
                    <div className="relative pl-8 pb-6">
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <Truck className="h-3 w-3 text-gray-500" />
                      </div>
                      <h4 className="font-medium text-sm md:text-base text-gray-500">Out for Delivery</h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        A delivery person will be assigned when your order is ready.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="relative pl-8 pb-6">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <Store className="h-3 w-3 text-gray-500" />
                    </div>
                    <h4 className="font-medium text-sm md:text-base text-gray-500">Ready for Pickup</h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      We'll notify you when your order is ready for pickup.
                    </p>
                  </div>
                )}

                <div className="relative pl-8">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <Check className="h-3 w-3 text-gray-500" />
                  </div>
                  <h4 className="font-medium text-sm md:text-base text-gray-500">Completed</h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {deliveryMethod === "delivery"
                      ? "Your order has been delivered."
                      : "Your order has been picked up."}
                  </p>
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
                  {deliveryMethod === "delivery" ? "Delivery Method" : "Pickup Method"}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                {deliveryMethod === "delivery" ? "Delivery to your address" : "Pickup from store"}
              </p>
            </div>

            <div className="border rounded-lg p-3 md:p-4 bg-white">
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                <h3 className="font-medium text-sm md:text-base">
                  {deliveryMethod === "delivery" ? "Estimated Delivery" : "Pickup Time"}
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
                  {deliveryMethod === "delivery" ? "Delivery Address" : "Pickup Location"}
                </h3>
              </div>
              {deliveryMethod === "delivery" && selectedAddressData && (
                <div className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                  <p>{selectedAddressData.name}</p>
                  <p>{selectedAddressData.street}</p>
                  <p>
                    {selectedAddressData.city}, {selectedAddressData.state} {selectedAddressData.zip}
                  </p>
                  <p>{selectedAddressData.phone}</p>
                </div>
              )}
              {deliveryMethod === "pickup" && selectedStoreData && (
                <div className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                  <p className="font-medium">
                    Pickup from: {selectedStoreData.name}, {selectedStoreData.address}, {selectedStoreData.city},{" "}
                    {selectedStoreData.state}
                  </p>
                  <p className="mt-1">Phone: {selectedStoreData.phone}</p>
                </div>
              )}
            </div>

            <div className="border rounded-lg p-3 md:p-4 bg-white">
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                <h3 className="font-medium text-sm md:text-base">Payment Method</h3>
              </div>
              <div className="text-xs md:text-sm text-gray-600 ml-7 md:ml-8">
                {paymentMethod === "card" && selectedPaymentMethod && (
                  <p>
                    {selectedPaymentMethod.cardType} ending in {selectedPaymentMethod.lastFour}
                  </p>
                )}
                {paymentMethod === "mobile" && selectedPaymentMethod && (
                  <p>
                    Mobile Payment: {selectedPaymentMethod.mobileBankName} ({selectedPaymentMethod.mobileNumber})
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
            <Button onClick={handlePlaceOrder} className="bg-green-500 hover:bg-green-600" disabled={isPlacingOrder}>
              {isPlacingOrder ? "Processing..." : "Place Order"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
            <Button onClick={handleTrackOrder} className="bg-green-500 hover:bg-green-600">
              Track Order
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
