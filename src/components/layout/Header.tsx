'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sitemap from './Sitemap';
import MainGnb from '../MainGnb';

export default function Header({ isMain }: { isMain: string }) {
  const [modalOn, setModalOn] = useState(false);
  const headerRef = useRef<HTMLHeadElement | null>(null);
  const pathName = usePathname();

  // input 실행시 하단 GNB 사라지게 하는 함수
  useEffect(() => {
    const thisHeight = () => {
      let height = window.innerHeight;
      let outHeight = window.outerHeight * 0.6;
      if (height < outHeight) {
        headerRef.current?.classList.add('remove');
      } else {
        headerRef.current?.classList.remove('remove');
      }
    };
    window.addEventListener('resize', thisHeight);

    return () => window.removeEventListener('resize', thisHeight);
  }, [pathName]);

  return (
    <header className={isMain} ref={headerRef}>
      <nav className="gnb gnb_web">
        <div className="navWrap">
          <MainGnb deviceType={'web'} />
          <MainGnb deviceType={'mobile'} />
        </div>
        <div className="navWrap">
          <MainGnb deviceType={'signSet'} modalToggleFn={setModalOn} />
        </div>
      </nav>

      {/* 사이트맵 컴포넌트 */}
      <Sitemap modalState={modalOn} modalToggleFn={setModalOn} />
    </header>
  );
}
