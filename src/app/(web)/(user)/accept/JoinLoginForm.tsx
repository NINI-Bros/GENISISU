'use client';

import InputError from '@/components/InputError';
import Submit from '@/components/Submit';
import { signInWithCredentials } from '@/data/actions/userAction';
import { UserForm, UserLoginForm } from '@/types';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import React, { Suspense } from 'react';
import JoinSnsButton from './JoinSnsButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { TargetArea } from '@/components/Spinner';

export default function JoinLoginForm({ moveState }: { moveState: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitted },
    setError,
  } = useForm<UserForm>({
    defaultValues: {
      email: 'hyundai-morgans@genisisu.com',
      password: '11111111',
    },
  });

  const login = async (loginData: UserLoginForm) => {
    // 프로그래밍 방식으로 서버액션 호출
    // 로그인 성공시 리턴값 없음
    const resData = await signInWithCredentials(loginData);
    if (!resData) {
      alert('로그인 되었습니다.');
      // router.push('/');
    } else if (!resData.ok) {
      // API 서버의 에러 메시지 처리
      if ('errors' in resData) {
        resData.errors.forEach((error) => setError(error.path, { message: error.msg }));
      } else if (resData.message) {
        alert(resData.message);
      }
    }
  };

  return (
    <div
      className={`absolute transition-all duration-500 ${
        moveState ? 'left-[100%]' : 'left-0'
      } top-0 px-[10%] py-[5%] w-full h-full flex flex-col justify-between bg-white`}
    >
      <div className="flex justify-center">
        <h2 className="text-[30px] font-bold">로그인</h2>
      </div>
      <form>
        <div className="mb-4 signInputWrap">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            이메일
          </label>
          <input
            id="login_email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="w-full px-3 py-2 border-b bg-[#f0f0f0] focus:outline-none focus:border-b-gray-700"
            {...register('email', {
              required: '이메일을 입력하세요.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식이 아닙니다.',
              },
            })}
          />
          <InputError target={errors.email} />
        </div>
        <div className="mb-4 signInputWrap">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            id="login_password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2 border-b bg-[#f0f0f0] focus:outline-none focus:border-b-gray-700"
            {...register('password', {
              required: '비밀번호를 입력하세요.',
            })}
          />
          <InputError target={errors.password} />
        </div>
        <div className="flex gap-x-[17px] mt-8 justify-center items-center">
          <Submit
            className="btnBasic w-full h-[50px] px-[5%] py-[1%] hover:underline cursor:pointer"
            onClick={handleSubmit(login)}
          >
            로그인
          </Submit>
        </div>
        <article className="mt-20">
          <div className="flex items-center mt-8 mb-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-gray-500 text-sm">간편 로그인</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <Suspense fallback={<TargetArea />}>
            <JoinSnsButton />
          </Suspense>
        </article>
      </form>

      {/* <div className="text-center flex justify-center gap-x-1 text-gray-500 text-sm"> */}
      <div className="text-center flex justify-center gap-x-1 text-gray-500 text-sm">
        <Link href="/accept?type=signup" className="underline ">
          GENISISU 회원가입
        </Link>
        <figure>
          <FontAwesomeIcon icon={faAnglesRight} />
        </figure>
      </div>
    </div>
  );
}
