import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, Users, TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: "orders" | "revenue" | "customers" | "growth"
  description?: string
}

export function StatCard({ title, value, icon, description }: StatCardProps) {
  const icons = {
    orders: Package,
    revenue: DollarSign,
    customers: Users,
    growth: TrendingUp,
  }

  const Icon = icons[icon]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
