export type OrderStatus = "unclaimed" | "preparing" | "ready" | "completed" | "cancelled"
export type OrderType = "pickup" | "delivery"

export interface OrderItem {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  image: string
  completed: boolean
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  supermarketId: number
  supermarketName: string
  date: string
  status: OrderStatus
  type: OrderType
  items: OrderItem[]
  total: number
  specialInstructions?: string
  employeeId?: string
  employeeName?: string
}
