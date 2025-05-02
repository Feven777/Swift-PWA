"use client";

import { Clock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCheckout } from "@/context/checkout-context";

export default function StoreSelection() {
  const { selectedStore, setSelectedStore, storeLocations } = useCheckout();

  return (
    <div>
      <RadioGroup
        value={selectedStore}
        onValueChange={setSelectedStore}
        className="space-y-3 md:space-y-4"
      >
        {storeLocations.map((store) => (
          <div
            key={store.id}
            className="flex items-start border rounded-lg p-3 md:p-4 hover:border-green-500 transition-colors"
          >
            <div className="flex items-center h-5 mt-1">
              <RadioGroupItem
                value={store.id}
                id={store.id}
                className="text-green-500"
              />
            </div>
            <div className="ml-3 flex-1">
              <Label
                htmlFor={store.id}
                className="font-medium text-sm md:text-base"
              >
                {store.name}
                <span className="ml-2 text-xs md:text-sm text-green-600 font-normal">
                  {store.distance}
                </span>
              </Label>
              <div className="mt-1 text-xs md:text-sm text-gray-600">
                <p>{store.address}</p>
                <p>
                  {store.city}, {store.state} {store.zip}
                </p>
                <div className="flex items-center mt-1 text-xs md:text-sm text-gray-500">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  <span>Open: {store.hours}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
