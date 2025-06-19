"use client";

import type React from "react";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "@/hooks/use-auth";
import type { Order, OrderStatus, OrderType } from "@/types/order";

// Define the context type
interface OrderContextType {
  orders: Order[];
  claimOrder: (
    orderId: string | number
  ) => Promise<{ success: boolean; error?: string }>;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getOrderById: (id: string | number) => Order | undefined;
  getOrdersForCurrentSupermarket: () => Order[];
  getOrderCountByStatus: (status: OrderStatus) => number;
  updateOrderItemStatus: (
    orderId: string | number,
    itemId: number,
    completed: boolean
  ) => Promise<{ success: boolean; allCompleted?: boolean; error?: string }>;
  handoffOrder: (
    orderId: string | number,
    orderType: OrderType
  ) => Promise<{ success: boolean; error?: string }>;
  addOrder: (order: Order) => Promise<{ success: boolean; error?: string }>;
}

// Create context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Mock orders for demo purposes - simplified for brevity
const mockOrders: Order[] = [
  // Fresh Market (supermarketId: 1) orders
  {
    id: "1",
    customerId: "c1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    supermarketId: 1,
    supermarketName: "Fresh Market",
    date: "2023-05-04T10:30:00Z",
    status: "unclaimed",
    type: "delivery",
    items: [
      {
        id: 1,
        productId: 101,
        name: "Apples",
        price: 3.99,
        quantity: 2,
        image: "/placeholder.svg",
        completed: false,
      },
      {
        id: 2,
        productId: 102,
        name: "Bread",
        price: 2.49,
        quantity: 1,
        image: "/placeholder.svg",
        completed: false,
      },
      {
        id: 3,
        productId: 103,
        name: "Milk",
        price: 3.29,
        quantity: 1,
        image: "/placeholder.svg",
        completed: false,
      },
    ],
    total: 13.76,
    specialInstructions: "Please leave at the door",
  },
  {
    id: "2",
    customerId: "c2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    supermarketId: 1,
    supermarketName: "Fresh Market",
    date: "2023-05-04T11:15:00Z",
    status: "preparing",
    type: "pickup",
    items: [
      {
        id: 1,
        productId: 201,
        name: "Chicken",
        price: 8.99,
        quantity: 1,
        image: "/placeholder.svg",
        completed: true,
      },
      {
        id: 2,
        productId: 202,
        name: "Rice",
        price: 4.49,
        quantity: 1,
        image: "/placeholder.svg",
        completed: false,
      },
      {
        id: 3,
        productId: 203,
        name: "Vegetables",
        price: 2.99,
        quantity: 3,
        image: "/placeholder.svg",
        completed: true,
      },
    ],
    total: 22.45,
    employeeId: "emp1",
    employeeName: "Employee Demo",
  },
  {
    id: "3",
    customerId: "c3",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    supermarketId: 1,
    supermarketName: "Fresh Market",
    date: "2023-05-04T09:45:00Z",
    status: "ready",
    type: "delivery",
    items: [
      {
        id: 1,
        productId: 301,
        name: "Eggs",
        price: 3.49,
        quantity: 1,
        image: "/placeholder.svg",
        completed: true,
      },
      {
        id: 2,
        productId: 302,
        name: "Cheese",
        price: 4.99,
        quantity: 1,
        image: "/placeholder.svg",
        completed: true,
      },
      {
        id: 3,
        productId: 303,
        name: "Juice",
        price: 3.99,
        quantity: 2,
        image: "/placeholder.svg",
        completed: true,
      },
    ],
    total: 16.46,
    employeeId: "emp1",
    employeeName: "Employee Demo",
  },
  // Super Grocers (supermarketId: 2) orders
  {
    id: "4",
    customerId: "c4",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    supermarketId: 2,
    supermarketName: "Super Grocers",
    date: "2023-05-04T13:20:00Z",
    status: "unclaimed",
    type: "delivery",
    items: [
      {
        id: 1,
        productId: 401,
        name: "Pasta",
        price: 1.99,
        quantity: 2,
        image: "/placeholder.svg",
        completed: false,
      },
      {
        id: 2,
        productId: 402,
        name: "Sauce",
        price: 3.49,
        quantity: 1,
        image: "/placeholder.svg",
        completed: false,
      },
      {
        id: 3,
        productId: 403,
        name: "Ground Beef",
        price: 6.99,
        quantity: 1,
        image: "/placeholder.svg",
        completed: false,
      },
    ],
    total: 14.46,
  },
  // Additional orders would be here...
];

