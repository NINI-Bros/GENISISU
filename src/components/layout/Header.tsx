'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sitemap from './Sitemap';
import Image from 'next/image';
import useModalOpenBgFix from '@/hook/useModalOpenBgFix';
import MainGnb from '../MainGnb';

export default function Header({ isMain }: { isMain: string }) {
  const [modalOn, setModalOn] = useState(false);
  const headerRef = useRef<HTMLHeadElement | null>(null);
  const pathName = usePathname();

  // 모달호출 시 배경 고정 커스텀 훅
  useModalOpenBgFix(modalOn);

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

  // 사이트맵 오픈 함수
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setModalOn((prev) => !prev);
  };

  return (
    <header className={isMain} ref={headerRef}>
      <nav className="gnb gnb_web">
        <div className="navWrap">
          <MainGnb deviceType={'web'} />
          <MainGnb deviceType={'mobile'} />
        </div>
        <div className="navWrap">
          <ul className="secondGnb">
            <MainGnb deviceType={'signSet'} />
            <li className="sitemapBtn">
              <div className="p-3 cursor-pointer" onClick={handleSiteMapOpen}>
                <figure className="relative w-[20px] h-[10px]">
                  <Image src="/images/menu_ham.png" fill sizes="100%" alt="" />
                </figure>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* 사이트맵 컴포넌트 */}
      <Sitemap modalState={modalOn} modalToggleFn={setModalOn} />
    </header>
  );
}
