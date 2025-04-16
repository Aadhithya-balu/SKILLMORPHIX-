
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileType2, ArrowDownUp } from "lucide-react";

const ConnectionStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard 
        title="Data Sources" 
        value="3" 
        description="Connected databases" 
        icon={<Database className="h-4 w-4 text-forge-600" />} 
      />
      <StatCard 
        title="Transformations" 
        value="12" 
        description="Active transformations" 
        icon={<FileType2 className="h-4 w-4 text-forge-600" />} 
      />
      <StatCard 
        title="Data Syncs" 
        value="8" 
        description="Scheduled syncs" 
        icon={<ArrowDownUp className="h-4 w-4 text-forge-600" />} 
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ConnectionStats;
