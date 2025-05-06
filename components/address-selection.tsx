import { useState } from "react";
import { MapPin, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressSelection() {
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
  const [apartmentNumber, setApartmentNumber] = useState<string>("");
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [deliveryDetails, setDeliveryDetails] = useState<{
    apartmentNumber: string;
    deliveryInstructions: string;
    contactPhone: string;
  }>({
    apartmentNumber: "",
    deliveryInstructions: "",
    contactPhone: "",
  });

  const handleSaveDetails = () => {
    setDeliveryDetails({
      apartmentNumber,
      deliveryInstructions,
      contactPhone,
    });
    setShowDetails(false);
  };

  return (
    <div className="space-y-4">
      {deliveryAddress ? (
        <div className="border rounded-lg p-4 bg-white relative">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">{deliveryAddress}</p>
              {deliveryDetails.contactPhone && (
                <p className="text-sm text-gray-600 mt-1">
                  Phone: {deliveryDetails.contactPhone}
                </p>
              )}
              {deliveryDetails.deliveryInstructions && (
                <p className="text-sm text-gray-600 mt-1">
                  Instructions: {deliveryDetails.deliveryInstructions}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 text-green-600 p-1 h-auto"
            onClick={() => setShowDetails(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="border rounded-lg p-4 bg-white cursor-pointer hover:border-green-500 transition-all"
          onClick={() => setDeliveryAddress("123 Main St, City, Country")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-600">Select delivery address</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 p-1 h-auto"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Map
            </Button>
          </div>
        </div>
      )}

      {deliveryAddress && !showDetails && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(true)}
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            Add apartment number & delivery instructions
          </Button>
        </div>
      )}

      {deliveryAddress && showDetails && (
        <div className="border rounded-lg p-4 mt-4 bg-white">
          <h3 className="font-medium text-sm mb-3">
            Additional Delivery Details
          </h3>

          <div className="space-y-3">
            <div>
              <Label htmlFor="apartment" className="text-sm">
                Apartment/Suite/Floor
              </Label>
              <Input
                id="apartment"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
                placeholder="Apt #, Suite #, Floor, etc."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="instructions" className="text-sm">
                Delivery Instructions
              </Label>
              <textarea
                id="instructions"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="Add instructions for the delivery person"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm">
                Contact Phone Number
              </Label>
              <Input
                id="phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Phone number for delivery updates"
                className="mt-1"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveDetails}
                className="bg-green-500 hover:bg-green-600"
              >
                Save Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
