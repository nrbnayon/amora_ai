import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Guest List",
    description: "Track RSVPs and dietary preferences",
    icon: Users,
    href: "/dashboard/guests",
    action: "Go to Guest List",
  },
  {
    title: "Budget",
    description: "Overview of expenses and balance",
    icon: DollarSign,
    href: "/dashboard/budget",
    action: "Go to Budget",
  },
  {
    title: "Timeline",
    description: "Organize chart & task list",
    icon: Calendar,
    href: "/dashboard/timeline",
    action: "Go to Timeline",
  },
]

export function DashboardActions() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {actions.map((action) => (
        <Card key={action.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <action.icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{action.description}</p>
            <Link
              href={action.href}
              className="inline-block text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {action.action}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
