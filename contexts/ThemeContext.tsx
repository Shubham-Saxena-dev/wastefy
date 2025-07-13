import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

type Theme = {
  name: string;
  colors: {
    '--primary-color': string;
    '--primary-light': string;
    '--primary-dark': string;
    '--primary-disabled': string;
    '--text-on-primary': string;
  };
};

export const themes: Record<string, Theme> = {
  black: { name: 'Black', colors: { '--primary-color': '#4b5563', '--primary-light': '#1f2937', '--primary-dark': '#111827', '--primary-disabled': '#374151', '--text-on-primary': '#f9fafb' } },
  emerald: { name: 'Emerald', colors: { '--primary-color': '#10b981', '--primary-light': '#d1fae5', '--primary-dark': '#047857', '--primary-disabled': '#6ee7b7', '--text-on-primary': '#ffffff' } },
  rose: { name: 'Rose', colors: { '--primary-color': '#f43f5e', '--primary-light': '#ffe4e6', '--primary-dark': '#be123c', '--primary-disabled': '#fda4af', '--text-on-primary': '#ffffff' } },
  sky: { name: 'Sky', colors: { '--primary-color': '#0ea5e9', '--primary-light': '#e0f2fe', '--primary-dark': '#0369a1', '--primary-disabled': '#7dd3fc', '--text-on-primary': '#ffffff' } },
  amber: { name: 'Amber', colors: { '--primary-color': '#f59e0b', '--primary-light': '#fef3c7', '--primary-dark': '#b45309', '--primary-disabled': '#fcd34d', '--text-on-primary': '#1f2937' } },
  indigo: { name: 'Indigo', colors: { '--primary-color': '#6366f1', '--primary-light': '#e0e7ff', '--primary-dark': '#4338ca', '--primary-disabled': '#a5b4fc', '--text-on-primary': '#ffffff' } },
  teal: { name: 'Teal', colors: { '--primary-color': '#14b8a6', '--primary-light': '#ccfbf1', '--primary-dark': '#0f766e', '--primary-disabled': '#5eead4', '--text-on-primary': '#ffffff' } },
  purple: { name: 'Purple', colors: { '--primary-color': '#a855f7', '--primary-light': '#f3e8ff', '--primary-dark': '#7e22ce', '--primary-disabled': '#d8b4fe', '--text-on-primary': '#ffffff' } },
  lime: { name: 'Lime', colors: { '--primary-color': '#84cc16', '--primary-light': '#ecfccb', '--primary-dark': '#4d7c0f', '--primary-disabled': '#bef264', '--text-on-primary': '#1a2e05' } },
  orange: { name: 'Orange', colors: { '--primary-color': '#f97316', '--primary-light': '#ffedd5', '--primary-dark': '#c2410c', '--primary-disabled': '#fdba74', '--text-on-primary': '#ffffff' } },
};

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    try {
      const savedTheme = localStorage.getItem('app-theme');
      return savedTheme && themes[savedTheme] ? savedTheme : 'emerald';
    } catch {
      return 'emerald';
    }
  });

  useEffect(() => {
    const currentTheme = themes[theme];
    if (currentTheme) {
      const root = document.documentElement;
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      document.getElementById('theme-color-meta')?.setAttribute('content', currentTheme.colors['--primary-dark']);
      document.getElementById('apple-status-bar-meta')?.setAttribute('content', currentTheme.colors['--primary-dark']);
      try {
        localStorage.setItem('app-theme', theme);
      } catch (e) {
        console.error("Could not save theme to local storage");
      }
    }
  }, [theme]);
  
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};