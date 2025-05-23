import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CheckoutProvider } from "@/context/checkout-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift - Grocery Delivery",
  description: "Making grocery delivery simple, fast, and transparent.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <CheckoutProvider>{children}</CheckoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
