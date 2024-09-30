import extractTitle from "@/data/extractTitle";
import { fetchVehicles } from "@/data/fetch/productFetch";
import { VehicleInfo } from "@/types/payments";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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

  // 모델명 컴포넌트
  const MenuList = () => {
    return (
      <>
        {titdata.map((item,i) => (
          item !== "NEOLUN CONCEPT" ? (
            <Link key={'model_' + (i + 1)} href={'/models/' + (i + 1)} >{item}</Link>
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

  // 화면이동시마다 클래스값 제거 
  useEffect(()=> {
    mobileSideBarRef.current?.classList.remove('on')
    const onClassese = Array.from(mobileSideBarRef.current?.querySelectorAll<HTMLElement>('.on') || [])
    onClassese.map(item => item.classList.remove('on'))
    const thisWindow = window.innerHeight
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
          <Link href="/login">로그인</Link>
          <span className="text-[10px]">|</span>
          <Link href="/signup">회원가입</Link>
        </article>
        <div className="mobileMenuWrap">
          <article>
            <h3 onClick={(e) => handleToggleClick(e, "model")}>
              모델
              <figure className="arrowBtn" ref={arrowBtnRef}>
                <FontAwesomeIcon icon={faCaretUp} />
              </figure>
            </h3>
            {/* 모델명 호출 */}
            <div className="toggleWrap" ref={toggleModelRef}>
              <MenuList/>
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
              <Link href='/drive'>전시시승</Link>
              <Link href='/qna'>고객지원</Link>
              <Link href='/info'>공지사항</Link>     
            </div>
          </article>
        </div>

        {/* <article>
          <h3>제니시수</h3>
          <div>
            <Link href='#'>김모건</Link>
            <Link href='#'>이수연</Link>
            <Link href='#'>류재준</Link>

          </div>
        </article> */}
      </section>


      {/* dimmed 처리될 뒷배경 따로 손볼필요 없음 */}
      <div className="mobiledDimmedBg" onClick={e => handleToggleClick(e,"hamBtn")}></div>
    </div>
  )
}