// Order provider component
export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Try to get orders from localStorage
    if (typeof window !== "undefined") {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        return JSON.parse(savedOrders);
      }
    }
    return mockOrders;
  });
  const { user } = useAuth();

  // Update localStorage whenever orders change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  // Claim an order
  const claimOrder = async (
    orderId: string | number
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const id = typeof orderId === "string" ? orderId : orderId.toString();

      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id === id && order.status === "unclaimed" && user) {
            return {
              ...order,
              status: "preparing",
              employeeId: user.id,
              employeeName: user.name,
            };
          }
          return order;
        })
      );

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to claim order",
      };
    }
  };

  // Get orders by status
  const getOrdersByStatus = (status: OrderStatus): Order[] => {
    return orders.filter((order) => order.status === status);
  };

  // Get order by ID
  const getOrderById = (id: string | number): Order | undefined => {
    const orderId = typeof id === "number" ? id.toString() : id;
    return orders.find((order) => order.id === orderId);
  };

  // Get orders for the current supermarket (for employees)
  const getOrdersForCurrentSupermarket = (): Order[] => {
    if (!user || user.role !== "employee" || !user.supermarketId) {
      return [];
    }

    return orders.filter((order) => order.supermarketId === user.supermarketId);
  };

  // Get order count by status for the current supermarket
  const getOrderCountByStatus = (status: OrderStatus): number => {
    if (!user || user.role !== "employee" || !user.supermarketId) {
      return 0;
    }

    return orders.filter(
      (order) =>
        order.supermarketId === user.supermarketId && order.status === status
    ).length;
  };

  // Update order item status
  const updateOrderItemStatus = async (
    orderId: string | number,
    itemId: number,
    completed: boolean
  ): Promise<{ success: boolean; allCompleted?: boolean; error?: string }> => {
    try {
      const id = typeof orderId === "string" ? orderId : orderId.toString();

      // Find the order
      const orderIndex = orders.findIndex((order) => order.id === id);

      if (orderIndex === -1) {
        return { success: false, error: "Order not found" };
      }

      // Update the order items
      const updatedOrders = [...orders];
      const order = { ...updatedOrders[orderIndex] };

      // Update the specific item
      order.items = order.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, completed };
        }
        return item;
      });

      // Check if all items are completed
      const allCompleted = order.items.every((item) => item.completed);

      // If all items are completed, update the order status
      if (allCompleted && order.status === "preparing") {
        order.status = "ready";
      }

      updatedOrders[orderIndex] = order;
      setOrders(updatedOrders);

      return {
        success: true,
        allCompleted,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update item status",
      };
    }
  };

  // Handoff order (mark as completed/delivered)
  const handoffOrder = async (
    orderId: string | number,
    orderType: OrderType
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const id = typeof orderId === "string" ? orderId : orderId.toString();

      // Find the order
      const orderIndex = orders.findIndex((order) => order.id === id);

      if (orderIndex === -1) {
        return { success: false, error: "Order not found" };
      }

      const order = orders[orderIndex];

      if (order.status !== "ready") {
        return { success: false, error: "Order is not ready for handoff" };
      }

      // Update the order status
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = {
        ...order,
        status: "completed",
      };

      setOrders(updatedOrders);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to handoff order",
      };
    }
  };

  // Add notification function
  const notifyNewOrder = async (order: Order) => {
    try {
      // Check if browser supports notifications
      if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
      }

      // Request notification permission if not granted
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          return;
        }
      }

      // Create notification for new order
      new Notification("New Order Received", {
        body: `Order #${order.id} from ${
          order.customerName
        } - Total: $${order.total.toFixed(2)}`,
        icon: "/logo.png", // Make sure to add your logo to public folder
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Add new order
  const addOrder = async (newOrder: Order) => {
    try {
      setOrders((prevOrders) => [...prevOrders, newOrder]);

      // Notify employees of new order
      if (
        user?.role === "employee" &&
        user.supermarketId === newOrder.supermarketId
      ) {
        await notifyNewOrder(newOrder);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to add order",
      };
    }
  };


  return (
    <OrderContext.Provider
      value={{
        orders,
        claimOrder,
        getOrdersByStatus,
        getOrderById,
        getOrdersForCurrentSupermarket,
        getOrderCountByStatus,
        updateOrderItemStatus,
        handoffOrder,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// Custom hook to use order context
export function useOrders(options?: {
  status?: OrderStatus;
  type?: OrderType;
  supermarketId?: number;
  refetchInterval?: number;
}) {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter orders based on options
  useEffect(() => {
    setIsLoading(true);
    let result = [...context.orders];

    if (options?.supermarketId) {
      result = result.filter(
        (order) => order.supermarketId === options.supermarketId
      );
    }

    if (options?.status) {
      result = result.filter((order) => order.status === options.status);
    }

    // Filter by type
    if (options?.type) {
      result = result.filter((order) => order.type === options.type);
    }

    setFilteredOrders(result);
    setIsLoading(false);
  }, [context.orders, options?.status, options?.type, options?.supermarketId]);

  // Set up refetch interval if specified
  useEffect(() => {
    if (!options?.refetchInterval) return;

    const intervalId = setInterval(() => {
      // This just triggers a re-render to refresh the filtered orders
      setFilteredOrders((prev) => [...prev]);
    }, options.refetchInterval);

    return () => clearInterval(intervalId);
  }, [options?.refetchInterval, filteredOrders]);

  // Add refetch function
  const refetch = useCallback(() => {
    setIsLoading(true);
    // Short timeout to simulate fetch and trigger state update
    setTimeout(() => {
      setFilteredOrders((prev) => [...prev]);
      setIsLoading(false);
    }, 300);
  }, []);

  return {
    orders: filteredOrders,
    isLoading,
    refetch,
    claimOrder: context.claimOrder,
    getOrdersByStatus: context.getOrdersByStatus,
    getOrderById: context.getOrderById,
    getOrdersForCurrentSupermarket: context.getOrdersForCurrentSupermarket,
    getOrderCountByStatus: context.getOrderCountByStatus,
    updateOrderItemStatus: context.updateOrderItemStatus,
    handoffOrder: context.handoffOrder,
    addOrder: context.addOrder,
  };
}
