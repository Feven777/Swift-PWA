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

function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) {
    return "N/A"
  }

  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date"
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}

export { formatDate }
