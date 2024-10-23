import { Subject } from '@/types/product';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default function Section2Intro({ abstract }: { abstract: Subject }) {
  const title = abstract.title;
  const content = abstract.content;
  const source = SERVER + abstract.images[0].path;

  return (
    <section className="relative w-screen h-[430px] bg-black text-white z-[4]">
      <article className="absolute z-[4] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[1200px] w-[80%] text-center">
        <h2 className="text-[40px] max-[1366px]:text-2xl max-[1366px]:mb-[2rem] max-[1366px]:break-keep">
          {title}
        </h2>
        <p className="text-[20px] font-light break-keep max-[1366px]:text-base">{content}</p>
      </article>
      <figure className="relative w-full overflow-hidden opacity-60 top-0 left-0 z-[-1]">
        <video
          className="fixed top-0 object-cover w-screen h-screen"
          src={source}
          muted={true}
          autoPlay={true}
          loop={true}
        />
      </figure>
    </section>
  );
}
