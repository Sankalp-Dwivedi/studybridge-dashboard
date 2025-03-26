
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  monthlyProgressData, 
  subjectPerformanceData, 
  examPerformanceData,
  studentPerformanceAnalysis,
  academicAchievements,
  growthPath 
} from '@/data/mockData';
import StudentHeader from '@/components/StudentHeader';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalendarDays, BookOpen, ArrowUp, Download, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import AchievementCard from '@/components/AchievementCard';

const Progress: React.FC = () => {
  return (
    <div className="space-y-8">
      <StudentHeader 
        title="Student Progress" 
        subtitle="Track your academic journey, John"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Overall Progress</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <CalendarDays size={20} className="text-scholar-blue" />
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-gray-900 mb-4">75%</div>
              
              <ProgressBar 
                progress={75} 
                target={80}
                size="lg"
              />
              
              <div className="flex items-center justify-between w-full mt-2">
                <span className="text-sm text-gray-500">Target: 80%</span>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUp size={14} className="mr-1" />
                  5%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Completed Courses</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <BookOpen size={20} className="text-scholar-blue" />
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-gray-900 mb-4">8/12</div>
              
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-scholar-blue h-2 rounded-full" style={{ width: '66.7%' }}></div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                4 courses remaining this semester
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Next Level Projection</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <Clock size={20} className="text-scholar-blue" />
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">Jan 2024</div>
              
              <p className="text-center text-sm text-gray-500 mb-3">
                Projected promotion to Rising Intellect
              </p>
              
              <span className="bg-blue-100 text-scholar-blue font-medium py-1 px-3 rounded-full text-sm">
                On Track
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="progress-over-time" className="space-y-6">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3">
          <TabsTrigger value="progress-over-time">Progress Over Time</TabsTrigger>
          <TabsTrigger value="subject-performance">Subject Performance</TabsTrigger>
          <TabsTrigger value="exam-scores">Exam Scores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress-over-time" className="space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-900">Monthly Progress Tracking</h3>
              <p className="text-sm text-gray-500">Your monthly progress compared to targets</p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyProgressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#2563eb"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Your Progress"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="btn-secondary flex items-center space-x-2">
                <Download size={16} />
                <span>Download Report</span>
              </button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="subject-performance" className="space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-900">Subject Performance Analysis</h3>
              <p className="text-sm text-gray-500">Current progress across different subjects</p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Legend />
                  <Bar dataKey="progress" name="Your Progress" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="text-base font-medium text-green-800 mb-2">Strengths</h5>
                  <ul className="space-y-2">
                    {studentPerformanceAnalysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start text-sm text-green-700">
                        <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="text-base font-medium text-amber-800 mb-2">Areas for Improvement</h5>
                  <ul className="space-y-2">
                    {studentPerformanceAnalysis.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start text-sm text-amber-700">
                        <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="exam-scores" className="space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-900">Exam Performance</h3>
              <p className="text-sm text-gray-500">Midterm and final exam comparisons</p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={examPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Legend />
                  <Bar dataKey="midterm" name="Midterm Exam" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="final" name="Final Exam" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Upcoming Assessments</h4>
              
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Mathematics
                      </span>
                      <h5 className="text-base font-medium text-gray-900 mt-1">Advanced Calculus Final Exam</h5>
                      <p className="text-sm text-gray-500 mt-1">Weight: 30%</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900">15/12/2023</p>
                      <p className="text-sm text-red-500">-67 days left</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Physics
                      </span>
                      <h5 className="text-base font-medium text-gray-900 mt-1">Quantum Physics Quiz</h5>
                      <p className="text-sm text-gray-500 mt-1">Weight: 15%</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900">10/11/2023</p>
                      <p className="text-sm text-red-500">-32 days left</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Computer Science
                      </span>
                      <h5 className="text-base font-medium text-gray-900 mt-1">Computational Algorithms Project</h5>
                      <p className="text-sm text-gray-500 mt-1">Weight: 25%</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900">25/11/2023</p>
                      <p className="text-sm text-red-500">-47 days left</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Achievements & Recognitions</h3>
          <p className="text-sm text-gray-500 mb-4">Your academic accomplishments</p>
          
          <div className="space-y-4">
            {academicAchievements.slice(0, 4).map((achievement) => (
              <AchievementCard
                key={achievement.id}
                id={achievement.id}
                title={achievement.title}
                description={achievement.description}
                date={achievement.date}
                icon={achievement.icon}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Growth Path</h3>
          <p className="text-sm text-gray-500 mb-4">Your journey to excellence</p>
          
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 z-0"></div>
            
            {growthPath.map((level, index) => (
              <div key={level.id} className="relative z-10 flex items-start space-x-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 ${
                  level.current 
                    ? 'border-scholar-blue bg-white' 
                    : index < growthPath.findIndex(l => l.current) 
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300 bg-gray-100'
                }`}>
                  {level.current && (
                    <div className="h-3 w-3 rounded-full bg-scholar-blue"></div>
                  )}
                  {index < growthPath.findIndex(l => l.current) && (
                    <CheckCircle className="text-white" size={20} />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`text-lg font-medium ${
                    level.current ? 'text-scholar-blue' : 'text-gray-900'
                  }`}>
                    {level.title}
                  </h4>
                  <p className="text-sm text-gray-500">{level.description}</p>
                  
                  {level.current && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-scholar-blue rounded-full text-sm font-medium">
                      Current Level
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            <div className="text-center pt-6">
              <button className="btn-primary">View Detailed Requirements</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
