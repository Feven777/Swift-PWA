"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface SupermarketAdmin {
  id: number
  name: string
  manager: string
  managerEmail: string
  location: string
  products: number
  orders: number
  status: "active" | "pending" | "suspended"
  joinDate: string
  description?: string
  phone?: string
  email?: string
  openingHours?: string
}

export default function SupermarketsAdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [supermarkets, setSupermarkets] = useState<SupermarketAdmin[]>([])
  const [filteredSupermarkets, setFilteredSupermarkets] = useState<SupermarketAdmin[]>([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentSupermarket, setCurrentSupermarket] = useState<SupermarketAdmin | null>(null)
  const [editedSupermarket, setEditedSupermarket] = useState<Partial<SupermarketAdmin>>({})

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }

    // Fetch supermarkets (mock data for now)
    const mockSupermarkets: SupermarketAdmin[] = [
      {
        id: 1,
        name: "Shola Supermarket",
        manager: "Manager Demo",
        managerEmail: "manager@example.com",
        location: "Bole Road, Addis Ababa",
        products: 145,
        orders: 32,
        status: "active",
        joinDate: "2023-01-15",
        description: "Known for fresh produce and affordable groceries.",
        phone: "(123)456-7890",
        email: "info@shola.com",
        openingHours: "8AM - 10PM",
      },
      {
        id: 2,
        name: "Safeway Supermarket",
        manager: "Jane Smith",
        managerEmail: "jane@example.com",
        location: "Meskel Square, Addis Ababa",
        products: 210,
        orders: 45,
        status: "active",
        joinDate: "2023-02-20",
        description: "High-quality products with imported goods.",
        phone: "(123)456-7891",
        email: "info@safeway.com",
        openingHours: "8AM - 9PM",
      },
      {
        id: 3,
        name: "Fresh Corner Market",
        manager: "Robert Johnson",
        managerEmail: "robert@example.com",
        location: "Kazanchis, Addis Ababa",
        products: 98,
        orders: 12,
        status: "pending",
        joinDate: "2023-05-05",
        description: "Specializing in organic and fresh food items.",
        phone: "(123)456-7892",
        email: "info@freshcorner.com",
        openingHours: "7AM - 9PM",
      },
      {
        id: 4,
        name: "Mafi City Mall Supermarket",
        manager: "Sarah Williams",
        managerEmail: "sarah@example.com",
        location: "Bole, Addis Ababa",
        products: 320,
        orders: 67,
        status: "active",
        joinDate: "2022-11-10",
        description: "A large retail store with diverse product categories.",
        phone: "(123)456-7893",
        email: "info@maficity.com",
        openingHours: "9AM - 10PM",
      },
      {
        id: 5,
        name: "Friendship Supermarket",
        manager: "Michael Brown",
        managerEmail: "michael@example.com",
        location: "Piassa, Addis Ababa",
        products: 175,
        orders: 28,
        status: "suspended",
        joinDate: "2023-03-12",
        description: "Offers both local and international brands.",
        phone: "(123)456-7894",
        email: "info@friendship.com",
        openingHours: "8AM - 8PM",
      },
    ]

    setSupermarkets(mockSupermarkets)
    setFilteredSupermarkets(mockSupermarkets)
  }, [isLoading, user, router])

  useEffect(() => {
    if (searchQuery) {
      const filtered = supermarkets.filter(
        (supermarket) =>
          supermarket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supermarket.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supermarket.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredSupermarkets(filtered)
    } else {
      setFilteredSupermarkets(supermarkets)
    }
  }, [searchQuery, supermarkets])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect above
  }

  const handleAddSupermarket = () => {
    // In a real app, this would navigate to a supermarket creation form
    toast({
      title: "Feature coming soon",
      description: "The add supermarket functionality will be available soon.",
    })
  }

  const handleEditSupermarket = (supermarket: SupermarketAdmin) => {
    setCurrentSupermarket(supermarket)
    setEditedSupermarket({
      name: supermarket.name,
      manager: supermarket.manager,
      managerEmail: supermarket.managerEmail,
      location: supermarket.location,
      status: supermarket.status,
      description: supermarket.description,
      phone: supermarket.phone,
      email: supermarket.email,
      openingHours: supermarket.openingHours,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteSupermarket = (supermarket: SupermarketAdmin) => {
    setCurrentSupermarket(supermarket)
    setIsDeleteDialogOpen(true)
  }

  const handleViewSupermarket = (supermarketId: number) => {
    router.push(`/supermarket/${supermarketId}`)
  }

  const handleUpdateStatus = (supermarketId: number, newStatus: "active" | "pending" | "suspended") => {
    const updatedSupermarkets = supermarkets.map((s) => {
      if (s.id === supermarketId) {
        return { ...s, status: newStatus }
      }
      return s
    })
    
    setSupermarkets(updatedSupermarkets)
    
    toast({
      title: "Status updated",
      description: `Supermarket status has been updated to ${newStatus}.`,
    })
  }

  const confirmEditSupermarket = () => {
    if (!currentSupermarket) return

    // Validate form
    if (!editedSupermarket.name || !editedSupermarket.manager || !editedSupermarket.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update supermarket
    const updatedSupermarkets = supermarkets.map((s) => {
      if (s.id === currentSupermarket.id) {
        return {
          ...s,
          name: editedSupermarket.name || s.name,
          manager: editedSupermarket.manager || s.manager,
          managerEmail: editedSupermarket.managerEmail || s.managerEmail,
          location: editedSupermarket.location || s.location,
          status: editedSupermarket.status || s.status,
          description: editedSupermarket.description || s.description,
          phone: editedSupermarket.phone || s.phone,
          email: editedSupermarket.email || s.email,
          openingHours: editedSupermarket.openingHours || s.openingHours,
        }
      }
      return s
    })

    // Update state
    setSupermarkets(updatedSupermarkets)

    // Reset and close dialog
    setCurrentSupermarket(null)
    setEditedSupermarket({})
    setIsEditDialogOpen(false)

    toast({
      title: "Supermarket updated",
      description: `${editedSupermarket.name} has been updated successfully.`,
    })
  }

  const confirmDeleteSupermarket = () => {
    if (!currentSupermarket) return

    // Remove supermarket
    const updatedSupermarkets = supermarkets.filter((s) => s.id !== currentSupermarket.id)

    // Update state
    setSupermarkets(updatedSupermarkets)

    // Reset and close dialog
    setCurrentSupermarket(null)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Supermarket deleted",
      description: "The supermarket has been deleted successfully.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Supermarkets</h1>
          <Button onClick={handleAddSupermarket}>
            <Icon icon="mdi:plus" className="mr-2 h-4 w-4" /> Add Supermarket
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search supermarkets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Icon icon="mdi:filter" className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilteredSupermarkets([...supermarkets])}>
                All Supermarkets
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilteredSupermarkets(supermarkets.filter((s) => s.status === "active"))}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilteredSupermarkets(supermarkets.filter((s) => s.status === "pending"))}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilteredSupermarkets(supermarkets.filter((s) => s.status === "suspended"))}
              >
                Suspended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSupermarkets.length > 0 ? (
                filteredSupermarkets.map((supermarket) => (
                  <TableRow key={supermarket.id}>
                    <TableCell className="font-medium">{supermarket.name}</TableCell>
                    <TableCell>
                      <div>
                        {supermarket.manager}
                        <div className="text-xs text-muted-foreground">{supermarket.managerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{supermarket.location}</TableCell>
                    <TableCell>{supermarket.products}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          supermarket.status === "active"
                            ? "success"
                            : supermarket.status === "pending"
                              ? "warning"
                              : "destructive"
                        }
                        className="capitalize"
                      >
                        {supermarket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewSupermarket(supermarket.id)}>
                          <Icon icon="mdi:dots-horizontal" className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditSupermarket(supermarket)}>
                          <Icon icon="mdi:pencil" className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSupermarket(supermarket)}>
                          <Icon icon="mdi:trash" className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No supermarkets found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Supermarket Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Supermarket</DialogTitle>
            <DialogDescription>Update supermarket information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Supermarket Name</Label>
                <Input
                  id="name"
                  value={editedSupermarket.name || ""}
                  onChange={(e) => setEditedSupermarket({ ...editedSupermarket, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editedSupermarket.status}
                  onChange={(e) =>
                    setEditedSupermarket({
                      ...editedSupermarket,
                      status: e.target.value as "active" | "pending" | "suspended",
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manager">Manager Name</Label>
                <Input
                  id="manager"
                  value={editedSupermarket.manager || ""}
                  onChange={(e) => setEditedSupermarket({ ...editedSupermarket, manager: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerEmail">Manager Email</Label>
                <Input
                  id="managerEmail"
                  type="email"
                  value={editedSupermarket.managerEmail || ""}
                  onChange={(e) => setEditedSupermarket({ ...editedSupermarket, managerEmail: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editedSupermarket.location || ""}
                onChange={(e) => setEditedSupermarket({ ...editedSupermarket, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedSupermarket.description || ""}
                onChange={(e) => setEditedSupermarket({ ...editedSupermarket, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedSupermarket.phone || ""}
                  onChange={(e) => setEditedSupermarket({ ...editedSupermarket, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedSupermarket.email || ""}
                  onChange={(e) => setEditedSupermarket({ ...editedSupermarket, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="openingHours">Opening Hours</Label>
              <Input
                id="openingHours"
                value={editedSupermarket.openingHours || ""}
                onChange={(e) => setEditedSupermarket({ ...editedSupermarket, openingHours: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditSupermarket}>
              <Icon icon="mdi:content-save" className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the supermarket "{currentSupermarket?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSupermarket} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>\
