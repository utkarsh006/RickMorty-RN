import { useState, useEffect } from 'react';
import { globalTheme } from '@/utils/globalTheme';

export function useGlobalTheme() {
  const [isDark, setIsDark] = useState(globalTheme.isDark);

  useEffect(() => {
    const unsubscribe = globalTheme.subscribe(setIsDark);
    return unsubscribe;
  }, []);

  return {
    isDark,
    theme: globalTheme.currentTheme,
    setTheme: globalTheme.setTheme.bind(globalTheme),
    toggleTheme: globalTheme.toggleTheme.bind(globalTheme),
  };
}
