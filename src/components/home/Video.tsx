'use client';

import { Product } from '@/types/product';
import { useEffect, useRef, useState } from 'react';

export default function Video({ data }: { data: Product[] }) {
  const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const titleRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoData = data.map((item) => item.mainImages[1].path);
  const handleVideoEnd = () => {
    // 다음 영상으로 전환
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  useEffect(() => {
    // 타이틀 인터렉션 작업
    const yeon = titleRef.current?.querySelector('.suyeon') as HTMLElement | null;
    setTimeout(() => {
      yeon && yeon.classList.add('on');
    }, 3500);

    // video 컴포넌트 강제 재생
    videoRef.current?.play();
  }, [currentVideoIndex]);

  return (
    <section id="event1">
      <article>
        <h2>Hyundai Morgans</h2>
        <article className="title_item" ref={titleRef}>
          <h1>
            GEN<span>I</span>S<span>I</span>SU
          </h1>
          <h1 className="suyeon">YEON</h1>
        </article>
      </article>

      <figure>
        <video
          ref={videoRef}
          src={SERVER + videoData[currentVideoIndex]}
          onEnded={handleVideoEnd}
          muted={true}
          autoPlay={true}
          loop={false}
        ></video>
      </figure>

      <aside className="progress_bar">
        <span
          className={`${currentVideoIndex === 0 ? 'on' : ''} cursor-pointer`}
          onClick={() => setCurrentVideoIndex(0)}
        >
          G90 BLACK
        </span>
        <div className="timeline">
          <div></div>
        </div>
        <span
          className={`${currentVideoIndex === 1 ? 'on' : ''} cursor-pointer`}
          onClick={() => setCurrentVideoIndex(1)}
        >
          CONCEPT CAR
        </span>
      </aside>
    </section>
  );
}
