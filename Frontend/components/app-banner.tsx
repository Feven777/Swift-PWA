"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AppBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-[#f0f9f6] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">📱</span>
            <span className="text-sm text-gray-700">Get our app for a better experience!</span>
          </div>
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-2 text-green-600 border-green-600 hover:bg-green-50">
              Install
            </Button>
            <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
