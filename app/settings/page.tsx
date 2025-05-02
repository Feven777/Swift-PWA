"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { AdminSettings } from "@/components/settings/admin-settings"
import { ManagerSettings } from "@/components/settings/manager-settings"
import { BuyerSettings } from "@/components/settings/buyer-settings"

export default function SettingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }
  if (user.role === "buyer") {
    router.push("/profile/setting/page.tsx")
    return
  }

  return (
    <DashboardLayout>
      {user.role === "manager" && <ManagerSettings />}
      {user.role === "admin" && <AdminSettings />}
    </DashboardLayout>

  )}