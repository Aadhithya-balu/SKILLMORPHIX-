
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ThumbsUp, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const MathematicsVideos = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  const videoData: VideoItem[] = [
    {
      id: "math-001",
      title: "Introduction to Fractions",
      description: "Learn the basics of fractions and how they represent parts of a whole.",
      thumbnailUrl: "https://placehold.co/320x180/indigo/white?text=Fractions",
      duration: "12:30",
      category: "arithmetic",
      difficulty: "beginner"
    },
    {
      id: "math-002",
      title: "Solving Linear Equations",
      description: "Master the techniques to solve simple linear equations step by step.",
      thumbnailUrl: "https://placehold.co/320x180/indigo/white?text=Linear+Equations",
      duration: "15:45",
      category: "algebra",
      difficulty: "intermediate"
    },
    {
      id: "math-003",
      title: "Pythagorean Theorem",
      description: "Understand the fundamental relationship between the sides of a right triangle.",
      thumbnailUrl: "https://placehold.co/320x180/indigo/white?text=Pythagoras",
      duration: "10:15",
      category: "geometry",
      difficulty: "intermediate"
    },
    {
      id: "math-004",
      title: "Basic Addition and Subtraction",
      description: "Master the fundamental operations of addition and subtraction with numbers.",
      thumbnailUrl: "https://placehold.co/320x180/indigo/white?text=Addition",
      duration: "08:20",
      category: "arithmetic",
      difficulty: "beginner"
    },
    {
      id: "math-005",
      title: "Advanced Calculus: Derivatives",
      description: "Learn about rates of change and the fundamental concepts of calculus.",
      thumbnailUrl: "https://placehold.co/320x180/indigo/white?text=Calculus",
      duration: "18:50",
      category: "calculus",
      difficulty: "advanced"
    },
    {
      id: "math-006",
      title: "Multiplication Tables",
      description: "Memorize multiplication tables from 1 to 12 with helpful techniques.",
      thumbnailUrl: "https://placehold.co/320x180/indigo/white?text=Multiplication",
      duration: "11:10",
      category: "arithmetic",
      difficulty: "beginner"
    }
  ];

  const filteredVideos = selectedDifficulty === "all" 
    ? videoData 
    : videoData.filter(video => video.difficulty === selectedDifficulty);

  const handleVideoClick = (videoId: string) => {
    // In a real app, this would navigate to a video player page with the specific video
    console.log(`Playing video ${videoId}`);
    // For now, we'll navigate to the chat page where the AI can help with questions
    navigate(`/video-player/${videoId}`);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mathematics Videos</h1>
            <p className="text-gray-500 mt-1">
              Watch educational videos and learn mathematics at your own pace
            </p>
          </div>
          <Button 
            onClick={() => navigate("/chat")} 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Ask AI Tutor
          </Button>
        </div>

        <Tabs defaultValue="all" onValueChange={setSelectedDifficulty} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedDifficulty} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="relative h-44 cursor-pointer" 
                    onClick={() => handleVideoClick(video.id)}
                  >
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{video.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                        {video.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full ml-2">
                        {video.difficulty}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVideoClick(video.id)}
                    >
                      Watch Now
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MathematicsVideos;
