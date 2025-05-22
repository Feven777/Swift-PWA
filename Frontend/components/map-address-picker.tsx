"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useCheckout } from "@/context/checkout-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, AlertCircle } from "lucide-react";

// Mock function for reverse geocoding
const reverseGeocode = async (lat: number, lng: number) => {
  // In a real app, this would call a geocoding API
  // For demo purposes, we'll return mock data based on coordinates

  // Bole area
  if (lat > 9.01 && lat < 9.03 && lng > 38.76 && lng < 38.8) {
    return {
      street: "Bole Road",
      city: "Addis Ababa",
      subCity: "Bole",
      postalCode: "1000",
      isInDeliveryZone: true,
    };
  }

  // Kazanchis area
  if (lat > 9.0 && lat < 9.02 && lng > 38.74 && lng < 38.76) {
    return {
      street: "Kazanchis Street",
      city: "Addis Ababa",
      subCity: "Kirkos",
      postalCode: "1000",
      isInDeliveryZone: true,
    };
  }

  // Piassa area
  if (lat > 9.03 && lat < 9.04 && lng > 38.74 && lng < 38.76) {
    return {
      street: "Churchill Avenue",
      city: "Addis Ababa",
      subCity: "Arada",
      postalCode: "1000",
      isInDeliveryZone: true,
    };
  }

  // Default/other areas
  return {
    street: "Unknown Street",
    city: "Addis Ababa",
    subCity: "Unknown",
    postalCode: "1000",
    isInDeliveryZone: Math.random() > 0.3, // 70% chance of being in delivery zone
  };
};

