"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Define user types
export type UserRole = "buyer" | "manager" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

// Define auth context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const mockUsers = [
  {
    id: "1",
    name: "Buyer Demo",
    email: "buyer@example.com",
    password: "password123",
    role: "buyer" as UserRole,
  },
  {
    id: "2",
    name: "Manager Demo",
    email: "manager@example.com",
    password: "password123",
    role: "manager" as UserRole,
  },
  {
    id: "3",
    name: "Admin Demo",
    email: "admin@example.com",
    password: "password123",
    role: "admin" as UserRole,
  },
]

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("swift_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("swift_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user in mock data
    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("swift_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    const emailExists = mockUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())

    if (emailExists) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role,
    }

    // In a real app, we would save this to a database
    // For now, we'll just set the current user
    setUser(newUser)
    localStorage.setItem("swift_user", JSON.stringify(newUser))

    setIsLoading(false)
    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("swift_user")
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
