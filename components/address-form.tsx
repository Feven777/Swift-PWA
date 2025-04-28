"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCheckout } from "@/context/checkout-context";

export default function AddressForm() {
  const {
    editingAddress,
    setEditingAddress,
    setIsEditingAddress,
    addresses,
    setAddresses,
  } = useCheckout();

  const [formData, setFormData] = useState({
    id: "",
    type: "Home",
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        id: editingAddress.id || "",
        type: editingAddress.type || "Home",
        name: editingAddress.name || "",
        street: editingAddress.street || "",
        city: editingAddress.city || "",
        state: editingAddress.state || "",
        zip: editingAddress.zip || "",
        phone: editingAddress.phone || "",
      });
    }
  }, [editingAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleCancel = () => {
    setIsEditingAddress(false);
    setEditingAddress(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAddress = {
      ...formData,
      id: formData.id || `address-${Date.now()}`,
    };

    if (formData.id && addresses.some((addr) => addr.id === formData.id)) {
      // Update existing address
      setAddresses(
        addresses.map((addr) => (addr.id === formData.id ? newAddress : addr))
      );
    } else {
      // Add new address
      setAddresses([...addresses, newAddress]);
    }

    setIsEditingAddress(false);
    setEditingAddress(null);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">
        {formData.id ? "Edit Address" : "Add New Address"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Address Type</Label>
          <RadioGroup
            value={formData.type}
            onValueChange={handleTypeChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Home" id="home-type" />
              <Label htmlFor="home-type">Home</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Work" id="work-type" />
              <Label htmlFor="work-type">Work</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="other-type" />
              <Label htmlFor="other-type">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            Save Address
          </Button>
        </div>
      </form>
    </div>
  );
}
