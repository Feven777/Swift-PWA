"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLoyalty } from "@/context/loyalty-context";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Plus, Minus, X, ShoppingCart, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data for adding to orders
const availableProducts = [
  {
    id: 101,
    name: "Organic Bananas",
    price: 3.99,
    image: "/banana.webp?height=40&width=40",
  },
  {
    id: 102,
    name: "Whole Milk",
    price: 4.5,
    image: "/milk.jpg?height=40&width=40",
  },
  {
    id: 103,
    name: "Sourdough Bread",
    price: 5.99,
    image: "/bread.jpg?height=40&width=40",
  },
  {
    id: 104,
    name: "Avocados",
    price: 6.99,
    image: "/avocado.webp?height=40&width=40",
  },
  {
    id: 105,
    name: "Chicken Breast",
    price: 12.99,
    image: "/chicken.jpg?height=40&width=40",
  },
  {
    id: 106,
    name: "Brown Rice",
    price: 4.99,
    image: "apple.jpg?height=40&width=40",
  },
  {
    id: 107,
    name: "Carrot",
    price: 2.99,
    image: "/carrot.jpg?height=40&width=40",
  },
  {
    id: 108,
    name: "Olive Oil",
    price: 8.99,
    image: "/egg.jpg?height=40&width=40",
  },
  {
    id: 109,
    name: "Greek Yogurt",
    price: 5.49,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 110,
    name: "Salmon Fillet",
    price: 15.99,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 111,
    name: "Quinoa",
    price: 6.99,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 112,
    name: "Asparagus",
    price: 4.99,
    image: "/placeholder.svg?height=40&width=40",
  },
];

// Sample order data with item images
const initialOrders = [
  {
    id: "12345",
    date: "March 25, 2025 at 2:30 PM",
    items: [
      {
        id: 101,
        name: "Organic Bananas",
        quantity: 1,
        price: 3.99,
        image: "/banana.webp?height=40&width=40",
      },
      {
        id: 102,
        name: "Whole Milk",
        quantity: 2,
        price: 4.5,
        image: "/milk.jpg?height=40&width=40",
      },
      {
        id: 103,
        name: "Sourdough Bread",
        quantity: 1,
        price: 5.99,
        image: "/bread.jpg?height=40&width=40",
      },
      {
        id: 104,
        name: "Avocados",
        quantity: 3,
        price: 6.99,
        image: "/avocado.webp?height=40&width=40",
      },
    ],
    totalItems: 4,
    totalPrice: 45.99,
    status: "Completed",
    pointsValue: 15,
  },
  {
    id: "12346",
    date: "March 20, 2025 at 11:15 AM",
    items: [
      {
        id: 105,
        name: "Chicken Breast",
        quantity: 1,
        price: 12.99,
        image: "/chicken.jpg?height=40&width=40",
      },
      {
        id: 106,
        name: "Brown Rice",
        quantity: 1,
        price: 4.99,
        image: "/rice.jpg?height=40&width=40",
      },
      {
        id: 107,
        name: "Snacks",
        quantity: 2,
        price: 2.99,
        image: "/snaks.jpg?height=40&width=40",
      },
      {
        id: 108,
        name: "Apple",
        quantity: 1,
        price: 8.99,
        image: "/apple.jpg?height=40&width=40",
      },
      {
        id: 109,
        name: "Greek Yogurt",
        quantity: 1,
        price: 5.49,
        image: "/yoghurt.webp?height=40&width=40",
      },
    ],
    totalItems: 5,
    totalPrice: 32.75,
    status: "Completed",
    pointsValue: 10,
  },
  {
    id: "12347",
    date: "March 15, 2025 at 4:45 PM",
    items: [
      {
        id: 110,
        name: "Water",
        quantity: 2,
        price: 15.99,
        image: "/water.jpg?height=40&width=40",
      },
      {
        id: 111,
        name: "Onion",
        quantity: 1,
        price: 6.99,
        image: "/onion.jpg?height=40&width=40",
      },
      {
        id: 112,
        name: "Juice",
        quantity: 1,
        price: 4.99,
        image: "/juice.jpg?height=40&width=40",
      },
      {
        id: 113,
        name: "Carrot",
        quantity: 3,
        price: 0.99,
        image: "/carrot.jpg?height=40&width=40",
      },
      {
        id: 114,
        name: "Canned",
        quantity: 1,
        price: 1.99,
        image: "/canned.webp?height=40&width=40",
      },
      {
        id: 115,
        name: "Pasta",
        quantity: 1,
        price: 14.99,
        image: "/pasta.jpgheight=40&width=40",
      },
    ],
    totalItems: 6,
    totalPrice: 67.5,
    status: "Completed",
    pointsValue: 20,
  },
];

