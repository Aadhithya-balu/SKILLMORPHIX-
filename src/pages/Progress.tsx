import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Subject {
  name: string;
  progress: number;
  status: string;
  description: string;
  color: string;
}

interface Skill {
  name: string;
  level: string;
  progress: number;
  description: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const subjectsData: Subject[] = [
  {
    name: "Mathematics",
    progress: 85,
    status: "Excellent",
    description: "Advanced topics in algebra and calculus.",
    color: "#4CAF50",
  },
  {
    name: "Science",
    progress: 60,
    status: "Good",
    description: "Exploring physics, chemistry, and biology.",
    color: "#2196F3",
  },
  {
    name: "History",
    progress: 40,
    status: "Improving",
    description: "World history and significant events.",
    color: "#FF9800",
  },
  {
    name: "Literature",
    progress: 75,
    status: "Very Good",
    description: "Classic and contemporary literature analysis.",
    color: "#9C27B0",
  },
];

const skillsData: Skill[] = [
  {
    name: "Problem Solving",
    level: "Advanced",
    progress: 90,
    description: "Complex problem-solving techniques.",
  },
  {
    name: "Critical Thinking",
    level: "Intermediate",
    progress: 65,
    description: "Analyzing and evaluating information.",
  },
  {
    name: "Creative Writing",
    level: "Beginner",
    progress: 30,
    description: "Expressing ideas through writing.",
  },
];

const achievementsData: Achievement[] = [
  {
    title: "Math Whiz",
    description: "Scored 100% on the last math quiz.",
    icon: "🥇",
  },
  {
    title: "Science Explorer",
    description: "Completed all science experiments.",
    icon: "🧪",
  },
  {
    title: "History Buff",
    description: "Participated actively in history discussions.",
    icon: "📜",
  },
];

const ProgressPage = () => {
  const [overallProgress, setOverallProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [hoursSpent, setHoursSpent] = useState(0);
  const [subjectsInProgress, setSubjectsInProgress] = useState(0);
  const [skillsMastered, setSkillsMastered] = useState(0);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = () => {
      setTimeout(() => {
        setOverallProgress(70);
        setCompletedLessons(45);
        setHoursSpent(60);
        setSubjectsInProgress(3);
        setSkillsMastered(12);
        setSubjects(subjectsData);
        setSkills(skillsData);
        setAchievements(achievementsData);
      }, 500);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Learning Progress</h1>
        
        {/* Overall Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Learning path completion</span>
                    <span className="text-sm font-medium">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{completedLessons}</div>
                  <div className="text-sm text-gray-500">Lessons Completed</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{hoursSpent}</div>
                  <div className="text-sm text-gray-500">Hours Spent</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{subjectsInProgress}</div>
                  <div className="text-sm text-gray-500">Subjects in Progress</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{skillsMastered}</div>
                  <div className="text-sm text-gray-500">Skills Mastered</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="subjects">
              <TabsList className="mb-4">
                <TabsTrigger value="subjects">By Subject</TabsTrigger>
                <TabsTrigger value="skills">By Skills</TabsTrigger>
              </TabsList>
              
              <TabsContent value="subjects">
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          ></div>
                          <h3 className="font-medium">{subject.name}</h3>
                        </div>
                        <Badge variant={subject.progress > 75 ? "success" : "default"}>
                          {subject.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{subject.description}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress 
                            value={subject.progress} 
                            className="h-2" 
                            style={{ '--progress-background': subject.color }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{subject.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="skills">
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{skill.name}</h3>
                        <Badge variant={skill.level === 'Advanced' ? "success" : skill.level === 'Intermediate' ? "warning" : "default"}>
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{skill.description}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress 
                            value={skill.progress} 
                            className="h-2"
                            style={{ '--progress-background': '#4F46E5' }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{skill.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 flex gap-4 items-center">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <div className="w-8 h-8 flex items-center justify-center text-indigo-600 text-xl">
                      {achievement.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Learning Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Based on your learning patterns, we've identified these insights:</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
                <h4 className="font-medium text-blue-700 mb-1">Best Learning Time</h4>
                <p className="text-sm">You seem to make the most progress during morning hours (9 AM - 12 PM).</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                <h4 className="font-medium text-green-700 mb-1">Strongest Subject</h4>
                <p className="text-sm">Mathematics - You consistently score above 85% in assessments.</p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-1">Area for Improvement</h4>
                <p className="text-sm">Historical Analysis - Consider spending more time on critical thinking exercises.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProgressPage;
