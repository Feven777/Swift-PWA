"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSettings } from "@/hooks/use-settings"

export function AdminSettings() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Platform settings with useSettings hook
  const {
    settings: platformSettings,
    saveSettings: savePlatformSettings,
    isLoaded: platformSettingsLoaded,
  } = useSettings("adminPlatformSettings", {
    siteName: "Swift Grocery Delivery",
    siteDescription: "Order groceries for delivery from local supermarkets in Ethiopia",
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    defaultUserRole: "buyer",
  })

  // Notification settings with useSettings hook
  const {
    settings: notificationSettings,
    saveSettings: saveNotificationSettings,
    isLoaded: notificationSettingsLoaded,
  } = useSettings("adminNotificationSettings", {
    emailNotifications: true,
    newUserNotifications: true,
    newSupermarketNotifications: true,
    systemAlerts: true,
  })

  // Update account settings when user changes
  useEffect(() => {
    if (user) {
      setAccountSettings((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }))
    }
  }, [user])

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate passwords
    if (accountSettings.newPassword && accountSettings.newPassword !== accountSettings.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to update the user
      if (user) {
        // For demo purposes, we'll just show a success message
        toast({
          title: "Account updated",
          description: "Your account settings have been updated successfully.",
        })
      }

      // Clear password fields after successful update
      setAccountSettings({
        ...accountSettings,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setIsLoading(false)
    }, 1000)
  }

  const handlePlatformSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Save platform settings using our hook
    setTimeout(() => {
      const success = savePlatformSettings(platformSettings)

      if (success) {
        toast({
          title: "Platform settings updated",
          description: "Platform settings have been updated successfully.",
        })
      } else {
        toast({
          title: "Error saving settings",
          description: "There was a problem saving your platform settings.",
          variant: "destructive",
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Save notification settings using our hook
    setTimeout(() => {
      const success = saveNotificationSettings(notificationSettings)

      if (success) {
        toast({
          title: "Notification settings updated",
          description: "Your notification preferences have been updated.",
        })
      } else {
        toast({
          title: "Error saving settings",
          description: "There was a problem saving your notification settings.",
          variant: "destructive",
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  if (!platformSettingsLoaded || !notificationSettingsLoaded) {
    return <div>Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and platform preferences.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <form onSubmit={handleAccountSubmit}>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and change your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={accountSettings.name}
                    onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                  />
                </div>

                <Separator className="my-4" />

              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
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

        <TabsContent value="platform" className="space-y-4">
          <Card>
            <form onSubmit={handlePlatformSubmit}>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure global platform settings and defaults.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={platformSettings.siteName}
                    onChange={(e) => savePlatformSettings({ ...platformSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input
                    id="site-description"
                    value={platformSettings.siteDescription}
                    onChange={(e) => savePlatformSettings({ ...platformSettings, siteDescription: e.target.value })}
                  />
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the site in maintenance mode for all users except admins.
                    </p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={platformSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      savePlatformSettings({ ...platformSettings, maintenanceMode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-registrations">Allow Registrations</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register on the platform.</p>
                  </div>
                  <Switch
                    id="allow-registrations"
                    checked={platformSettings.allowRegistrations}
                    onCheckedChange={(checked) =>
                      savePlatformSettings({ ...platformSettings, allowRegistrations: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-verification">Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Require users to verify their email before accessing the platform.
                    </p>
                  </div>
                  <Switch
                    id="email-verification"
                    checked={platformSettings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      savePlatformSettings({ ...platformSettings, requireEmailVerification: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
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

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <form onSubmit={handleNotificationSubmit}>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure which notifications you want to receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      saveNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-user-notifications">New User Registrations</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new users register.</p>
                  </div>
                  <Switch
                    id="new-user-notifications"
                    checked={notificationSettings.newUserNotifications}
                    onCheckedChange={(checked) =>
                      saveNotificationSettings({ ...notificationSettings, newUserNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-supermarket-notifications">New Supermarket Registrations</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new supermarkets are added.</p>
                  </div>
                  <Switch
                    id="new-supermarket-notifications"
                    checked={notificationSettings.newSupermarketNotifications}
                    onCheckedChange={(checked) =>
                      saveNotificationSettings({ ...notificationSettings, newSupermarketNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive important system alerts and updates.</p>
                  </div>
                  <Switch
                    id="system-alerts"
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) =>
                      saveNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
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
      </Tabs>
    </div>
  )
}
