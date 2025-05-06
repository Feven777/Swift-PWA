"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface Address {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface DeliveryDetailsType {
  apartmentNumber: string;
  deliveryInstructions: string;
  contactPhone: string;
}

export interface StoreLocation {
  id: number;           
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: string;
  hours: string;
}


export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "mobile" | "cash";
  cardType?: string;
  lastFour?: string;
  expiryDate?: string;
  mobileBankName?: string;
  mobileNumber?: string;
}

interface CheckoutContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  deliveryMethod: "delivery" | "pickup";
  setDeliveryMethod: (method: "delivery" | "pickup") => void;
  selectedAddress: string;
  setSelectedAddress: (addressId: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  deliveryDetails: DeliveryDetailsType;
  setDeliveryDetails: (details: DeliveryDetailsType) => void;
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  editingAddress: Address | null;
  setEditingAddress: (address: Address | null) => void;
  isEditingAddress: boolean;
  setIsEditingAddress: (isEditing: boolean) => void;
  defaultStore: StoreLocation;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  pickupLocation: string;
  setPickupLocation: (location: string) => void;
  paymentMethod: "card" | "mobile" | "cash";
  setPaymentMethod: (method: "card" | "mobile" | "cash") => void;
  selectedCard: string;
  setSelectedCard: (cardId: string) => void;
  cartItems: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoDiscount: number;
  setPromoDiscount: (discount: number) => void;
  saveInfo: boolean;
  setSaveInfo: (save: boolean) => void;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  isEditingPayment: boolean;
  setIsEditingPayment: (isEditing: boolean) => void;
  editingPayment: PaymentMethod | null;
  setEditingPayment: (payment: PaymentMethod | null) => void;
  orderPlaced: boolean;
  setOrderPlaced: (placed: boolean) => void;
  orderNumber: string;
  setOrderNumber: (number: string) => void;
  estimatedDelivery: string;
  setEstimatedDelivery: (time: string) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetailsType>({
    apartmentNumber: "",
    deliveryInstructions: "",
    contactPhone: "",
  });
  const [pickupTime, setPickupTime] = useState("Today, 4:00 PM");
  const [pickupLocation, setPickupLocation] = useState("inside");

  // Default store for pickup (no selection needed)
  const defaultStore: StoreLocation = {
    id: 1,
    name: "Swift Market - Bole",
    address: "Bole Road, Friendship Building",
    city: "Addis Ababa",
    state: "Addis Ababa",
    zip: "1000",
    phone: "0115570000",
    distance: "0.8 km away",
    hours: "8:00 AM - 10:00 PM",
  };

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "home",
      type: "Home",
      name: "Abebe Kebede",
      street: "Bole Road, Sunshine Apartment 4B",
      city: "Addis Ababa",
      state: "Addis Ababa",
      zip: "1000",
      phone: "0911234567",
    },
    {
      id: "work",
      type: "Work",
      name: "Abebe Kebede",
      street: "Mexico Square, Dembel Tower, Floor 5",
      city: "Addis Ababa",
      state: "Addis Ababa",
      zip: "1000",
      phone: "0922345678",
    },
  ]);

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "mobile" | "cash"
  >("card");
  const [selectedCard, setSelectedCard] = useState("visa-4242");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "visa-4242",
      type: "card",
      cardType: "VISA",
      lastFour: "4242",
      expiryDate: "12/25",
    },
    {
      id: "mastercard-5678",
      type: "card",
      cardType: "MASTERCARD",
      lastFour: "5678",
      expiryDate: "10/26",
    },
    {
      id: "telebirr-1234",
      type: "mobile",
      mobileBankName: "Telebirr",
      mobileNumber: "0912345678",
    },
    {
      id: "cbe-birr-5678",
      type: "mobile",
      mobileBankName: "CBE Birr",
      mobileNumber: "0987654321",
    },
  ]);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(
    null
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Organic Bananas", quantity: 1, price: 3.99 },
    { id: 2, name: "Fresh Milk (1 Gallon)", quantity: 2, price: 4.5 },
    { id: 3, name: "Whole Grain Bread", quantity: 1, price: 3.25 },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [saveInfo, setSaveInfo] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState(
    "Today, 6:00 PM - 7:30 PM"
  );

  // Update this calculation to properly handle the delivery method
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = deliveryMethod === "delivery" ? 4.99 : 0; // No fee for pickup
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax - promoDiscount;

  const value = {
    currentStep,
    setCurrentStep,
    deliveryMethod,
    setDeliveryMethod,
    selectedAddress,
    setSelectedAddress,
    deliveryAddress,
    setDeliveryAddress,
    deliveryDetails,
    setDeliveryDetails,
    addresses,
    setAddresses,
    editingAddress,
    setEditingAddress,
    isEditingAddress,
    setIsEditingAddress,
    defaultStore,
    pickupTime,
    setPickupTime,
    pickupLocation,
    setPickupLocation,
    paymentMethod,
    setPaymentMethod,
    selectedCard,
    setSelectedCard,
    cartItems,
    subtotal,
    deliveryFee,
    tax,
    total,
    promoCode,
    setPromoCode,
    promoDiscount,
    setPromoDiscount,
    saveInfo,
    setSaveInfo,
    paymentMethods,
    setPaymentMethods,
    isEditingPayment,
    setIsEditingPayment,
    editingPayment,
    setEditingPayment,
    orderPlaced,
    setOrderPlaced,
    orderNumber,
    setOrderNumber,
    estimatedDelivery,
    setEstimatedDelivery,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
