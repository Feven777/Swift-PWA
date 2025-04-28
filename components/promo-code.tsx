"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useCheckout } from "@/context/checkout-context";
import { toast } from "@/components/ui/use-toast";

export default function PromoCode() {
  const { promoCode, setPromoCode, setPromoDiscount } = useCheckout();
  const [inputCode, setInputCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = () => {
    if (!inputCode.trim()) return;

    setIsApplying(true);

    setTimeout(() => {
      if (inputCode.toUpperCase() === "SWIFT10") {
        setPromoCode(inputCode);
        setPromoDiscount(5);
        toast({
          title: "Promo code applied!",
          description: "You got $5 off your order.",
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: "Please try another code.",
          variant: "destructive",
        });
      }
      setIsApplying(false);
    }, 1000);
  };

  return (
    <div className="flex items-start md:items-center">
      <div className="hidden md:block mr-2">
        <Zap className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm md:text-base font-medium mb-2 md:mb-1">
          Promo Code
        </h3>
        <div className="flex">
          <input
            type="text"
            className="flex-1 border rounded-l-md px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Enter code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <Button
            className="rounded-l-none bg-orange-500 hover:bg-orange-600 text-xs md:text-sm py-1 px-3 h-auto"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply"}
          </Button>
        </div>
        {promoCode && (
          <p className="text-xs text-green-600 mt-1">
            Promo code {promoCode} applied!
          </p>
        )}
      </div>
    </div>
  );
}
