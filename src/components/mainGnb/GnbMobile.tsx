import { useGnbStore } from '@/zustand/useGnbWrap';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function GnbMobile() {
  const { gnb } = useGnbStore();
  const pathName = usePathname();
  const thisPath = pathName.split('/')[1];

  // 패스네임 기준 클래스 활성화 함수
  const isOnActive = (routeName: string) => (thisPath === routeName ? 'on' : '');
  const mobileArr = gnb
    .filter((item) => item.device.includes('mobile'))
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
}
