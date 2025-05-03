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

  // redirect to auth if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  // redirect buyers back to home once we know user
  useEffect(() => {
    if (!isLoading && user?.role === "buyer") {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  // while redirecting buyers or unauthenticated, don't render page UI
  if (!user || user.role === "buyer") {
    return null
  }

  return (
    <DashboardLayout>
      {user.role === "manager" && <ManagerDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </DashboardLayout>
  )
}
