import { Supermarkets } from "@/components/supermarkets/supermarkets"
import { SupermarketsHeader } from "@/components/supermarkets/supermarkets-header"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <SupermarketsHeader initialQuery={searchParams.q} />
      <Supermarkets />
    </main>
  )
}
