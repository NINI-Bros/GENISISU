'use client'

// import { auth } from "@/auth";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header({ isMain }: { isMain: string }) {
  // export default async function Header({ isMain }: {isMain:string}) {
  // const session = await auth();
  // console.log('session', session);

  const modelRef = useRef(null)
  const route = useRouter();
  const [modelOn, setModelOn] = useState(true)
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>) : void => {
    e.preventDefault();
    setModelOn(!modelOn)
  }
  const handleCloseBtn = () => {
    setModelOn(!modelOn)
  }

  const handleSitemapClick = (e: React.MouseEvent<HTMLElement>,index:number) : void => {
    e.preventDefault();
    if (index < 13) {
      route.push(`/models/${index}`)
    } else if (index === 13) {
      alert('아직 개발중이에요')
    } else if (index > 13) {
      switch(index) {
        case 14:
          route.push('/info')
          break;
        case 15:
          route.push('/qna')
          break;
        case 16:
          route.push('/notice')
          break;
        case 17:
          route.push('/info/drive')
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
    
    setModelOn(!modelOn)
  }

  useEffect(()=>{
    const htmlBody = document.querySelector('body') as HTMLBodyElement
    if (!modelOn) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      htmlBody.classList.toggle('modalOn')
    } else {
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      document.body.style.position = '';
      htmlBody.classList.toggle('modalOn')
      window.scrollTo(0, parseInt(scrollY || '0') * -1);

    }
  },[modelOn])

  return (
    <header className={isMain}>
    
      <ul className="gnb">
        <li>
          <ul>
            <li>
              <h1 className="gnb_logo">
                <a href="/">
                  <img src="/images/genisisu_logo_w.png" alt={'타이틀이미지'} />
                </a>
              </h1>
            </li>
            <li>
              <Link href="/models">모델</Link>
            </li>
            <li>
              <Link href="/info">전시시승</Link>

            </li>
            <li>
              <Link href="/qna">고객지원</Link>
            </li>
            <li>
              <Link href="/notice">공지사항</Link>
            </li>
            <li>
              <Link href="#none">제니시수</Link>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
            <li>
              <Link href="#" onClick={(e) => handleSiteMapOpen(e)}>
                <img src="/images/menu_ham.png" alt="" />
              </Link>
            </li>
          </ul>
        </li>
        
      </ul>


      <div className={["modal", modelOn ? "" : "on"].join(" ")} ref={modelRef}>
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
  </header>
  );
}
