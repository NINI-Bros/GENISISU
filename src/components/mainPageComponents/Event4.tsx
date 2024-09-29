'use client';

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Event4 () {

  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null)

  const bgUrl = [
    "/images/ev4_bg.png",
    "/images/ev4_bg_02.jpg",
    "/images/ev4_bg_03.jpg",
    "/images/ev4_bg_04.jpg",
  ]

  
  return(
    <section id="event4">
      <article>
        <Swiper className="ev4_slide" 
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
          <SwiperSlide className="ev4_wrap">
            <article>
              <h2>GENISISUYEON <span>AWARDS</span></h2>
              <h3>재니시수연의 고유한 감각을 반영한 현대적 공간으로 여러분을 초대합니다.<br/>
                제네시스에 관한 다양한 체험으로 당신만의 제네시스를 찾는 여정을 지원합니다.</h3>
              <button className="mainBtn" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
                  e.preventDefault();
                  alert('준비중 입니다.')
                }} >VIEW MORE</button>

            </article>
            <figure>
              <img src="" alt=""/>
            </figure>
          </SwiperSlide>

          <SwiperSlide className="ev4_wrap">
            <article>
              <h2>SECONDS <span>AWARDS</span></h2>
              <h3>전기차, 그 이상의 시작<br/>
                제네시스에 관한 다양한 체험으로 당신만의 제네시스를 찾는 여정을 지원합니다.</h3>
              <button className="mainBtn" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
                  e.preventDefault();
                  alert('준비중 입니다.')
                }} >VIEW MORE</button>

            </article>
            <figure>
              <img src="" alt=""/>
            </figure>
          </SwiperSlide>
          <SwiperSlide className="ev4_wrap">
            <article>
              <h2>THIRD <span>AWARDS</span></h2>
              <h3>당신과의 교감을 위해<br/>
              미래를 위한 선택과 감성적 가치의 공존을 추구하는 GV60</h3>
              <button className="mainBtn" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
                  e.preventDefault();
                  alert('준비중 입니다.')
                }} >VIEW MORE</button>
            </article>
            <figure>
              <img src="" alt=""/>
            </figure>
          </SwiperSlide>
          <SwiperSlide className="ev4_wrap">
            <article>
              <h2>LAST <span>AWARDS</span></h2>
              <h3>전기차, 그 이상의 시작<br/>
                제네시스에 관한 다양한 체험으로 당신만의 제네시스를 찾는 여정을 지원합니다.</h3>
              <button className="mainBtn" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
              e.preventDefault();
              alert('준비중 입니다.')
            }} >VIEW MORE</button>

            </article>
            <figure>
              <img src="" alt=""/>
            </figure>
          </SwiperSlide>
        </Swiper>
      </article>
      <div className="bgImg" style={{backgroundImage: `url(${bgUrl[index]})`}}></div>
    </section>
  )
}