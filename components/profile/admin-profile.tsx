"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@/types/user"

interface AdminProfileProps {
  user: User
}

interface AdminStats {
  totalSupermarkets: number
  totalUsers: number
  totalProducts: number
  totalOrders: number
}

export function AdminProfile({ user }: AdminProfileProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    bio: "Platform administrator with 5+ years of experience in e-commerce management.",
    phone: "+251 91 234 5678",
    location: "Addis Ababa, Ethiopia",
  })

  // Notification preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    browser: true,
    mobile: false,
    weeklyReports: true,
    securityAlerts: true,
    marketingUpdates: false,
  })

  // Mock admin stats
  const [stats] = useState<AdminStats>({
    totalSupermarkets: 24,
    totalUsers: 1458,
    totalProducts: 8742,
    totalOrders: 3291,
  })

  // Handle profile form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would update the user profile here

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  

  // Handle notification preferences submission
  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would update the notification preferences here

      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge variant="outline" className="text-primary border-primary">
            Administrator
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10">
              <Image
                src={user.avatarUrl ?? "/profile.jpg"}
                alt={user.name}
                width={128}
                height={128}
                className="object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                <Icon icon="mdi:camera" className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground mt-1">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{stats.totalSupermarkets}</p>
                <p className="text-xs text-muted-foreground">Supermarkets</p>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </Button>
          </CardFooter>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="account" className="space-y-4">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <form onSubmit={handleProfileSubmit}>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your account information and profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          disabled={!isEditing || isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          disabled={!isEditing || isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        disabled={!isEditing || isLoading}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          disabled={!isEditing || isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          disabled={!isEditing || isLoading}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={!isEditing || isLoading} className="ml-auto">
                      {isLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Icon icon="mdi:content-save" className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <form onSubmit={handleNotificationSubmit}>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Channels</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notificationPreferences.email}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, email: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="browser-notifications">Browser Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                        </div>
                        <Switch
                          id="browser-notifications"
                          checked={notificationPreferences.browser}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, browser: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mobile-notifications">Mobile Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications on your mobile device</p>
                        </div>
                        <Switch
                          id="mobile-notifications"
                          checked={notificationPreferences.mobile}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, mobile: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="weekly-reports">Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">Receive weekly platform performance reports</p>
                        </div>
                        <Switch
                          id="weekly-reports"
                          checked={notificationPreferences.weeklyReports}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, weeklyReports: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="security-alerts">Security Alerts</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts about security issues</p>
                        </div>
                        <Switch
                          id="security-alerts"
                          checked={notificationPreferences.securityAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, securityAlerts: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-updates">Marketing Updates</Label>
                          <p className="text-sm text-muted-foreground">Receive marketing and promotional updates</p>
                        </div>
                        <Switch
                          id="marketing-updates"
                          checked={notificationPreferences.marketingUpdates}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, marketingUpdates: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading} className="ml-auto">
                      {isLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Icon icon="mdi:content-save" className="mr-2 h-4 w-4" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent activity on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Added new supermarket",
                        target: "Fresh Mart",
                        time: "2 hours ago",
                        icon: "mdi:store-plus",
                      },
                      {
                        action: "Updated platform settings",
                        target: "Delivery fees",
                        time: "Yesterday",
                        icon: "mdi:cog",
                      },
                      {
                        action: "Approved manager account",
                        target: "John Doe",
                        time: "2 days ago",
                        icon: "mdi:account-check",
                      },
                      {
                        action: "Generated monthly report",
                        target: "April 2023",
                        time: "1 week ago",
                        icon: "mdi:file-chart",
                      },
                      {
                        action: "Updated user permissions",
                        target: "Manager role",
                        time: "2 weeks ago",
                        icon: "mdi:shield-account",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Icon icon={activity.icon} className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.target}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
