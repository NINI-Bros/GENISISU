'use client';

import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault();
  //     event.returnValue = ''; // 일부 브라우저에서는 이 설정이 필요함
  //   };
  //   const storage = window.localStorage.getItem(key);
  //   if (storage) {
  //     window.addEventListener('beforeunload', handleBeforeUnload);
  //   }
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [key]);

  return [storedValue, setValue] as const;
}
