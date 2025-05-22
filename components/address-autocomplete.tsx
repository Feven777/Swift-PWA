"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { MapPin, X } from "lucide-react";

// Mock `setDeliveryAddress` function
const setDeliveryAddress = (address: string) => {
  console.log("Delivery address set to:", address);
};

// Mock addresses for demonstration
const mockAddresses = [
  "22 Bole Street, Addis Ababa",
  "4 Kilo, Arat Kilo Square, Addis Ababa",
  "Meskel Flower Road, Addis Ababa",
  "Piassa, Churchill Avenue, Addis Ababa",
  "Kazanchis, Addis Ababa",
  "Bole Medhanealem, Addis Ababa",
  "Gerji, Addis Ababa",
  "CMC Road, Addis Ababa",
  "Mexico Square, Addis Ababa",
  "Sarbet, Addis Ababa",
];

export default function AddressAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      setSuggestions(
        mockAddresses.filter((address) =>
          address.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectAddress = (address: string) => {
    setInputValue(address);
    setDeliveryAddress(address);
    setSuggestions([]);
  };

  const handleClearInput = () => {
    setInputValue("");
    setDeliveryAddress("");
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your delivery address"
        />
        {inputValue && (
          <button
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={handleClearInput}
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {suggestions.length > 0 && isFocused && (
        <ul
          ref={suggestionsRef}
          className="absolute bg-white border rounded-lg mt-1 w-full z-10 shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((address, i) => (
            <li
              key={i}
              onClick={() => handleSelectAddress(address)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-start"
            >
              <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>{address}</span>
            </li>
          ))}
        </ul>
      )}

      {inputValue && (
        <p className="text-xs text-gray-500 mt-2">
          Please make sure your address is correct for accurate delivery.
        </p>
      )}
    </div>
  );
}
