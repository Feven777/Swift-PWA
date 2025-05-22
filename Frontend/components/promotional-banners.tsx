import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function PromotionalBanners() {
  return (
    <section className="mt-8 relative group">
      <div className="overflow-x-auto flex space-x-4 pb-4 px-1 no-scrollbar">
        <div className="bg-green-100 rounded-lg p-6 relative overflow-hidden min-w-[300px] w-[350px] flex-shrink-0">
          <div className="absolute top-4 left-4">
            <Image
              src="/fruit.jpg?height=40&width=40&text=Fresh"
              alt="Fresh produce"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-green-800">
              Fresh Summer Deals -Up to 15% Off!
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Get fresh groceries delivered to your doorstep in under 60
              minutes.
            </p>
            <Button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black">
              Shop Now
            </Button>
          </div>
        </div>

        <div className="bg-orange-500 rounded-lg p-6 relative overflow-hidden min-w-[300px] w-[350px] flex-shrink-0">
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold">OFERTAS</h3>
              <p className="text-xl font-bold">EXCLUSIVAS</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-20">
            <Image
              src="/onion.jpg?height=100&width=100&text=Pepper"
              alt="Pepper"
              width={100}
              height={100}
            />
          </div>
          <div className="absolute -top-4 -left-4 opacity-20">
            <Image
              src="/carrot.jpg?height=100&width=100&text=Carrot"
              alt="Carrot"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="bg-green-100 rounded-lg p-6 relative overflow-hidden min-w-[300px] w-[350px] flex-shrink-0">
          <div className="absolute top-4 left-4">
            <Image
              src="/orange.jpg?height=40&width=40&text=Orange"
              alt="Orange"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-green-800">
              Fresh Summer Deals
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Get fresh groceries delivered to your doorstep in under 60
              minutes.
            </p>
            <Button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black">
              Shop Now
            </Button>
          </div>
        </div>

        <div className="bg-blue-100 rounded-lg p-6 relative overflow-hidden min-w-[300px] w-[350px] flex-shrink-0">
          <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-800">
              Weekend Specials
            </h3>
            <p className="mt-2 text-sm text-blue-700">
              Discover amazing deals every weekend. Save big on your favorite
              items.
            </p>
            <Button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black">
              View Deals
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicators */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="bg-white rounded-full p-1 shadow-md">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="bg-white rounded-full p-1 shadow-md">
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </section>
  );
}
