
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useAppearance } from '@/contexts/AppearanceContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorScheme } = useAppearance();
  
  // Apply color scheme class to the main container
  useEffect(() => {
    // This creates dynamic styling based on the selected color scheme
  }, [colorScheme]);
  
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
