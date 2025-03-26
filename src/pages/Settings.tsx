import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import StudentHeader from '@/components/StudentHeader';
import { Bell, Lock, Palette, Globe, Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/contexts/AppearanceContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const { theme, colorScheme, fontSize, setTheme, setColorScheme, setFontSize, saveAppearanceSettings } = useAppearance();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    assignmentReminders: true,
    examNotifications: true,
    courseUpdates: true,
    gradeNotifications: true,
    pushEnabled: true,
    assignmentDueAlerts: true,
    classReminders: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false
  });
  
  const [unsavedChanges, setUnsavedChanges] = useState({
    notifications: false,
    security: false
  });
  
  // Update notification settings
  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    setUnsavedChanges(prev => ({ ...prev, notifications: true }));
  };
  
  // Save notification changes
  const saveNotificationChanges = () => {
    // Here you would typically save to an API
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated."
    });
    setUnsavedChanges(prev => ({ ...prev, notifications: false }));
  };
  
  // Update security settings
  const handleSecurityChange = (setting: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    setUnsavedChanges(prev => ({ ...prev, security: true }));
  };

  return (
    <div className="space-y-8">
      <StudentHeader 
        title="Settings" 
        subtitle="Manage your account preferences"
      />

      <div>
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full md:w-[600px] grid-cols-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                    <Bell className="mr-2" size={20} />
                    Notification Settings
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Choose what notifications you receive and how you receive them.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-gray-700">Email Notifications</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Assignment Reminders</h5>
                        <p className="text-xs text-gray-500">Receive reminders about upcoming assignments</p>
                      </div>
                      <Switch 
                        checked={notifications.assignmentReminders} 
                        onCheckedChange={() => handleNotificationChange('assignmentReminders')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Exam Notifications</h5>
                        <p className="text-xs text-gray-500">Receive notifications about upcoming exams</p>
                      </div>
                      <Switch 
                        checked={notifications.examNotifications} 
                        onCheckedChange={() => handleNotificationChange('examNotifications')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Course Updates</h5>
                        <p className="text-xs text-gray-500">Receive notifications when course material is updated</p>
                      </div>
                      <Switch 
                        checked={notifications.courseUpdates} 
                        onCheckedChange={() => handleNotificationChange('courseUpdates')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Grade Notifications</h5>
                        <p className="text-xs text-gray-500">Receive notifications when grades are posted</p>
                      </div>
                      <Switch 
                        checked={notifications.gradeNotifications} 
                        onCheckedChange={() => handleNotificationChange('gradeNotifications')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Push Notifications</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Enable Push Notifications</h5>
                        <p className="text-xs text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch 
                        checked={notifications.pushEnabled} 
                        onCheckedChange={() => handleNotificationChange('pushEnabled')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Assignment Due Alerts</h5>
                        <p className="text-xs text-gray-500">Receive alerts when assignments are due soon</p>
                      </div>
                      <Switch 
                        checked={notifications.assignmentDueAlerts} 
                        onCheckedChange={() => handleNotificationChange('assignmentDueAlerts')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Class Reminders</h5>
                        <p className="text-xs text-gray-500">Receive reminders before scheduled classes</p>
                      </div>
                      <Switch 
                        checked={notifications.classReminders} 
                        onCheckedChange={() => handleNotificationChange('classReminders')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={saveNotificationChanges}
                    disabled={!unsavedChanges.notifications}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                    <Lock className="mr-2" size={20} />
                    Security Settings
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Manage your account security and privacy.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-gray-700">Change Password</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-scholar-blue focus:outline-none focus:ring-2 focus:ring-scholar-blue sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-scholar-blue focus:outline-none focus:ring-2 focus:ring-scholar-blue sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-scholar-blue focus:outline-none focus:ring-2 focus:ring-scholar-blue sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <button className="btn-primary mt-2">Update Password</button>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Two-Factor Authentication</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Enable Two-Factor Authentication</h5>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={() => handleSecurityChange('twoFactorAuth')}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Login Sessions</h4>
                  
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">Current Session</h5>
                          <p className="text-xs text-gray-500">Windows 10 · Chrome · New York, USA</p>
                          <p className="text-xs text-gray-400 mt-1">Started: Today at 9:30 AM</p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Active Now
                        </span>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">MacOS · Safari</h5>
                          <p className="text-xs text-gray-500">New York, USA</p>
                          <p className="text-xs text-gray-400 mt-1">Last active: Yesterday at 5:30 PM</p>
                        </div>
                        <button className="text-red-500 text-xs font-medium">
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn-secondary">Log Out of All Sessions</button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                    <Palette className="mr-2" size={20} />
                    Appearance Settings
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Customize how your dashboard looks. Changes are saved automatically.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-gray-700">Theme</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={cn(
                        "border rounded-lg p-4 bg-white cursor-pointer",
                        theme === 'light' ? "border-scholar-blue ring-2 ring-scholar-blue ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setTheme('light')}
                    >
                      <div className="h-20 bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                        {theme === 'light' && <Check size={24} className="text-scholar-blue" />}
                      </div>
                      <p className="text-sm font-medium text-center text-gray-900">Light</p>
                    </div>
                    
                    <div 
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer",
                        theme === 'dark' ? "border-scholar-blue ring-2 ring-scholar-blue ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="h-20 bg-gray-900 rounded-md mb-2 flex items-center justify-center">
                        {theme === 'dark' && <Check size={24} className="text-white" />}
                      </div>
                      <p className="text-sm font-medium text-center text-gray-900">Dark</p>
                    </div>
                    
                    <div 
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer",
                        theme === 'system' ? "border-scholar-blue ring-2 ring-scholar-blue ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setTheme('system')}
                    >
                      <div className="h-20 bg-gradient-to-b from-white to-gray-900 rounded-md mb-2 flex items-center justify-center">
                        {theme === 'system' && <Check size={24} className="text-white" />}
                      </div>
                      <p className="text-sm font-medium text-center text-gray-900">System</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Color Scheme</h4>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div 
                      className={cn(
                        "border rounded-lg p-2 cursor-pointer",
                        colorScheme === 'blue' ? "border-scholar-blue ring-2 ring-scholar-blue ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setColorScheme('blue')}
                    >
                      <div className="h-10 bg-blue-500 rounded-md flex items-center justify-center">
                        {colorScheme === 'blue' && <Check size={20} className="text-white" />}
                      </div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Blue</p>
                    </div>
                    
                    <div 
                      className={cn(
                        "border rounded-lg p-2 cursor-pointer",
                        colorScheme === 'purple' ? "border-scholar-blue ring-2 ring-scholar-blue ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setColorScheme('purple')}
                    >
                      <div className="h-10 bg-purple-600 rounded-md flex items-center justify-center">
                        {colorScheme === 'purple' && <Check size={20} className="text-white" />}
                      </div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Purple</p>
                    </div>
                    
                    <div 
                      className={cn(
                        "border rounded-lg p-2 cursor-pointer",
                        colorScheme === 'green' ? "border-scholar-blue ring-2 ring-scholar-blue ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setColorScheme('green')}
                    >
                      <div className="h-10 bg-green-600 rounded-md flex items-center justify-center">
                        {colorScheme === 'green' && <Check size={20} className="text-white" />}
                      </div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Green</p>
                    </div>
                    
                    <div 
                      className={cn(
                        "border rounded-lg p-2 cursor-pointer",
                        colorScheme === 'orange' ? "border-scholar-blue ring-2 ring-scholar-blue ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setColorScheme('orange')}
                    >
                      <div className="h-10 bg-orange-500 rounded-md flex items-center justify-center">
                        {colorScheme === 'orange' && <Check size={20} className="text-white" />}
                      </div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Orange</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Font Size</h4>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      className={cn(
                        "px-4 py-2 text-xs rounded-md",
                        fontSize === 'small' 
                          ? "bg-scholar-blue text-white" 
                          : "border border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setFontSize('small')}
                    >
                      Small
                    </button>
                    <button 
                      className={cn(
                        "px-4 py-2 text-sm rounded-md",
                        fontSize === 'medium' 
                          ? "bg-scholar-blue text-white" 
                          : "border border-gray-200 hover:border-gray-300" 
                      )}
                      onClick={() => setFontSize('medium')}
                    >
                      Medium
                    </button>
                    <button 
                      className={cn(
                        "px-4 py-2 text-base rounded-md",
                        fontSize === 'large' 
                          ? "bg-scholar-blue text-white" 
                          : "border border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setFontSize('large')}
                    >
                      Large
                    </button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={saveAppearanceSettings}
                  >
                    Apply Changes
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="accessibility">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                    <Globe className="mr-2" size={20} />
                    Accessibility Settings
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Customize your experience to match your accessibility needs.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-gray-700">Reading Preferences</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Screen Reader Support</h5>
                        <p className="text-xs text-gray-500">Optimize content for screen readers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">High Contrast Mode</h5>
                        <p className="text-xs text-gray-500">Increase contrast for better visibility</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Reduce Animations</h5>
                        <p className="text-xs text-gray-500">Minimize or eliminate UI animations</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Language & Region</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <select
                        id="language"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-scholar-blue focus:outline-none focus:ring-scholar-blue sm:text-sm"
                      >
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Chinese (Simplified)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="time-format" className="block text-sm font-medium text-gray-700">
                        Time Format
                      </label>
                      <select
                        id="time-format"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-scholar-blue focus:outline-none focus:ring-scholar-blue sm:text-sm"
                      >
                        <option>12-hour (AM/PM)</option>
                        <option>24-hour</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Content Display</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Show Content Descriptions</h5>
                        <p className="text-xs text-gray-500">Display additional descriptive text</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Enable Text-to-Speech</h5>
                        <p className="text-xs text-gray-500">Read content aloud</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
