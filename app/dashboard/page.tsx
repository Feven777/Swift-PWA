"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { ManagerDashboard } from "@/components/dashboard/manager-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
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
    router.push("/")
    return
  }

  return (
    <DashboardLayout>
      {user.role === "manager" && <ManagerDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </DashboardLayout>
  )
}
