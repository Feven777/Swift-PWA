import Image from "next/image"
import { Star } from "lucide-react"
import type { Review } from "@/types/review"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <Image
            src={review.userImage || "/placeholder.svg"}
            alt={review.userName}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{review.userName}</h4>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
          <div className="flex my-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  )
}
