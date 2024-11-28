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
      <section className="f_github">
        <h4>DEVELOPER</h4>
        <ul>
          <li>
            <Link href="https://github.com/redcontroller" target="_blank">
              @redcontroller
            </Link>
          </li>
          <li>
            <Link href="https://github.com/sylee0102" target="_blank">
              @sylee0102
            </Link>
          </li>
          <li>
            <Link href="https://github.com/ryungom" target="_blank">
              @ryungom
            </Link>
          </li>
        </ul>
      </section>
      <section className="f_skill">
        <h4>SKILL</h4>
        <ul>
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>CSS3</li>
          <li>Tailwind CSS</li>
          <li>Zustand</li>
          <li>Vercel</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MongoDB</li>
          <li>Python</li>
        </ul>
      </section>
      <aside className="f_readBtn">
        <button onClick={(e) => btnClick(e)}>
          <Link href="#">READ ME</Link>
        </button>
      </aside>
      <div className="f_copy">
        <span>© COPYRIGHT 2024 HYUNDAI MORGANS GENISISU. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
