"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/hooks/use-auth"
import { EmployeeProvider } from "@/hooks/use-employee"
import { OrderProvider } from "@/hooks/use-orders"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <OrderProvider>{children}</OrderProvider>
      </EmployeeProvider>
    </AuthProvider>
  )
}
