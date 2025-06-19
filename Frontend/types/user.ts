export type UserRole = "buyer" | "manager" | "admin" | "employee"

export interface User {
  id: string
  name: string    
  email: string
  role: UserRole
  supermarketId?: number
  supermarketName?: string
  avatarUrl?: string
  bio?: string           
<<<<<<< HEAD
=======
  phone?: string
  address?: string
>>>>>>> dd84196c3bbda98866cbeb80e93d019883b64720
}