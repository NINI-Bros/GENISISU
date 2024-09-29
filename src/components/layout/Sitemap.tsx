'use client'

import { fetchVehicles } from "@/data/fetch/productFetch";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";

export default function Sitemap ({ modalState, modalToggleFn } : {
  modalState: boolean,
  modalToggleFn: React.Dispatch<React.SetStateAction<boolean>> 
}) {
  const route = useRouter();
  const modelRef = useRef(null);
  const handleCloseBtn = () => modalToggleFn(prev => !prev);
  const path = usePathname();

  // 모델이름 불러오기 위한 서버액션
  const [titdata,setTitData] = useState<String[]>([]);
  useEffect(()=>{
    const vehicleData = async () => {
      try {
        const originData = await fetchVehicles();
        const nameData = originData.map((item) => (item.name.split('-').join(' ').toUpperCase()))
        setTitData(nameData)
      } catch (err) {
        console.error(err)
      }
    }
    vehicleData();
  },[])

  // 화면이동시마다 클래스값 제거 
  useEffect(()=> {
    modalToggleFn(false)
  
  },[path])

  // 모델명 컴포넌트
  const MenuList = () => {
    return (
      <>
        {titdata.map((item,i) => (
          i !== 12 ? (
            <Link key={'model_' + (i + 1)} href={'/models/' + (i + 1)} onClick={() => console.log(i+1,"클릭함")} >{item}</Link>
          ) : (
            <Link key={'model_' + 13 } href='#' onClick={(e) => {
              e.preventDefault();
              alert('준비중입니다')
            }} >{item}</Link>
          )
        ))}
      </>
    )
  }

  return(
    <div className={["modal", modalState ? "on" : ""].join(" ")} ref={modelRef}>
      <section>
        <h2>SITE MAP</h2>

        <div className="siteItemWrap">
          <article>
            <h3>모델</h3>
            <div>
              <MenuList/>
            </div>
          </article>

          <article>
            <h3>게시판</h3>
            <div>
              <Link href='/drive'>전시시승</Link>
              <Link href='/qna'>고객지원</Link>
              <Link href='/info'>공지사항</Link>  
              <Link href='/drive/new'>전시시승 신청</Link>
              
            </div>
          </article>

          <article>
            <h3>제니시수</h3>
            <div>
              <Link href='#'>김모건</Link>
              <Link href='#'>이수연</Link>
              <Link href='#'>류재준</Link>

            </div>
          </article>
        </div>

      </section>

      <div className="closeBtn" onClick={handleCloseBtn}>
        <div className='cl-line'></div>
        <div className='cl-line'></div>
      </div>

    </div>
  )
}