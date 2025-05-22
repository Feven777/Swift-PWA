"use client"

import { useState } from "react"
import { MapPin, X, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Ethiopian cities
const ethiopianCities = [
  "Addis Ababa",
  "Dire Dawa",
  "Bahir Dar",
  "Hawassa",
  "Mekelle",
  "Adama",
  "Gondar",
  "Jimma",
  "Dessie",
  "Bishoftu",
  "Sodo",
  "Jijiga",
  "Shashemene",
  "Arba Minch",
  "Hosaena",
  "Harar",
  "Dilla",
  "Nekemte",
  "Debre Birhan",
  "Asella",
]

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useState("Addis Ababa")
  const [searchTerm, setSearchTerm] = useState("")

  const handleLocationSelect = (city: string) => {
    setLocation(city)
    setIsOpen(false)
  }

  const filteredCities = ethiopianCities.filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-sm hover:text-green-500 transition-colors">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700">Delivering to: {location}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select delivery location</DialogTitle>
        </DialogHeader>
        <div className="relative my-2">
          <input
            type="text"
            placeholder="Search for a city in Ethiopia..."
            className="w-full py-2 pl-10 pr-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {filteredCities.length > 0 ? (
            <div className="grid grid-cols-1 gap-1">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  className={`text-left p-3 rounded-md hover:bg-gray-100 transition-colors ${
                    location === city ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => handleLocationSelect(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No cities found. Try a different search term.</div>
          )}
        </div>

        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-2">Or enter a custom address:</div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your address"
              className="flex-1 py-2 px-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
