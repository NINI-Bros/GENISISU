'use client';

import { useEffect, useState } from 'react';

export default function useModalOpenBgFix(state: boolean) {
  const [thisScrollY, setThisScrollY] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY;
    }
    return 0;
  });

  useEffect(() => {
    if (state) {
      document.body.style.top = `-${thisScrollY}px`;
      document.body.style.position = 'fixed';
    } else {
      setThisScrollY(parseInt(document.body.style.top));
      document.body.style.top = '';
      document.body.style.position = '';
      window.scrollTo(0, thisScrollY * -1);
    }
  }, [state, thisScrollY]);
}
