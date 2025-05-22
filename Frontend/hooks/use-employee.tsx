"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"

interface EmployeeContextType {
  isOnline: boolean
  setIsOnline: (online: boolean) => void
  notifications: {
    inApp: boolean
    email: boolean
  }
  setNotifications: (notifications: { inApp: boolean; email: boolean }) => void
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [isOnline, setIsOnlineState] = useState(false)
  const [notifications, setNotificationsState] = useState({
    inApp: true,
    email: false,
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    if (user?.id) {
      const storedSettings = localStorage.getItem(`employee_settings_${user.id}`)
      if (storedSettings) {
        try {
          const settings = JSON.parse(storedSettings)
          setIsOnlineState(settings.isOnline)
          setNotificationsState(settings.notifications)
        } catch (error) {
          console.error("Failed to parse employee settings:", error)
        }
      }
    }
  }, [user?.id])

  // Save settings to localStorage when they change
  const setIsOnline = useCallback(
    (online: boolean) => {
      setIsOnlineState(online)
      if (user?.id) {
        const settings = {
          isOnline: online,
          notifications,
        }
        localStorage.setItem(`employee_settings_${user.id}`, JSON.stringify(settings))
      }
    },
    [user?.id, notifications],
  )

  const setNotifications = useCallback(
    (newNotifications: { inApp: boolean; email: boolean }) => {
      setNotificationsState(newNotifications)
      if (user?.id) {
        const settings = {
          isOnline,
          notifications: newNotifications,
        }
        localStorage.setItem(`employee_settings_${user.id}`, JSON.stringify(settings))
      }
    },
    [user?.id, isOnline],
  )

  const value = {
    isOnline,
    setIsOnline,
    notifications,
    setNotifications,
  }

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
}

export function useEmployee() {
  const context = useContext(EmployeeContext)
  if (context === undefined) {
    throw new Error("useEmployee must be used within an EmployeeProvider")
  }
  return context
}