export default function MapAddressPicker() {
  const { setDeliveryAddress, setDeliveryDetails, setCurrentStep } =
    useCheckout();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [addressDetails, setAddressDetails] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "Addis Ababa",
    subCity: "",
    postalCode: "",
    apartmentNumber: "",
    buildingName: "",
    deliveryInstructions: "",
  });
  const [isInDeliveryZone, setIsInDeliveryZone] = useState<boolean | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [mapView, setMapView] = useState<"map" | "satellite">("map");
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);

  // Load OpenStreetMap and Leaflet
  useEffect(() => {
    const loadMap = async () => {
      // In a real app, we would load Leaflet properly
      // For this demo, we'll simulate the map loading
      setTimeout(() => {
        setMapLoaded(true);

        // Simulate map initialization
        if (mapRef.current) {
          // For demo, we'll just set a default location (Bole area in Addis Ababa)
          setSelectedLocation({ lat: 9.0222, lng: 38.7468 });
          handleLocationSelect({ lat: 9.0222, lng: 38.7468 });
        }
      }, 500);
    };

    loadMap();
  }, []);

  const handleLocationSelect = async (location: {
    lat: number;
    lng: number;
  }) => {
    setSelectedLocation(location);

    // Simulate reverse geocoding
    const address = await reverseGeocode(location.lat, location.lng);

    setAddressDetails((prev) => ({
      ...prev,
      street: address.street,
      city: address.city,
      subCity: address.subCity,
      postalCode: address.postalCode,
    }));

    setIsInDeliveryZone(address.isInDeliveryZone);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    if (
      !addressDetails.fullName ||
      !addressDetails.phone ||
      !addressDetails.street
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSaving(true);

    // Format the full address
    const fullAddress = `${addressDetails.street}${
      addressDetails.buildingName ? `, ${addressDetails.buildingName}` : ""
    }${
      addressDetails.apartmentNumber
        ? `, Apt ${addressDetails.apartmentNumber}`
        : ""
    }, ${addressDetails.subCity}, ${addressDetails.city}`;

    // Save the address
    setDeliveryAddress(fullAddress);

    // Save additional details
    setDeliveryDetails({
      apartmentNumber: addressDetails.apartmentNumber,
      deliveryInstructions: addressDetails.deliveryInstructions,
      contactPhone: addressDetails.phone,
    });

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setCurrentStep(2); // Move to payment step
    }, 1000);
  };

  // Function to simulate map movement
  const simulateMapMove = (direction: "north" | "south" | "east" | "west") => {
    if (!selectedLocation) return;

    let newLat = selectedLocation.lat;
    let newLng = selectedLocation.lng;

    const step = 0.005; // Small step for map movement

    switch (direction) {
      case "north":
        newLat += step;
        break;
      case "south":
        newLat -= step;
        break;
      case "east":
        newLng += step;
        break;
      case "west":
        newLng -= step;
        break;
    }

    setSelectedLocation({ lat: newLat, lng: newLng });
    handleLocationSelect({ lat: newLat, lng: newLng });
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Delivery Address</h2>
        <p className="text-sm text-gray-500 mt-1">
          Is the pin in the right location?
        </p>
      </div>

      {/* Form Fields Above Map */}
      <div className="p-4 border-b">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={addressDetails.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              value={addressDetails.phone}
              onChange={handleInputChange}
              placeholder="+251 9XX XXX XXX"
              required
            />
          </div>

          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter Your Delivery Location
            </label>
            <Input
              id="street"
              name="street"
              value={addressDetails.street}
              onChange={handleInputChange}
              placeholder="Start typing your address here for suggestions"
              required
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Locate your address on the map
        </p>

        {/* Map Container */}
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-[300px] bg-gray-100 relative"
            style={{
              backgroundImage:
                mapView === "map"
                  ? "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/38.7468,9.0222,13,0/600x300?access_token=pk.placeholder')"
                  : "url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/38.7468,9.0222,13,0/600x300?access_token=pk.placeholder')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            )}

            {/* Centered Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500">
              <MapPin className="h-8 w-8" />
            </div>

            {/* Map Type Selector */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md flex overflow-hidden">
              <button
                className={`px-4 py-2 text-sm ${
                  mapView === "map"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setMapView("map")}
              >
                Map
              </button>
              <button
                className={`px-4 py-2 text-sm ${
                  mapView === "satellite"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setMapView("satellite")}
              >
                Satellite
              </button>
            </div>

            {/* Map Navigation Controls (simulated) */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
              <button
                className="p-2 hover:bg-gray-100 block w-8 h-8 flex items-center justify-center"
                onClick={() => simulateMapMove("north")}
              >
                ↑
              </button>
              <div className="flex">
                <button
                  className="p-2 hover:bg-gray-100 block w-8 h-8 flex items-center justify-center"
                  onClick={() => simulateMapMove("west")}
                >
                  ←
                </button>
                <button
                  className="p-2 hover:bg-gray-100 block w-8 h-8 flex items-center justify-center"
                  onClick={() => simulateMapMove("east")}
                >
                  →
                </button>
              </div>
              <button
                className="p-2 hover:bg-gray-100 block w-8 h-8 flex items-center justify-center"
                onClick={() => simulateMapMove("south")}
              >
                ↓
              </button>
            </div>
          </div>
        </div>

        {isInDeliveryZone === false && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">
              We cannot deliver to this address from this store. Please try
              another location or store.
            </p>
          </div>
        )}

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="buildingName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Building Name (Optional)
              </label>
              <Input
                id="buildingName"
                name="buildingName"
                value={addressDetails.buildingName}
                onChange={handleInputChange}
                placeholder="Building or complex name"
              />
            </div>
            <div>
              <label
                htmlFor="apartmentNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apartment/Floor (Optional)
              </label>
              <Input
                id="apartmentNumber"
                name="apartmentNumber"
                value={addressDetails.apartmentNumber}
                onChange={handleInputChange}
                placeholder="Apt #, Floor, etc."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="deliveryInstructions"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delivery Instructions (Optional)
            </label>
            <Input
              id="deliveryInstructions"
              name="deliveryInstructions"
              value={addressDetails.deliveryInstructions}
              onChange={handleInputChange}
              placeholder="Additional instructions for the delivery person"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t flex justify-center">
        <Button
          className="px-8 py-2 bg-green-500 hover:bg-green-600"
          onClick={handleSaveAddress}
          disabled={!isInDeliveryZone || isSaving}
        >
          {isSaving ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </>
          ) : (
            "Continue to Payment"
          )}
        </Button>
      </div>
    </div>
  );
}
