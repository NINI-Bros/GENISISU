'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sitemap from './Sitemap';
import GnbSignSet from '../mainGnb/GnbSignSet';
import GnbMobile from '../mainGnb/GnbMobile';
import GnbWeb from '../mainGnb/GnbWeb';
import { TargetArea } from '../Spinner';

export default function Header() {
  const [modalOn, setModalOn] = useState(false);
  const headerRef = useRef<HTMLHeadElement | null>(null);
  const pathName = usePathname();
  const isMain = pathName === '/' ? 'mainHd' : '';

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
          <GnbWeb />
          <GnbMobile />
        </div>
        <div className="navWrap">
          <Suspense fallback={<TargetArea />}>
            <GnbSignSet modalToggleFn={setModalOn} />
          </Suspense>
        </div>
      </nav>

      {/* 사이트맵 컴포넌트 */}
      <Sitemap modalState={modalOn} modalToggleFn={setModalOn} />
    </header>
  );
}
