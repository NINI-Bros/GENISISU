'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useRef } from "react";

export default function Sitemap ({ modalState, modalToggleFn } : {
  modalState: boolean,
  modalToggleFn: React.Dispatch<React.SetStateAction<boolean>> 
}) {
  const route = useRouter();
  const modelRef = useRef(null);
  const handleCloseBtn = () => modalToggleFn(prev => !prev);
  const handleSitemapClick = (e: React.MouseEvent<HTMLElement>,index:number) : void => {
    e.preventDefault();
    if (index < 13) {
      route.push(`/models/${index}`)
    } else if (index === 13) {
      alert('아직 개발중이에요')
    } else if (index > 13) {
      switch(index) {
        case 14:
          route.push('/drive')
          break;
        case 15:
          route.push('/qna')
          break;
        case 16:
          route.push('/info')
          break;
        case 17:
          route.push('/drive/new')
          break;
        case 18:
          route.push('https://github.com/redcontroller')
          break;
        case 19:
          route.push('https://github.com/sylee0102')
          break;
        case 20:
        route.push('https://github.com/ryungom')
        break;
        default:
          route.push('#')
      }
    }
    
    modalToggleFn(prev => !prev)
  }


  return(
    <div className={["modal", modalState ? "on" : ""].join(" ")} ref={modelRef}>
      <section>
        <h2>SITE MAP</h2>

        <div className="siteItemWrap">
          <article>
            <h3>모델</h3>
            <div>
              <Link href='#' onClick={(e) => handleSitemapClick(e,1)}>G90 BLACK</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,2)}>G90 LONG WHEEL BASE</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,3)}>G90</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,4)}>G80</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,5)}>G80 ELECTRIFIED</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,6)}>G70</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,7)}>G70 SHOOTING BREAK</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,8)}>GV80</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,9)}>GV80 COUPE</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,10)}>GV70</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,11)}>GV70 ELECTRIFIED</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,12)}>GV60</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,13)}>NEOLUN CONCEPT</Link>
            </div>
          </article>

          <article>
            <h3>게시판</h3>
            <div>
              <Link href='#' onClick={(e) => handleSitemapClick(e,14)}>전시시승</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,15)}>고객지원</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,16)}>공지사항</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,17)} className="row-start-2">전시시승 신청</Link>
              
            </div>
          </article>

          <article>
            <h3>제니시수</h3>
            <div>
              <Link href='#' onClick={(e) => handleSitemapClick(e,18)}>김모건</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,19)}>이수연</Link>
              <Link href='#' onClick={(e) => handleSitemapClick(e,20)}>류재준</Link>

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