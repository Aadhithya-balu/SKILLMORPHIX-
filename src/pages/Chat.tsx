
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const MATH_AI_RESPONSES: Record<string, string> = {
  "fraction": "Fractions represent parts of a whole. For example, in the fraction 3/4, the numerator (3) represents how many parts we're talking about, while the denominator (4) represents how many equal parts the whole is divided into. Would you like to learn about adding, subtracting, multiplying, or dividing fractions?",
  "algebra": "Algebra uses symbols (like x and y) to represent numbers and express mathematical relationships. For example, if we know that x + 5 = 10, we can solve for x by subtracting 5 from both sides: x = 5. What specific algebraic concept would you like help with?",
  "geometry": "Geometry is the study of shapes, sizes, and properties of space. Key concepts include points, lines, angles, and various 2D and 3D shapes. Would you like to learn about calculating areas, perimeters, or perhaps the Pythagorean theorem?",
  "calculus": "Calculus deals with rates of change and accumulation. The two main branches are differential calculus (concerning rates of change and slopes) and integral calculus (concerning accumulation and areas). What specific calculus topic are you interested in?",
  "equation": "Equations show that two mathematical expressions are equal. To solve them, we need to isolate the variable (like x) on one side. Would you like help solving a specific type of equation?",
  "pythagorean": "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides. So if a and b are the legs and c is the hypotenuse: a² + b² = c². This is useful for finding unknown sides of right triangles.",
  "multiplication": "Multiplication is a mathematical operation that gives the result of combining groups of equal size. For example, 5 × 3 means 5 groups of 3, which equals 15. Would you like help with multiplication tables or specific multiplication problems?",
  "division": "Division is the process of sharing or grouping a number into equal parts. For example, 15 ÷ 3 = 5 means 15 can be divided into 3 equal groups, with 5 in each group. Do you need help with long division or dividing fractions?",
  "percentage": "A percentage is a number expressed as a fraction of 100. For example, 25% is 25/100 or 0.25. To calculate a percentage of a number, multiply the number by the percentage expressed as a decimal. For example, 25% of 80 is 0.25 × 80 = 20.",
  "hello": "Hello! I'm your Math AI tutor. What mathematics topic would you like help with today?",
  "hi": "Hi there! I'm ready to help with math problems. What would you like to learn about?",
  "help": "I'm here to help with mathematics! I can explain concepts, walk through problem-solving steps, provide examples, or answer specific questions. What math topic are you studying?",
  "": "I didn't catch your math question. Could you please rephrase it?",
};

const GENERAL_AI_RESPONSES: Record<string, string> = {
  "hello": "Hello! How can I help with your learning today?",
  "hi": "Hi there! Do you have questions about your coursework?",
  "help": "I'm here to help! You can ask me questions about math, science, language arts, or social studies.",
  "test": "Would you like practice questions or tips for preparing for your test?",
  "homework": "I'd be happy to provide guidance on your homework. What subject is it for?",
  "": "I didn't catch that. Could you please rephrase your question?",
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMathFocused, setIsMathFocused] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Initial greeting and context detection
  useEffect(() => {
    const context = location.state?.context || "";
    
    if (context.toLowerCase().includes("math")) {
      setIsMathFocused(true);
      setMessages([
        {
          id: "welcome-msg",
          text: "Hello! I'm your Mathematics AI Tutor. I can help with concepts, solve problems step-by-step, or explain mathematical theories. What would you like to learn about today?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } else {
      setMessages([
        {
          id: "welcome-msg",
          text: "Hello! I'm your Skillmorphix AI Learning Assistant. How can I help with your studies today?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [location.state]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // In a real app, this would be an API call to an LLM
    setTimeout(() => {
      const lowercaseMsg = userMessage.toLowerCase();
      
      // Check for keyword matches
      let response = "I'm not sure how to respond to that. Could you ask something related to your coursework?";
      
      // If math context is detected, use math-focused responses
      if (isMathFocused || 
          lowercaseMsg.includes("math") || 
          lowercaseMsg.includes("equation") ||
          lowercaseMsg.includes("algebra") ||
          lowercaseMsg.includes("geometry")) {
        
        setIsMathFocused(true);
        
        for (const [keyword, reply] of Object.entries(MATH_AI_RESPONSES)) {
          if (lowercaseMsg.includes(keyword) && keyword !== "") {
            response = reply;
            break;
          }
        }
      } else {
        // Use general responses
        for (const [keyword, reply] of Object.entries(GENERAL_AI_RESPONSES)) {
          if (lowercaseMsg.includes(keyword) && keyword !== "") {
            response = reply;
            break;
          }
        }
        
        // If no specific keyword match but message is about a subject
        if (lowercaseMsg.includes("fraction")) {
          response = "Fractions represent parts of a whole. For example, 3/4 means three out of four equal parts. Would you like to learn more about adding, subtracting, multiplying, or dividing fractions?";
          setIsMathFocused(true);
        } else if (lowercaseMsg.includes("algebra")) {
          response = "Algebra uses symbols (like x and y) to represent numbers and express mathematical relationships. What specific algebraic concept do you need help with?";
          setIsMathFocused(true);
        } else if (lowercaseMsg.includes("history")) {
          response = "History helps us understand our past and how it shapes the present. Which historical period or event are you studying?";
        } else if (lowercaseMsg.includes("grammar") || lowercaseMsg.includes("write") || lowercaseMsg.includes("essay")) {
          response = "Good writing skills are essential for effective communication. Would you like tips on grammar, essay structure, or creative writing?";
        }
      }
      
      const newAIMessage: Message = {
        id: `ai-${Date.now()}`,
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 1000); // Simulate typing delay
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Generate AI response
    generateAIResponse(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="p-6 pb-0">
          <h2 className="text-3xl font-bold tracking-tight">
            {isMathFocused ? "Mathematics Tutor" : "Learning Assistant"}
          </h2>
          <p className="text-gray-500 mt-1 mb-4">
            {isMathFocused 
              ? "Get help with mathematics concepts, problem-solving, and more" 
              : "Ask questions about your coursework and get instant help"}
          </p>
        </div>
        
        <div className="flex-1 p-6 pt-2 flex flex-col">
          <Card className="flex-1 flex flex-col h-full">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                {isMathFocused ? "Mathematics AI Tutor" : "AI Learning Assistant"}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[calc(100vh-14rem)]">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.isUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className={`h-8 w-8 ${message.isUser ? "bg-indigo-600" : "bg-gray-300"}`}>
                          {message.isUser ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </Avatar>
                        <div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.isUser
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p>{message.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8 bg-gray-300">
                          <Bot className="h-4 w-4" />
                        </Avatar>
                        <div>
                          <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="border-t p-3">
              <div className="flex w-full items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={isMathFocused ? "Ask about any math concept or problem..." : "Type your question here..."}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={newMessage.trim() === ""}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
