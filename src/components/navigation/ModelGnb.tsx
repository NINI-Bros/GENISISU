'use client'
import { useModelStore } from "@/zustand/useModel"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from "next/link";

export default function ModelGnb ({params}: { params: { model: string }}) {
  const { items } = useModelStore();
  const modelName = items[Number(params.model) - 1].split('-').join(' ').toUpperCase();
  const swipeWrapRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter();
  const [tf, setTf] = useState(false)
  const regex = /gv?\d{2}/g; // 정규표현식

  // 클릭이벤트
  const handleButtonClick = () => {
    if (tf !== true) {
      if (swipeWrapRef.current) {
        swipeWrapRef.current.style.left = '330px'
        swipeWrapRef.current.classList.replace('opacity-0','opacity-1');
      }
      setTf(!tf);
    } else {
      if (swipeWrapRef.current) {
        swipeWrapRef.current.style.left = '-1200px'
        swipeWrapRef.current?.classList.replace('opacity-1','opacity-0');
      }
      setTf(!tf);
    }
  }
  const handleMoveModelPage = (index : number) => {
    if (index === 12) {
      alert ("NEOLUN 차량은 준비중 입니다.\n기대해주세요")
    } else {
      router.push(`/models/${index + 1}`)
    }
  }

  
  return(
      <nav className="flex items-end absolute top-[40px] left-[80px] z-20 w-full h-[70px] overflow-hidden" >
        <button className="grid col-auto font-Hyundai-sans w-[330px] h-full pt-[8px] px-[10px] gap-x-[3rem] bg-black absolute top-0 left-0 z-30" onClick={handleButtonClick}>
          <span className="col-start-1 text-[13px] self-end text-left ">GENISISUYEON</span>
          <span className="col-start-1 text-[22px] self-start text-left font-black">{modelName}</span>
          <div className="col-start-2 row-start-1 row-span-2 self-center justify-self-end w-[10px] h-[20px]">
            <img src="/images/btn_next.png" className="object-cover" alt="" />
          </div>
        </button>
        <div className="absolute top-0 transition-all delay-[0.1s]" style={{left:'-1200px'}} ref={swipeWrapRef}>
          <Swiper className="subGnb flex absolute w-[1200px] overflow-x-scroll overflow-y-hidden  opacity-1" spaceBetween={0} slidesPerView={6}>
            {items.map((name,index)=>{
              let titName = name.match(regex)?.[0] || name.split('-')[0]
              let subName = name.split('-').filter((item) => item !== titName).join(' ')
              return(
                <SwiperSlide key={name} className="box-border">
                  <Link href="#" onClick={(e)=>{
                    e.preventDefault();
                    handleMoveModelPage(index)
                  }} key={name} className="flex flex-col font-Hyundai-sans w-full h-[70px] pt-[5px]  border-[#777] border-[1px] bg-black px-[20px] hover:bg-[#333]">
                    <span className="col-start-1 text-[25px] w-full self-start text-left font-medium ">{titName.toUpperCase()}</span>
                    <span className="col-start-1 text-[12px] self-start text-left text-nowrap ">{subName ? subName.toUpperCase() : "STANDARD"}</span>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </nav>
  )
}