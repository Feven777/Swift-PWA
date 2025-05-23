import { Supermarkets } from "@/components/supermarkets/supermarkets"
import { SupermarketsHeader } from "@/components/supermarkets/supermarkets-header"

export const metadata = {
  title: "Supermarkets | Swift Delivery",
  description: "Browse supermarkets and retail stores available for delivery in your area",
}

export default function SupermarketsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <SupermarketsHeader />
      <Supermarkets />
    </main>
  )
}
