"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLoyalty } from "@/context/loyalty-context";
import { useCart } from "@/context/cart-context";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Plus, Minus, X, ShoppingCart, PlusCircle, Search } from "lucide-react";
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
import { useOrders } from "@/hooks/use-orders";
import { useAuth } from "@/hooks/use-auth";
import type { Order, OrderItem } from "@/types/order";

export default function OrdersList() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { addPoints } = useLoyalty();

  // State for dialogs
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [newOrderDialogOpen, setNewOrderDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [reorderItems, setReorderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOrderItems, setNewOrderItems] = useState<OrderItem[]>([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");

  // Filter orders for the current user
  const userOrders = orders
    .filter((order) => order.customerId === user?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get unique products from previous orders
  const uniqueProducts = Array.from(
    new Map(
      userOrders
        .flatMap((order) => order.items)
        .map((item) => [`${item.productId}`, item])
    ).values()
  );

  // Calculate total for reorder items
  const calculateReorderTotal = () => {
    return reorderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Handle viewing order details
  const handleViewDetails = (orderId: string) => {
    const order = userOrders.find((o) => o.id === orderId);
    if (order) {
      setCurrentOrder(order);
      setOrderDialogOpen(true);
    }
  };

  // Handle initiating reorder
  const handleReorderClick = (orderId: string) => {
    const order = userOrders.find((o) => o.id === orderId);
    if (!order) return;

    setReorderItems(order.items.map((item) => ({ ...item })));
    setReorderDialogOpen(true);
  };

  // Handle quantity change in reorder
  const handleQuantityChange = (productId: number, change: number) => {
    setReorderItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQuantity = Math.max(0, item.quantity + change);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Handle removing item from reorder
  const handleRemoveReorderItem = (productId: number) => {
    setReorderItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  // Handle placing modified order
  const handlePlaceModifiedOrder = () => {
    if (reorderItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please add items to your order before proceeding.",
        variant: "destructive",
      });
      return;
    }

    // Add items to cart
    reorderItems.forEach((item) => {
      addToCart({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      });
    });

    setReorderDialogOpen(false);
    setReorderItems([]);
    router.push("/cart");
  };

  // Handle adding item to new order
  const handleAddToNewOrder = (item: OrderItem) => {
    setNewOrderItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Handle placing new order
  const handlePlaceOrder = () => {
    if (newOrderItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please add items to your order before proceeding.",
        variant: "destructive",
      });
      return;
    }

    // Add items to cart
    newOrderItems.forEach((item) => {
      addToCart({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      });
    });

    setNewOrderDialogOpen(false);
    setNewOrderItems([]);
    router.push("/cart");
  };

  // Filter products based on search term
  const filteredProducts = uniqueProducts.filter((product) =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Orders</h2>
        <Button
          variant="default"
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={() => setNewOrderDialogOpen(true)}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> New Order
        </Button>
      </div>

      <div className="space-y-4">
        {userOrders
          .filter((order) =>
            order.items.some((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
          .map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item.id} className="relative w-12 h-12">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded">
                    <span className="text-sm text-gray-600">
                      +{order.items.length - 4}
                    </span>
                  </div>
                )}
                <span className="ml-2 text-sm text-gray-600">
                  {order.items.length} items
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    View details
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ETB {order.total.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleReorderClick(order.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Reorder
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        {currentOrder && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details #{currentOrder.id}</DialogTitle>
              <DialogDescription>
                {new Date(currentOrder.date).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Items</h4>
                <div className="space-y-2">
                  {currentOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ETB {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>ETB {currentOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>ETB {currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleReorderClick(currentOrder.id)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Reorder Items
              </Button>
              <Button onClick={() => setOrderDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={reorderDialogOpen} onOpenChange={setReorderDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col gap-0 p-0">
          <div className="p-6 border-b">
            <DialogHeader>
              <DialogTitle>Modify Order</DialogTitle>
              <DialogDescription>
                Review and modify your order before placing it.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white z-10">
                <TabsTrigger value="items">
                  Your Items ({reorderItems.length})
                </TabsTrigger>
                <TabsTrigger value="browse">Browse Products</TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="mt-4">
                <div className="space-y-4 pb-4">
                  {reorderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            ETB {item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(item.productId, -1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(item.productId, 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="w-24 text-right">
                          ETB {(item.price * item.quantity).toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() =>
                            handleRemoveReorderItem(item.productId)
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {reorderItems.length > 0 && (
                    <div className="flex justify-end pt-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-xl font-bold">
                          ETB {calculateReorderTotal().toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="browse" className="mt-4">
                <div className="grid grid-cols-2 gap-4 pb-4">
                  {uniqueProducts.map((product) => (
                    <div
                      key={product.productId}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            ETB {product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => {
                          const existingItem = reorderItems.find(
                            (i) => i.productId === product.productId
                          );
                          if (existingItem) {
                            handleQuantityChange(product.productId, 1);
                          } else {
                            setReorderItems((prev) => [
                              ...prev,
                              { ...product, quantity: 1 },
                            ]);
                          }
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-6 border-t mt-auto">
            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setReorderDialogOpen(false);
                  setReorderItems([]);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePlaceModifiedOrder}
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={reorderItems.length === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Place Order
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={newOrderDialogOpen} onOpenChange={setNewOrderDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col gap-0 p-0">
          <div className="p-6 border-b">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Add products to your new order.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            <Tabs defaultValue="browse" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white z-10">
                <TabsTrigger value="items">
                  Your Items ({newOrderItems.length})
                </TabsTrigger>
                <TabsTrigger value="browse">Browse Products</TabsTrigger>
              </TabsList>
              <TabsContent value="items" className="mt-2">
                <div className="grid grid-cols-2 gap-4 pb-4">
                  {newOrderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            ETB {item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setNewOrderItems((prev) =>
                            prev.filter((i) => i.productId !== item.productId)
                          );
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="browse" className="mt-2">
                <div className="grid grid-cols-2 gap-4 pb-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.productId}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            ETB {product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => handleAddToNewOrder(product)}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-6 border-t mt-auto">
            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setNewOrderDialogOpen(false);
                  setNewOrderItems([]);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePlaceOrder}
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={newOrderItems.length === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Place Order
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
