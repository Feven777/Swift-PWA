import type { Product } from "@/types/product"

// Mock products data
const products: Product[] = [
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
  },
  {
    id: 5,
    name: "Avocados",
    category: "Fresh Produce",
    categoryId: 1,
    price: 27.49,
    originalPrice: null,
    image: "/avocado.webp",
    rating: 4.7,
    isOnSale: false,
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
  },
  {
    id: 7,
    name: "Frozen Pizza",
    category: "Frozen Foods",
    categoryId: 5,
    price: 55.99,
    originalPrice: null,
    image: "/pizza.png",
    rating: 4.2,
    isOnSale: false,
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
  },
  {
    id: 9,
    name: "Fresh Apples",
    category: "Fresh Produce",
    categoryId: 1,
    price: 25.99,
    originalPrice: 29.99,
    image: "/apple.jpg",
    rating: 4.6,
    isOnSale: true,
  },
  {
    id: 10,
    name: "Yogurt",
    category: "Dairy & Eggs",
    categoryId: 2,
    price: 18.99,
    originalPrice: null,
    image: "/yoghurt.webp",
    rating: 4.3,
    isOnSale: false,
  },
  {
    id: 11,
    name: "Beef Steak",
    category: "Meat & Seafood",
    categoryId: 3,
    price: 129.99,
    originalPrice: 149.99,
    image: "/meat.jpeg",
    rating: 4.8,
    isOnSale: true,
  },
  {
    id: 12,
    name: "Croissants",
    category: "Bakery",
    categoryId: 4,
    price: 39.99,
    originalPrice: null,
    image: "/bakery.webp",
    rating: 4.5,
    isOnSale: false,
  },
  {
    id: 13,
    name: "Ice Cream",
    category: "Frozen Foods",
    categoryId: 5,
    price: 45.99,
    originalPrice: null,
    image: "/yoghurt.webp",
    rating: 4.7,
    isOnSale: false,
  },
  {
    id: 14,
    name: "Coffee",
    category: "Beverages",
    categoryId: 6,
    price: 59.99,
    originalPrice: 69.99,
    image: "/coffee.jpg",
    rating: 4.9,
    isOnSale: true,
  },
  {
    id: 15,
    name: "Oatmeal",
    category: "Breakfast",
    categoryId: 7,
    price: 29.99,
    originalPrice: null,
    image: "/oatmeal.png",
    rating: 4.2,
    isOnSale: false,
  },
  {
    id: 16,
    name: "Tomatoes",
    category: "Fresh Produce",
    categoryId: 1,
    price: 19.99,
    originalPrice: null,
    image: "/Tomato_je.jpg",
    rating: 4.4,
    isOnSale: false,
  },
]

// Simulate API call with delay
export async function fetchProductsByStore(storeId: number): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, we would filter products by store ID
      resolve(products)
    }, 800)
  })
}

// Get a single product by ID
export async function getProductById(id: number): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id)
      resolve(product)
    }, 300)
  })
}
