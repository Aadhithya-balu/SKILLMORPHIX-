
import ConnectionStats from "./ConnectionStats";
import DataSourceCard from "./DataSourceCard";
import DashboardMetrics from "./DashboardMetrics";
import RecentActivities from "./RecentActivities";
import { Database, Table, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button className="bg-forge-600 hover:bg-forge-700">
          Add New Connection
        </Button>
      </div>

      <ConnectionStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DataSourceCard
          title="PostgreSQL"
          description="Production database with user data and analytics"
          icon={<Database className="h-5 w-5 text-forge-600" />}
          connectionStatus="connected"
        />
        <DataSourceCard
          title="MongoDB"
          description="NoSQL database with product catalog and inventory"
          icon={<Database className="h-5 w-5 text-forge-600" />}
          connectionStatus="connected"
        />
        <DataSourceCard
          title="CSV Files"
          description="Historical data and third-party exports"
          icon={<Table className="h-5 w-5 text-forge-600" />}
          connectionStatus="connected"
        />
        <DataSourceCard
          title="REST API"
          description="Connect to external services and APIs"
          icon={<Server className="h-5 w-5 text-forge-600" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <RecentActivities />
        <DashboardMetrics />
      </div>
    </div>
  );
};

export default Dashboard;
