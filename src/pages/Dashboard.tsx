
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { 
  overallProgress, 
  upcomingAssignments, 
  upcomingExams, 
  recentCourses, 
  learningPathRecommendations, 
  academicAchievements,
  getDaySchedule
} from '@/data/mockData';
import ProgressBar from '@/components/ProgressBar';
import CourseCard from '@/components/CourseCard';
import AssignmentCard from '@/components/AssignmentCard';
import AchievementCard from '@/components/AchievementCard';
import StudentHeader from '@/components/StudentHeader';
import { Calendar, Trophy, GraduationCap, FileText, Clock } from 'lucide-react';
import { studentInfo } from '@/data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <StudentHeader 
        title="Student Dashboard" 
        subtitle={`Welcome back, ${studentInfo.name.split(' ')[0]}`} 
      />

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="stat-card">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Overall Progress</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <Calendar size={20} className="text-scholar-blue" />
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-gray-900 mb-4">
                {overallProgress.percentage}%
              </div>
              
              <ProgressBar 
                progress={overallProgress.percentage} 
                target={overallProgress.target}
                size="lg"
              />
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Keep going! You're making great progress.
              </p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Upcoming Assignments</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <FileText size={20} className="text-scholar-blue" />
              </div>
            </div>
            
            <div className="space-y-3">
              {upcomingAssignments.slice(0, 2).map((assignment) => (
                <div key={assignment.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-scholar-blue mt-2"></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{assignment.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        {assignment.subject}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Upcoming Exams</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <Clock size={20} className="text-scholar-blue" />
              </div>
            </div>
            
            <div className="space-y-3">
              {upcomingExams.slice(0, 2).map((exam) => (
                <div key={exam.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-scholar-blue mt-2"></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{exam.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {exam.date} · {exam.time}
                    </p>
                    <p className="text-xs text-gray-500">
                      {exam.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Courses and Schedule Tabs */}
      <div>
        <Tabs defaultValue="recent-courses" className="space-y-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="recent-courses">Recent Courses</TabsTrigger>
            <TabsTrigger value="today-schedule">Today's Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="recent-courses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <CourseCard 
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  instructor={course.instructor}
                  progress={course.progress}
                  lastAccessed={course.lastAccessed}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="today-schedule">
            <Card className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {getDaySchedule().day}'s Classes & Activities
              </h3>
              
              <div className="space-y-4">
                {getDaySchedule().events.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                    <div className={`
                      p-2 rounded-lg 
                      ${event.type === 'lecture' ? 'bg-blue-50' : ''}
                      ${event.type === 'lab' ? 'bg-green-50' : ''}
                      ${event.type === 'study' ? 'bg-yellow-50' : ''}
                      ${event.type === 'meeting' ? 'bg-purple-50' : ''}
                      ${event.type === 'project' ? 'bg-orange-50' : ''}
                      ${event.type === 'extracurricular' ? 'bg-red-50' : ''}
                    `}>
                      <div className={`
                        h-10 w-10 rounded-lg flex items-center justify-center
                        ${event.type === 'lecture' ? 'text-blue-600' : ''}
                        ${event.type === 'lab' ? 'text-green-600' : ''}
                        ${event.type === 'study' ? 'text-yellow-600' : ''}
                        ${event.type === 'meeting' ? 'text-purple-600' : ''}
                        ${event.type === 'project' ? 'text-orange-600' : ''}
                        ${event.type === 'extracurricular' ? 'text-red-600' : ''}
                      `}>
                        {event.type === 'lecture' && <GraduationCap size={24} />}
                        {event.type === 'lab' && <FileText size={24} />}
                        {event.type === 'study' && <FileText size={24} />}
                        {event.type === 'meeting' && <Calendar size={24} />}
                        {event.type === 'project' && <FileText size={24} />}
                        {event.type === 'extracurricular' && <Trophy size={24} />}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-gray-900">{event.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">{event.time}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Learning Path and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Learning Path</h3>
          <p className="text-sm text-gray-500 mb-4">Your personalized course recommendations</p>
          
          <div className="space-y-4">
            {learningPathRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <GraduationCap size={24} className="text-scholar-blue" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-base font-medium text-gray-900">{recommendation.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{recommendation.description}</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt={recommendation.instructor} 
                      className="h-5 w-5 rounded-full"
                    />
                    <span className="text-xs text-gray-500">{recommendation.instructor}</span>
                    
                    <span className="text-xs px-2 py-0.5 ml-auto bg-gray-100 text-gray-600 rounded-full">
                      {recommendation.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-medium text-gray-900">Academic Achievements</h3>
              <p className="text-sm text-gray-500">Your latest milestones</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {academicAchievements.slice(0, 3).map((achievement) => (
              <AchievementCard
                key={achievement.id}
                id={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
              />
            ))}
            
            <button className="w-full py-2 mt-2 text-center text-scholar-blue hover:text-scholar-darkBlue font-medium transition-colors">
              View All Achievements
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
