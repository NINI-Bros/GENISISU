'use client';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useModelStore } from '@/zustand/useModel';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default function Vehicles({ data }: { data: Product[] }) {
  const updateItems = useModelStore((state) => state.updateItems);

  useEffect(() => {
    updateItems(data.map((item) => item.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const regex = /gv?\d{2}/g; // 정규표현식
  const [index, setIndex] = useState(0);
  const imageData = data.map((image) => (
    <SwiperSlide key={image.name}>
      <figure>
        <Image
          src={SERVER + image.mainImages[2].path}
          fill
          sizes="100%"
          alt={'모델명: ' + image.name}
        />
      </figure>
    </SwiperSlide>
  ));
  const nameTitData = data.map((modelName) => {
    const titText = modelName.name.match(regex)?.[0] || modelName.name.split('-')[0];
    const subText = modelName.name
      .split('-')
      .filter((item) => item !== titText)
      .join(' ');
    return [titText, subText];
  });
  const title = nameTitData[index][0].toUpperCase();
  const subTitle = nameTitData[index][1].toUpperCase();

  const handleModelClick = () => {
    if (index === 12) {
      alert('NEOLUN 차량은 준비중 입니다.\n기대해주세요');
    } else {
      router.push(`/models/${index + 1}`);
    }
  };

  return (
    <section id="event2">
      <article className="ev2_tit">
        <h2 ref={titleRef}>{title}</h2>
        <Link
          href="#"
          className="mainBtn mobileView"
          onClick={(e) => {
            e.preventDefault();
            handleModelClick();
          }}
        >
          VIEW MORE
        </Link>
        <h3>{subTitle || 'STANDARD'}</h3>
      </article>
      <article className="ev2_models">
        <div className="ev2_slide_wrap">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={100}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          >
            {data && imageData}
          </Swiper>
        </div>
      </article>

      <div className="ev2_bg">
        <Link
          href="#"
          className="mainBtn"
          onClick={(e) => {
            e.preventDefault();
            handleModelClick();
          }}
        >
          VIEW MORE
        </Link>
      </div>
    </section>
  );
}
