"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Extended store type with discount field
type Store = {
  id: number;
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  deliveryMinutes: number; // For sorting
  distance: string;
  discount?: string; // Added discount field
};

const stores: Store[] = [
  {
    id: 1,
    name: "Shola sm",
    image: "/sm1.jpg?height=80&width=120&text=Shola+Market",
    rating: 4.7,
    ratingCount: 150,
    deliveryTime: "15-25 min",
    deliveryMinutes: 15,
    distance: "1.1 miles",
    discount: "10% off first order",
  },
  {
    id: 2,
    name: "Safeway sm",
    image: "/sm.jpg?height=80&width=120&text=Safeway",
    rating: 4.6,
    ratingCount: 150,
    deliveryTime: "20-30 min",
    deliveryMinutes: 20,
    distance: "2 miles",
    discount: "15% off selected items",
  },
  {
    id: 3,
    name: "Mafi city sm",
    image: "/shola.jpg?height=80&width=120&text=Mafi+City",
    rating: 4.5,
    ratingCount: 150,
    deliveryTime: "10-20 min",
    deliveryMinutes: 10,
    distance: "3 miles",
    discount: "20% off for new users",
  },
];

type FilterType = "fastest" | "rated" | "discounts" | null;

export default function StoresNearYou() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  // Function to handle filter selection
  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use the coordinates to get the actual address
          // For demo purposes, we'll just set a placeholder
          setUserLocation("Current Location");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Sort stores based on active filter
  const sortedStores = [...stores].sort((a, b) => {
    if (activeFilter === "fastest") {
      return a.deliveryMinutes - b.deliveryMinutes;
    } else if (activeFilter === "rated") {
      return b.rating - a.rating;
    } else if (activeFilter === "discounts") {
      // Simple sorting logic for discounts - in a real app, you'd parse the discount percentage
      const aDiscount = a.discount
        ? Number.parseInt(a.discount.match(/\d+/)?.[0] || "0")
        : 0;
      const bDiscount = b.discount
        ? Number.parseInt(b.discount.match(/\d+/)?.[0] || "0")
        : 0;
      return bDiscount - aDiscount;
    }
    return 0;
  });

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Supermarkets near you</h2>
          <button
            onClick={getUserLocation}
            className="ml-2 text-pink-500 cursor-pointer"
            aria-label="Use your location"
          >
            <Image
              src="/near.webp?height=24&width=24&text=Location"
              alt="Location"
              width={24}
              height={24}
              className="rounded-full"
            />
          </button>
          {userLocation && (
            <span className="ml-2 text-sm text-gray-600">({userLocation})</span>
          )}
        </div>
        <Link
          href="/supermarkets"
          className="text-sm text-gray-500 flex items-center"
        >
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="flex space-x-2 mb-4">
        <Badge
          variant={activeFilter === "fastest" ? "default" : "outline"}
          className={`flex items-center cursor-pointer ${
            activeFilter === "fastest" ? "bg-green-600" : "bg-white"
          }`}
          onClick={() => handleFilterClick("fastest")}
        >
          <span className="mr-1">Fastest Delivery</span>
          <Image
            src="/fast.png?height=16&width=16&text=Fast"
            alt="Fast"
            width={16}
            height={16}
            className="rounded-full"
          />
        </Badge>
        <Badge
          variant={activeFilter === "rated" ? "default" : "outline"}
          className={`flex items-center cursor-pointer ${
            activeFilter === "rated" ? "bg-green-600" : "bg-white"
          }`}
          onClick={() => handleFilterClick("rated")}
        >
          <span className="mr-1">Top Rated</span>
          <Image
            src="/topRate.png?height=16&width=16&text=Star"
            alt="Star"
            width={16}
            height={16}
            className="rounded-full"
          />
        </Badge>
        <Badge
          variant={activeFilter === "discounts" ? "default" : "outline"}
          className={`flex items-center cursor-pointer ${
            activeFilter === "discounts" ? "bg-green-600" : "bg-white"
          }`}
          onClick={() => handleFilterClick("discounts")}
        >
          <span className="mr-1">Best Discounts</span>
          <Image
            src="/discount.jpg?height=16&width=16&text=Deal"
            alt="Deal"
            width={16}
            height={16}
            className="rounded-full"
          />
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedStores.map((store) => (
          <Link href={`/store/${store.id}`} key={store.id} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex p-4">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src={store.image || "/placeholder.svg"}
                    alt={store.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{store.name}</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-gray-700">
                      {store.rating} ({store.ratingCount}+ ratings)
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{store.deliveryTime}</span>
                    <span className="mx-1">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{store.distance}</span>
                  </div>
                  {store.discount && (
                    <div className="mt-1 text-sm text-green-600 font-medium">
                      {store.discount}
                    </div>
                  )}
                  {activeFilter === "fastest" && store === sortedStores[0] && (
                    <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                      Fastest Delivery
                    </Badge>
                  )}
                  {activeFilter === "rated" && store === sortedStores[0] && (
                    <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                      Highest Rated
                    </Badge>
                  )}
                  {activeFilter === "discounts" &&
                    store === sortedStores[0] && (
                      <Badge className="mt-2 bg-orange-100 text-orange-800 border-orange-200">
                        Best Discount
                      </Badge>
                    )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
