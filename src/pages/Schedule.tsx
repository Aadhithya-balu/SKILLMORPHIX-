import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus, Clock, BookOpen, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ScheduleEvent {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: string;
  description: string;
  teacher: string;
  location: string;
}

const SchedulePage = () => {
  const [date, setDate] = useState<Date>();
  const [scheduleData, setScheduleData] = useState<ScheduleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch learning schedule data
    const fetchSchedule = () => {
      // Simulated API call
      setTimeout(() => {
        setScheduleData([
          {
            id: 1,
            title: "Mathematics - Advanced Algebra",
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            startTime: "10:00 AM",
            endTime: "11:30 AM",
            type: "class",
            description: "Live session covering quadratic equations and their applications.",
            teacher: "Dr. Smith",
            location: "Virtual Room 3"
          },
          {
            id: 2,
            title: "Physics Lab Work",
            date: new Date(new Date().setDate(new Date().getDate() + 3)),
            startTime: "2:00 PM",
            endTime: "3:30 PM",
            type: "lab",
            description: "Practical experiments on motion and forces.",
            teacher: "Prof. Johnson",
            location: "Science Lab 2"
          },
          {
            id: 3,
            title: "Literature Essay Submission",
            date: new Date(new Date().setDate(new Date().getDate() + 2)),
            startTime: "11:59 PM",
            endTime: "11:59 PM",
            type: "assignment",
            description: "Submit your analysis of 'To Kill a Mockingbird' chapter 5-10.",
            teacher: "Ms. Davis",
            location: "Online Portal"
          },
          {
            id: 4,
            title: "Chemistry Quiz",
            date: new Date(),
            startTime: "9:00 AM",
            endTime: "10:00 AM",
            type: "exam",
            description: "Quiz on periodic table and chemical bonding.",
            teacher: "Dr. Wilson",
            location: "Room 205"
          },
          {
            id: 5,
            title: "Group Project Meeting",
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            startTime: "3:00 PM",
            endTime: "4:00 PM",
            type: "meeting",
            description: "Discuss progress on the history research project.",
            teacher: "Self-organized",
            location: "Study Room 4"
          }
        ]);

        setIsLoading(false);
      }, 1000);
    };

    fetchSchedule();
  }, []);

  // Filter events based on selected date
  const eventsForSelectedDate = scheduleData.filter(
    event => event.date.toDateString() === date?.toDateString()
  );

  // Check if a date has events
  const hasEvents = (day: Date): boolean => {
    return scheduleData.some(event => event.date.toDateString() === day.toDateString());
  };

  // Get the badge color based on event type
  const getEventBadgeColor = (type: string): string => {
    switch (type) {
      case "class": return "bg-blue-100 text-blue-800";
      case "lab": return "bg-green-100 text-green-800";
      case "assignment": return "bg-amber-100 text-amber-800";
      case "exam": return "bg-red-100 text-red-800";
      case "meeting": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Learning Schedule</h1>
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Add Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border"
                modifiers={{
                  event: (date) => hasEvents(date),
                }}
                modifiersClassNames={{
                  event: "font-bold",
                }}
                modifiersStyles={{
                  event: {
                    textDecoration: "underline",
                    textDecorationColor: "#3b82f6",
                    textDecorationThickness: "2px",
                  }
                }}
              />
              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                </h3>
                <div className="text-sm text-gray-500">
                  {eventsForSelectedDate.length === 0 ? (
                    <p>No events scheduled</p>
                  ) : (
                    <p>{eventsForSelectedDate.length} event(s) scheduled</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Events List Card */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {date ? format(date, "MMMM d, yyyy") : "Today's Schedule"}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Day</Button>
                <Button variant="outline" size="sm">Week</Button>
                <Button variant="outline" size="sm">Month</Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700 mx-auto"></div>
                    <p className="mt-2 text-gray-500">Loading schedule...</p>
                  </div>
                </div>
              ) : eventsForSelectedDate.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no learning events scheduled for this day.</p>
                  <div className="mt-6">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add New Event
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventsForSelectedDate.sort((a, b) => {
                    // Sort by time
                    return a.startTime.localeCompare(b.startTime);
                  }).map((event) => (
                    <div
                      key={event.id}
                      className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-[60px] text-center">
                        <div className="font-medium text-gray-900">{event.startTime}</div>
                        <div className="text-xs text-gray-500">{event.endTime}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          </div>
                          <Badge className={getEventBadgeColor(event.type)}>{event.type}</Badge>
                        </div>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{event.teacher}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;
