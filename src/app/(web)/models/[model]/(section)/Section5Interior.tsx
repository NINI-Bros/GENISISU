import { Subject } from '@/types/product';
import Image from 'next/image';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface Section5Interior {
  interior: Subject;
}

export default function Section5Interior({ interior }: Section5Interior) {
  const title = interior.title;
  const content = interior.content;
  const source = SERVER + interior.images[0].path;

  return (
    <section className="bg-black h-[450px] flex">
      <article className="flex-[1_1_auto] self-center px-[10%]">
        <h3 className="text-[40px] mb-[35px]">{title}</h3>
        <p className="text-[20px] text-[#888] leading-[1.2]">{content}</p>
      </article>
      <figure className="bg-slate-400 h-full flex-[1_0_900px] overflow-hidden relative">
        <Image src={source} fill priority sizes='100%' className="absolute" alt="내장옵션 소개 이미지 입니다." />
      </figure>
    </section>
  );
}
