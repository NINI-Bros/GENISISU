import { Subject } from '@/types/product';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface Section2IntroProps {
  abstract: Subject;
}

export default function Section2Intro({ abstract }: Section2IntroProps) {
  const title = abstract.title;
  const content = abstract.content;
  const source = SERVER + abstract.images[0].path;

  return (
    <section className="relative w-screen h-[430px] bg-black text-white z-[-1]">
      <article className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[1200px] text-center">
        <h2 className="text-[40px]">{title}</h2>
        <p className="text-[20px] font-light">{content}</p>
      </article>
      <figure className="w-[100%] h-[100%] overflow-hidden opacity-60">
        <video
          className="fixed inset-0 w-full"
          src={source}
          muted={true}
          autoPlay={true}
          loop={true}
        />
      </figure>
    </section>
  );
}
