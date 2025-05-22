"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuantitySelector from "@/components/cart/quantity-selector";
import OrderSummary from "@/components/cart/order-summary";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { off } from "node:process";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } =
    useCart();

  const shipping = 150;
  const tax = 0.15 * subtotal; // Assuming tax is 15% of subtotal
  const total = subtotal + shipping + tax;

  const router = useRouter(); // ✅ Initialize router

  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 md:py-8">
        <h1 className="text-2xl font-bold text-green-500 mb-6">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                Cart Items ({cartItems.length})
              </h2>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link
                  href="/" 
                  className="text-green-500 hover:text-green-600 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                  >
                    <div className="w-24 h-24 bg-yellow-300 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          onDecrease={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        />
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <span className="font-medium">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />

            <div className="mt-4 space-y-3">
              <button
                onClick={() => router.push("/checkout")} // ✅ Navigate on click
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium transition-colors"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/" 
                className="block text-center text-orange-400 hover:text-orange-500 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
