// Mock data for products and supermarkets

export type Product = {
  id: number
  name: string
  image: string
  category: string
  originalPrice: string
  salePrice: string
  discount?: string
  supermarket?: string
}

export type Supermarket = {
  id: number
  name: string
  image: string
  rating: number
  ratingCount: number
  deliveryTime: string
  distance: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Fresh Apples",
    image: "/placeholder.svg?height=160&width=160&text=Apples",
    category: "Fruits",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "25% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 2,
    name: "Organic Milk",
    image: "/placeholder.svg?height=160&width=160&text=Milk",
    category: "Dairy",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "30% Off",
    supermarket: "Shola sm",
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    image: "/placeholder.svg?height=160&width=160&text=Bread",
    category: "Bakery",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "20% Off",
    supermarket: "Mafi city sm",
  },
  {
    id: 4,
    name: "Free Range Eggs",
    image: "/placeholder.svg?height=160&width=160&text=Eggs",
    category: "Dairy",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "25% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 5,
    name: "Avocados",
    image: "/placeholder.svg?height=160&width=160&text=Avocados",
    category: "Fruits",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "30% Off",
    supermarket: "Shola sm",
  },
  {
    id: 6,
    name: "Chicken Breast",
    image: "/placeholder.svg?height=160&width=160&text=Chicken",
    category: "Meat & Poultry",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "40% Off",
    supermarket: "Mafi city sm",
  },
  {
    id: 7,
    name: "Orange Juice",
    image: "/placeholder.svg?height=160&width=160&text=Juice",
    category: "Beverages",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "20% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 8,
    name: "Pasta",
    image: "/placeholder.svg?height=160&width=160&text=Pasta",
    category: "Pasta & Rice",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "25% Off",
    supermarket: "Shola sm",
  },
  {
    id: 9,
    name: "Sourdough Bread",
    image: "/placeholder.svg?height=160&width=160&text=Sourdough",
    category: "Bakery",
    originalPrice: "$6.99",
    salePrice: "$4.99",
    discount: "28% Off",
    supermarket: "Mafi city sm",
  },
  {
    id: 10,
    name: "Rye Bread",
    image: "/placeholder.svg?height=160&width=160&text=Rye",
    category: "Bakery",
    originalPrice: "$4.99",
    salePrice: "$3.49",
    discount: "30% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 11,
    name: "Banana Bread",
    image: "/placeholder.svg?height=160&width=160&text=Banana",
    category: "Bakery",
    originalPrice: "$7.99",
    salePrice: "$5.99",
    discount: "25% Off",
    supermarket: "Shola sm",
  },
  {
    id: 12,
    name: "Gluten-Free Bread",
    image: "/placeholder.svg?height=160&width=160&text=GF+Bread",
    category: "Bakery",
    originalPrice: "$8.99",
    salePrice: "$6.99",
    discount: "22% Off",
    supermarket: "Mafi city sm",
  },
]

export const supermarkets: Supermarket[] = [
  {
    id: 1,
    name: "Shola sm",
    image: "/placeholder.svg?height=80&width=120&text=Shola+Market",
    rating: 4.7,
    ratingCount: 150,
    deliveryTime: "15-25 min",
    distance: "1.1 miles",
  },
  {
    id: 2,
    name: "Safeway sm",
    image: "/placeholder.svg?height=80&width=120&text=Safeway",
    rating: 4.6,
    ratingCount: 150,
    deliveryTime: "15-25 min",
    distance: "2 miles",
  },
  {
    id: 3,
    name: "Mafi city sm",
    image: "/placeholder.svg?height=80&width=120&text=Mafi+City",
    rating: 4.5,
    ratingCount: 150,
    deliveryTime: "15-25 min",
    distance: "3 miles",
  },
]

// Search function to filter products and supermarkets
export function searchItems(query: string) {
  if (!query) return { products: [], supermarkets: [] }

  const lowercaseQuery = query.toLowerCase()

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) || product.category.toLowerCase().includes(lowercaseQuery),
  )

  const filteredSupermarkets = supermarkets.filter((supermarket) =>
    supermarket.name.toLowerCase().includes(lowercaseQuery),
  )

  return {
    products: filteredProducts,
    supermarkets: filteredSupermarkets,
  }
}
