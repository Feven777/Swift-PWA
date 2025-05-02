export interface Supermarket {
  id: number
  name: string
  image: string
  rating: number
  reviewCount: number
  distance: number
  categories: string[]
  deliveryTimeMin: number
  deliveryTimeMax: number
  deliveryFee: number
  plusEnabled: boolean
  description?: string
  address?: string
  phone?: string
  email?: string
  openingHours?: string
}
