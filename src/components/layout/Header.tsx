'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from '@/hook/session';
import Sitemap from './Sitemap';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimney,
  faCar,
  faRightToBracket,
  faHeadphones,
} from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import useModalOpenBgFix from '@/hook/useModalOpenBgFix';

export default function Header({ isMain }: { isMain: string }) {
  const { session } = useSession();
  const [modalOn, setModalOn] = useState(false);
  const mobileGnbRef = useRef<HTMLUListElement | null>(null);
  const pathName = usePathname();

  // 모달호출 시 배경 고정 커스텀 훅
  useModalOpenBgFix(modalOn);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setModalOn((prev) => !prev);
  };

  // 모바일 GNB 이동시 유지되게끔 하는 동작
  useEffect(() => {
    let thisPath = pathName.split('/')[1] === '' ? 'main' : pathName.split('/')[1];
    const thisGnbOrigin = mobileGnbRef.current?.querySelectorAll<HTMLAnchorElement>('li a');
    const thisGnb: HTMLAnchorElement[] = thisGnbOrigin ? [...thisGnbOrigin] : [];
    thisGnb.map((item) => {
      if (item.className.split('_')[1].includes(thisPath)) {
        item?.classList.add('on');
      } else {
        item?.classList.remove('on');
      }
    });
  }, [pathName]);

  return (
    <header className={isMain}>
      <nav className="gnb gnb_web">
        <div className="navWrap">
          <ul className="firstGnb">
            <li>
              <Link href="/" className="gnbLogo">
                <figure>
                  <Image
                    src="/images/genisisu_logo_w.png"
                    priority
                    fill
                    sizes="100%"
                    alt={'타이틀이미지'}
                  />
                </figure>
              </Link>
            </li>
            <li>
              <Link href="/models">모델</Link>
            </li>
            <li>
              <Link href="/drive">전시시승</Link>
            </li>
            <li>
              <Link href="/qna">고객지원</Link>
            </li>
            <li>
              <Link href="/info">공지사항</Link>
            </li>
            <li>
              <Link href="/none">제니시수</Link>
            </li>
          </ul>

          <ul className="firstGnb mobileView" ref={mobileGnbRef}>
            <li>
              <Link href="/models" className="mbGnb_models">
                <figure>
                  <FontAwesomeIcon icon={faCar} />
                </figure>
                <span>모델</span>
              </Link>
            </li>
            <li>
              <Link href="/drive" className="mbGnb_drive">
                <figure>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </figure>
                <span>전시시승</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="mbGnb_main">
                <figure>
                  <FontAwesomeIcon icon={faHouseChimney} />
                </figure>
                <span>홈</span>
              </Link>
            </li>
            <li>
              <Link href="/qna" className="mbGnb_qna">
                <figure>
                  <FontAwesomeIcon icon={faHeadphones} />
                </figure>
                <span>고객지원</span>
              </Link>
            </li>
            <li>
              <Link href="/info" className="mbGnb_info">
                <figure>
                  <FontAwesomeIcon icon={faFileLines} />
                </figure>
                <span>공지사항</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navWrap">
          <ul className="secondGnb">
            <li className="flex items-center justify-end gap-x-[20px] mr-[30px] ">
              {session ? (
                <span className="text-[18px] cursor-pointer p-3" onClick={handleSignOut}>
                  로그아웃
                </span>
              ) : (
                <>
                  <Link href="/login">로그인</Link>
                  <span>|</span>
                  <Link href="/signup">회원가입</Link>
                </>
              )}
            </li>
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
