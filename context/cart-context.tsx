"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { CartItem } from "@/components/cart/cart";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setTotalItems(cartItems.reduce((sum, item) => sum + item.quantity, 0));
    setSubtotal(
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const idx = cartItems.findIndex(
      (ci) => ci.id === item.id && ci.storeId === item.storeId
    );
    if (idx >= 0) {
      const updated = [...cartItems];
      updated[idx].quantity += item.quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
