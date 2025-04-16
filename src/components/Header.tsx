
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const studentInfo = localStorage.getItem("studentInfo") 
    ? JSON.parse(localStorage.getItem("studentInfo") || "{}") 
    : null;

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-indigo-700">
            Skillmorphix
          </h1>
          <span className="ml-2 rounded-md bg-indigo-100 px-2 py-0.5 text-xs text-indigo-800">
            Beta
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {studentInfo && (
            <Button 
              variant="ghost" 
              onClick={() => {
                localStorage.removeItem("studentInfo");
                navigate("/");
              }}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
