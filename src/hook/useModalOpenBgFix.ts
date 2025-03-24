'use client';

import { useEffect } from 'react';

export default function useModalOpenBgFix(state: boolean) {
  useEffect(() => {
    if (state) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      document.body.style.position = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [state]);
}
