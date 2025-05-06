"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Product;
  storeId: number;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { cartItems, addToCart } = useCart();

  // Check if this product is already in the cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.category, // or use a dedicated 'description' field if you add one
      price: product.price,
      quantity: 1,
      image: product.image || "/placeholder.svg",
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      <div className="relative">
        {product.isOnSale && (
          <Badge className="absolute top-2 left-2 bg-secondary text-white">
            On Sale
          </Badge>
        )}
        <div className="relative h-40 w-full">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-center mb-1">
          <div className="flex text-yellow-400">
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
        </div>

        <h3 className="font-medium text-sm">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.category}</p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="font-semibold">
              {product.price.toLocaleString()} Br
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {product.originalPrice.toLocaleString()} Br
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant={isInCart ? "outline" : "default"}
            className={
              isInCart
                ? "border-primary text-primary"
                : "bg-primary hover:bg-primary/90 text-white"
            }
            onClick={handleAddToCart}
          >
            {isInCart ? "✓" : "+"}
          </Button>
        </div>
      </div>
    </div>
  );
}
