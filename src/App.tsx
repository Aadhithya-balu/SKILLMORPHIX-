
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProgressPage from "./pages/Progress";
import SchedulePage from "./pages/Schedule";
import ChatPage from "./pages/Chat";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import MathematicsVideos from "./pages/MathematicsVideos";
import VideoPlayer from "./pages/VideoPlayer";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/mathematics-videos" element={<MathematicsVideos />} />
            <Route path="/video-player/:videoId" element={<VideoPlayer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
