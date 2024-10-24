import { usePathname } from 'next/navigation';
import { useSession } from '@/hook/session';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function GnbSignSet({
  modalToggleFn,
}: {
  modalToggleFn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathName = usePathname();
  const thisPath = pathName.split('/')[1];
  const session = useSession();

  // 패스네임 기준 클래스 활성화 함수
  const isOnActive = (routeName: string) => (thisPath === routeName ? 'on' : '');

  // 로그아웃 함수
  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  // 사이트맵 오픈 함수
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (modalToggleFn !== undefined) {
      modalToggleFn((prev) => !prev);
    }
  };
  const signSetFn = () => {
    if (session) {
      return (
        <span className="text-[18px] cursor-pointer p-3" onClick={handleSignOut}>
          로그아웃
        </span>
      );
    } else {
      return (
        <>
          <Link href="/login" className={`${isOnActive('login')}`}>
            로그인
          </Link>
          <span>|</span>
          <Link href="/signup" className={`${isOnActive('signup')}`}>
            회원가입
          </Link>
        </>
      );
    }
  };

  return (
    <ul className="secondGnb">
      <li className="flex items-center justify-end gap-x-[20px] mr-[30px] ">{signSetFn()}</li>
      <li className="sitemapBtn">
        <div className="p-3 cursor-pointer" onClick={handleSiteMapOpen}>
          <figure className="relative w-[20px] h-[10px]">
            <Image src="/images/menu_ham.png" fill sizes="100%" alt="" />
          </figure>
        </div>
      </li>
    </ul>
  );
}
