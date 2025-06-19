export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  storeId?: number;
  storeName?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "buyer" | "manager" | "admin" | "employee";
  phone?: string;
  address?: string;
  supermarketId?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  supermarketId: number;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  total: number;
  createdAt: string;
  updatedAt: string;
  deliveryAddress: string;
  paymentMethod: "CASH" | "CARD";
}

export interface Supermarket {
  id: number;
  name: string;
  description: string;
  image: string;
  address: string;
  rating: number;
  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: string;
} 