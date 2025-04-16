
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface StudentInfo {
  name: string;
  grade: string;
  language: string;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  
  // Settings state
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(false);

  useEffect(() => {
    // Load student info from localStorage
    const storedInfo = localStorage.getItem("studentInfo");
    
    if (!storedInfo) {
      navigate("/");
      return;
    }

    const parsedInfo: StudentInfo = JSON.parse(storedInfo);
    setStudentInfo(parsedInfo);
    
    // Populate form fields
    setName(parsedInfo.name || "");
    setGrade(parsedInfo.grade || "");
    setLanguage(parsedInfo.language || "");
  }, [navigate]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !grade || !language) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Update localStorage
    const updatedInfo = { name, grade, language };
    localStorage.setItem("studentInfo", JSON.stringify(updatedInfo));
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved",
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("studentInfo");
    navigate("/");
    
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out",
    });
  };

  const toggleSetting = (setting: string, value: boolean) => {
    switch (setting) {
      case "notifications":
        setNotifications(value);
        toast({
          title: value ? "Notifications Enabled" : "Notifications Disabled",
          description: value ? 
            "You'll receive updates about your learning progress" : 
            "You won't receive notifications from the app",
        });
        break;
      case "darkMode":
        setDarkMode(value);
        toast({
          title: value ? "Dark Mode Enabled" : "Light Mode Enabled",
          description: "Your theme preference has been saved",
        });
        break;
      case "offlineMode":
        setOfflineMode(value);
        toast({
          title: value ? "Offline Mode Enabled" : "Offline Mode Disabled",
          description: value ? 
            "Content will be downloaded for offline access" : 
            "Only online content will be available",
        });
        break;
      case "voiceAssistant":
        setVoiceAssistant(value);
        toast({
          title: value ? "Voice Assistant Enabled" : "Voice Assistant Disabled",
          description: "Your voice assistant preference has been saved",
        });
        break;
    }
  };

  if (!studentInfo) {
    return null;
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Settings</h2>
          <p className="text-gray-500 mb-6">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
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

                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Application Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>
                Customize how the application works
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive alerts about assignments and deadlines
                    </p>
                  </div>
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={(value) => toggleSetting("notifications", value)} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-500">
                      Use dark theme for low-light environments
                    </p>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={(value) => toggleSetting("darkMode", value)} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Offline Access</h3>
                    <p className="text-sm text-gray-500">
                      Download content for offline learning
                    </p>
                  </div>
                  <Switch 
                    checked={offlineMode} 
                    onCheckedChange={(value) => toggleSetting("offlineMode", value)} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Voice Assistant</h3>
                    <p className="text-sm text-gray-500">
                      Enable voice guidance and instructions
                    </p>
                  </div>
                  <Switch 
                    checked={voiceAssistant} 
                    onCheckedChange={(value) => toggleSetting("voiceAssistant", value)} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>
                Manage your account data and sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Sign Out</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    End your current session and return to the landing page
                  </p>
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-red-600 mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    This will permanently remove all your data from our systems
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      toast({
                        title: "This is a demo",
                        description: "Account deletion is not available in this demo",
                      });
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
