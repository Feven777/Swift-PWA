"use client"

import { useState, useEffect } from "react"

export function useSettings<T>(key: string, initialValue: T) {
  const [settings, setSettings] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(key)
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings))
      }
      setIsLoaded(true)
    } catch (error) {
      console.error(`Error loading settings for ${key}:`, error)
      setIsLoaded(true)
    }
  }, [key])

  // Save settings to localStorage
  const saveSettings = (newSettings: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newSettings))
      setSettings(newSettings)
      return true
    } catch (error) {
      console.error(`Error saving settings for ${key}:`, error)
      return false
    }
  }

  return { settings, saveSettings, isLoaded }
}
