"use client";

import type React from "react";

import { useState } from "react";
import ProfileSidebar from "@/components/profile-sidebar";
import OrdersList from "@/components/orders-list";
import LoyaltyPoints from "@/components/loyalty-points";
import { SearchIcon } from "lucide-react";

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // In a real app, you would filter orders based on the search query
    // or make an API call to search orders
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Profile Sidebar - Visible on all devices */}
        <div>
          <ProfileSidebar activePage="orders" />
        </div>

        {/* Main Content */}
        <div>
          {/* Loyalty Points Section */}
          <div className="mb-4">
            <LoyaltyPoints />
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Your Orders
            </h1>
            <div className="relative w-full max-w-md ml-auto hidden md:block">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={handleSearch}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Mobile Search - Only visible on mobile */}
          <div className="relative w-full mb-6 md:hidden">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Orders List */}
          <OrdersList />
        </div>
      </div>
    </div>
  );
}
