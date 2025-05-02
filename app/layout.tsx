import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoyaltyProvider } from "@/context/loyalty-context";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Grocery Delivery",
  description:
    "Order groceries for delivery from local supermarkets in Ethiopia",
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
        <Providers>
            <LoyaltyProvider>
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">{children}</div>
                  <Footer />
                </div>

                <Toaster />
              </CartProvider>
            </LoyaltyProvider>
        </Providers>
      </body>
    </html>
  );
}
