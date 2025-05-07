"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/checkout-context";
import { Textarea } from "@/components/ui/textarea";
import { Check, AlertCircle, Loader2, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PaymentStep() {
  const { setCurrentStep, total, orderNumber, currentStep } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "telebirr" | "bank" | "card"
  >("cash");
  const [remarks, setRemarks] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // For card payment
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  // For telebirr payment
  const [telebirrReference, setTelebirrReference] = useState("");

  // For bank transfer
  const [bankReference, setBankReference] = useState("");

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyPayment = async () => {
    setIsProcessing(true);
    setPaymentError("");

    // Simulate payment verification based on payment method
    try {
      // In a real app, this would make API calls to payment processors
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

      if (paymentMethod === "cash") {
        // Cash payment doesn't need verification - just proceed
        setPaymentVerified(true);
      } else if (paymentMethod === "telebirr") {
        // Verify telebirr reference number
        if (!telebirrReference) {
          throw new Error("Please enter the Telebirr reference number");
        }
        // Simulate verification
        if (telebirrReference.length < 6) {
          throw new Error("Invalid Telebirr reference number");
        }
        setPaymentVerified(true);
      } else if (paymentMethod === "bank") {
        // Verify bank transfer reference
        if (!bankReference) {
          throw new Error("Please enter the bank transfer reference number");
        }
        // Simulate verification
        if (bankReference.length < 6) {
          throw new Error("Invalid bank reference number");
        }
        setPaymentVerified(true);
      } else if (paymentMethod === "card") {
        // Verify card details
        if (
          !cardDetails.cardNumber ||
          !cardDetails.cardHolder ||
          !cardDetails.expiryDate ||
          !cardDetails.cvv
        ) {
          throw new Error("Please fill in all card details");
        }
        // Simulate card validation
        if (cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
          throw new Error("Invalid card number");
        }
        if (cardDetails.cvv.length < 3) {
          throw new Error("Invalid CVV");
        }
        setPaymentVerified(true);
      }
    } catch (error: any) {
      setPaymentError(error.message || "Payment verification failed");
      setPaymentVerified(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    if (paymentMethod === "cash") {
      // For cash payment, we don't need verification
      setCurrentStep(3);
    } else if (paymentVerified) {
      // If payment is already verified, proceed to next step
      setCurrentStep(3);
    } else {
      // Otherwise, verify payment first
      verifyPayment();
    }
  };

  const paymentOptions = [
    {
      id: "cash",
      name: "Payment on Delivery",
      color: "text-green-500",
      provider: "Cash payment",
    },
    {
      id: "telebirr",
      name: "Telebirr",
      color: "text-green-500",
      provider: "Ethio Telecom",
    },
    {
      id: "bank",
      name: "Bank of Abyssinia",
      color: "text-blue-600",
      provider: "Commercial Bank",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      color: "text-purple-600",
      provider: "International payment",
    },
  ];

  // Simple checkout progress display
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

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">Payment</h2>

        <div className="mb-6">
          <p className="text-base mb-3">Choose a way to pay for your order:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === option.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => {
                  setPaymentMethod(option.id as any);
                  setPaymentVerified(false); // Reset verification when changing payment method
                  setPaymentError("");
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`font-medium ${option.color}`}>
                      {option.name}
                    </h3>
                    <p className="text-sm text-gray-500">{option.provider}</p>
                  </div>
                  {paymentMethod === option.id && (
                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Payment Instructions</h3>

          {paymentMethod === "cash" && (
            <div className="mb-4 p-4 border rounded-lg">
              <p className="mb-2">
                Please prepare the necessary amount of cash for your order in
                advance.
              </p>
              <p className="font-medium text-green-600">
                Total Amount: {total.toFixed(2)} Br
              </p>
            </div>
          )}

          {paymentMethod === "telebirr" && (
            <div className="mb-4 p-4 border rounded-lg">
              <p className="mb-3">
                Scan here to pay and insert the total amount from above.
              </p>
              <div className="flex flex-col items-start mb-4">
                <div className="flex items-center mb-3">
                  <img
                    src="/placeholder.svg?height=50&width=180"
                    alt="Telebirr Logo"
                    className="h-10"
                  />
                </div>
                <div className="bg-white p-2 border">
                  <img
                    src="/placeholder.svg?height=150&width=150"
                    alt="QR Code"
                    className="w-36 h-36"
                  />
                </div>
              </div>
              <p className="mb-2">
                Or Use Our Merchant ID:{" "}
                <span className="font-bold">545778</span>
              </p>
              <p className="font-medium text-green-600 mb-4">
                Total Amount: {total.toFixed(2)} Br
              </p>

              <div className="mt-4">
                <label
                  htmlFor="telebirrReference"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Telebirr Reference Number
                </label>
                <Input
                  id="telebirrReference"
                  value={telebirrReference}
                  onChange={(e) => setTelebirrReference(e.target.value)}
                  placeholder="e.g., TBR123456789"
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">
                  You'll receive a reference number after completing your
                  payment on Telebirr
                </p>
              </div>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="mb-4 p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Bank of Abyssinia Logo"
                  className="h-16 mr-3"
                />
                <div>
                  <p className="font-bold">Bank of Abyssinia</p>
                </div>
              </div>
              <p className="mb-2">
                Please add your <span className="font-bold">order number</span>{" "}
                to the reason section.
              </p>
              <p className="mb-1">Swift Delivery Technologies P.L.C.</p>
              <p className="font-bold text-lg mb-2">65743833</p>
              <p className="font-medium text-green-600 mb-4">
                Total Amount: {total.toFixed(2)} Br
              </p>

              <div className="mt-4">
                <label
                  htmlFor="bankReference"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Bank Transfer Reference Number
                </label>
                <Input
                  id="bankReference"
                  value={bankReference}
                  onChange={(e) => setBankReference(e.target.value)}
                  placeholder="e.g., TRN123456789"
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">
                  Enter the reference number from your bank transfer receipt
                </p>
              </div>
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="mb-4 p-4 border rounded-lg">
              <p className="mb-3">
                For security, we do not store your complete card details on our
                servers, all payments are processed & secured through{" "}
                <span className="text-green-600 font-medium">
                  Cybersource © (A Visa solution)
                </span>
                .
              </p>

              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg?height=40&width=60"
                  alt="Visa"
                  className="h-8 mr-3"
                />
                <img
                  src="/placeholder.svg?height=40&width=60"
                  alt="Mastercard"
                  className="h-8"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Number
                  </label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cardHolder"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Holder Name
                  </label>
                  <Input
                    id="cardHolder"
                    name="cardHolder"
                    value={cardDetails.cardHolder}
                    onChange={handleCardDetailsChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Expiry Date
                    </label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardDetailsChange}
                      placeholder="MM/YY"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      placeholder="123"
                      type="password"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              <p className="font-medium text-green-600 mt-4">
                Total Amount: {total.toFixed(2)} Br
              </p>
            </div>
          )}

          {paymentError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{paymentError}</p>
            </div>
          )}

          {paymentVerified && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">
                Payment verified successfully! You can now review your order.
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Remark</h3>
          <Textarea
            placeholder="Leave us a note about your order"
            className="w-full h-24"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back to Delivery
        </Button>
        <Button
          onClick={handleContinue}
          className={`${
            isProcessing
              ? "bg-gray-400"
              : paymentMethod === "card"
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying Payment...
            </>
          ) : paymentVerified ? (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Review Order
            </>
          ) : paymentMethod === "cash" ? (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Review Order
            </>
          ) : (
            "Verify Payment"
          )}
        </Button>
      </div>
    </div>
  );
}
