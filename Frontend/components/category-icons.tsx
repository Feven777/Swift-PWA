import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";

const categories = [
  { name: "Milk", image: "/milk.jpg?height=40&width=40&text=Milk" },
  { name: "Eggs", image: "/avocado.webp?height=40&width=40&text=Eggs" },
  { name: "Bread", image: "/bread.jpg?height=40&width=40&text=Bread" },
  { name: "Bananas", image: "/banana.webp?height=40&width=40&text=Bananas" },
  { name: "Apples", image: "/apple.jpg?height=40&width=40&text=Apples" },
  { name: "Chicken", image: "/chicken.jpg?height=40&width=40&text=Chicken" },
  { name: "Pasta", image: "/pasta.jpg?height=40&width=40&text=Rice" },
  { name: "Rice", image: "/rice.jpg?height=40&width=40&text=Pasta" },
  {
    name: "Tomatoes",
    image: "/Tomato_je.jpg?height=40&width=40&text=Tomatoes",
  },
  { name: "Potatoes", image: "/potatoes.jpg?height=40&width=40&text=Potatoes" },
  { name: "Onions", image: "/onion.jpg?height=40&width=40&text=Onions" },
  { name: "Cereal", image: "/cereal.jpg?height=40&width=40&text=Cereal" },
  { name: "Coffee", image: "/coffee.jpg?height=40&width=40&text=Coffee" },
  { name: "Water", image: "/water.jpg?height=40&width=40&text=Water" },
  { name: "Cheese", image: "/cheese.jpg?height=40&width=40&text=Cheese" },
  { name: "Yogurt", image: "/yoghurt.webp?height=40&width=40&text=Yogurt" },
  { name: "Oranges", image: "/orange.jpg?height=40&width=40&text=Oranges" },
  { name: "Carrots", image: "/carrot.jpg?height=40&width=40&text=Carrots" },
];

export default function CategoryIcons() {
  return (
    <div className="py-4 relative group">
      <div className="overflow-x-auto flex space-x-4 pb-4 px-1 no-scrollbar">
        {categories.map((category) => (
          <div key={category.name} className="flex-shrink-0">
            <Card className="w-20 h-20 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <CardContent className="p-2 flex flex-col items-center justify-center">
                <div className="mb-1">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <span className="text-xs text-center text-gray-700 mt-1">
                  {category.name}
                </span>
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
    </div>
  );
}
