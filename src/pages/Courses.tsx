import React from 'react';
import StudentHeader from '@/components/StudentHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from '@/components/CourseCard';

const Courses: React.FC = () => {
  

  return (
    <div className="space-y-8">
      <StudentHeader 
        title="My Courses" 
        subtitle="View and manage your enrolled courses"
      />
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mathematics Course */}
            <CourseCard
              title="Calculus I"
              description="Introduction to differential and integral calculus"
              progress={65}
              instructor="Dr. Robert Chen"
              department="Mathematics"
              image="/placeholder.svg"
              status="in-progress"
              chapters={12}
              completedChapters={8}
              route="/course/1"
            />
            
            {/* Physics Course */}
            <CourseCard
              title="Classical Mechanics"
              description="Fundamentals of Newtonian mechanics and applications"
              progress={30}
              instructor="Dr. Sarah Johnson"
              department="Physics"
              image="/placeholder.svg"
              status="in-progress"
              chapters={10}
              completedChapters={3}
              route="/course/2"
            />
            
            {/* Chemistry Course */}
            <CourseCard
              title="Organic Chemistry"
              description="Structure, properties, and reactions of organic compounds"
              progress={100}
              instructor="Dr. Michael Lee"
              department="Chemistry"
              image="/placeholder.svg"
              status="completed"
              chapters={15}
              completedChapters={15}
              route="/course/3"
            />
            
            {/* Computer Science Course */}
            <CourseCard
              title="Data Structures & Algorithms"
              description="Fundamental data structures and algorithm design"
              progress={0}
              instructor="Prof. Alex Rivera"
              department="Computer Science"
              image="/placeholder.svg"
              status="not-started"
              chapters={14}
              completedChapters={0}
              route="/course/4"
            />
            
            {/* Biology Course */}
            <CourseCard
              title="Molecular Biology"
              description="Study of molecular basis of biological activity"
              progress={45}
              instructor="Dr. Emily Carter"
              department="Biology"
              image="/placeholder.svg"
              status="in-progress"
              chapters={12}
              completedChapters={5}
              route="/course/5"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mathematics Course */}
            <CourseCard
              title="Calculus I"
              description="Introduction to differential and integral calculus"
              progress={65}
              instructor="Dr. Robert Chen"
              department="Mathematics"
              image="/placeholder.svg"
              status="in-progress"
              chapters={12}
              completedChapters={8}
              route="/course/1"
            />
            
            {/* Physics Course */}
            <CourseCard
              title="Classical Mechanics"
              description="Fundamentals of Newtonian mechanics and applications"
              progress={30}
              instructor="Dr. Sarah Johnson"
              department="Physics"
              image="/placeholder.svg"
              status="in-progress"
              chapters={10}
              completedChapters={3}
              route="/course/2"
            />
            
            {/* Biology Course */}
            <CourseCard
              title="Molecular Biology"
              description="Study of molecular basis of biological activity"
              progress={45}
              instructor="Dr. Emily Carter"
              department="Biology"
              image="/placeholder.svg"
              status="in-progress"
              chapters={12}
              completedChapters={5}
              route="/course/5"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chemistry Course */}
            <CourseCard
              title="Organic Chemistry"
              description="Structure, properties, and reactions of organic compounds"
              progress={100}
              instructor="Dr. Michael Lee"
              department="Chemistry"
              image="/placeholder.svg"
              status="completed"
              chapters={15}
              completedChapters={15}
              route="/course/3"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
