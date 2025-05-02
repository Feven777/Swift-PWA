import { ProductsPage } from "@/components/store/products-page"
import { getSupermarketById } from "@/lib/api/supermarkets"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = await Number.parseInt(params.id)
  const supermarket = await getSupermarketById(id)

  if (!supermarket) {
    return {
      title: "Products Not Found",
    }
  }

  return {
    title: `Products | ${supermarket.name} | Swift Delivery`,
    description: `Browse products from ${supermarket.name} with Swift Delivery`,
  }
}

export default async function SupermarketProductsPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { category?: string; q?: string }
}) {
  const id = Number.parseInt(params.id)
  const supermarket = await getSupermarketById(id)

  if (!supermarket) {
    notFound()
  }

  return (
    <ProductsPage
      supermarket={supermarket}
      categoryFilter={searchParams.category ? Number.parseInt(searchParams.category) : undefined}
      searchQuery={searchParams.q || ""}
    />
  )
}
