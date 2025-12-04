import { useState } from 'react';

// Global state - simplest possible approach
let isDarkMode = false;
const listeners = new Set<() => void>();

export function useColorScheme() {
  const [, forceUpdate] = useState({});
  
  // Subscribe to changes
  const rerender = () => forceUpdate({});
  listeners.add(rerender);
  
  return isDarkMode ? 'dark' : 'light';
}

export function toggleColorScheme() {
  isDarkMode = !isDarkMode;
  listeners.forEach(listener => listener());
}
