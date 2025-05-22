// components/SearchBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DUMMY_SUGGESTIONS = [
  "Milk",
  "Eggs",
  "Bananas",
  "Sugar",
  "Tomato",
  "Carrots",
];

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(stored);
  }, []);

  const saveToRecent = (term: string) => {
    const updated = [term, ...recentSearches.filter((q) => q !== term)].slice(
      0,
      5
    );
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecentSearches(updated);
  };

  const handleSubmit = (term: string) => {
    if (!term.trim()) return;
    saveToRecent(term);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const filteredSuggestions = DUMMY_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for groceries, brands, or categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-full bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        aria-label="Search"
        onMouseDown={() => handleSubmit(query)}
      >
        <span className="text-green-600 font-medium">→</span>
      </button>

      {showSuggestions &&
        (filteredSuggestions.length > 0 || recentSearches.length > 0) && (
          <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {debouncedQuery ? (
              filteredSuggestions.map((suggestion, i) => (
                <div
                  key={i}
                  onMouseDown={() => handleSubmit(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <>
                <div className="px-4 py-2 text-gray-500 text-sm">
                  Recent Searches
                </div>
                {recentSearches.map((term, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSubmit(term)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {term}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
    </div>
  );
}
