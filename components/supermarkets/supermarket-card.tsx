"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Supermarket } from "@/types/supermarket"

interface SupermarketCardProps {
  supermarket: Supermarket
}

export function SupermarketCard({ supermarket }: SupermarketCardProps) {
  const router = useRouter()

  const handleViewStore = () => {
    router.push(`/supermarket/${supermarket.id}`)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="relative h-40 w-full">
        <Image
          src={supermarket.image || "/placeholder.svg"}
          alt={supermarket.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white font-semibold text-lg">{supermarket.name}</div>
        <div className="absolute top-3 right-3 bg-white rounded-full h-8 w-8 flex items-center justify-center text-xs font-medium">
          {(supermarket.id % 3) + 1}
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{supermarket.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({supermarket.reviewCount})</span>
          <div className="ml-auto text-sm text-gray-600">{supermarket.distance} km</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {supermarket.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="text-xs font-normal">
              {category}
            </Badge>
          ))}
          {supermarket.plusEnabled && (
            <Badge variant="outline" className="text-xs font-normal ml-auto">
              +1
            </Badge>
          )}
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="ml-1 text-sm">
              {supermarket.deliveryTimeMin}-{supermarket.deliveryTimeMax} min
            </span>
          </div>
          <div className="ml-auto text-sm">
            {supermarket.deliveryFee === 0 ? (
              <span className="text-primary font-medium">Free delivery</span>
            ) : (
              <span>{supermarket.deliveryFee.toLocaleString()} Br delivery</span>
            )}
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-auto" onClick={handleViewStore}>
          View Store
        </Button>
      </div>
    </div>
  )
}
