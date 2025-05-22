"use client"
  
import { useState } from "react"
import { Trophy, Gift, ChevronRight, ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLoyalty } from "@/context/loyalty-context"

export default function LoyaltyPoints() {
  const [showDetails, setShowDetails] = useState(false)
  const { points, history, nextRewardThreshold, nextRewardDescription } = useLoyalty()

  const progressPercentage = (points / nextRewardThreshold) * 100
  const pointsNeeded = Math.max(0, nextRewardThreshold - points)

  return (
    <div>
      <div
        className="bg-white rounded-lg border border-green-100 p-3 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center justify-between">
          {/* Points Display */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-50 p-2 rounded-full">
              <Trophy className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-green-700">{points}</span>
                <span className="text-xs text-gray-500 ml-1">points</span>
              </div>
              <div className="text-xs text-gray-600">Loyalty Rewards</div>
            </div>
          </div>

          {/* Progress and Next Reward */}
          <div className="flex-1 max-w-[180px] mx-4 hidden sm:block">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, progressPercentage)}%` }}
              ></div>
            </div>
          </div>

          {/* Next Reward */}
          <div className="flex items-center text-xs">
            <Gift className="h-3 w-3 text-orange-500 mr-1 flex-shrink-0" />
            <span className="text-gray-600 hidden sm:inline">
              {pointsNeeded > 0 ? `${pointsNeeded} to ${nextRewardDescription}` : `Ready for ${nextRewardDescription}!`}
            </span>
            <span className="text-gray-600 sm:hidden">{pointsNeeded > 0 ? `${pointsNeeded} more` : "Ready!"}</span>
            {showDetails ? (
              <ChevronDown className="h-3 w-3 ml-1 text-gray-400" />
            ) : (
              <ChevronRight className="h-3 w-3 ml-1 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expandable details section */}
      {showDetails && (
        <div className="mt-2 p-4 bg-white rounded-lg border border-green-100 shadow-sm animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Recent Points Activity</h4>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last 30 days
            </span>
          </div>

          <div className="space-y-2 text-sm">
            {history.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex justify-between py-2 border-b">
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-xs text-gray-500">{transaction.date}</div>
                </div>
                <span className={`font-medium ${transaction.points >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {transaction.points >= 0 ? "+" : ""}
                  {transaction.points} points
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
              View All History
            </Button>

            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Redeem Points
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
