'use client';

import JoinLoginForm from './JoinLoginForm';
import JoinSignupForm from './JoinSignupForm';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignWrapSet() {
  const searchParams = useSearchParams();
  const [moveLayer, setMoveLayer] = useState(false);

  // 라우팅이 변경될때마다 (=모든 변경 버튼 클릭시) 동작하게끔 함. 하위 컴포넌트 버튼에서도 Link로 쿼리스트링 이용해서 상태 변화주고 있음
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'login') {
      setMoveLayer(false);
    } else if (type === 'signup') {
      setMoveLayer(true);
    }
  }, [searchParams]);
  return (
    <>
      <div className="bg-white w-full h-[calc(100vh-60px)] flex items-center justify-center ">
        <section className="relative justify-center w-full m-[3%_3%_6%_3%] aspect-[5/3] max-w-[1200px] border border-[#efefef] bg-white drop-shadow-2xl">
          <article className="absolute w-[50%] top-0 left-0 h-full overflow-hidden">
            <JoinLoginForm moveState={moveLayer} />
          </article>
          <article className="absolute w-[50%] top-0 right-0 h-full overflow-hidden">
            <JoinSignupForm moveState={moveLayer} />
          </article>

          {/* 움직이는 레이어 */}
          <aside
            className={`bg-black aspect-[5/6] w-full max-w-[50%] absolute top-[50%] translate-y-[-50%] transition-all duration-500 flex justify-center items-center ${
              moveLayer ? 'left-0' : 'left-[50%]'
            }`}
          >
            <div
              className={`z-[1] text-white flex flex-col w-[50%] gap-y-12 absolute top-[5%] transition-all duration-500  ${
                moveLayer ? 'left-[5%] items-start' : 'left-[45%] items-end'
              }`}
            >
              <div>
                <h2 className="font-[Hyundai] tracking-[5px] text-4xl mb-1 ">
                  GEN
                  <span className="px-[0.3px]">I</span>S<span className="px-[0.3px]">I</span>
                  SU
                </h2>
                <span className="text-4xl">
                  {moveLayer ? (
                    <div className="flex justify-start">
                      <span className="underline underline-offset-8">회원가입</span>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <span className="underline underline-offset-8">로그인</span>
                    </div>
                  )}
                </span>
              </div>
              <p
                className={`text-white ${
                  moveLayer ? 'text-left' : 'text-right'
                } break-keep w-[450px]`}
              >
                {moveLayer ? (
                  <span>
                    지금 제니시수에 가입하고 프리미엄 세단의 가능성을 발견해보세요.
                    <br />
                    고급스러움과 혁신이 어우러진 특별한 여정이 시작됩니다.
                  </span>
                ) : (
                  <span>
                    프리미엄 세단의 새로운 세계로 첫발을 내딛어보세요.
                    <br />한 차원 높은 드라이빙 경험이 기다리고 있습니다.
                  </span>
                )}
              </p>
              <div className="grid grid-cols-1 items-center gap-y-2 px-[10%]">
                <div className="text-[#888] flex gap-x-3">
                  {moveLayer ? '제니시수 로그인' : '제니시수 계정 만들기'}
                  <figure>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </figure>
                </div>
                <Link
                  href={moveLayer ? '/accept?type=login' : '/accept?type=signup'}
                  className={`w-full py-2 text-center text-white border border-white cursor-pointer text-base font-bold transition-colors hover:bg-white hover:text-black ${
                    moveLayer ? 'left-0' : 'left-[65%]'
                  }`}
                >
                  {moveLayer ? '로그인' : '회원가입'}
                </Link>
              </div>
            </div>

            <article
              className={`z-[1] absolute bottom-[-7%] transition-all duration-[1s] ${
                moveLayer ? 'right-[35%]' : 'right-[-10%]'
              } aspect-[2/1] w-full max-w-[450px]`}
            >
              <Image
                src="/images/gv70_croped.png"
                fill
                priority
                sizes="100%"
                alt="로그인 레이어 이미지"
                className="absolute top-0 left-0"
              ></Image>
            </article>

            <div className="bg-login-bg bg-center w-full h-full opacity-20 z-0"></div>
          </aside>
        </section>
      </div>
    </>
  );
}
