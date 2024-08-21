import React, { createContext, useEffect, useState } from 'react';
import { THEME_CONSTANTS } from '@/constants';

interface ContextProps {
  mainTheme: string | null;
  toggleTheme: React.Dispatch<string | null>;
}

export const ThemeContext = createContext<ContextProps>({
  mainTheme: localStorage.getItem('PP_MAIN_THEME'),
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mainTheme, setmainTheme] = useState<string>('');

  useEffect(() => {
    const currentTheme: string | null = localStorage.getItem('PP_MAIN_THEME')
      ? localStorage.getItem('PP_MAIN_THEME')
      : THEME_CONSTANTS.MAIN_THEME;

    if (currentTheme) {
      setmainTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mainTheme);
  }, [mainTheme]);

  const toggleThemeHandler = (key: string | null) => {
    if (key) {
      setmainTheme(key);

      return localStorage.setItem('PP_MAIN_THEME', key);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mainTheme: mainTheme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
