
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface StudentInfo {
  name: string;
  grade: string;
  language: string;
}

interface Subject {
  id: number;
  name: string;
  icon: string;
  description: string;
  progress: number;
}

const Dashboard = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if student info exists in localStorage
    const storedInfo = localStorage.getItem("studentInfo");
    
    if (!storedInfo) {
      navigate("/");
      return;
    }

    const parsedInfo: StudentInfo = JSON.parse(storedInfo);
    setStudentInfo(parsedInfo);

    // Fetch subjects based on grade level
    fetchSubjects(parsedInfo.grade);
  }, [navigate]);

  const fetchSubjects = async (grade: string) => {
    try {
      // Using our mock service to get subject data
      // In a real app, this would make an API call to your backend
      const subjects = await getSubjectsByGrade(grade);
      setSubjects(subjects);
    } catch (error) {
      console.error("Failed to load subjects:", error);
      toast({
        title: "Error Loading Content",
        description: "Failed to load your personalized learning material. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getSubjectsByGrade = (grade: string): Promise<Subject[]> => {
    // Mock data - in a real app this would come from your backend
    return Promise.resolve([
      { 
        id: 1, 
        name: "Mathematics", 
        icon: "📊", 
        description: "Learn numbers, operations, geometry and more", 
        progress: 25 
      },
      { 
        id: 2, 
        name: "Science", 
        icon: "🔬", 
        description: "Explore nature, physics, chemistry and biology", 
        progress: 10 
      },
      { 
        id: 3, 
        name: "Language Arts", 
        icon: "📚", 
        description: "Reading, writing, grammar and vocabulary", 
        progress: 30 
      },
      { 
        id: 4, 
        name: "Social Studies", 
        icon: "🌎", 
        description: "History, geography and social sciences", 
        progress: 15 
      },
    ]);
  };

  const handleSubjectClick = (subjectId: number, subjectName: string) => {
    if (subjectName === "Mathematics") {
      navigate("/mathematics-videos");
    } else {
      // For other subjects, we could navigate to their specific pages in the future
      toast({
        title: `${subjectName} Coming Soon`,
        description: "Videos for this subject will be available soon!",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome, {studentInfo?.name}!
            </h2>
            <p className="text-gray-500">
              Grade {studentInfo?.grade} • {studentInfo?.language.charAt(0).toUpperCase() + studentInfo?.language.slice(1)}
            </p>
          </div>
          <Button 
            onClick={() => {
              localStorage.removeItem("studentInfo");
              navigate("/");
            }}
            variant="outline"
          >
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => handleSubjectClick(subject.id, subject.name)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">{subject.icon}</span>
                  {subject.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">{subject.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1">{subject.progress}% complete</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Recommended for you</h3>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-blue-800">
              Based on your learning patterns, we recommend starting with
              <span className="font-bold"> Mathematics: Fractions & Decimals</span> lesson today.
            </p>
            <Button 
              className="mt-2 bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/mathematics-videos")}
            >
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
