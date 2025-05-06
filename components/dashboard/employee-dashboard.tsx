"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useOrders } from "@/hooks/use-orders"
import { useEmployee } from "@/hooks/use-employee"
import { useAuth } from "@/hooks/use-auth"
import { StatCard } from "@/components/employee/stat-card"
import { ToggleSwitch } from "@/components/employee/toggle-switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EmployeeDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const { isOnline, setIsOnline } = useEmployee()
  const { getOrderCountByStatus } = useOrders()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user || user.role !== "employee") {
      router.push("/auth")
    }
  }, [user, router])

  // Get order counts for the current employee's supermarket
  const unclaimedCount = getOrderCountByStatus("unclaimed")
  const preparingCount = getOrderCountByStatus("preparing")
  const readyCount = getOrderCountByStatus("ready")

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          {user?.supermarketName && <p className="text-sm text-muted-foreground">{user.supermarketName}</p>}
        </div>
        <div className="mt-4 sm:mt-0">
          <ToggleSwitch
            value={isOnline}
            onChange={setIsOnline}
            label="Available for Orders"
            description={isOnline ? "You are currently available to claim orders" : "You are currently offline"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Unclaimed Orders"
          count={unclaimedCount}
          link="/employee/orders?status=unclaimed"
          icon="mdi:package-variant-closed"
          variant="primary"
        />
        <StatCard
          title="In Progress"
          count={preparingCount}
          link="/employee/orders?status=preparing"
          icon="mdi:package-variant"
          variant="warning"
        />
        <StatCard
          title="Ready for Handoff"
          count={readyCount}
          link="/employee/orders?status=ready"
          icon="mdi:package-variant-closed-check"
          variant="success"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            {isOnline
              ? "You are online and can claim new orders. Check the unclaimed orders section to get started."
              : "You are currently offline. Toggle your availability to start claiming orders."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
