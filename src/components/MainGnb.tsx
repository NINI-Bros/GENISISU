import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hook/session';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useGnbStore } from '@/zustand/useGnbWrap';

export default function MainGnb({
  deviceType,
  modalToggleFn,
}: {
  deviceType: string;
  modalToggleFn?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const session = useSession();
  const pathName = usePathname();
  const { gnb } = useGnbStore();

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

  // 패스네임 기준 클래스 활성화 함수
  let thisPath = pathName.split('/')[1];
  const isOnActive = (routeName: string) => (thisPath === routeName ? 'on' : '');

  // MainGnb 컴포넌트의 리턴값
  const handleShowGnb = () => {
    // 컴포넌트 props가 web일 경우
    if (deviceType === 'web') {
      const webArr = gnb
        .filter((item) => item.device.includes(deviceType))
        .map((item) => {
          return (
            <li key={`key_${item.route}`}>
              <Link href={`/${item.route}`} className={`${isOnActive(item.route)}`}>
                {item.text}
              </Link>
            </li>
          );
        });
      return (
        <ul className="firstGnb webView">
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
          {webArr}
        </ul>
      );

      // 컴포넌트 props가 mobile일 경우
    } else if (deviceType === 'mobile') {
      const mobileArr = gnb
        .filter((item) => item.device.includes(deviceType))
        .map((item) => {
          return (
            <li key={`key_${item.route}`}>
              <Link href={`/${item.route}`} className={`${isOnActive(item.route)}`}>
                <figure>
                  <FontAwesomeIcon icon={item.icon} />
                </figure>
                <span>{item.text}</span>
              </Link>
            </li>
          );
        });
      return <ul className="firstGnb mobileView">{mobileArr}</ul>;

      // 컴포넌트 props가 signSet일 경우
    } else if (deviceType === 'signSet') {
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
  };

  return <>{handleShowGnb()}</>;
}
