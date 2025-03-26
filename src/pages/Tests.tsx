
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { testsAndExams } from '@/data/mockData';
import { testData } from '@/data/testData';
import StudentHeader from '@/components/StudentHeader';
import { Calendar, Clock, FileText, Shield, AlertTriangle } from 'lucide-react';
import TestWindow from '@/components/TestWindow';
import TestResults from '@/components/TestResults';
import { useToast } from '@/hooks/use-toast';

const Tests: React.FC = () => {
  const [activeTest, setActiveTest] = useState<any | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [testScore, setTestScore] = useState<number>(0);
  const [testAnswers, setTestAnswers] = useState<Record<number, any>>({});
  const { toast } = useToast();

  // Filter tests by upcoming (future date)
  const upcomingTests = testsAndExams.filter(test => 
    new Date(test.date) > new Date()
  );
  
  // Mocked completed tests (we would have this in real data)
  const completedTests = [
    {
      id: 101,
      title: "Calculus Midterm",
      type: "Mid-term",
      subject: "Mathematics",
      date: "2023-06-12",
      score: 92,
      grade: "A",
    },
    {
      id: 102,
      title: "Classical Mechanics",
      type: "Quiz",
      subject: "Physics",
      date: "2023-06-20",
      score: 85,
      grade: "B+",
    },
  ];
  
  // Mocked practice tests
  const practiceTests = [
    {
      id: 201,
      title: "Calculus Practice Exam",
      subject: "Mathematics",
      questions: 30,
      estimatedTime: "45 minutes",
    },
    {
      id: 202,
      title: "Physics Concepts Review",
      subject: "Physics",
      questions: 25,
      estimatedTime: "30 minutes",
    },
  ];

  // Function to start a test
  const startTest = (testId: number) => {
    const test = testData.find(t => t.id === testId);
    if (test) {
      setActiveTest(test);
      // Add analytics or tracking logic here if needed
      toast({
        title: "Test Started",
        description: `You are now taking: ${test.title}`,
      });
    }
  };

  // Function to close the test
  const closeTest = () => {
    if (window.confirm("Are you sure you want to exit this test? Your progress will be lost.")) {
      setActiveTest(null);
      setShowResults(false);
    }
  };

  // Function to handle test completion
  const handleTestComplete = (score: number, answers: Record<number, any>) => {
    setTestScore(score);
    setTestAnswers(answers);
    setShowResults(true);
    setActiveTest(null);
    toast({
      title: "Test Completed",
      description: `Your score: ${score}%`,
      variant: score >= 70 ? "default" : "destructive",
    });
  };

  // Function to close results and go back to tests
  const closeResults = () => {
    setShowResults(false);
  };

  // If there's an active test, show the test window
  if (activeTest) {
    return (
      <TestWindow 
        test={activeTest} 
        onClose={closeTest} 
        onComplete={handleTestComplete} 
      />
    );
  }

  // If showing results, render the TestResults component
  if (showResults) {
    return (
      <TestResults 
        test={testData[0]} // Replace with the actual test that was taken
        score={testScore}
        answers={testAnswers}
        onClose={closeResults}
      />
    );
  }

  return (
    <div className="space-y-8">
      <StudentHeader 
        title="Tests & Exams" 
        subtitle="View upcoming and completed exams, quizzes, and tests."
      />

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3 relative">
          <TabsTrigger value="upcoming">
            Upcoming
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-scholar-blue text-white text-xs flex items-center justify-center">
              {upcomingTests.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testData.map((test) => (
              <Card key={test.id} className="overflow-hidden">
                <div className={`px-4 py-2 ${
                  test.subject === 'Mathematics' ? 'bg-blue-500' : 
                  test.subject === 'Physics' ? 'bg-purple-500' : 
                  test.subject === 'Chemistry' ? 'bg-green-500' : 
                  test.subject === 'Biology' ? 'bg-red-500' : 
                  test.subject === 'Computer Science' ? 'bg-orange-500' : 
                  'bg-gray-500'
                } text-white`}>
                  <span className="text-sm font-medium">{test.type}</span>
                  <h3 className="text-xl font-bold mt-1">{test.title}</h3>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">
                      {new Date(test.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                      })} at {test.time}
                    </span>
                  </div>
                  
                  {test.duration && (
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{test.duration} minutes</span>
                    </div>
                  )}
                  
                  {test.security && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Security Features:</span>
                      </div>
                      
                      <ul className="pl-7 text-sm text-gray-600 space-y-1 list-disc">
                        {test.security.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <button 
                      className="btn-primary w-full flex items-center justify-center"
                      onClick={() => startTest(test.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Start Test
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6 bg-amber-50 border border-amber-200">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-amber-100 p-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-amber-800 mb-1">Important Notice About Online Tests</h3>
                <p className="text-sm text-amber-700">
                  All tests are proctored and have security measures in place. Please ensure you have a stable internet connection and a working webcam. Any suspicious activity will be flagged and may result in test termination.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedTests.map((test) => (
              <Card key={test.id} className="overflow-hidden">
                <div className={`px-4 py-2 ${
                  test.subject === 'Mathematics' ? 'bg-blue-500' : 
                  test.subject === 'Physics' ? 'bg-purple-500' : 
                  'bg-gray-500'
                } text-white`}>
                  <span className="text-sm font-medium">{test.type}</span>
                  <h3 className="text-xl font-bold mt-1">{test.title}</h3>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">
                      Completed on {new Date(test.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                      })}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Score:</span>
                      <span className={`text-sm font-bold ${
                        test.score >= 90 ? 'text-green-600' : 
                        test.score >= 80 ? 'text-blue-600' : 
                        test.score >= 70 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {test.score}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${
                          test.score >= 90 ? 'bg-green-500' : 
                          test.score >= 80 ? 'bg-blue-500' : 
                          test.score >= 70 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${test.score}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Grade:</span>
                      <span className={`text-sm font-bold ${
                        test.grade === 'A' || test.grade === 'A+' ? 'text-green-600' : 
                        test.grade === 'B+' || test.grade === 'B' ? 'text-blue-600' : 
                        test.grade === 'C+' || test.grade === 'C' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {test.grade}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <button className="btn-secondary flex items-center justify-center">
                      <FileText className="mr-2 h-4 w-4" />
                      View Results
                    </button>
                    
                    <button className="btn-primary flex items-center justify-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Review Answers
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="practice" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceTests.map((test) => (
              <Card key={test.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      test.subject === 'Mathematics' ? 'bg-blue-100 text-blue-700' : 
                      test.subject === 'Physics' ? 'bg-purple-100 text-purple-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {test.subject}
                    </span>
                    <h3 className="text-xl font-medium text-gray-900 mt-2">{test.title}</h3>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{test.questions} questions</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">Estimated time: {test.estimatedTime}</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="btn-secondary flex items-center justify-center">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </button>
                  
                  <button 
                    className="btn-primary flex items-center justify-center"
                    onClick={() => startTest(1)} // Used fixed ID for demo
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Start Practice
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tests;
