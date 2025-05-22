"use client";

import { DialogFooter } from "@/components/ui/dialog";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddressSelector() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("Addis Ababa");
  const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("home");

  const savedAddresses = [
    { id: "home", label: "Home", address: "123 Main St, Addis Ababa" },
    { id: "work", label: "Work", address: "456 Office Blvd, Addis Ababa" },
    { id: "other", label: "Other", address: "789 Other Ave, Addis Ababa" },
  ];

  const handleSave = () => {
    if (selectedAddress === "new" && newAddress) {
      setAddress(newAddress);
    } else {
      const selected = savedAddresses.find(
        (addr) => addr.id === selectedAddress
      );
      if (selected) {
        setAddress(selected.label);
      }
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center text-xs sm:text-sm text-gray-600 px-1 sm:px-2"
        >
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-1" />
          <span className="truncate max-w-[80px] sm:max-w-none">
            Delivering to: {address}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Delivery Address</DialogTitle>
          <DialogDescription>
            Select or enter your delivery address.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-3 sm:gap-4 sm:py-4">
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
            className="grid gap-3 sm:gap-4"
          >
            {savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start space-x-2 sm:space-x-3 space-y-0"
              >
                <RadioGroupItem value={addr.id} id={addr.id} />
                <div className="grid gap-1 sm:gap-1.5">
                  <Label
                    htmlFor={addr.id}
                    className="font-medium text-sm sm:text-base"
                  >
                    {addr.label}
                  </Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {addr.address}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-start space-x-2 sm:space-x-3 space-y-0">
              <RadioGroupItem value="new" id="new" />
              <div className="grid gap-1 sm:gap-1.5 w-full">
                <Label
                  htmlFor="new"
                  className="font-medium text-sm sm:text-base"
                >
                  New Address
                </Label>
                <Input
                  id="new-address"
                  placeholder="Enter a new address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full text-sm"
                  onClick={() => setSelectedAddress("new")}
                />
              </div>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter className="sm:justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="sm:w-auto w-full">
            Save Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
