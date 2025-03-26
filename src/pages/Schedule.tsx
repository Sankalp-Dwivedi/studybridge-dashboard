
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scheduleData } from '@/data/mockData';
import StudentHeader from '@/components/StudentHeader';
import { Calendar, Clock, MapPin, GraduationCap, FileText, Users, Trophy } from 'lucide-react';

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(scheduleData[0].day);
  
  const daySchedule = scheduleData.find(day => day.day === selectedDay);
  
  // Get current date info for the week view
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Generate week days (starting from Monday of current week)
  const generateWeekDays = () => {
    const weekDays = [];
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Get Monday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      weekDays.push({
        date: day,
        day: dayNames[(i + 1) % 7], // Start from Monday (index 1)
        isToday: day.toDateString() === today.toDateString(),
      });
    }
    
    return weekDays;
  };
  
  const weekDays = generateWeekDays();
  
  // Helper function to get event type color
  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'lecture':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'lab':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'study':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'meeting':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'project':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'extracurricular':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };
  
  const getEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case 'lecture':
        return <GraduationCap className="text-blue-700" size={18} />;
      case 'lab':
        return <FileText className="text-green-700" size={18} />;
      case 'study':
        return <FileText className="text-yellow-700" size={18} />;
      case 'meeting':
        return <Users className="text-purple-700" size={18} />;
      case 'project':
        return <FileText className="text-orange-700" size={18} />;
      case 'extracurricular':
        return <Trophy className="text-red-700" size={18} />;
      default:
        return <Calendar className="text-gray-700" size={18} />;
    }
  };

  return (
    <div className="space-y-8">
      <StudentHeader 
        title="Class Schedule" 
        subtitle="View your weekly class schedule and activities"
      />

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <div className="flex overflow-x-auto pb-2 space-x-2 mb-4">
            {scheduleData.map((day) => (
              <button
                key={day.day}
                className={`px-4 py-2 rounded-lg flex-shrink-0 transition-colors ${
                  selectedDay === day.day
                    ? 'bg-scholar-blue text-white'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDay(day.day)}
              >
                {day.day}
              </button>
            ))}
          </div>
          
          <Card className="p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">{selectedDay}'s Schedule</h3>
            
            {daySchedule && daySchedule.events.length > 0 ? (
              <div className="space-y-6">
                {daySchedule.events.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index !== 0 && (
                      <div className="absolute top-0 left-7 h-full w-px bg-gray-200 -translate-y-1/2"></div>
                    )}
                    
                    <div className="flex items-start space-x-4 relative">
                      <div className={`flex-shrink-0 rounded-lg p-3 ${getEventTypeColor(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                        
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-2" />
                            <span>{event.time}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <MapPin size={16} className="mr-2" />
                            <span>{event.location}</span>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No events scheduled for this day.</p>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Weekly Schedule</h3>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map((day) => (
                <div 
                  key={day.day} 
                  className={`text-center p-2 rounded-t-lg ${
                    day.isToday ? 'bg-scholar-blue text-white' : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm font-medium">{day.day}</p>
                  <p className="text-xs mt-1">
                    {day.date.getDate()}/{day.date.getMonth() + 1}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => {
                const dayData = scheduleData.find(d => d.day === day.day);
                
                return (
                  <div 
                    key={day.day} 
                    className={`border p-2 rounded-b-lg min-h-[300px] ${
                      day.isToday ? 'border-scholar-blue' : 'border-gray-200'
                    }`}
                  >
                    {dayData && dayData.events.length > 0 ? (
                      <div className="space-y-2">
                        {dayData.events.map((event) => (
                          <div 
                            key={event.id} 
                            className={`p-2 rounded-lg text-xs ${getEventTypeColor(event.type)} border`}
                          >
                            <p className="font-medium truncate">{event.title}</p>
                            <p className="mt-1">{event.time}</p>
                            <p className="truncate">{event.location}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center mt-4">No events</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Monthly Calendar</h3>
            
            <p className="text-gray-500 text-center py-12">
              Calendar view is coming soon. Check back later!
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;
