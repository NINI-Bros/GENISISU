'use client';

import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface UseSessionResult {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const SessionContent = createContext<UseSessionResult>({ session: null, status: 'loading' });
// const SessionContent = createContext<Session | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  useEffect(() => {
    setStatus('loading');
    getSession().then((res) => {
      setSession(res);
      setStatus(res ? 'authenticated' : 'unauthenticated');
    });
  }, [pathname]); // 페이지를 이동할 때마다 세션을 갱신
  return <SessionContent.Provider value={{ session, status }}>{children}</SessionContent.Provider>;
};

// 클라이언트 컴포넌트용 커스텀 훅
export const useSession = () => {
  return useContext(SessionContent);
};
