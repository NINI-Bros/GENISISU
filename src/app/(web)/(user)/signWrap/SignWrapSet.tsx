'use client';

import Button from '@/components/Button';
import JoinLoginForm from './JoinLoginForm';
import JoinSignupForm from './JoinSignupForm';
import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

export default function SignWrapSet() {
  const [moveLayer, setMoveLayer] = useState(false);
  return (
    <>
      <div className="bg-white w-full h-[calc(100vh-60px)] flex items-center justify-center ">
        <section className="relative justify-center w-full aspect-[5/3] max-w-[1200px] border border-[#efefef] bg-white drop-shadow-2xl">
          <article className="absolute w-[50%] top-0 left-0 h-full overflow-hidden">
            <JoinLoginForm moveState={moveLayer} moveSetFn={setMoveLayer} />
          </article>
          <article className="absolute w-[50%] top-0 right-0 h-full overflow-hidden">
            <JoinSignupForm moveState={moveLayer} />
          </article>

          {/* 움직이는 레이어 */}
          <aside
            className={` bg-black aspect-[5/6] w-full max-w-[580px] absolute top-[50%] translate-y-[-50%] transition-all duration-500 flex justify-center items-center ${
              moveLayer ? 'left-[10px]' : 'left-[calc(50%+10px)]'
            }`}
          >
            <div
              className={`flex flex-col gap-y-[10px] absolute top-[5%] transition-all duration-500 ${
                moveLayer ? 'left-[5%]' : 'left-[50%]'
              }`}
            >
              <h2 className="font-[Hyundai] text-white tracking-[5px] text-4xl">
                GEN
                <span className="px-[0.1em]">I</span>S<span className="px-[0.1em]">I</span>
                SU
              </h2>
              <span
                className={`max-w-[max-content] text-white border-none cursor-pointer text-2xl font-bold transition-all duration-500 absolute top-[40px] ${
                  moveLayer ? 'left-0' : 'left-[50%]'
                }`}
                onClick={() => setMoveLayer(!moveLayer)}
              >
                <span>
                  {moveLayer ? (
                    <div className="flex gap-x-[10px]">
                      <span className="underline underline-offset-8">로그인</span>
                      <figure>
                        <FontAwesomeIcon icon={faAnglesRight} />
                      </figure>
                    </div>
                  ) : (
                    <div className="flex gap-x-[10px]">
                      <figure>
                        <FontAwesomeIcon icon={faAnglesLeft} />
                      </figure>
                      <span className="underline underline-offset-8">회원가입</span>
                    </div>
                  )}
                </span>
              </span>
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
