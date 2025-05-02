import Image from "next/image";
import { Flame, Plus, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Fresh Apples",
    image: "/apple.jpg?height=160&width=160&text=Apples",
    originalPrice: "500Br",
    salePrice: "300Br",
    discount: "25% Off",
  },
  {
    id: 2,
    name: "Organic Milk",
    image: "/milk.jpg?height=160&width=160&text=Milk",
    originalPrice: "500Br",
    salePrice: "250Br",
    discount: "30% Off",
  },
  {
    id: 3,
    name: "Wheat Bread",
    image: "/bread.jpg?height=160&width=160&text=Bread",
    originalPrice: "500Br",
    salePrice: "300Br",
    discount: "20% Off",
  },
  {
    id: 4,
    name: "Eggs",
    image: "/egg.jpg?height=160&width=160&text=Eggs",
    originalPrice: "500Br",
    salePrice: "270Br",
    discount: "25% Off",
  },
  {
    id: 5,
    name: "Avocados",
    image: "/avocado.webp?height=160&width=160&text=Avocados",
    originalPrice: "500Br",
    salePrice: "250Br",
    discount: "30% Off",
  },
  {
    id: 6,
    name: "Chicken",
    image: "/chicken.jpg?height=160&width=160&text=Chicken",
    originalPrice: "500Br",
    salePrice: "200Br",
    discount: "40% Off",
  },
  {
    id: 7,
    name: "Orange Juice",
    image: "/juice.jpg?height=160&width=160&text=Juice",
    originalPrice: "500Br",
    salePrice: "300Br",
    discount: "20% Off",
  },
  {
    id: 8,
    name: "Pasta",
    image: "/pasta.jpg?height=160&width=160&text=Pasta",
    originalPrice: "500Br",
    salePrice: "275Br",
    discount: "25% Off",
  },
];

export default function TodaysBestDeals() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Today's Best Deals</h2>
          <Flame className="ml-2 h-5 w-5 text-orange-500" />
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>Ends in:</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>Ends in:</span>
          <Clock className="mx-1 h-4 w-4" />
          <span className="text-orange-500 font-medium">10:23:14</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">
                {product.discount}
              </Badge>
              <div className="p-4 flex justify-center">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="object-contain h-36 w-36"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sm">{product.name}</h3>
              <div className="mt-2 flex items-center">
                <span className="text-gray-400 line-through text-sm">
                  {product.originalPrice}
                </span>
                <span className="ml-2 text-black font-bold">
                  {product.salePrice}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
