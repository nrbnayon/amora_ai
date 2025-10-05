"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, DollarSign, CheckSquare, Settings, MessageSquare, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"

const sidebarNavItems = [
  {
    title: "My Wedding",
    href: ROUTES.DASHBOARD,
    icon: Calendar,
  },
  {
    title: "Checklist",
    href: "/wedding/checklist",
    icon: CheckSquare,
  },
  {
    title: "Vendors",
    href: ROUTES.VENDORS,
    icon: MapPin,
  },
  {
    title: "Budget Distribution",
    href: ROUTES.BUDGET,
    icon: DollarSign,
  },
  {
    title: "Guests & Seating",
    href: ROUTES.GUESTS,
    icon: Users,
  },
  {
    title: "Assistant",
    href: "/wedding/assistant",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary mr-3">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight">Amora AI</h2>
          </div>
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
