import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const taskData = [
  { name: "To do", value: 10, color: "#ef4444" },
  { name: "In Progress", value: 0, color: "#f59e0b" },
  { name: "Completed", value: 0, color: "#10b981" },
]

const budgetData = [
  { name: "Venue", value: 40, color: "#3b82f6" },
  { name: "Catering", value: 30, color: "#ef4444" },
  { name: "Decor", value: 20, color: "#f59e0b" },
  { name: "Other", value: 10, color: "#10b981" },
]

const guestData = [
  { label: "Accepted", value: 120 },
  { label: "Declined", value: 15 },
  { label: "Pending", value: 35 },
  { label: "Total Guests", value: 170 },
]

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Charts & Reports</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Task Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <div className="text-2xl font-bold text-red-500">10</div>
                <div className="text-xs text-muted-foreground">To do</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">0</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">0</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Split */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Budget Split</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {budgetData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guest RSVP */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Guest RSVP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {guestData.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
