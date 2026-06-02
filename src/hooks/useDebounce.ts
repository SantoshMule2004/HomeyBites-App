import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  // 1. Local state to hold the debounced (delayed) value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 2. Schedule an update after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 3. The Cleanup Function (The Magic Step)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 4. Dependency Array

  return debouncedValue;
}