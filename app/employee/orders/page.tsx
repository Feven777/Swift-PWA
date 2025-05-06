"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";  // <— context import
import { OrderCard } from "@/components/employee/order-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { OrderStatus, OrderType } from "@/types/order";
import { toast } from "@/hooks/use-toast";

export default function EmployeeOrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query params
  const statusParam = searchParams.get("status") as OrderStatus | null;
  const typeParam = searchParams.get("type") as OrderType | null;

  const [activeStatus, setActiveStatus] = useState<OrderStatus>(
    statusParam || "unclaimed"
  );
  const [activeType, setActiveType] = useState<OrderType | "all">(
    typeParam || "all"
  );

  const {
    orders,
    isLoading,
    refetch,
    claimOrder,
  } = useOrders({
    status:        activeStatus,
    type:          activeType === "all" ? undefined : activeType,
    supermarketId: user?.supermarketId,
    refetchInterval: 15000,
  });

  // Redirect non-employees
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "employee")) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  // Sync URL <-> state
  useEffect(() => {
    if (statusParam && statusParam !== activeStatus) {
      setActiveStatus(statusParam);
    }
    if (typeParam && typeParam !== activeType) {
      setActiveType(typeParam);
    }
  }, [statusParam, typeParam]);

  const updateUrl = (status: OrderStatus, type: OrderType | "all") => {
    const params = new URLSearchParams();
    params.set("status", status);
    if (type !== "all") params.set("type", type);
    router.push(`/employee/orders?${params.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    const s = status as OrderStatus;
    setActiveStatus(s);
    updateUrl(s, activeType);
  };

  const handleTypeChange = (type: string) => {
    const t = type as OrderType | "all";
    setActiveType(t);
    updateUrl(activeStatus, t);
  };

  const handleClaim = async (orderId: string | number) => {
    if (!user) return;
    try {
      const result = await claimOrder(orderId);
      if (result.success) {
        toast({ title: "Order Claimed", description: "You claimed it!" });
        refetch();
      } else {
        toast({ title: "Error", description: result.error ?? "Failed", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  if (!user || user.role !== "employee") return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            {user.supermarketName && (
              <p className="text-sm text-muted-foreground">{user.supermarketName}</p>
            )}
          </div>
          <Button variant="outline" onClick={refetch}>Refresh</Button>
        </div>

        <Tabs value={activeStatus} onValueChange={handleStatusChange}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="unclaimed">Unclaimed</TabsTrigger>
            <TabsTrigger value="preparing">In Progress</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs value={activeType} onValueChange={handleTypeChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="pickup">Pickup</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm text-gray-500 mt-2">
              {activeStatus === "unclaimed"
                ? "No unclaimed orders."
                : activeStatus === "preparing"
                ? "No orders in progress."
                : "No ready orders."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClaim={activeStatus === "unclaimed" ? () => handleClaim(order.id) : undefined}
                onView={() => router.push(`/employee/orders/${order.id}`)}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
