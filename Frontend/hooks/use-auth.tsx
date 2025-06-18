"use client";

import type React from "react"; //import
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";

export type UserRole = "buyer" | "manager" | "admin" | "employee";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    supermarketId?: number,
    supermarketName?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (
    data: UpdateProfilePayload
  ) => Promise<{ success: boolean; error?: string }>;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "Buyer Demo",
    email: "buyer@example.com",
    role: "buyer",
    avatarUrl: "/profile.jpg",
  },
  {
    id: "2",
    name: "Manager Demo",
    email: "manager@example.com",
    role: "manager",
    avatarUrl: "/profile2.jpg",
  },
  {
    id: "3",
    name: "Admin Demo",
    email: "admin@example.com",
    role: "admin",
    avatarUrl: "/profile.jpg",
  },
  {
    id: "4",
    name: "Employee Demo",
    email: "employee@example.com",
    role: "employee",
    supermarketId: 1,
    supermarketName: "Shola Supermarket",
    avatarUrl: "/profile2.jpg",
  },
  {
    id: "5",
    name: "Jane Employee",
    email: "jane@example.com",
    role: "employee",
    supermarketId: 2,
    supermarketName: "Safeway Supermarket",
    avatarUrl: "/profile.jpg",
  },
  {
    id: "6",
    name: "Mark Employee",
    email: "mark@example.com",
    role: "employee",
    supermarketId: 3,
    supermarketName: "Fresh Corner Market",
    avatarUrl: "/profile2.jpg",
  },
  {
    id: "7",
    name: "Chris Employee",
    email: "chris@example.com",
    role: "employee",
    supermarketId: 4,
    supermarketName: "Mafi City Mall Supermarket",
    avatarUrl: "/profile.jpg",
  },
  {
    id: "8",
    name: "Alex Employee",
    email: "alex@example.com",
    role: "employee",
    supermarketId: 5,
    supermarketName: "Friendship Supermarket",
    avatarUrl: "/profile2.jpg",
  },
  {
    id: "9",
    name: "Sam Employee",
    email: "sam@example.com",
    role: "employee",
    supermarketId: 6,
    supermarketName: "Getfam Supermarket",
    avatarUrl: "/profile.jpg",
  },
  {
    id: "10",
    name: "Jordan Employee",
    email: "jordan@example.com",
    role: "employee",
    supermarketId: 7,
    supermarketName: "Zemen Mart",
    avatarUrl: "/profile2.jpg",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const updateProfile = async (data: UpdateProfilePayload) => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((res) => setTimeout(res, 500));

      if (!user) {
        return { success: false, error: "Not authenticated" };
      }

      const updated: User = { ...user, ...data };
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      return { success: true };
    } catch (e) {
      return { success: false, error: "Profile update failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user with matching email
      const foundUser = mockUsers.find((u) => u.email === email);
      if (!foundUser) {
        return { success: false, error: "Invalid email or password" };
      }

      // In a real app, you would verify the password here
      // For demo purposes, we'll just accept any password

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: "An error occurred during login" };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    supermarketId?: number,
    supermarketName?: string
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if email is already in use
      if (mockUsers.some((u) => u.email === email)) {
        return { success: false, error: "Email is already in use" };
      }

      // Create new user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        role,
      };

      // Add supermarket info for employees
      if (role === "employee" && supermarketId && supermarketName) {
        newUser.supermarketId = supermarketId;
        newUser.supermarketName = supermarketName;
      }

      // In a real app, you would hash the password and store the user in a database
      mockUsers.push(newUser);

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: "An error occurred during registration" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
