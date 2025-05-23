"use client";

import { CreditCard, Smartphone, Banknote, Plus, Edit } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/checkout-context";

export default function PaymentMethod() {
  const {
    paymentMethod,
    setPaymentMethod,
    selectedCard,
    setSelectedCard,
    paymentMethods,
    setEditingPayment,
    setIsEditingPayment,
  } = useCheckout();

  const handleAddNewCard = () => {
    setEditingPayment({
      id: "",
      type: "card",
      cardType: "",
      lastFour: "",
      expiryDate: "",
    });
    setIsEditingPayment(true);
  };

  const handleEditCard = (cardId: string) => {
    const card = paymentMethods.find((m) => m.id === cardId);
    if (card) {
      setEditingPayment(card);
      setIsEditingPayment(true);
    }
  };

  const handleAddNewMobilePayment = () => {
    setEditingPayment({
      id: "",
      type: "mobile",
      mobileBankName: "",
      mobileNumber: "",
    });
    setIsEditingPayment(true);
  };

  const ensureValidSelection = (newMethod: "card" | "mobile" | "cash") => {
    if (newMethod !== paymentMethod) {
      const methods = paymentMethods.filter((m) => m.type === newMethod);
      if (methods.length > 0) {
        setSelectedCard(methods[0].id);
      } else if (newMethod === "cash") {
        setSelectedCard("");
      }
    }
    setPaymentMethod(newMethod);
  };

  return (
    <div className="space-y-6">
      {/* Payment method switch */}
      <div className="flex space-x-2 md:space-x-4">
        {[
          { key: "card", icon: CreditCard, label: "Card" },
          { key: "mobile", icon: Smartphone, label: "Mobile Pay" },
          { key: "cash", icon: Banknote, label: "Cash" },
        ].map(({ key, icon: Icon, label }) => (
          <div
            key={key}
            onClick={() =>
              ensureValidSelection(key as "card" | "mobile" | "cash")
            }
            className={`flex-1 border rounded-lg p-3 md:p-4 text-center cursor-pointer transition ${
              paymentMethod === key
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Icon
              className={`mx-auto mb-2 h-5 w-5 md:h-6 md:w-6 ${
                paymentMethod === key ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span
              className={`block text-xs md:text-sm ${
                paymentMethod === key ? "font-semibold" : ""
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Card selection */}
      {paymentMethod === "card" && (
        <div className="space-y-4">
          <RadioGroup
            value={selectedCard}
            onValueChange={setSelectedCard}
            className="space-y-3"
          >
            {paymentMethods
              .filter((m) => m.type === "card")
              .map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between border rounded-lg p-3 md:p-4"
                >
                  <div className="flex items-center">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs mr-2">
                          {method.cardType}
                        </div>
                        <Label
                          htmlFor={method.id}
                          className="text-xs md:text-sm"
                        >
                          {method.cardType} ending in {method.lastFour}
                        </Label>
                      </div>
                      <p className="text-gray-500 text-xs">
                        Expires {method.expiryDate}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCard(method.id)}
                    className="text-green-500 flex items-center space-x-1 text-xs"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>
                </div>
              ))}
          </RadioGroup>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddNewCard}
            className="flex items-center text-gray-600 text-xs md:text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Card
          </Button>
        </div>
      )}

      {/* Mobile payment selection */}
      {paymentMethod === "mobile" && (
        <div className="space-y-4">
          <RadioGroup
            value={selectedCard}
            onValueChange={setSelectedCard}
            className="space-y-3"
          >
            {paymentMethods
              .filter((m) => m.type === "mobile")
              .map((method) => (
                <div
                  key={method.id}
                  className="flex items-center border rounded-lg p-3 md:p-4"
                >
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <div
                        className={`px-2 py-1 rounded text-xs mr-2 ${
                          method.mobileBankName === "Telebirr"
                            ? "bg-green-50 text-green-600"
                            : method.mobileBankName === "CBE Birr"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {method.mobileBankName}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Mobile: {method.mobileNumber}
                    </p>
                  </div>
                </div>
              ))}
          </RadioGroup>

          {/* Mobile Bank Options */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: "Telebirr",
                provider: "Ethio Telecom",
                color: "text-green-600",
              },
              {
                name: "CBE Birr",
                provider: "Commercial Bank",
                color: "text-blue-600",
              },
              {
                name: "Amole",
                provider: "Dashen Bank",
                color: "text-orange-600",
              },
              {
                name: "HelloCash",
                provider: "Lion Bank",
                color: "text-purple-600",
              },
            ].map((bank) => (
              <div
                key={bank.name}
                onClick={() => {
                  setEditingPayment({
                    id: "",
                    type: "mobile",
                    mobileBankName: bank.name,
                    mobileNumber: "",
                  });
                  setIsEditingPayment(true);
                }}
                className="border rounded-lg p-3 text-center cursor-pointer hover:border-green-500 transition"
              >
                <div className={`font-bold ${bank.color} mb-1`}>
                  {bank.name}
                </div>
                <span className="text-gray-500 text-xs">{bank.provider}</span>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddNewMobilePayment}
            className="flex items-center text-gray-600 text-xs md:text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Mobile Payment
          </Button>
        </div>
      )}

      {/* Cash payment */}
      {paymentMethod === "cash" && (
        <div className="border rounded-lg p-4 md:p-6 text-center space-y-3 text-gray-600 text-xs md:text-sm">
          <Banknote className="h-8 w-8 mx-auto text-green-500" />
          <p>You'll pay with cash upon delivery.</p>
          <p>Please have the correct amount ready.</p>
        </div>
      )}
    </div>
  );
}
