import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimney,
  faCar,
  faRightToBracket,
  faHeadphones,
} from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hook/session';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function MainGnb({ deviceType }: { deviceType: string }) {
  const session = useSession();
  const pathName = usePathname();
  let thisPath = pathName.split('/')[1];
  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };
  const gnbArr = [
    {
      route: '',
      text: '홈',
      icon: faHouseChimney,
      device: ['mobile'],
    },
    {
      route: 'models',
      text: '모델',
      icon: faCar,
      device: ['web', 'mobile'],
    },
    {
      route: 'drive',
      text: '전시시승',
      icon: faRightToBracket,
      device: ['web', 'mobile'],
    },
    {
      route: 'qna',
      text: '고객지원',
      icon: faHeadphones,
      device: ['web', 'mobile'],
    },
    {
      route: 'info',
      text: '공지사항',
      icon: faFileLines,
      device: ['web', 'mobile'],
    },
    {
      route: 'none',
      text: '제니시수',
      icon: faFileLines,
      device: ['web'],
    },
  ];

  const isOnActive = (routeName: string) => (thisPath === routeName ? 'on' : '');
  const handleShowGnb = () => {
    if (deviceType === 'web') {
      const webArr = gnbArr
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
    } else if (deviceType === 'mobile') {
      const mobileArr = gnbArr
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
        <li className="flex items-center justify-end gap-x-[20px] mr-[30px] ">{signSetFn()}</li>
      );
    }
  };

  return <>{handleShowGnb()}</>;
}
