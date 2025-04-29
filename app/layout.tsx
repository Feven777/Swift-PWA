import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LoyaltyProvider } from "@/context/loyalty-context";
import { CartProvider } from "@/context/cart-context"; // Import CartProvider
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift - Grocery Delivery",
  description: "Get groceries delivered to your doorstep in minutes",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LoyaltyProvider>
            <CartProvider>
              {" "}
              {/* Wrap the application with CartProvider */}
              <main className="min-h-screen bg-gray-50">{children}</main>
              <Toaster />
            </CartProvider>
          </LoyaltyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
