// components/SearchBar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchItems, products } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "ig");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="font-bold text-green-600">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search logic
  const { products: foundProducts, supermarkets: foundSupermarkets } = searchItems(query);
  const allCategories = Array.from(new Set(products.map((p) => p.category)));
  const foundCategories = allCategories.filter((cat) => cat.toLowerCase().includes(query.toLowerCase()));

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!inputRef.current?.parentElement?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setShowDropdown(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          ref={inputRef}
          type="text"
          className="w-full pl-4 pr-4 py-2 border rounded-full"
          placeholder="Search for groceries, brands, or categories..."
          value={query}
          onChange={handleInput}
          onFocus={() => setShowDropdown(true)}
        />
      </form>
      {showDropdown && query && (
        <div className="absolute left-0 right-0 bg-white border rounded-b-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
          {/* Products */}
          <div>
            <div className="px-4 pt-2 pb-1 text-xs text-gray-500 font-semibold">Products</div>
            {foundProducts.length ? (
              foundProducts.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <Image src={product.image} alt={product.name} width={32} height={32} className="rounded" />
                  <div>
                    <div>{highlightMatch(product.name, query)}</div>
                    <div className="text-xs text-gray-500">{highlightMatch(product.category, query)}</div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">No products found.</div>
            )}
          </div>
          {/* Categories */}
          <div>
            <div className="px-4 pt-2 pb-1 text-xs text-gray-500 font-semibold">Categories</div>
            {foundCategories.length ? (
              foundCategories.slice(0, 5).map((cat) => (
                <Link
                  key={cat}
                  href={`/search?q=${encodeURIComponent(cat)}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  {highlightMatch(cat, query)}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">No categories found.</div>
            )}
          </div>
          {/* Supermarkets */}
          <div>
            <div className="px-4 pt-2 pb-1 text-xs text-gray-500 font-semibold">Supermarkets</div>
            {foundSupermarkets.length ? (
              foundSupermarkets.slice(0, 5).map((sm) => (
                <Link
                  key={sm.id}
                  href={`/supermarkets/${sm.id}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <Image src={sm.image} alt={sm.name} width={32} height={32} className="rounded" />
                  <div>{highlightMatch(sm.name, query)}</div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">No supermarkets found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
