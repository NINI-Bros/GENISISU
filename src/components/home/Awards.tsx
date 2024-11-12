'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Post } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

export default function Awards({ data }: { data: Post[] }) {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);
  const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

  return (
    <section id="event4">
      <article>
        <Swiper
          className="ev4_slide"
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={100}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          ref={swiperRef}
          onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        >
          {data.map((item) => {
            const { _id, title, content, extra } = item;
            return (
              <SwiperSlide className="ev4_wrap" key={_id}>
                <article>
                  <h2>
                    {extra?.awardTitle}
                    <span>AWARDS</span>
                  </h2>
                  <h3>{extra?.subTitle}</h3>
                  <Link href={`/info/${_id}`} className="mainBtn">
                    VIEW MORE
                  </Link>
                </article>
                <figure
                  className="modelImg"
                  style={{ backgroundImage: `url(${SERVER + content})` }}
                >
                  <Image src={`${SERVER + content}`} priority fill sizes="100%" alt={title} />
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </article>
      <div
        className="bgImg"
        style={{ backgroundImage: `url(${SERVER + data[index].content})` }}
      ></div>
    </section>
  );
}
