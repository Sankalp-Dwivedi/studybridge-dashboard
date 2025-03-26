
import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie } from '@/utils/cookies';
import { useToast } from '@/hooks/use-toast';

type ThemeType = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange';
type FontSize = 'small' | 'medium' | 'large';

interface AppearanceContextType {
  theme: ThemeType;
  colorScheme: ColorScheme;
  fontSize: FontSize;
  setTheme: (theme: ThemeType) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
  setFontSize: (fontSize: FontSize) => void;
  saveAppearanceSettings: () => void;
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export const AppearanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('blue');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const { toast } = useToast();

  // Load settings from cookies on initial render
  useEffect(() => {
    const savedTheme = getCookie('scholar-theme') as ThemeType | null;
    const savedColorScheme = getCookie('scholar-color-scheme') as ColorScheme | null;
    const savedFontSize = getCookie('scholar-font-size') as FontSize | null;

    if (savedTheme) setThemeState(savedTheme);
    if (savedColorScheme) setColorSchemeState(savedColorScheme);
    if (savedFontSize) setFontSizeState(savedFontSize);
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Apply color scheme
  useEffect(() => {
    document.body.dataset.colorScheme = colorScheme;
    
    // Apply color scheme to CSS variables
    const root = document.documentElement;
    
    // Reset previous color scheme classes
    root.classList.remove('color-blue', 'color-purple', 'color-green', 'color-orange');
    
    // Add new color scheme class
    root.classList.add(`color-${colorScheme}`);
    
    // Add custom colors to the root element
    if (colorScheme === 'blue') {
      root.style.setProperty('--scholar-primary', '#3b82f6');
      root.style.setProperty('--scholar-secondary', '#60a5fa');
      root.style.setProperty('--scholar-accent', '#2563eb');
    } else if (colorScheme === 'purple') {
      root.style.setProperty('--scholar-primary', '#8b5cf6');
      root.style.setProperty('--scholar-secondary', '#a78bfa');
      root.style.setProperty('--scholar-accent', '#7c3aed');
    } else if (colorScheme === 'green') {
      root.style.setProperty('--scholar-primary', '#10b981');
      root.style.setProperty('--scholar-secondary', '#34d399');
      root.style.setProperty('--scholar-accent', '#059669');
    } else if (colorScheme === 'orange') {
      root.style.setProperty('--scholar-primary', '#f97316');
      root.style.setProperty('--scholar-secondary', '#fb923c');
      root.style.setProperty('--scholar-accent', '#ea580c');
    }
  }, [colorScheme]);

  // Apply font size
  useEffect(() => {
    document.body.dataset.fontSize = fontSize;
    
    if (fontSize === 'small') {
      document.documentElement.style.fontSize = '14px';
    } else if (fontSize === 'medium') {
      document.documentElement.style.fontSize = '16px';
    } else if (fontSize === 'large') {
      document.documentElement.style.fontSize = '18px';
    }
  }, [fontSize]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    setCookie('scholar-theme', newTheme);
  };

  const setColorScheme = (newColorScheme: ColorScheme) => {
    setColorSchemeState(newColorScheme);
    setCookie('scholar-color-scheme', newColorScheme);
  };

  const setFontSize = (newFontSize: FontSize) => {
    setFontSizeState(newFontSize);
    setCookie('scholar-font-size', newFontSize);
  };
  
  const saveAppearanceSettings = () => {
    // Settings are already saved via cookies when setting individual values
    toast({
      title: "Appearance Updated",
      description: "Your appearance settings have been saved."
    });
  };

  const value = {
    theme,
    colorScheme,
    fontSize,
    setTheme,
    setColorScheme,
    setFontSize,
    saveAppearanceSettings
  };

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
};

export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (context === undefined) {
    throw new Error('useAppearance must be used within an AppearanceProvider');
  }
  return context;
};
