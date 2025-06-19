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
    image: "/apple.jpg",
    category: "Fruits",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "25% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 2,
    name: "Organic Milk",
    image: "/milk.jpg",
    category: "Dairy",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "30% Off",
    supermarket: "Shola sm",
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    image: "/bread.jpg",
    category: "Bakery",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "20% Off",
    supermarket: "Mafi city sm",
  },
  {
    id: 4,
    name: "Free Range Eggs",
    image: "/egg.jpg",
    category: "Dairy",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "25% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 5,
    name: "Avocados",
    image: "/avocado.webp",
    category: "Fruits",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "30% Off",
    supermarket: "Shola sm",
  },
  {
    id: 6,
    name: "Chicken Breast",
    image: "/chicken.jpg",
    category: "Meat & Poultry",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "40% Off",
    supermarket: "Mafi city sm",
  },
  {
    id: 7,
    name: "Orange Juice",
    image: "/juice.jpg",
    category: "Beverages",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "20% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 8,
    name: "Pasta",
    image: "/pasta.jpg",
    category: "Pasta & Rice",
    originalPrice: "$5.99",
    salePrice: "$3.99",
    discount: "25% Off",
    supermarket: "Shola sm",
  },
  {
    id: 9,
    name: "Sourdough Bread",
    image: "/bread.jpg",
    category: "Bakery",
    originalPrice: "$6.99",
    salePrice: "$4.99",
    discount: "28% Off",
    supermarket: "Mafi city sm",
  },
  {
    id: 10,
    name: "Rye Bread",
    image: "/bread.jpg",
    category: "Bakery",
    originalPrice: "$4.99",
    salePrice: "$3.49",
    discount: "30% Off",
    supermarket: "Safeway sm",
  },
  {
    id: 11,
    name: "Banana Bread",
    image: "/bread.jpg",
    category: "Bakery",
    originalPrice: "$7.99",
    salePrice: "$5.99",
    discount: "25% Off",
    supermarket: "Shola sm",
  },
  {
    id: 12,
    name: "Gluten-Free Bread",
    image: "/bread.jpg",
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
    image: "/shola.jpg",
    rating: 4.7,
    ratingCount: 150,
    deliveryTime: "15-25 min",
    distance: "1.1 miles",
  },
  {
    id: 2,
    name: "Safeway sm",
    image: "/sm1.jpg",
    rating: 4.6,
    ratingCount: 150,
    deliveryTime: "15-25 min",
    distance: "2 miles",
  },
  {
    id: 3,
    name: "Mafi city sm",
    image: "/sm.jpg",
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
