import { SupermarketDetail } from "@/components/store/supermarket-detail"
import { getSupermarketById } from "@/lib/api/supermarkets"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const supermarket = await getSupermarketById(id)

  if (!supermarket) {
    return {
      title: "Supermarket Not Found",
    }
  }

  return {
    title: `${supermarket.name} | Swift Delivery`,
    description: `Order groceries online from ${supermarket.name} with Swift Delivery`,
  }
}

export default async function SupermarketPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const supermarket = await getSupermarketById(id)

  if (!supermarket) {
    notFound()
  }

  return <SupermarketDetail supermarket={supermarket} />
}
