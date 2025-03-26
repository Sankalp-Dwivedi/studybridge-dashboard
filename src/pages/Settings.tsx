
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import StudentHeader from '@/components/StudentHeader';
import { Bell, Lock, Palette, Globe, Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
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
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Exam Notifications</h5>
                        <p className="text-xs text-gray-500">Receive notifications about upcoming exams</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Course Updates</h5>
                        <p className="text-xs text-gray-500">Receive notifications when course material is updated</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Grade Notifications</h5>
                        <p className="text-xs text-gray-500">Receive notifications when grades are posted</p>
                      </div>
                      <Switch defaultChecked />
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
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Assignment Due Alerts</h5>
                        <p className="text-xs text-gray-500">Receive alerts when assignments are due soon</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">Class Reminders</h5>
                        <p className="text-xs text-gray-500">Receive reminders before scheduled classes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
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
                    <Switch />
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
                    Customize how your dashboard looks.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-gray-700">Theme</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-scholar-blue rounded-lg p-4 bg-white cursor-pointer">
                      <div className="h-20 bg-white border border-gray-200 rounded-md mb-2"></div>
                      <p className="text-sm font-medium text-center text-gray-900">Light</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 cursor-pointer">
                      <div className="h-20 bg-gray-900 rounded-md mb-2"></div>
                      <p className="text-sm font-medium text-center text-gray-900">Dark</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 cursor-pointer">
                      <div className="h-20 bg-gradient-to-b from-white to-gray-900 rounded-md mb-2"></div>
                      <p className="text-sm font-medium text-center text-gray-900">System</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Color Scheme</h4>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="border border-scholar-blue rounded-lg p-2 cursor-pointer">
                      <div className="h-10 bg-scholar-blue rounded-md"></div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Blue</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-2 cursor-pointer">
                      <div className="h-10 bg-purple-600 rounded-md"></div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Purple</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-2 cursor-pointer">
                      <div className="h-10 bg-green-600 rounded-md"></div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Green</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-2 cursor-pointer">
                      <div className="h-10 bg-orange-500 rounded-md"></div>
                      <p className="text-xs font-medium text-center mt-2 text-gray-900">Orange</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-700">Font Size</h4>
                  
                  <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 text-xs border border-gray-200 rounded-md">
                      Small
                    </button>
                    <button className="px-4 py-2 text-sm bg-scholar-blue text-white rounded-md">
                      Medium
                    </button>
                    <button className="px-4 py-2 text-base border border-gray-200 rounded-md">
                      Large
                    </button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="accessibility" className="space-y-6">
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