export default function OrdersList() {
  const [orders, setOrders] = useState(initialOrders);
  const router = useRouter();
  const { addPoints } = useLoyalty();

  // State for order dialog
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewOrder, setIsNewOrder] = useState(false);

  // Calculate total price
  const calculateTotal = (items: any[]) => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Function to handle reordering
  const handleReorder = (orderId: string) => {
    // Find the order to reorder
    const orderToReorder = orders.find((order) => order.id === orderId);

    if (orderToReorder) {
      // Set current order and items for the dialog
      setCurrentOrder(orderToReorder);
      setOrderItems([...orderToReorder.items]);
      setIsNewOrder(false);
      setOrderDialogOpen(true);
    }
  };

  // Function to start a new order
  const handleNewOrder = () => {
    setCurrentOrder(null);
    setOrderItems([]);
    setIsNewOrder(true);
    setOrderDialogOpen(true);
  };

  // Function to update item quantity
  const updateQuantity = (itemId: number, change: number) => {
    setOrderItems(
      (prevItems) =>
        prevItems
          .map((item) => {
            if (item.id === itemId) {
              const newQuantity = Math.max(0, item.quantity + change);
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  // Function to remove item
  const removeItem = (itemId: number) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  // Function to add new product
  const addProduct = (product: any) => {
    // Check if product already exists in the order
    const existingItem = orderItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Increase quantity if already in cart
      updateQuantity(product.id, 1);
    } else {
      // Add new item with quantity 1
      setOrderItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }

    toast({
      title: "Product added",
      description: `${product.name} added to your order.`,
    });
  };

  // Function to place the order
  const placeOrder = () => {
    if (orderItems.length > 0) {
      // Calculate new total price
      const newTotalPrice = Number.parseFloat(calculateTotal(orderItems));

      // Calculate points based on new total (1 point per $3 spent)
      const pointsEarned = Math.floor(newTotalPrice / 3);

      // Add loyalty points
      addPoints(pointsEarned);

      // Create new order ID
      const newOrderId = `${Math.floor(10000 + Math.random() * 90000)}`;

      // Add new order to the list
      const newOrder = {
        id: newOrderId,
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        items: orderItems,
        totalItems: orderItems.length,
        totalPrice: newTotalPrice,
        status: "Processing",
        pointsValue: pointsEarned,
      };

      setOrders((prevOrders) => [newOrder, ...prevOrders]);

      // Close dialog
      setOrderDialogOpen(false);
      setCurrentOrder(null);
      setOrderItems([]);
      setIsNewOrder(false);

      // Show toast notification
      toast({
        title: "Order placed successfully!",
        description: `You earned ${pointsEarned} loyalty points for this order.`,
        action: <ToastAction altText="View Points">View Points</ToastAction>,
      });
    }
  };

  // Function to handle viewing order details
  const handleViewDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  // Filter products based on search term
  const filteredProducts = availableProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Orders</h2>
        <Button
          onClick={handleNewOrder}
          className="bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg bg-white p-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <p className="text-gray-500 text-sm">{order.date}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : order.status === "Processing"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="flex items-center my-3">
            <div className="flex flex-wrap gap-2">
              {order.items.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-md overflow-hidden border border-gray-200"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="ml-3 text-sm text-gray-600">
              {order.totalItems} items
            </span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="font-bold text-lg">
                ${order.totalPrice.toFixed(2)}
              </span>
              <button
                onClick={() => handleViewDetails(order.id)}
                className="block text-green-600 text-sm hover:underline"
              >
                View details
              </button>
            </div>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => handleReorder(order.id)}
            >
              Reorder
            </Button>
          </div>
        </div>
      ))}

      {/* Order Dialog */}
      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isNewOrder ? "Create New Order" : "Modify Order"}
            </DialogTitle>
            <DialogDescription>
              {isNewOrder
                ? "Add products to your new order."
                : "Review and modify your order before placing it."}
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue={orderItems.length > 0 ? "current" : "browse"}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="current">
                Your Items ({orderItems.length})
              </TabsTrigger>
              <TabsTrigger value="browse">Browse Products</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4 mt-4">
              {orderItems.length === 0 ? (
                <div className="text-center py-8 border rounded-md border-dashed">
                  <p className="text-gray-500">No items in your order</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Browse products to add items to your order
                  </p>
                </div>
              ) : (
                <div className="border rounded-md divide-y">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="w-20 text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {orderItems.length > 0 && (
                <div className="flex justify-end items-center pt-2">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-lg">
                      ${calculateTotal(orderItems)}
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="browse" className="space-y-4 mt-4">
              <div className="mb-4">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border rounded-md p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600"
                      onClick={() => addProduct(product)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}

                {filteredProducts.length === 0 && (
                  <div className="col-span-2 text-center py-4">
                    <p className="text-gray-500">No products found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              {orderItems.length > 0 && (
                <p>
                  You'll earn approximately{" "}
                  {Math.floor(
                    Number.parseFloat(calculateTotal(orderItems)) / 3
                  )}{" "}
                  loyalty points
                </p>
              )}
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setOrderDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={placeOrder}
                disabled={orderItems.length === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Place Order
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
