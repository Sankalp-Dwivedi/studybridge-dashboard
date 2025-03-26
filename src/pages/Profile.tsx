
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentInfo, academicAchievements } from '@/data/mockData';
import StudentHeader from '@/components/StudentHeader';
import { User, Mail, Calendar, BookOpen, Award, FileText, Edit } from 'lucide-react';
import AchievementCard from '@/components/AchievementCard';

const Profile: React.FC = () => {
  return (
    <div className="space-y-8">
      <StudentHeader 
        title="Student Profile" 
        subtitle="View and manage your personal information"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-6 text-center">
            <div className="mb-4 relative inline-block">
              <img 
                src={studentInfo.avatar}
                alt={studentInfo.name}
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md mx-auto"
              />
              <button className="absolute bottom-0 right-0 bg-scholar-blue text-white p-2 rounded-full shadow-md">
                <Edit size={16} />
              </button>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900">{studentInfo.name}</h2>
            <p className="text-gray-500 text-sm">Student ID: {studentInfo.id}</p>
            
            <div className="mt-3">
              <span className="px-3 py-1 bg-scholar-blue text-white text-sm font-medium rounded-full">
                {studentInfo.level}
              </span>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={18} />
                <span className="text-gray-700">{studentInfo.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <BookOpen className="text-gray-400" size={18} />
                <span className="text-gray-700">{studentInfo.department}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="text-gray-400" size={18} />
                <span className="text-gray-700">Enrolled: {new Date(studentInfo.enrollmentDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="btn-primary w-full flex items-center justify-center">
                <Edit size={18} className="mr-2" />
                Edit Profile
              </button>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Tabs defaultValue="academic" className="space-y-6">
            <TabsList className="grid w-full md:w-[600px] grid-cols-3">
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-4">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Department</h4>
                      <p className="text-base text-gray-900">{studentInfo.department}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Major</h4>
                      <p className="text-base text-gray-900">Physics</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Academic Year</h4>
                      <p className="text-base text-gray-900">2nd Year</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">GPA</h4>
                      <p className="text-base text-gray-900">3.75</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Enrollment Date</h4>
                      <p className="text-base text-gray-900">{new Date(studentInfo.enrollmentDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Expected Graduation</h4>
                      <p className="text-base text-gray-900">May 2025</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Academic Status</h4>
                      <p className="text-base text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Good Standing
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Academic Advisor</h4>
                      <p className="text-base text-gray-900">Dr. Robert Stevens</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-base font-medium text-gray-900 mb-3">Enrolled Programs</h4>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bachelor of Science in Physics</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Undergraduate</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sep 1, 2022</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mathematics Minor</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Undergraduate</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jan 15, 2023</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-4">Achievements & Recognitions</h3>
                
                <div className="space-y-4">
                  {academicAchievements.map((achievement) => (
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
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-4">Academic Documents</h3>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <FileText className="text-scholar-blue mt-1" size={20} />
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Fall 2022 Transcript</h4>
                        <p className="text-sm text-gray-500 mt-1">Uploaded on Jan 10, 2023</p>
                      </div>
                    </div>
                    
                    <button className="text-scholar-blue text-sm font-medium">
                      Download
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <FileText className="text-scholar-blue mt-1" size={20} />
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Spring 2023 Transcript</h4>
                        <p className="text-sm text-gray-500 mt-1">Uploaded on Jun 15, 2023</p>
                      </div>
                    </div>
                    
                    <button className="text-scholar-blue text-sm font-medium">
                      Download
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <FileText className="text-scholar-blue mt-1" size={20} />
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Enrollment Certificate</h4>
                        <p className="text-sm text-gray-500 mt-1">Uploaded on Sep 5, 2022</p>
                      </div>
                    </div>
                    
                    <button className="text-scholar-blue text-sm font-medium">
                      Download
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Award className="text-scholar-blue mt-1" size={20} />
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Dean's List Certificate</h4>
                        <p className="text-sm text-gray-500 mt-1">Fall 2022 Semester</p>
                      </div>
                    </div>
                    
                    <button className="text-scholar-blue text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="btn-primary flex items-center justify-center">
                    <FileText className="mr-2" size={18} />
                    Request New Document
                  </button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
