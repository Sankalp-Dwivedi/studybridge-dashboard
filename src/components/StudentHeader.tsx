
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { studentInfo } from '@/data/mockData';

interface StudentHeaderProps {
  title: string;
  subtitle?: string;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-scholar-blue focus:border-transparent w-full sm:w-64"
          />
        </div>
        
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 bg-scholar-blue text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm px-2 py-0.5 bg-scholar-blue text-white rounded-full">
            {studentInfo.level}
          </span>
          <span className="text-sm text-gray-600">
            Current Level
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
