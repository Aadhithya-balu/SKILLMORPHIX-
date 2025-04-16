
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // If we have student info, go directly to dashboard, otherwise to landing page
    const studentInfo = localStorage.getItem("studentInfo");
    
    if (studentInfo) {
      navigate("/dashboard");
    } else {
      navigate("/landing");
    }
    
    toast({
      title: "Welcome to Skillmorphix",
      description: "Personalized learning for every student.",
      duration: 5000,
    });
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">Loading Skillmorphix...</h1>
        <p className="text-gray-500">Preparing your personalized learning experience</p>
      </div>
    </div>
  );
};

export default Index;
