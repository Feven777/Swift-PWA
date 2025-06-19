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
<<<<<<< HEAD
=======
import { useAuth } from "@/hooks/use-auth"
import { User as LucideUser, Mail, Phone, MapPin, Store } from "lucide-react"
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720

interface ManagerProfileProps {
  user: User
}

interface SupermarketInfo {
  id: number
  name: string
  address: string
  phone: string
  email: string
  logo: string
  openingHours: string
  description: string
}

interface ManagerStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
}

export function ManagerProfile({ user }: ManagerProfileProps) {
  const { toast } = useToast()
<<<<<<< HEAD
=======
  const { updateProfile } = useAuth()
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    bio: "Supermarket manager with expertise in inventory management and customer service.",
    phone: "+251 91 234 5678",
    location: "Addis Ababa, Ethiopia",
  })

<<<<<<< HEAD

=======
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
  // Notification preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    browser: true,
    mobile: false,
    orderNotifications: true,
    inventoryAlerts: true,
    customerReviews: true,
    promotionalUpdates: false,
  })

  // Mock supermarket info
  const [supermarket] = useState<SupermarketInfo>({
    id: 1,
    name: "Fresh Market",
    address: "Bole Road, Addis Ababa",
    phone: "+251 11 234 5678",
    email: "info@freshmarket.com",
    logo: "/placeholder.svg?height=128&width=128",
    openingHours: "8:00 AM - 10:00 PM",
    description: "A premium supermarket offering fresh produce, groceries, and household items.",
  })

  // Mock manager stats
  const [stats] = useState<ManagerStats>({
    totalProducts: 1245,
    totalOrders: 867,
    totalRevenue: 324500,
    totalCustomers: 542,
  })

  // Handle profile form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
<<<<<<< HEAD
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would update the user profile here

=======
      await updateProfile(profileForm)
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
<<<<<<< HEAD

=======
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
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

<<<<<<< HEAD


=======
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
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

  // Handle supermarket info submission
  const handleSupermarketSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would update the supermarket info here

      toast({
        title: "Supermarket updated",
        description: "Supermarket information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update supermarket information. Please try again.",
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
          <p className="text-muted-foreground">Manage your account settings and supermarket information</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge variant="outline" className="text-primary border-primary">
            Supermarket Manager
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
                src= {user.avatarUrl || "/profile2.jpg"}
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
              <p className="text-sm text-muted-foreground mt-1">Manager at {supermarket.name}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
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
              <TabsTrigger value="supermarket">Supermarket</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
<<<<<<< HEAD
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
=======
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <LucideUser className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
                        <Input
                          id="name"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          disabled={!isEditing || isLoading}
<<<<<<< HEAD
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
=======
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          disabled={!isEditing || isLoading}
<<<<<<< HEAD
=======
                          className="pl-9"
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
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

<<<<<<< HEAD
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
=======
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          disabled={!isEditing || isLoading}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
                        <Input
                          id="location"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          disabled={!isEditing || isLoading}
<<<<<<< HEAD
=======
                          className="pl-9"
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
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

            {/* Supermarket Tab */}
            <TabsContent value="supermarket">
              <Card>
                <form onSubmit={handleSupermarketSubmit}>
                  <CardHeader>
                    <CardTitle>Supermarket Information</CardTitle>
                    <CardDescription>Manage your supermarket details and settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4 mb-6">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-input">
                        <Image
                          src={supermarket.logo || "/placeholder.svg"}
                          alt={supermarket.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                          <Icon icon="mdi:camera" className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Supermarket Logo</p>
                    </div>

<<<<<<< HEAD
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="supermarket-name">Supermarket Name</Label>
                        <Input id="supermarket-name" defaultValue={supermarket.name} disabled={isLoading} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supermarket-email">Email</Label>
                        <Input
                          id="supermarket-email"
                          type="email"
                          defaultValue={supermarket.email}
                          disabled={isLoading}
                        />
                      </div>
=======
                    <div className="space-y-2">
                      <Label htmlFor="supermarket-name">Supermarket Name</Label>
                      <Input id="supermarket-name" defaultValue={supermarket.name} disabled={isLoading} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supermarket-email">Email</Label>
                      <Input
                        id="supermarket-email"
                        type="email"
                        defaultValue={supermarket.email}
                        disabled={isLoading}
                      />
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supermarket-description">Description</Label>
                      <Textarea
                        id="supermarket-description"
                        defaultValue={supermarket.description}
                        disabled={isLoading}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supermarket-address">Address</Label>
                      <Input id="supermarket-address" defaultValue={supermarket.address} disabled={isLoading} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="supermarket-phone">Phone</Label>
                        <Input id="supermarket-phone" defaultValue={supermarket.phone} disabled={isLoading} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opening-hours">Opening Hours</Label>
                        <Input id="opening-hours" defaultValue={supermarket.openingHours} disabled={isLoading} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Store Performance</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-sm font-medium">Total Revenue</p>
                          <p className="text-xl font-bold">Br {stats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-sm font-medium">Customers</p>
                          <p className="text-xl font-bold">{stats.totalCustomers}</p>
                        </div>
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
                          <Label htmlFor="order-notifications">New Orders</Label>
                          <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                        </div>
                        <Switch
                          id="order-notifications"
                          checked={notificationPreferences.orderNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, orderNotifications: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when products are running low on stock
                          </p>
                        </div>
                        <Switch
                          id="inventory-alerts"
                          checked={notificationPreferences.inventoryAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, inventoryAlerts: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="customer-reviews">Customer Reviews</Label>
                          <p className="text-sm text-muted-foreground">Get notified when customers leave reviews</p>
                        </div>
                        <Switch
                          id="customer-reviews"
                          checked={notificationPreferences.customerReviews}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, customerReviews: checked })
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="promotional-updates">Promotional Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about platform promotions and updates
                          </p>
                        </div>
                        <Switch
                          id="promotional-updates"
                          checked={notificationPreferences.promotionalUpdates}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences({ ...notificationPreferences, promotionalUpdates: checked })
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
          </Tabs>
        </div>
      </div>
    </div>
  )
}
