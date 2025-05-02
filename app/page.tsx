import { Suspense } from "react"

import CategoryIcons from "@/components/category-icons"
import StoresNearYou from "@/components/stores-near-you"
import PromotionalBanners from "@/components/promotional-banners"
import ShopByCategory from "@/components/shop-by-category"
import TodaysBestDeals from "@/components/todays-best-deals"

import AppBanner from "@/components/app-banner"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f7f2]">
     
      <AppBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Suspense fallback={<div className="h-24 animate-pulse bg-gray-100 rounded-lg"></div>}>
          <CategoryIcons />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded-lg mt-6"></div>}>
          <StoresNearYou />
        </Suspense>

        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100 rounded-lg mt-6"></div>}>
          <PromotionalBanners />
        </Suspense>

        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100 rounded-lg mt-6"></div>}>
          <ShopByCategory />
        </Suspense>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg mt-6"></div>}>
          <TodaysBestDeals />
        </Suspense>
      </div>
    
    </main>
  )
}
