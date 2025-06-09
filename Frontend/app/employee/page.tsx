"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { EmployeeDashboard } from "@/components/dashboard/employee-dashboard"
import { OrderNotifications } from "@/components/employee/order-notifications"

export default function EmployeePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "employee")) {
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

  if (!user || user.role !== "employee") {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        <OrderNotifications />
        <EmployeeDashboard />
      </div>
    </DashboardLayout>
  )
}
