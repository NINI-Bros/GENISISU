import { useGnbStore } from '@/zustand/useGnbWrap';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function GnbWeb() {
  const { gnb } = useGnbStore();
  const pathName = usePathname();
  const thisPath = pathName.split('/')[1];

  // 패스네임 기준 클래스 활성화 함수
  const isOnActive = (routeName: string) => (thisPath === routeName ? 'on' : '');
  const webArr = gnb
    .filter((item) => item.device.includes('web'))
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
}
