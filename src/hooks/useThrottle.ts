import { useRef } from 'react';

export function useThrottle(func: Function, delay: number = 500) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return () => {
    if (!timeout.current) {
      func();
      timeout.current = setTimeout(() => {
        timeout.current = null;
      }, delay);
    }
  };
}
