import { useEffect, useState } from "react";
import { useOrders } from "@/hooks/use-orders";
import { useAuth } from "@/hooks/use-auth";
import { Order } from "@/types/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function OrderNotifications() {
  const { user } = useAuth();
  const { getOrdersForCurrentSupermarket, claimOrder } = useOrders();
  const [unclaimedOrders, setUnclaimedOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.role === "employee") {
      const orders = getOrdersForCurrentSupermarket();
      setUnclaimedOrders(orders.filter(order => order.status === "unclaimed"));
    }
  }, [user, getOrdersForCurrentSupermarket]);

  const handleClaim = async (orderId: string) => {
    try {
      const result = await claimOrder(orderId);
      if (result.success) {
        setUnclaimedOrders(prev => prev.filter(order => order.id !== orderId));
      }
    } catch (error) {
      console.error("Error claiming order:", error);
    }
  };

  if (!user || user.role !== "employee" || unclaimedOrders.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>New Orders</span>
          <Badge variant="secondary">{unclaimedOrders.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unclaimedOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {order.customerName} - ${order.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">{formatDate(order.date)}</p>
              </div>
              <Button onClick={() => handleClaim(order.id)}>Claim Order</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 