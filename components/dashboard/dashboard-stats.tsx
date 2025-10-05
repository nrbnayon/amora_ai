import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Planning Progress */}
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Planning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>65% Completed</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Next Action */}
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Next Action</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Finalize photographer contract</p>
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Mark as done
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
