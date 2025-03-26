
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useAppearance } from '@/contexts/AppearanceContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorScheme, theme } = useAppearance();
  
  // Apply color scheme class to the main container
  useEffect(() => {
    const body = document.body;
    
    // Set color scheme data attribute
    body.dataset.colorScheme = colorScheme;
    
    // Set theme data attribute
    body.dataset.theme = theme;
    
  }, [colorScheme, theme]);
  
  return (
    <div className={`flex h-screen bg-scholar-background overflow-hidden color-scheme-${colorScheme}`}>
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {children}
      </main>
      
      <Toaster />
    </div>
  );
};

export default Layout;
