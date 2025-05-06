"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, X, Check, AlertCircle } from "lucide-react";

// Mock function for reverse geocoding
const reverseGeocode = async (lat: number, lng: number) => {
  if (lat > 9.01 && lat < 9.03 && lng > 38.76 && lng < 38.8) {
    return {
      street: "Bole Road",
      city: "Addis Ababa",
      subCity: "Bole",
      postalCode: "1000",
      isInDeliveryZone: true,
    };
  }
  return {
    street: "Unknown Street",
    city: "Addis Ababa",
    subCity: "Unknown",
    postalCode: "1000",
    isInDeliveryZone: Math.random() > 0.3,
  };
};

export default function MapAddressPicker() {
  // Mock functions for setDeliveryAddress and setDeliveryDetails
  const setDeliveryAddress = (address: string) => {
    console.log("Delivery Address Set:", address);
  };

  const setDeliveryDetails = (details: {
    apartmentNumber: string;
    deliveryInstructions: string;
    contactPhone: string;
  }) => {
    console.log("Delivery Details Set:", details);
  };

  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [addressDetails, setAddressDetails] = useState({
    street: "",
    city: "Addis Ababa",
    subCity: "",
    postalCode: "",
    apartmentNumber: "",
    buildingName: "",
    deliveryInstructions: "",
    contactPhone: "",
  });
  const [isInDeliveryZone, setIsInDeliveryZone] = useState<boolean | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      setTimeout(() => {
        setMapLoaded(true);
        setSelectedLocation({ lat: 9.0222, lng: 38.7468 });
        handleLocationSelect({ lat: 9.0222, lng: 38.7468 });
      }, 500);
    };

    loadMap();
  }, []);

  const handleLocationSelect = async (location: {
    lat: number;
    lng: number;
  }) => {
    setSelectedLocation(location);
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
    setIsSaving(true);
    const fullAddress = `${addressDetails.street}${
      addressDetails.buildingName ? `, ${addressDetails.buildingName}` : ""
    }${
      addressDetails.apartmentNumber
        ? `, Apt ${addressDetails.apartmentNumber}`
        : ""
    }, ${addressDetails.subCity}, ${addressDetails.city}`;
    setDeliveryAddress(fullAddress);
    setDeliveryDetails({
      apartmentNumber: addressDetails.apartmentNumber,
      deliveryInstructions: addressDetails.deliveryInstructions,
      contactPhone: addressDetails.contactPhone,
    });
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">Set Delivery Location</h2>
        <button className="text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-[300px] bg-gray-100 relative"
          style={{
            backgroundImage:
              "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/38.7468,9.0222,13,0/600x300?access_token=pk.placeholder')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500">
            <MapPin className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="p-4">
        {isInDeliveryZone === false && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">
              We cannot deliver to this address from this store. Please try
              another location or store.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              value={addressDetails.street}
              onChange={handleInputChange}
              placeholder="Street name and number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buildingName">Building Name (Optional)</Label>
              <Input
                id="buildingName"
                name="buildingName"
                value={addressDetails.buildingName}
                onChange={handleInputChange}
                placeholder="Building or complex name"
              />
            </div>
            <div>
              <Label htmlFor="apartmentNumber">
                Apartment/Floor (Optional)
              </Label>
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
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={addressDetails.contactPhone}
              onChange={handleInputChange}
              placeholder="Phone number for delivery"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t flex justify-end space-x-3">
        <Button variant="outline">Cancel</Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={handleSaveAddress}
          disabled={!isInDeliveryZone || isSaving}
        >
          {isSaving ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Save Address
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
