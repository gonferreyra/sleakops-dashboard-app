import { useState, useEffect } from 'react';

export function useSearchDebounce(value: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsTyping(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, isTyping };
}
