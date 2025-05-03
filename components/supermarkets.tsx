"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SupermarketCard } from "@/components/supermarket-card";
import type { Supermarket } from "@/types/supermarket";
import { fetchSupermarkets } from "@/lib/api";

export function Supermarkets() {
  const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
  const [filteredSupermarkets, setFilteredSupermarkets] = useState<
    Supermarket[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<string>("All");
  const [priceFilter, setPriceFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("Recommended");
  const [isLoading, setIsLoading] = useState(true);

  // 1️⃣ Load data once
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchSupermarkets();
        setSupermarkets(data);
        setFilteredSupermarkets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // 2️⃣ Whenever any filter/search/sort changes, re-apply
  useEffect(() => {
    let list = [...supermarkets];

    // — search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((m) => m.name.toLowerCase().includes(q));
    }

    // — distance
    if (distanceFilter !== "All") {
      const max = parseFloat(distanceFilter);
      list = list.filter((m) => m.distance <= max);
    }

    // — category
    if (categoryFilter !== "All") {
      list = list.filter((m) => m.categories.includes(categoryFilter));
    }

    // — price sort
    if (priceFilter === "Low to High") {
      list.sort((a, b) => a.deliveryFee - b.deliveryFee);
    } else if (priceFilter === "High to Low") {
      list.sort((a, b) => b.deliveryFee - a.deliveryFee);
    }

    // — other sorts
    if (sortOption === "Distance") {
      list.sort((a, b) => a.distance - b.distance);
    } else if (sortOption === "Rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Delivery Time") {
      list.sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);
    }

    setFilteredSupermarkets(list);
  }, [
    supermarkets,
    searchQuery,
    distanceFilter,
    priceFilter,
    categoryFilter,
    sortOption,
  ]);

  return (
    <section className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Supermarkets</h1>
        <p className="text-gray-600 mb-6">
          Browse supermarkets and retail stores available for delivery in your
          area
        </p>

        {/* — Search-as-you-type (no form) */}
        <div className="mb-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search supermarkets..."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* — Filters & Sort */}
        <div className="flex flex-wrap gap-2 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Distance <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["All", "1 km", "3 km", "5 km", "10 km"].map((d) => (
                <DropdownMenuItem key={d} onClick={() => setDistanceFilter(d)}>
                  {d === "All" ? "All" : `Under ${d}`}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Price <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["All", "Low to High", "High to Low"].map((p) => (
                <DropdownMenuItem key={p} onClick={() => setPriceFilter(p)}>
                  {p}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Categories <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["All", "Grocery", "Organic", "Bakery", "Butcher"].map((c) => (
                <DropdownMenuItem key={c} onClick={() => setCategoryFilter(c)}>
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-1 ml-auto"
              >
                Sort <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Recommended", "Distance", "Rating", "Delivery Time"].map(
                (s) => (
                  <DropdownMenuItem key={s} onClick={() => setSortOption(s)}>
                    {s}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* — List or skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupermarkets.map((m) => (
              <SupermarketCard key={m.id} supermarket={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
