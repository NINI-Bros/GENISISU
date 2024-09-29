import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function SideBar () {
  const route = useRouter();
  const path = usePathname();
  const mobileSideBarRef = useRef<HTMLDivElement | null>(null)
  const toggleModelRef = useRef<HTMLDivElement | null>(null)
  const toggleBbsRef = useRef<HTMLDivElement | null>(null)
  const arrowBtnRef = useRef<HTMLElement | null>(null)
  const arrowBtnRef_2 = useRef<HTMLElement | null>(null)

  const handleToggleClick = (e: React.MouseEvent<HTMLElement>, type : string) => {
    switch (type) {
      case "model" :
        toggleModelRef.current?.classList.toggle('on')
        arrowBtnRef.current?.classList.toggle('on')
        break;
      case "hamBtn" :
        mobileSideBarRef.current?.classList.toggle('on')
        break;
      case "bbs" :
        toggleBbsRef.current?.classList.toggle('on')
        arrowBtnRef_2.current?.classList.toggle('on')
        break;
      case "remove" :
        toggleModelRef.current?.classList.remove('on')
        toggleBbsRef.current?.classList.remove('on')
        mobileSideBarRef.current?.classList.remove('on')

        break;
    }
  }
  const handleRouteClick = (e: React.MouseEvent<HTMLElement>, index:number) : void => {
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
        case 21 :
          route.push('/login')
          break;
        case 22 :
          route.push('/signup')
          break;
        default:
          route.push('#')
      }
    }
    
    // handleHambtnClick();
    handleToggleClick(e,"remove");
  }


  useEffect(()=> {
    mobileSideBarRef.current?.classList.remove('on')
    const thisWindow = window.innerHeight
    if (thisWindow)
    console.log('윈도우확인',thisWindow)
  },[path])


  return (
    <div className="mobileSideBar" ref={mobileSideBarRef}>

      {/* 햄버거 버튼 */}
      <aside className='mobileHamBtn' onClick={e => handleToggleClick(e,"hamBtn")}>
        <div></div>
        <div></div>
      </aside>


      {/* 모바일 메뉴 */}
      <section className="mobileMenu">
        <article className="signSet">
          <Link href="/#" onClick={(e) => handleRouteClick(e,21)}>로그인</Link>
          <span className="text-[10px]">|</span>
          <Link href="/#" onClick={(e) => handleRouteClick(e,22)}>회원가입</Link>
        </article>
        <div className="mobileMenuWrap">
          <article>
            <h3 onClick={(e) => handleToggleClick(e, "model")}>
              모델
              <figure className="arrowBtn" ref={arrowBtnRef}>
                <FontAwesomeIcon icon={faCaretUp} />
              </figure>
            </h3>
            <div className="toggleWrap" ref={toggleModelRef}>
              <Link href='#' onClick={(e) => handleRouteClick(e,1)}>G90 BLACK</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,2)}>G90 LONG WHEEL BASE</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,3)}>G90</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,4)}>G80</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,5)}>G80 ELECTRIFIED</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,6)}>G70</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,7)}>G70 SHOOTING BREAK</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,8)}>GV80</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,9)}>GV80 COUPE</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,10)}>GV70</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,11)}>GV70 ELECTRIFIED</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,12)}>GV60</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,13)}>NEOLUN CONCEPT</Link>
            </div>
          </article>

          <article>
            <h3 onClick={(e) => handleToggleClick(e, "bbs")}>
              게시판
              <figure className="arrowBtn" ref={arrowBtnRef_2}>
                <FontAwesomeIcon icon={faCaretUp} />
              </figure>
            </h3>
            <div className="toggleWrap" ref={toggleBbsRef}>
              <Link href='#' onClick={(e) => handleRouteClick(e,14)}>전시시승</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,15)}>고객지원</Link>
              <Link href='#' onClick={(e) => handleRouteClick(e,16)}>공지사항</Link>     
            </div>
          </article>
        </div>

        {/* <article>
          <h3>제니시수</h3>
          <div>
            <Link href='#' onClick={(e) => handleRouteClick(e,18)}>김모건</Link>
            <Link href='#' onClick={(e) => handleRouteClick(e,19)}>이수연</Link>
            <Link href='#' onClick={(e) => handleRouteClick(e,20)}>류재준</Link>

          </div>
        </article> */}
      </section>


      {/* dimmed 처리될 뒷배경 따로 손볼필요 없음 */}
      <div className="mobiledDimmedBg" onClick={e => handleToggleClick(e,"hamBtn")}></div>
    </div>
  )
}