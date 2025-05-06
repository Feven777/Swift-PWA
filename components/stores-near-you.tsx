"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Supermarket } from "@/types/supermarket";
import { fetchSupermarkets } from "@/lib/api/supermarkets";

interface SupermarketCardProps {
  supermarket: Supermarket;
}

type FilterType = "fastest" | "rated" | "discounts" | null;

export default function StoresNearYou() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [stores, setStores] = useState<Supermarket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch supermarkets on mount
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSupermarkets();
        setStores(data);
      } catch (err) {
        console.error("Failed to load supermarkets", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation("Current Location");
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  };

  // Apply filter/sort
  const sortedStores = [...stores]
    .sort((a, b) => {
      if (activeFilter === "fastest") {
        return a.deliveryTimeMin - b.deliveryTimeMin;
      } else if (activeFilter === "rated") {
        return b.rating - a.rating;
      } else if (activeFilter === "discounts") {
        const aDisc = a.discount ? parseInt(a.discount.match(/\d+/)?.[0] || "0") : 0;
        const bDisc = b.discount ? parseInt(b.discount.match(/\d+/)?.[0] || "0") : 0;
        return bDisc - aDisc;
      }
      return 0;
    })
    .slice(0, 3); // only top 3

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Stores Near You</h2>
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

      {isLoading ? (
        <div className="text-center py-12">
          <p>Loading stores...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedStores.map((store) => (
            <Link href={`/supermarket/${store.id}`} key={store.id} className="block">
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
                        {store.rating} ({store.reviewCount}+ ratings)
                      </span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{store.deliveryTimeMin}-{store.deliveryTimeMax} min</span>
                      <span className="mx-1">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{store.distance} km</span>
                    </div>
                    {store.discount && (
                      <div className="mt-1 text-sm text-green-600 font-medium">
                        {store.discount}
                      </div>
                    )}
                    {activeFilter && store === sortedStores[0] && (
                      <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                        {activeFilter === "fastest"
                          ? "Fastest Delivery"
                          : activeFilter === "rated"
                          ? "Highest Rated"
                          : "Best Discount"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
