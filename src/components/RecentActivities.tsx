
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileText, BarChart3, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    description: "Data source PostgreSQL connected",
    type: "source",
    time: "1 hour ago"
  },
  {
    id: 2,
    description: "Transform job completed: Sales Analysis",
    type: "transform",
    time: "3 hours ago"
  },
  {
    id: 3,
    description: "New visualization created: Monthly Revenue",
    type: "visualization",
    time: "5 hours ago"
  },
  {
    id: 4,
    description: "MongoDB data sync scheduled",
    type: "source",
    time: "1 day ago"
  }
];

const RecentActivities = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="p-1.5 rounded-full bg-forge-100">
                {activity.type === "source" && <Database className="h-4 w-4 text-forge-600" />}
                {activity.type === "transform" && <FileText className="h-4 w-4 text-forge-600" />}
                {activity.type === "visualization" && <BarChart3 className="h-4 w-4 text-forge-600" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.description}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
