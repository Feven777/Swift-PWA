"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Car, MapPin, User, Check } from "lucide-react";

export default function PickupLocationIndicator() {
  // Mocking `pickupLocation` and `setPickupLocation` for now
  const [pickupLocation, setPickupLocation] = useState<string | null>(null);

  const locationOptions = [
    {
      id: "parking",
      icon: <Car className="h-5 w-5" />,
      title: "In the parking lot",
      description: "I'll wait in my car in the parking lot",
    },
    {
      id: "entrance",
      icon: <MapPin className="h-5 w-5" />,
      title: "At the entrance",
      description: "I'll be waiting at the store entrance",
    },
    {
      id: "inside",
      icon: <User className="h-5 w-5" />,
      title: "Inside the store",
      description: "I'll come inside to the pickup counter",
    },
  ];

  return (
    <div className="border rounded-lg p-4 bg-white">
      <p className="text-sm text-gray-600 mb-4">
        Let us know where you'll be when picking up your order
      </p>

      <div className="space-y-3">
        {locationOptions.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-3 cursor-pointer transition-all ${
              pickupLocation === option.id
                ? "border-green-500 bg-green-50"
                : "hover:border-gray-300"
            }`}
            onClick={() => setPickupLocation(option.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                    pickupLocation === option.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {option.icon}
                </div>
                <div>
                  <div className="font-medium">{option.title}</div>
                  <p className="text-sm text-gray-500 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>

              {pickupLocation === option.id && (
                <div className="text-green-600">
                  <Check className="h-5 w-5" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {pickupLocation === "parking" && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium mb-2">Vehicle Information</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="vehicle-make" className="text-xs text-gray-500">
                Make & Model
              </Label>
              <input
                id="vehicle-make"
                type="text"
                placeholder="e.g., Toyota Camry"
                className="w-full mt-1 px-3 py-2 text-sm border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="vehicle-color" className="text-xs text-gray-500">
                Color
              </Label>
              <input
                id="vehicle-color"
                type="text"
                placeholder="e.g., Blue"
                className="w-full mt-1 px-3 py-2 text-sm border rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
