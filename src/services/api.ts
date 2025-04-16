
// API service for connecting to our backend

const API_BASE_URL = "http://localhost:5000/api";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Subject {
  id: number;
  name: string;
  icon: string;
  description: string;
  progress: number;
}

export interface Lesson {
  id: number;
  subjectId: number;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

export interface StudentProgress {
  subjectId: number;
  progress: number;
  lastActivity: string;
  strengths: string[];
  areasToImprove: string[];
}

class ApiService {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      console.error("API request failed:", error);
      return { 
        data: {} as T, 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }

  async post<T>(endpoint: string, payload: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      console.error("API request failed:", error);
      return { 
        data: {} as T, 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }
}

export const apiService = new ApiService();

// Mock data service (until real backend is connected)
export const mockDataService = {
  getSubjectsByGrade: (grade: string): Promise<Subject[]> => {
    return Promise.resolve([
      { 
        id: 1, 
        name: "Mathematics", 
        icon: "📊", 
        description: "Numbers, operations, geometry and more", 
        progress: 25 
      },
      { 
        id: 2, 
        name: "Science", 
        icon: "🔬", 
        description: "Nature, physics, chemistry and biology", 
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
        description: "History, geography and civics", 
        progress: 15 
      }
    ]);
  },
  
  getLessonsBySubject: (subjectId: number): Promise<Lesson[]> => {
    return Promise.resolve([
      {
        id: 1,
        subjectId: 1,
        title: "Introduction to Numbers",
        description: "Learn about counting and basic operations",
        duration: 20,
        difficulty: "beginner",
        completed: true
      },
      {
        id: 2,
        subjectId: 1,
        title: "Addition and Subtraction",
        description: "Master the basic arithmetic operations",
        duration: 25,
        difficulty: "beginner",
        completed: false
      },
      {
        id: 3,
        subjectId: 1,
        title: "Multiplication Tables",
        description: "Learn multiplication from 1 to 10",
        duration: 30,
        difficulty: "intermediate",
        completed: false
      }
    ]);
  },
  
  getStudentProgress: (studentId: string): Promise<StudentProgress[]> => {
    return Promise.resolve([
      {
        subjectId: 1,
        progress: 30,
        lastActivity: "2023-04-14T15:30:00",
        strengths: ["Addition", "Subtraction"],
        areasToImprove: ["Multiplication", "Division"]
      },
      {
        subjectId: 2,
        progress: 15,
        lastActivity: "2023-04-13T10:15:00",
        strengths: ["Plant biology"],
        areasToImprove: ["Chemical reactions", "Simple machines"]
      }
    ]);
  }
};
