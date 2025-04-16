
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronLeft } from "lucide-react";

interface VideoDetails {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: string;
  difficulty: string;
  relatedTopics: string[];
}

const VideoPlayer = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch video data from an API
    const fetchVideo = async () => {
      try {
        // Mock data - in a real app, fetch from API
        const videoData: VideoDetails = {
          id: videoId || "",
          title: videoId?.includes("001") 
            ? "Introduction to Fractions" 
            : videoId?.includes("002")
            ? "Solving Linear Equations"
            : "Mathematics Lesson",
          description: "This video explains key concepts in mathematics with clear examples and step-by-step explanations.",
          videoUrl: "https://example.com/video.mp4", // This would be a real video URL in production
          category: "Mathematics",
          difficulty: videoId?.includes("001") ? "beginner" : videoId?.includes("005") ? "advanced" : "intermediate",
          relatedTopics: ["Decimals", "Percentages", "Ratios", "Problem Solving"]
        };
        
        setVideo(videoData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video:", error);
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  const handleAskAI = () => {
    navigate("/chat", { state: { context: video?.title } });
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <p>Loading video...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!video) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <p>Video not found</p>
            <Button 
              onClick={() => navigate("/mathematics-videos")} 
              className="mt-4"
            >
              Back to Videos
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <Button
          variant="outline"
          onClick={() => navigate("/mathematics-videos")}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Videos
        </Button>

        <h1 className="text-3xl font-bold tracking-tight">{video.title}</h1>
        <div className="flex space-x-2 mb-4">
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
            {video.category}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
            {video.difficulty}
          </span>
        </div>

        <div className="bg-gray-900 w-full aspect-video rounded-lg flex items-center justify-center">
          <div className="text-white text-center p-4">
            <p className="mb-2">Video Player</p>
            <p className="text-sm opacity-70">(In a real app, this would be an embedded video player)</p>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{video.description}</p>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {video.relatedTopics.map((topic, index) => (
                <span 
                  key={index} 
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full cursor-pointer hover:bg-blue-100"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <Button 
            onClick={handleAskAI} 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Ask AI About This Topic
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default VideoPlayer;
