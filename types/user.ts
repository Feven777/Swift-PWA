export type UserRole = "buyer" | "manager" | "admin" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  supermarketId?: number
  supermarketName?: string
}
