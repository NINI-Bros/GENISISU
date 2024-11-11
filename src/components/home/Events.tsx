'use client';

import { Post } from '@/types';
import Link from 'next/link';

export default function Events({ data }: { data: Post[] }) {
  const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const { title, _id } = data[0];
  return (
    <section id="event3" style={{ backgroundImage: `url(${SERVER + data[0].content})` }}>
      <article>
        <h2>
          GENISISU <span>EVENTS</span>
        </h2>
        <h3>{title}</h3>
        <Link href={`/info/${_id}`} className="mainBtn">
          VIEW MORE
        </Link>
      </article>
    </section>
  );
}
