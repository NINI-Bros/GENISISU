'use client';

import JoinLoginForm from './JoinLoginForm';
import JoinSignupForm from './JoinSignupForm';
import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function SignWrapSet() {
  const [moveLayer, setMoveLayer] = useState(false);
  return (
    <>
      <div className="bg-white w-full h-[calc(100vh-60px)] flex items-center justify-center ">
        <section className="relative justify-center w-full m-[3%] aspect-[5/3] max-w-[1200px] border border-[#efefef] bg-white drop-shadow-2xl">
          <article className="absolute w-[50%] top-0 left-0 h-full overflow-hidden">
            <JoinLoginForm moveState={moveLayer} moveSetFn={setMoveLayer} />
          </article>
          <article className="absolute w-[50%] top-0 right-0 h-full overflow-hidden">
            <JoinSignupForm moveState={moveLayer} moveSetFn={setMoveLayer} />
          </article>

          {/* 움직이는 레이어 */}
          <aside
            className={` bg-black aspect-[5/6] w-full max-w-[50%] absolute top-[50%] translate-y-[-50%] transition-all duration-500 flex justify-center items-center ${
              moveLayer ? 'left-0' : 'left-[50%]'
            }`}
          >
            <div
              className={`text-white flex flex-col w-[50%] gap-y-12 absolute top-[5%] transition-all duration-500  ${
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
              <p className={`text-white ${moveLayer ? 'text-left' : 'text-right'}`}>
                제니시수와 함께 새로운 드라이브를 시작하고, 프리미엄 세단의 모든 가능성을 발견해
                보세요. 제니시수는 당신의 프라이드와 함께합니다. 이제 열정을 가득 채우고 달릴 준비가
                되셨나요?
              </p>
              <div className="flex flex-col items-center gap-y-1">
                <p>제니시수 계정이 없으시다면?</p>
                <figure>
                  <FontAwesomeIcon icon={faChevronDown} />
                </figure>
                <span
                  className={`w-full py-2 text-center text-white border border-white cursor-pointer text-2xl font-bold ${
                    moveLayer ? 'left-0' : 'left-[65%]'
                  }`}
                  onClick={() => setMoveLayer(!moveLayer)}
                >
                  {moveLayer ? '로그인' : '회원가입'}
                </span>
              </div>
            </div>
            <article className="absolute bottom-[5%] right-[5%] aspect-[11/5] w-full max-w-[450px]">
              <Image
                src="/images/g90-black-45deg.png"
                fill
                priority
                sizes="100%"
                alt="로그인 레이어 이미지"
                className="absolute top-0 left-0 opacity-90"
              ></Image>
            </article>
          </aside>
        </section>
      </div>
    </>
  );
}
