"use client";
import { useState } from "react";
import { Supermarkets } from "@/components/supermarkets/supermarkets";
import { SupermarketsHeader } from "@/components/supermarkets/supermarkets-header";

export function SupermarketsPageContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <SupermarketsHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Supermarkets searchQuery={searchQuery} />
    </main>
  );
} 