export interface Product {
  id: number
  name: string
  category: string
  categoryId: number
  price: number
  originalPrice: number | null
  image: string
  rating: number
  isOnSale: boolean
}
