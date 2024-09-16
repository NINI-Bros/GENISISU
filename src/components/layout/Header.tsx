'use client'

// import { auth } from "@/auth";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Sitemap from './Sitemap';

export default function Header({ isMain }: { isMain: string }) {
  // export default async function Header({ isMain }: {isMain:string}) {
  // const session = await auth();
  // console.log('session', session);
  const { data:session, status } =  useSession();
  const [modelOn, setModelOn] = useState(true)
  const [mobileState, setMobileState] = useState({
    mobileView: false,
    thisWidth:0
  })

  // console.log("모바일 상태 확인",mobileState.mobileView)

  useEffect(()=>{
    setMobileState(prev => {return{...prev, thisWidth: window.innerWidth}})
    const htmlBody = document.querySelector('body') as HTMLBodyElement
    const handleResize = () => {
      setMobileState(prev => {return{...prev, thisWidth: window.innerWidth}})
    }
    window.addEventListener('resize',handleResize)

    // sitemap 호출
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

    if (mobileState.thisWidth > 1366) {
      setMobileState(prev => {return{...prev, mobileView:false}})
    } else if (mobileState.thisWidth < 1366) {
      setMobileState(prev => {return{...prev, mobileView:true}})

    }

  
    // event listener를 달아줬을 경우 항상 clean-up을 실행해줘야 함. 상태가 업데이트 될때마다 계속 useEffct를 실행시키므로 
    return (
     window.removeEventListener('resize',handleResize)
    )

  },[modelOn, mobileState.thisWidth, mobileState.mobileView])

  const handleChangeSitemapState = (bl : boolean) => {
    setModelOn(!bl)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  }
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>) : void => {
    e.preventDefault();
    setModelOn(!modelOn)
  }

  return (
    <header className={isMain}>
      {!mobileState.mobileView 
        ? 
        <ul className="gnb gnb_web">
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
                  <li className='cursor-pointer' onClick={handleSignOut}>로그아웃</li>
              
          
              
              <li>
                <Link href="#" onClick={(e) => handleSiteMapOpen(e)}>
                  <img src="/images/menu_ham.png" alt="" />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        : ""
      }


      {/* 사이트맵 컴포넌트 */}
      <Sitemap modalState={modelOn} modalToggleFn={setModelOn}/>

  </header>
  );
}
