"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { useEmployee } from "@/hooks/use-employee"
import { ToggleSwitch } from "@/components/employee/toggle-switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function EmployeeProfilePage() {
  const { user, isLoading: authLoading, logout } = useAuth()
  const { isOnline, setIsOnline, notifications, setNotifications } = useEmployee()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "employee")) {
      router.push("/auth")
    }
  }, [user, authLoading, router])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/auth")
  }

  if (authLoading) {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Profile & Settings</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ToggleSwitch
                value={isOnline}
                onChange={setIsOnline}
                label="Available for Orders"
                description={isOnline ? "You are currently available to claim orders" : "You are currently offline"}
              />
              <p className="text-sm text-gray-500">
                When you're available, you'll be able to claim and process new orders. Toggle this off when you're not
                working.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ToggleSwitch
                value={notifications.inApp}
                onChange={(value) => setNotifications({ ...notifications, inApp: value })}
                label="In-app Alerts"
                description="Receive notifications within the application"
              />
              <ToggleSwitch
                value={notifications.email}
                onChange={(value) => setNotifications({ ...notifications, email: value })}
                label="Email Notifications"
                description="Receive notifications via email"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
