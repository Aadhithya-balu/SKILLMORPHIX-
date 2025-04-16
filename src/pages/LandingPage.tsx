
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !grade || !language) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    // Store user info in localStorage for persistence
    localStorage.setItem("studentInfo", JSON.stringify({ name, grade, language }));
    
    // Navigate to dashboard
    navigate("/dashboard");
    
    toast({
      title: `Welcome ${name}!`,
      description: "Your personalized learning journey begins now.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Skillmorphix Learning Platform
          </h1>
          <p className="text-gray-600">
            Bridging the Digital Divide with Personalized Education
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Class/Grade</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select your class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Grade 1</SelectItem>
                <SelectItem value="2">Grade 2</SelectItem>
                <SelectItem value="3">Grade 3</SelectItem>
                <SelectItem value="4">Grade 4</SelectItem>
                <SelectItem value="5">Grade 5</SelectItem>
                <SelectItem value="6">Grade 6</SelectItem>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Preferred Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select preferred language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
                <SelectItem value="portuguese">Portuguese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
            Start Learning
          </Button>
        </form>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Empowering students with personalized education regardless of background</p>
      </div>
    </div>
  );
};

export default LandingPage;
