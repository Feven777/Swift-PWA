import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// This would normally come from a database
const getOrderById = (id: string) => {
  const orders = {
    "12345": {
      id: "12345",
      date: "March 25, 2025 at 2:30 PM",
      status: "Completed",
      items: [
        {
          id: 1,
          name: "Bananas",
          quantity: 1,
          price: 3.99,
          image: "banana.webp",
        },
        {
          id: 2,
          name: "Milk",
          quantity: 2,
          price: 4.5,
          image: "milk.jpg",
        },
        {
          id: 3,
          name: "Bread",
          quantity: 1,
          price: 5.99,
          image: "bread.jpg",
        },
        {
          id: 4,
          name: "Avocados",
          quantity: 3,
          price: 6.99,
          image: "avocado.webp",
        },
      ],
      subtotal: 38.95,
      tax: 3.12,
      delivery: 3.99,
      total: 45.99,
      address: "123 Main Street, Apt 4B, Addis Ababa, NY 10001",
      paymentMethod: "Visa ending in 4242",
      deliveryNotes: "Please leave at the door",
      timeline: [
        {
          status: "Order Placed",
          time: "March 25, 2025 at 2:00 PM",
          completed: true,
        },
        {
          status: "Order Confirmed",
          time: "March 25, 2025 at 2:05 PM",
          completed: true,
        },
        {
          status: "Preparing Order",
          time: "March 25, 2025 at 2:10 PM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          time: "March 25, 2025 at 2:20 PM",
          completed: true,
        },
        {
          status: "Delivered",
          time: "March 25, 2025 at 2:30 PM",
          completed: true,
        },
      ],
    },
    "12346": {
      id: "12346",
      date: "March 20, 2025 at 11:15 AM",
      status: "Completed",
      items: [
        {
          id: 5,
          name: "Chicken Breast",
          quantity: 1,
          price: 12.99,
          image: "/placeholder.svg",
        },
        {
          id: 6,
          name: "Brown Rice",
          quantity: 1,
          price: 4.99,
          image: "/placeholder.svg",
        },
        {
          id: 7,
          name: "Broccoli",
          quantity: 2,
          price: 2.99,
          image: "/placeholder.svg",
        },
        {
          id: 8,
          name: "Olive Oil",
          quantity: 1,
          price: 8.99,
          image: "/placeholder.svg",
        },
        {
          id: 9,
          name: "Greek Yogurt",
          quantity: 1,
          price: 5.49,
          image: "/placeholder.svg",
        },
      ],
      subtotal: 28.45,
      tax: 2.28,
      delivery: 2.99,
      total: 32.75,
      address: "123 Main Street, Apt 4B, Addis Ababa, NY 10001",
      paymentMethod: "Mastercard ending in 8888",
      deliveryNotes: "Call when you arrive",
      timeline: [
        {
          status: "Order Placed",
          time: "March 20, 2025 at 10:45 AM",
          completed: true,
        },
        {
          status: "Order Confirmed",
          time: "March 20, 2025 at 10:50 AM",
          completed: true,
        },
        {
          status: "Preparing Order",
          time: "March 20, 2025 at 10:55 AM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          time: "March 20, 2025 at 11:05 AM",
          completed: true,
        },
        {
          status: "Delivered",
          time: "March 20, 2025 at 11:15 AM",
          completed: true,
        },
      ],
    },
    "12347": {
      id: "12347",
      date: "March 15, 2025 at 4:45 PM",
      status: "Completed",
      items: [
        {
          id: 10,
          name: "Salmon Fillet",
          quantity: 2,
          price: 15.99,
          image: "/placeholder.svg",
        },
        {
          id: 11,
          name: "Quinoa",
          quantity: 1,
          price: 6.99,
          image: "/placeholder.svg",
        },
        {
          id: 12,
          name: "Asparagus",
          quantity: 1,
          price: 4.99,
          image: "/placeholder.svg",
        },
        {
          id: 13,
          name: "Lemon",
          quantity: 3,
          price: 0.99,
          image: "/placeholder.svg",
        },
        {
          id: 14,
          name: "Garlic",
          quantity: 1,
          price: 1.99,
          image: "/placeholder.svg",
        },
        {
          id: 15,
          name: "White Wine",
          quantity: 1,
          price: 14.99,
          image: "/placeholder.svg",
        },
      ],
      subtotal: 59.91,
      tax: 4.79,
      delivery: 2.99,
      total: 67.5,
      address: "123 Main Street, Apt 4B, Addis Ababa, NY 10001",
      paymentMethod: "Visa ending in 4242",
      deliveryNotes: "Leave with doorman",
      timeline: [
        {
          status: "Order Placed",
          time: "March 15, 2025 at 4:15 PM",
          completed: true,
        },
        {
          status: "Order Confirmed",
          time: "March 15, 2025 at 4:20 PM",
          completed: true,
        },
        {
          status: "Preparing Order",
          time: "March 15, 2025 at 4:25 PM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          time: "March 15, 2025 at 4:35 PM",
          completed: true,
        },
        {
          status: "Delivered",
          time: "March 15, 2025 at 4:45 PM",
          completed: true,
        },
      ],
    },
  };

  return orders[id as keyof typeof orders];
};

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const order = getOrderById(params.id);

  if (!order) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Order Not Found</h1>
          <p className="mb-6">We couldn't find the order you're looking for.</p>
          <Link href="/profile">
            <Button>Return to Profile</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link
          href="/profile"
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Order #{order.id}
          </h1>
          <p className="text-gray-500">{order.date}</p>
        </div>
        <Badge className="mt-2 md:mt-0 bg-green-100 text-green-800 hover:bg-green-100">
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex mb-6 last:mb-0">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`rounded-full p-2 ${
                          step.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.status === "Order Placed" && (
                          <Clock className="h-5 w-5" />
                        )}
                        {step.status === "Order Confirmed" && (
                          <CheckCircle className="h-5 w-5" />
                        )}
                        {step.status === "Preparing Order" && (
                          <Package className="h-5 w-5" />
                        )}
                        {step.status === "Out for Delivery" && (
                          <Truck className="h-5 w-5" />
                        )}
                        {step.status === "Delivered" && (
                          <CheckCircle className="h-5 w-5" />
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="h-full w-0.5 bg-gray-200 my-1"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{step.status}</p>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Items in your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {(item.price * item.quantity).toFixed(2)} Br
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p>{order.subtotal.toFixed(2)} Br</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p>{order.tax.toFixed(2)} Br</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Delivery Fee</p>
                  <p>{order.delivery.toFixed(2)} Br</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>{order.total.toFixed(2)} Br</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Delivery Address
                  </p>
                  <p className="mt-1">{order.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Payment Method
                  </p>
                  <p className="mt-1">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Delivery Notes
                  </p>
                  <p className="mt-1">{order.deliveryNotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Reorder
          </Button>
          <Button variant="outline" className="w-full">
            Need Help?
          </Button>
        </div>
      </div>
    </div>
  );
}
