import { useSearchParams } from 'next/navigation';
import { useSession } from '@/hook/useSession';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useModalStateStore } from '@/zustand/useModalState';

export default function GnbSignSet() {
  const searchParams = useSearchParams();
  const { session, status } = useSession();
  const modalToggleFn = useModalStateStore((state) => state.setModalToggleState);

  // 패스네임 기준 클래스 활성화 함수
  const isOnActive = (routeName: string) => (searchParams.get('type') === routeName ? 'on' : '');

  // 로그아웃 함수
  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  // 사이트맵 오픈 함수
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (modalToggleFn !== undefined) {
      modalToggleFn();
    }
  };
  const signSetFn = () => {
    if (status === 'authenticated' && session) {
      return (
        <span className="signOut" onClick={handleSignOut}>
          로그아웃
        </span>
      );
    } else {
      return (
        <>
          <Link href="/accept?type=login" className={`${isOnActive('login')}`}>
            로그인
          </Link>
          <span>|</span>
          <Link href="/accept?type=signup" className={`${isOnActive('signup')}`}>
            회원가입
          </Link>
        </>
      );
    }
  };

  return (
    <ul className="secondGnb">
      <li className="signSetList">{signSetFn()}</li>
      <li className="sitemapBtn">
        <div className="sitemapWrap" onClick={handleSiteMapOpen}>
          <figure>
            <Image src="/images/menu_ham.png" fill sizes="100%" alt="사이트맵 클릭 버튼입니다." />
          </figure>
        </div>
      </li>
    </ul>
  );
}
