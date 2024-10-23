'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Footer() {
  const route = useRouter();
  const btnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    route.push('https://github.com/NINI-Bros/GENISISU');
  };

  return (
    <footer>
      <figure className="f_logo">
        <Image src="/images/genisisu_logo_w.png" fill priority sizes="100%" alt="" />
      </figure>
      <ul>
        <li className="f_github">
          <h4>DEVELOPER</h4>
          <ul className="f_info">
            <li>
              <Link href="https://github.com/redcontroller">@redcontroller</Link>
            </li>
            <li>
              <Link href="https://github.com/sylee0102">@sylee0102</Link>
            </li>
            <li>
              <Link href="https://github.com/ryungom">@ryungom</Link>
            </li>
          </ul>
        </li>
        <li className="f_skill">
          <h4>SKILL</h4>
          <ul className="f_info">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>CSS3</li>
            <li>Tailwind CSS</li>
            <li>Zustand</li>
            <li>Vercel</li>
          </ul>
          <ul className="f_info">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>Python</li>
          </ul>
        </li>
        <li className="f_copy">
          <span>© COPYRIGHT 2024 HYUNDAI MORGANS GENISISU. ALL RIGHTS RESERVED.</span>
        </li>
      </ul>
      <aside className="f_readBtn">
        <button onClick={(e) => btnClick(e)}>
          <Link href="#">READ ME</Link>
        </button>
      </aside>
    </footer>
  );
}
