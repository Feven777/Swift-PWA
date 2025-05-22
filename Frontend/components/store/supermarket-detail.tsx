"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Phone, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/store/product-card";
import { ReviewCard } from "@/components/store/review-card";
import type { Supermarket } from "@/types/supermarket";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";

interface SupermarketDetailProps {
  supermarket: Supermarket;
}

export function SupermarketDetail({ supermarket }: SupermarketDetailProps) {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Organic Bananas",
      category: "Fresh Produce",
      categoryId: 1,
      price: 31.99,
      originalPrice: 42.99,
      image: "/banana.webp",
      rating: 4.8,
      isOnSale: true,
      supermarketId: supermarket.id,
    },
    {
      id: 2,
      name: "Whole Milk",
      category: "Dairy & Eggs",
      categoryId: 2,
      price: 34.49,
      originalPrice: null,
      image: "/milk.jpg",
      rating: 4.7,
      isOnSale: false,
      supermarketId: supermarket.id,
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      category: "Bakery",
      categoryId: 4,
      price: 44.29,
      originalPrice: 49.99,
      image: "/bread.jpg",
      rating: 4.6,
      isOnSale: false,
      supermarketId: supermarket.id,
    },
    {
      id: 4,
      name: "Chicken Breast",
      category: "Meat & Seafood",
      categoryId: 3,
      price: 83.99,
      originalPrice: null,
      image: "/chicken.jpg",
      rating: 4.9,
      isOnSale: false,
      supermarketId: supermarket.id,
    },
    {
      id: 5,
      name: "Avocados",
      category: "Fresh Produce",
      categoryId: 1,
      price: 27.49,
      originalPrice: null,
      image: "/avocado.webp",
      rating: 4.7,
      isOnSale: false,
      supermarketId: supermarket.id,
    },
    {
      id: 6,
      name: "Orange Juice",
      category: "Beverages",
      categoryId: 6,
      price: 33.99,
      originalPrice: 38.99,
      image: "/juice.jpg",
      rating: 4.5,
      isOnSale: true,
      supermarketId: supermarket.id,
    },
    {
      id: 7,
      name: "Frozen Pizza",
      category: "Frozen Foods",
      categoryId: 5,
      price: 55.99,
      originalPrice: null,
      image: "/pizza.png",
      rating: 4.2,
      isOnSale: false,
      supermarketId: supermarket.id,
    },
    {
      id: 8,
      name: "Cereal",
      category: "Breakfast",
      categoryId: 7,
      price: 42.49,
      originalPrice: null,
      image: "/cereal.jpg",
      rating: 4.0,
      isOnSale: false,
      supermarketId: supermarket.id,
    },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userName: "John Doe",
      rating: 5,
      comment:
        "Great selection of fresh produce and friendly staff. The prices are reasonable and the store is always clean.",
      date: "2 weeks ago",
      userImage: "/profile.jpg",
    },
    {
      id: 2,
      userName: "Jane Smith",
      rating: 4,
      comment: "Love shopping at FreshMart! They hit delivery times.",
      date: "1 month ago",
      userImage: "/profile2.jpg",
    },
    {
      id: 3,
      userName: "Robert Johnson",
      rating: 5,
      comment:
        "The service is fantastic and the staffs knig. Highly recommended!",
      date: "3 months ago",
      userImage: "/profile.jpg",
    },
  ]);

  const handleShopNow = () => {
    router.push(`/supermarket/${supermarket.id}/products`);
  };

  const handleViewAllProducts = () => {
    router.push(`/supermarket/${supermarket.id}/products`);
  };

  const handleGetDirections = () => {
    // Open Google Maps with the supermarket's address
    const address = encodeURIComponent(supermarket.address || "");
    const name = encodeURIComponent(supermarket.name);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${name}+${address}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80">
        <Image
          src={supermarket.image || "/placeholder.jpg"}
          alt={supermarket.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to {supermarket.name}
            </h1>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={handleShopNow}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-8 bg-white">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            About {supermarket.name}
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            {supermarket.description ||
              `${supermarket.name} is your neighborhood supermarket committed to providing the freshest produce, quality
              groceries, and exceptional service. We've been serving our community with a wide
              selection of products at competitive prices.`}
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>
                {supermarket.openingHours || "Open 7 days 8AM - 10PM"}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <span>{supermarket.phone || "(123)456-7890"}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2" />
              <span>{supermarket.email || "info@freshmart.com"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews and Map Section */}
      <section className="py-8 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-lg mr-2">
                    {supermarket.rating}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(supermarket.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({supermarket.reviewCount} reviews)
                  </span>
                </div>
                <Button variant="link" className="text-primary">
                  View All Reviews
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Find Us</h2>
              <div className="bg-gray-200 rounded-lg overflow-hidden h-64 relative">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                    supermarket.name +
                      " " +
                      (supermarket.address || "Addis Ababa")
                  )}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${supermarket.name} location map`}
                ></iframe>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">{supermarket.name}</h3>
                <p className="text-gray-600">
                  {supermarket.address || "123 Grocery Lane, Addis Ababa"}
                </p>
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="mr-2">
                    {supermarket.rating} ★
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {supermarket.distance} km from city center
                  </span>
                </div>
                <Button
                  className="w-full mt-3 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 bg-white">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Featured Products</h2>
            <Button
              variant="link"
              className="text-primary"
              onClick={handleViewAllProducts}
            >
              View All Products
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeId={supermarket.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
