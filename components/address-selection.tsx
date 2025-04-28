"use client";

import { MapPin, Edit } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/checkout-context";

export default function AddressSelection() {
  const {
    selectedAddress,
    setSelectedAddress,
    addresses,
    setEditingAddress,
    setIsEditingAddress,
  } = useCheckout();

  const handleEdit = (addressId: string) => {
    const addressToEdit = addresses.find((addr) => addr.id === addressId);
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setIsEditingAddress(true);
    }
  };

  const handleAddNew = () => {
    setEditingAddress({
      id: "",
      type: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
    setIsEditingAddress(true);
  };

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedAddress}
        onValueChange={setSelectedAddress}
        className="space-y-3 md:space-y-4"
      >
        {addresses.map((address) => (
          <div
            key={address.id}
            className="flex items-start border-b pb-3 md:pb-4"
          >
            <div className="flex items-center h-5 mt-1">
              <RadioGroupItem
                value={address.id}
                id={address.id}
                className="text-green-500"
              />
            </div>
            <div className="ml-3 flex-1">
              <Label
                htmlFor={address.id}
                className="font-medium text-sm md:text-base"
              >
                {address.type}
              </Label>
              <div className="mt-1 text-xs md:text-sm text-gray-600 space-y-0.5">
                <p>{address.name}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
                <p>{address.phone}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-500 px-2 py-1 h-auto flex items-center text-xs md:text-sm"
              onClick={() => handleEdit(address.id)}
            >
              <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Edit
            </Button>
          </div>
        ))}
      </RadioGroup>

      <Button
        variant="ghost"
        size="sm"
        className="mt-4 text-gray-600 flex items-center text-xs md:text-sm"
        onClick={handleAddNew}
      >
        <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2" />
        Add New Address
      </Button>
    </div>
  );
}
