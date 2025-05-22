import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/types/category"

interface CategoryCardProps {
  category: Category
  storeId: number
}

export function CategoryCard({ category, storeId }: CategoryCardProps) {
  return (
    <Link href={`/supermarket/${storeId}/products?category=${category.id}`} className="block">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <h3 className="text-sm font-medium">{category.name}</h3>
        </div>
      </div>
    </Link>
  )
}
