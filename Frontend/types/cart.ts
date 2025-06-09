export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  storeId?: number;
  storeName?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
} 