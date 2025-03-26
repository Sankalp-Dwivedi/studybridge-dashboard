
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BookOpenIcon, 
  CalendarIcon, 
  BarChart2Icon, 
  ClipboardListIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { studentInfo } from '@/data/mockData';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-sm z-10",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between w-full")}>
          {!collapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-scholar-blue" />
              <span className="text-xl font-semibold text-scholar-darkBlue">ScholarWay</span>
            </Link>
          )}
          {collapsed && (
            <Link to="/" className="flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-scholar-blue" />
            </Link>
          )}
        </div>
      </div>

      <div className={cn(
        "flex items-center p-4 border-b border-gray-200",
        collapsed ? "justify-center" : ""
      )}>
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <img 
              src={studentInfo.avatar} 
              alt={studentInfo.name} 
              className="h-12 w-12 rounded-full object-cover border-2 border-scholar-blue"
            />
            <div>
              <h3 className="font-medium text-scholar-darkGray">{studentInfo.name}</h3>
              <p className="text-xs text-scholar-gray">Student</p>
              <span className="text-xs px-2 py-0.5 bg-scholar-blue text-white rounded-full mt-1 inline-block">
                {studentInfo.level}
              </span>
            </div>
          </div>
        ) : (
          <img 
            src={studentInfo.avatar} 
            alt={studentInfo.name} 
            className="h-10 w-10 rounded-full object-cover border-2 border-scholar-blue"
          />
        )}
      </div>

      <div className="pt-4 flex-1 overflow-y-auto">
        <p className={cn(
          "text-xs uppercase text-scholar-gray font-medium mb-2 px-4",
          collapsed ? "text-center" : ""
        )}>
          {!collapsed ? "Menu" : ""}
        </p>
        <nav className="space-y-1 px-2">
          <NavItem to="/" icon={<HomeIcon size={20} />} label="Dashboard" isActive={isActive('/')} collapsed={collapsed} />
          <NavItem to="/courses" icon={<BookOpenIcon size={20} />} label="Courses" isActive={isActive('/courses')} collapsed={collapsed} />
          <NavItem to="/schedule" icon={<CalendarIcon size={20} />} label="Schedule" isActive={isActive('/schedule')} collapsed={collapsed} />
          <NavItem to="/progress" icon={<BarChart2Icon size={20} />} label="Progress" isActive={isActive('/progress')} collapsed={collapsed} />
          <NavItem to="/tests" icon={<ClipboardListIcon size={20} />} label="Upcoming Tests" isActive={isActive('/tests')} collapsed={collapsed} badge={2} />
        </nav>

        <p className={cn(
          "text-xs uppercase text-scholar-gray font-medium mt-6 mb-2 px-4",
          collapsed ? "text-center" : ""
        )}>
          {!collapsed ? "Settings" : ""}
        </p>
        <nav className="space-y-1 px-2">
          <NavItem to="/profile" icon={<UserIcon size={20} />} label="Profile" isActive={isActive('/profile')} collapsed={collapsed} />
          <NavItem to="/settings" icon={<SettingsIcon size={20} />} label="Settings" isActive={isActive('/settings')} collapsed={collapsed} />
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button 
          className={cn(
            "text-scholar-gray hover:text-scholar-darkGray transition-colors w-full",
            collapsed ? "flex justify-center" : "flex items-center space-x-3"
          )}
        >
          <LogOutIcon size={20} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-20 -right-3 bg-white rounded-full p-1 shadow-md border border-gray-200"
      >
        {collapsed ? 
          <ChevronRightIcon size={16} className="text-scholar-gray" /> : 
          <ChevronLeftIcon size={16} className="text-scholar-gray" />
        }
      </button>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, collapsed, badge }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-2 px-4 rounded-lg transition-colors group",
        isActive 
          ? "bg-scholar-blue text-white" 
          : "text-scholar-gray hover:bg-gray-100 hover:text-scholar-darkGray",
        collapsed ? "justify-center" : "space-x-3"
      )}
    >
      <div className={isActive ? '' : 'text-scholar-gray group-hover:text-scholar-darkGray'}>
        {icon}
      </div>
      {!collapsed && <span className="font-medium">{label}</span>}
      {badge && !collapsed && (
        <span className="ml-auto bg-scholar-blue text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
      {badge && collapsed && (
        <span className="absolute top-0 right-0 bg-scholar-blue text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;
