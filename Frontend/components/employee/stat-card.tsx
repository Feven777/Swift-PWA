import Link from "next/link"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  count: number
  link: string
  icon?: string
  variant?: "default" | "primary" | "success" | "warning" | "danger"
}

export function StatCard({ title, count, link, icon = "mdi:package", variant = "default" }: StatCardProps) {
  const variantClasses = {
    default: "bg-white border-gray-200 hover:border-gray-300",
    primary: "bg-primary/10 border-primary/20 hover:border-primary/30",
    success: "bg-green-50 border-green-200 hover:border-green-300",
    warning: "bg-yellow-50 border-yellow-200 hover:border-yellow-300",
    danger: "bg-red-50 border-red-200 hover:border-red-300",
  }

  const iconClasses = {
    default: "text-gray-500",
    primary: "text-primary",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  }

  return (
    <Link href={link} className="block">
      <div className={cn("rounded-lg border p-6 transition-all hover:shadow-md", variantClasses[variant])}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-3xl font-semibold">{count}</h3>
          </div>
          <div className={cn("rounded-full p-3", `bg-${variant === "default" ? "gray" : variant}-100`)}>
            <Icon icon={icon} className={cn("h-6 w-6", iconClasses[variant])} />
          </div>
        </div>
      </div>
    </Link>
  )
}
