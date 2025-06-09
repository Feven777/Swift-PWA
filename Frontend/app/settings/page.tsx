"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { AdminSettings } from "@/components/settings/admin-settings"
import { ManagerSettings } from "@/components/settings/manager-settings"
import { BuyerSettings } from "@/components/settings/buyer-settings"
import { ErrorBoundary } from "@/components/error-boundary"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
      toast({
        title: "Authentication required",
        description: "Please sign in to access settings",
        variant: "destructive",
      })
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (user.role === "buyer") {
    router.push("/profile/settings")
    return null
  }

  return (
    <ErrorBoundary>
      <DashboardLayout>
        {user.role === "manager" && <ManagerSettings />}
        {user.role === "admin" && <AdminSettings />}
      </DashboardLayout>
    </ErrorBoundary>
  )
}