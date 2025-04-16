
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ArrowRight } from "lucide-react";

interface DataSourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connectionStatus?: "connected" | "disconnected";
}

const DataSourceCard = ({ 
  title, 
  description, 
  icon, 
  connectionStatus 
}: DataSourceCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-forge-100 rounded-md">
            {icon}
          </div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
        {connectionStatus && (
          <div className={`px-2 py-1 rounded-full text-xs ${
            connectionStatus === "connected" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
          }`}>
            {connectionStatus}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
        <div className="mt-4 flex justify-end">
          <ArrowRight className="h-5 w-5 text-forge-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceCard;
