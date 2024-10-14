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
    <section className="bg-black grid grid-cols-2 auto-rows-[minmax(400px_,auto)] max-[1366px]:grid-cols-1 max-[1366px]:auto-rows-min relative z-[5]">
      <article className="flex-[1_1_auto] self-center px-[10%] max-[1366px]:row-start-2 max-[1366px]:py-[15%]">
        <h3 className="text-[40px] mb-[35px] break-keep max-[1366px]:text-2xl max-[1366px]:text-center">{title}</h3>
        <p className="text-[20px] text-[#888] leading-[1.2] break-keep max-[1366px]:text-base max-[1366px]:text-center">{content}</p>
      </article>
      <div className='max-[1366px]:row-start-1'>
        <figure className="aspect-[1.667/1] relative">
          <Image
            src={source}
            fill
            priority
            sizes="100%"
            className="absolute"
            alt="내장옵션 소개 이미지 입니다."
          />
        </figure>
      </div>
    </section>
  );
}
