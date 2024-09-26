'use client'

// import { auth } from "@/auth";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Sitemap from './Sitemap';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faCar, faRightToBracket, faHeadphones, faKey } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

export default function Header({ isMain }: { isMain: string }) {
  // export default async function Header({ isMain }: {isMain:string}) {
  // const session = await auth();
  // console.log('session', session);
  const { data:session, status } =  useSession();
  const [modalOn, setmodalOn] = useState(true)
  const [mobileState, setMobileState] = useState({
    mobileView: false,
    thisWidth:0
  })
  const router = useRouter();
  const hamBtnRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuBtnRef = useRef<HTMLDivElement | null>(null)

  // console.log("모바일 상태 확인",mobileState.mobileView)

  useEffect(()=>{
    setMobileState(prev => {return{...prev, thisWidth: window.innerWidth}})
    const htmlBody = document.querySelector('body') as HTMLBodyElement
    const handleResize = () => {
      setMobileState(prev => {return{...prev, thisWidth: window.innerWidth}})
    }
    window.addEventListener('resize',handleResize)

    // sitemap 호출
    if (!modalOn) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';

    } else {
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      document.body.style.position = '';
    
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

  },[modalOn, mobileState.thisWidth, mobileState.mobileView])

  const handleChangeSitemapState = (bl : boolean) => {
    setmodalOn(!bl)
  }

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  }
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>) : void => {
    e.preventDefault();
    setmodalOn(!modalOn)
  }

  const handleHambtnClick = () => {
    hamBtnRef.current?.classList.toggle('on')
    mobileMenuBtnRef.current?.classList.toggle('on')
  }

  return (
    <header className={isMain}>
      <nav className="gnb gnb_web">
        <div className="navWrap">
          <ul className="firstGnb">
            <li>
              <Link href="/" className="gnbLogo">
                <figure>
                  <Image src="/images/genisisu_logo_w.png" priority fill sizes="100%" alt={"타이틀이미지"} />
                </figure>
              </Link>
            </li>
            <li>
              <Link href="/models">모델</Link>
            </li>
            <li>
              <Link href="/drive">전시시승</Link>

            </li>
            <li>
              <Link href="/qna">고객지원</Link>
            </li>
            <li>
              <Link href="/info">공지사항</Link>
            </li>
            <li>
              <Link href="/none">제니시수</Link>
            </li>
          </ul>

          <ul className="firstGnb mobileView">
            <li>
              <Link href="/models">
                <FontAwesomeIcon icon={faCar} />
                <span>모델</span>
              </Link>
            </li>
            <li>
              <Link href="/drive">
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>전시시승</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <FontAwesomeIcon icon={faHouseChimney}/>
                <span>홈</span>
              </Link>
            </li>
            <li>
              <Link href="/qna">
                <FontAwesomeIcon icon={faHeadphones} />
                <span>고객지원</span>
              </Link>
            </li>
            <li>
              <Link href="/info">
                <FontAwesomeIcon icon={faFileLines} />
                <span>공지사항</span>
              </Link>
            </li>
          </ul>

        </div>
        <div className="navWrap">
          <ul className="secondGnb">
  
            <li>
              <Link href="/login">로그인</Link>
              <Link href="/signup">회원가입</Link>
              <Link href="#" className="cursor-pointer" onClick={e => handleSignOut(e)}>로그아웃</Link>
            </li>

            <li className="sitemapBtn">
              <Link href="#" onClick={(e) => handleSiteMapOpen(e)}>
                <figure>
                  <Image src="/images/menu_ham.png" fill sizes='100%' alt="" />
                </figure>
              </Link>
            </li>

          </ul>

          {/* <ul className="mobileView">
            <li onClick={() => router.push("/login")}>
              <span>로그인</span>
            </li>
            <li onClick={() => router.push("/signup")}>
              <span>회원가입</span>
            </li>
            
            <li onClick={e => handleSignOut(e)}>
              <span>로그아웃</span>
            </li>

          </ul> */}
        </div>
      </nav>
      {/* {!mobileState.mobileView 
        ? 
        : ""
      } */}


      {/* 사이트맵 컴포넌트 */}
      <Sitemap modalState={modalOn} modalToggleFn={setmodalOn}/>

      {/* 반응형 sideMenu */}
      <aside className='mobileHamBtn'  ref={mobileMenuBtnRef} onClick={handleHambtnClick}>
        <div></div>
        <div></div>
      </aside>

      <article className='mobileSideBar' ref={hamBtnRef}>
        
      </article>

  </header>
  );
}
