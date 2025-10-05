import { CalendarDays } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">My Wedding</h1>
      <p className="text-muted-foreground">A clear view of your wedding and upcoming tasks</p>

      {/* Countdown Timer */}
      <div className="flex items-center gap-2 mt-4">
        <CalendarDays className="h-5 w-5 text-primary" />
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground">5</div>
          <div className="text-sm text-muted-foreground">Days Until 'I Do'</div>
        </div>
      </div>
    </div>
  )
}
