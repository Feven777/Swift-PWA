"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, ArrowUpDown, Pencil, Trash2 } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import type { Product } from "@/types/product"

export default function ProductsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    categoryId: 1,
    price: 0,
    originalPrice: null,
    image: "/placeholder.svg",
    rating: 4.0,
    isOnSale: false,
  })

  useEffect(() => {
    if (!isLoading && (!user || user.role === "buyer")) {
      router.push("/auth")
    }

    // Fetch products (mock data for now)
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Organic Bananas",
        category: "Fresh Produce",
        categoryId: 1,
        price: 31.99,
        originalPrice: 42.99,
        image: "/banana.webp",
        rating: 4.8,
        isOnSale: true,
        supermarketId:  1,
      },
      {
        id: 2,
        name: "Whole Milk",
        category: "Dairy & Eggs",
        categoryId: 2,
        price: 34.49,
        originalPrice: null,
        image: "/milk.jpg",
        rating: 4.7,
        isOnSale: false,
        supermarketId: 2,
      },
      {
        id: 3,
        name: "Whole Grain Bread",
        category: "Bakery",
        categoryId: 4,
        price: 44.29,
        originalPrice: 49.99,
        image: "/bread.jpg",
        rating: 4.6,
        isOnSale: false,
        supermarketId: 3,
      },
      {
        id: 4,
        name: "Chicken Breast",
        category: "Meat & Seafood",
        categoryId: 3,
        price: 83.99,
        originalPrice: null,
        image: "/chicken.jpg",
        rating: 4.9,
        isOnSale: false,
        supermarketId: 3,
      },
      {
        id: 5,
        name: "Avocados",
        category: "Fresh Produce",
        categoryId: 1,
        price: 27.49,
        originalPrice: null,
        image: "/avovado.webp",
        rating: 4.7,
        isOnSale: false,
        supermarketId: 2,
      },
      {
        id: 6,
        name: "Orange Juice",
        category: "Beverages",
        categoryId: 6,
        price: 33.99,
        originalPrice: 38.99,
        image: "/juice.jpg",
        rating: 4.5,
        isOnSale: true,
        supermarketId: 5,
      },
      {
        id: 7,
        name: "Frozen Pizza",
        category: "Frozen Foods",
        categoryId: 5,
        price: 55.99,
        originalPrice: null,
        image: "/pizza.jpg",
        rating: 4.2,
        isOnSale: false,
        supermarketId: 6,
      },
      {
        id: 8,
        name: "Cereal",
        category: "Breakfast",
        categoryId: 7,
        price: 42.49,
        originalPrice: null,
        image: "/cereal.jpg",
        rating: 4.0,
        isOnSale: false,
        supermarketId: 7,
      },
    ]

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [isLoading, user, router])

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchQuery, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect above
  }

  const handleAddProduct = () => {
    setIsAddDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product)
    setNewProduct({
      name: product.name,
      category: product.category,
      categoryId: product.categoryId,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      isOnSale: product.isOnSale,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const confirmAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new product
    const productToAdd: Product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: newProduct.name || "",
      category: newProduct.category || "",
      categoryId: newProduct.categoryId || 1,
      price: newProduct.price || 0,
      originalPrice: newProduct.originalPrice ?? null,
      image: newProduct.image || "/placeholder.svg",
      rating: newProduct.rating || 4.0,
      isOnSale: newProduct.isOnSale || false,
      supermarketId: 1, 
    }

    // Add to products list
    setProducts([...products, productToAdd])

    // Reset form and close dialog
    setNewProduct({
      name: "",
      category: "",
      categoryId: 1,
      price: 0,
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.0,
      isOnSale: false,
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Product added",
      description: `${productToAdd.name} has been added successfully.`,
    })
  }

  const confirmEditProduct = () => {
    if (!currentProduct) return

    // Validate form
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update product
    const updatedProducts = products.map((p) => {
      if (p.id === currentProduct.id) {
        return {
          ...p,
          name: newProduct.name || p.name,
          category: newProduct.category || p.category,
          categoryId: newProduct.categoryId || p.categoryId,
          price: newProduct.price || p.price,
          originalPrice: newProduct.originalPrice ?? null,
          image: newProduct.image || p.image,
          rating: newProduct.rating || p.rating,
          isOnSale: newProduct.isOnSale || false,
        }
      }
      return p
    })

    // Update state
    setProducts(updatedProducts)

    // Reset and close dialog
    setCurrentProduct(null)
    setNewProduct({
      name: "",
      category: "",
      categoryId: 1,
      price: 0,
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.0,
      isOnSale: false,
    })
    setIsEditDialogOpen(false)

    toast({
      title: "Product updated",
      description: `${newProduct.name} has been updated successfully.`,
    })
  }

  const confirmDeleteProduct = () => {
    if (!currentProduct) return

    // Remove product
    const updatedProducts = products.filter((p) => p.id !== currentProduct.id)

    // Update state
    setProducts(updatedProducts)

    // Reset and close dialog
    setCurrentProduct(null)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilteredProducts([...products])}>All Products</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredProducts(products.filter((p) => p.isOnSale))}>
                On Sale
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredProducts(products.filter((p) => p.rating >= 4.5))}>
                Top Rated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setFilteredProducts([...filteredProducts].sort((a, b) => a.name.localeCompare(b.name)))}
              >
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilteredProducts([...filteredProducts].sort((a, b) => b.name.localeCompare(a.name)))}
              >
                Name (Z-A)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilteredProducts([...filteredProducts].sort((a, b) => a.price - b.price))}
              >
                Price (Low to High)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilteredProducts([...filteredProducts].sort((a, b) => b.price - a.price))}
              >
                Price (High to Low)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.price.toLocaleString()} Br
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-2">
                          {product.originalPrice.toLocaleString()} Br
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Add a new product to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (Br)
              </Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="originalPrice" className="text-right">
                Original Price (Br)
              </Label>
              <Input
                id="originalPrice"
                type="number"
                value={newProduct.originalPrice || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    originalPrice: e.target.value ? Number.parseFloat(e.target.value) : null,
                  })
                }
                className="col-span-3"
                placeholder="Optional"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isOnSale" className="text-right">
                On Sale
              </Label>
              <Input
                id="isOnSale"
                type="checkbox"
                checked={newProduct.isOnSale}
                onChange={(e) => setNewProduct({ ...newProduct, isOnSale: e.target.checked })}
                className="col-span-3 w-6 h-6"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category
              </Label>
              <Input
                id="edit-category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Price (Br)
              </Label>
              <Input
                id="edit-price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-originalPrice" className="text-right">
                Original Price (Br)
              </Label>
              <Input
                id="edit-originalPrice"
                type="number"
                value={newProduct.originalPrice || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    originalPrice: e.target.value ? Number.parseFloat(e.target.value) : null,
                  })
                }
                className="col-span-3"
                placeholder="Optional"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-isOnSale" className="text-right">
                On Sale
              </Label>
              <Input
                id="edit-isOnSale"
                type="checkbox"
                checked={newProduct.isOnSale}
                onChange={(e) => setNewProduct({ ...newProduct, isOnSale: e.target.checked })}
                className="col-span-3 w-6 h-6"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{currentProduct?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProduct} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
