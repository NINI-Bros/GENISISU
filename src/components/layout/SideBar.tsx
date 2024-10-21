"use client";

import { fetchVehicles } from "@/data/fetch/productFetch";
import { useSession } from "@/hook/session";
import useModalOpenBgFix from "@/hook/useModalOpenBgFix";
import { useRefreshModal } from "@/hook/useRefreshDefence";
import { OptionList } from "@/types/optionLayout";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Button from "../Button";
import useLocalStorage from "@/hook/useLocalStorage";
import { Cart } from "@/types/product";
import { useSelectState } from "@/zustand/useSelectStore";

export default function SideBar () {
  const path = usePathname();
  const param = useParams();
  const session = useSession();
  const mobileSideBarRef = useRef<HTMLDivElement | null>(null)
  const toggleModelRef = useRef<HTMLDivElement | null>(null)
  const toggleBbsRef = useRef<HTMLDivElement | null>(null)
  const arrowBtnRef = useRef<HTMLElement | null>(null)
  const arrowBtnRef_2 = useRef<HTMLElement | null>(null)
  const [modalOn, setModalOn] = useState(false);
  const [modalConfOn, setModalConfOn] = useState(false)
  const [titdata,setTitData] = useState<{name:string; id:number}[]>([]);
  const cartItem = useSelectState();

  const optionList: OptionList = {
    detail: '모델 상세',
    engine: '엔진 타입',
    drivetrain: '구동 타입',
    passenger: `${titdata[Number(param.model) -1]?.name === 'g80' ? '스포츠 패키지' : '시트 구성'}`,
    exterior: '외장 컬러',
    interior: '내장디자인 & 컬러',
    garnish: '내장가니쉬',
    wheel: '휠 & 타이어',
    add: '선택 품목',
    payments: '결제',
  };


   // 모델이름 불러오기 위한 서버액션
   useEffect(()=>{
    const vehicleData = async () => {
      try {
        const originData = await fetchVehicles();
        const nameData = originData.map((item) => ({
          name: item.name,
          id: item._id
        }))
        setTitData(nameData)
      } catch (err) {
        console.error(err)
      }
    }
    vehicleData();
  },[])


  // 커스텀 모달 사용시 하단 커스텀 훅 사용
  // const {showModal, closeModal} = useRefreshModal();


  // 초기값 설정
  const [storedValue, setValue] = useLocalStorage<Cart>('cart', {
    model: titdata[Number(param.model)]?.name,
    price: 0,
  });


  // 화면이동시마다 sideGnb 호출 클래스값 제거 
  useEffect(()=> {
    mobileSideBarRef.current?.classList.remove('on')
    mobileSideBarRef.current?.querySelector('.dimmedBg')?.classList.remove('on')
  },[path])

  // 모달호출 시 배경 고정 커스텀 훅 호출
  useModalOpenBgFix(modalOn)

  // 로그아웃 함수
  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  // 전체적인 토글 클릭타입에 따른 ref기준 클래스 제거, 추가 함수
  const handleToggleClick = (e: React.MouseEvent<HTMLElement>, type : string) => {
    switch (type) {
      case "model" :
        toggleModelRef.current?.classList.toggle('on')
        arrowBtnRef.current?.classList.toggle('on')
        break;
      case "hamBtn" :
        mobileSideBarRef.current?.classList.toggle('on')
        mobileSideBarRef.current?.querySelector('.dimmedBg')?.classList.toggle('on')
        setModalOn(prev => !prev);
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

  // 모델명 호출 컴포넌트
  const MenuList = () => {
    return (
      <>
        {titdata.map((item) => { 
          const upperName = item.name.split('-').join(' ').toUpperCase()
          return (
            <section key={'model_' + item.id}>
              {upperName !== "NEOLUN CONCEPT" ? (
                <>
                  <Link href={'/models/' + item.id} onClick={() => setModalOn(false)} >
                    {upperName}
                  </Link>
                  {item.id === Number(param?.model) ? (
                    <div className="toggleModelOptions">
                      {optionViewNames(upperName)}
                    </div>
                  ) : (
                    <></>
                  )}
                  
                </>
              ) : (
                <Link href='#' onClick={(e) => {
                  e.preventDefault();
                  alert('준비중입니다')
                }}>{upperName}</Link>
              )}
            </section>
          )
          
        })}
      </>
    )
  }


  // 모델명 > 모델옵션 표기 함수
  const optionViewNames = (upperName:string) => {
    const removeClassOn = () => {
      mobileSideBarRef.current?.classList.remove('on')
      mobileSideBarRef.current?.querySelector('.dimmedBg')?.classList.remove('on')
      setModalOn(false)
      setValue({
        model: titdata[Number(param.model) -1].name,
        price: cartItem.price === 0 ? storedValue.price : cartItem.price,
        option: {
          ...storedValue.option,
          ...cartItem.option, // 현재 옵션 페이지 선택 항목 추가 (덮어 쓰기)
        },
      });
    }
    if (param?.model !== undefined) {
      const paramCheck = (optionType : string) => {
        let queryParam = path.split('/')[3]
        if (optionType === queryParam) {
           return 'text-white'
        } else if (optionType === 'detail' && queryParam === undefined) {
           return 'text-white'
        } else {
           return 'text-[#555]'
        }
      }
      const component = Object.keys(optionList).map((optionName, i) => (
          <Link 
            key={`${upperName}_${optionName}_${i}`}
            href={`/models/${param.model}/${optionName === 'detail' ? '' : optionName}`}
            onClick={removeClassOn}
            className={`${paramCheck(optionName)}`}
            >{optionList[optionName]}
          </Link>
      ))
      return component
    } else {
      return
    }
  }


  return (
    <>
      <div className="mobileSideBar" ref={mobileSideBarRef}>
        {/* 햄버거 버튼 */}
        <aside className='mobileHamBtn' onClick={e => handleToggleClick(e,"hamBtn")}>
          <div></div>
          <div></div>
        </aside>

        {/* 모바일 메뉴 */}
        <section className="mobileMenu">
          <article className="signSet">
            {session ? (
              <span onClick={handleSignOut} className="cursor-pointer">로그아웃</span>
            ) : (
              <>
                <Link href="/login">로그인</Link>
                <span className="text-[10px]">|</span>
                <Link href="/signup">회원가입</Link>
              </>
            )}
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
              <div className="toggleWrap on" ref={toggleModelRef}>
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
              <div className="toggleWrap on" ref={toggleBbsRef}>
                <Link href='/drive' onClick={() => setModalOn(false)} >전시시승</Link>
                <Link href='/qna' onClick={() => setModalOn(false)} >고객지원</Link>
                <Link href='/info' onClick={() => setModalOn(false)} >공지사항</Link>     
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
        <div className="dimmedBg" onClick={e => handleToggleClick(e,"hamBtn")}></div>
      </div>

      
      {/* 커스텀 경고모달 샘플(241020 임시로 제작, 추후 사용여부 결정) */}
      {/* {showModal && (
        <aside className="comfirmPop" >
          <article>
            <span>새로고침시 데이터가 사라집니다. 진행하시겠습니까?</span>
            <div>
              <Button onClick={() => window.location.reload()}>예</Button>
              <Button onClick={closeModal}>아니오</Button>
            </div>
          </article>
          <div className={`dimmedBg ${showModal ? 'on': ''} z-10`} onClick={closeModal}></div>
        </aside>
      )} */}

    </>
  )
}