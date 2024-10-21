import { Subject } from '@/types/product';
import Image from 'next/image';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface Section4Exterior {
  exterior: Subject;
}

export default function Section4Exterior({ exterior }: Section4Exterior) {
  const title = exterior.title;
  const content = exterior.content;
  const source = SERVER + exterior.images[0].path;

  return (
    <section className="bg-black grid grid-cols-2 auto-rows-[minmax(400px_,auto)] max-[1366px]:grid-cols-1 max-[1366px]:auto-rows-min relative z-[5]">
      <div>
        <figure className="aspect-[1.667/1] relative">
          <Image
            src={source}
            fill
            priority
            sizes="100%"
            className="absolute w-full"
            alt="외장옵션 소개 이미지 입니다."
          />
        </figure>
      </div>
      <article className="flex flex-col self-center px-[10%] max-[1366px]:py-[15%]">
        <h3 className="text-[40px] mb-[35px] break-keep max-[1366px]:text-2xl max-[1366px]:text-center">
          {title}
        </h3>
        <p className="text-[20px] text-[#888] break-keep leading-[1.2] max-[1366px]:text-base max-[1366px]:text-center">
          {content}
        </p>
      </article>
    </section>
  );
}
