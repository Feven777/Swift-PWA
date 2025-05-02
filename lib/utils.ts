import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Corrected formatCurrency function
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB", // Ethiopian Birr
    currencyDisplay: "symbol", // Use the currency symbol (e.g., "Br")
  }).format(value);
}
