
import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie } from '@/utils/cookies';

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
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export const AppearanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('blue');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');

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

  const value = {
    theme,
    colorScheme,
    fontSize,
    setTheme,
    setColorScheme,
    setFontSize
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
