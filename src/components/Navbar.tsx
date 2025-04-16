
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  BarChart, 
  Calendar, 
  MessageSquare, 
  Settings
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center gap-1 py-3 text-sm cursor-pointer ${
        isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="h-full bg-white border-r p-2">
      <div className="flex flex-col items-center gap-4">
        <NavItem 
          icon={<BookOpen />} 
          label="Learn" 
          to="/dashboard"
          isActive={currentPath === "/dashboard"}
        />
        <NavItem 
          icon={<BarChart />} 
          label="Progress" 
          to="/progress"
          isActive={currentPath === "/progress"}
        />
        <NavItem 
          icon={<Calendar />} 
          label="Schedule" 
          to="/schedule"
          isActive={currentPath === "/schedule"}
        />
        <NavItem 
          icon={<MessageSquare />} 
          label="Chat" 
          to="/chat"
          isActive={currentPath === "/chat"}
        />
        <NavItem 
          icon={<Settings />} 
          label="Settings" 
          to="/settings"
          isActive={currentPath === "/settings"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
