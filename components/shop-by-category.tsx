import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Fruits", image: "/fruit.jpg?height=60&width=60&text=Fruits" },
  {
    name: "Vegetables",
    image: "/vegetables.webp?height=60&width=60&text=Vegetables",
  },
  { name: "Dairy", image: "/dairy.jpeg?height=60&width=60&text=Dairy" },
  {
    name: "Beverages",
    image: "/soft-drinks.jpg?height=60&width=60&text=Beverages",
  },
  { name: "Snacks", image: "/snaks.jpg?height=60&width=60&text=Snacks" },
  { name: "Meat & Poultry", image: "/meat.jpeg?height=60&width=60&text=Meat" },
  {
    name: "Frozen Foods",
    image: "/frozen-food.jpeg?height=60&width=60&text=Frozen",
  },
  {
    name: "Household",
    image: "/household.png?height=60&width=60&text=Household",
  },
  { name: "Bakery", image: "/bakery.webp?height=60&width=60&text=Bakery" },
  {
    name: "Canned Goods",
    image: "/canned.webp?height=60&width=60&text=Canned",
  },
];

export default function ShopByCategory() {
  return (
    <section className="mt-8 relative group">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-bold">Avaliable Categories</h2>
        <ShoppingCart className="ml-2 h-5 w-5" />
      </div>

      <div className="overflow-x-auto flex space-x-4 pb-4 px-1 no-scrollbar">
        {categories.map((category) => (
          <div key={category.name} className="flex-shrink-0">
            <Card className="w-32 h-32 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="mb-3">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <span className="text-sm text-center">{category.name}</span>
              </CardContent>
            </Card>
          </div>
        ))}
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
