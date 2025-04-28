"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LoyaltyContextType {
  points: number
  addPoints: (amount: number) => void
  history: PointTransaction[]
  nextRewardThreshold: number
  nextRewardDescription: string
}

interface PointTransaction {
  id: string
  description: string
  date: string
  points: number
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined)

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(120)
  const [history, setHistory] = useState<PointTransaction[]>([
    {
      id: "1",
      description: "Order #12345",
      date: "March 25, 2025",
      points: 15,
    },
    {
      id: "2",
      description: "Order #12346",
      date: "March 20, 2025",
      points: 25,
    },
    {
      id: "3",
      description: "10% Discount Redeemed",
      date: "March 15, 2025",
      points: -50,
    },
  ])

  const nextRewardThreshold = 150
  const nextRewardDescription = "10% off"

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount)

    const newTransaction = {
      id: Date.now().toString(),
      description: `Order #${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      points: amount,
    }

    setHistory((prev) => [newTransaction, ...prev])
  }

  return (
    <LoyaltyContext.Provider value={{ points, addPoints, history, nextRewardThreshold, nextRewardDescription }}>
      {children}
    </LoyaltyContext.Provider>
  )
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext)
  if (context === undefined) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider")
  }
  return context
}
