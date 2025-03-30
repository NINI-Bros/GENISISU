'use client';

import InputError from '@/components/InputError';
import Submit from '@/components/Submit';
import { signInWithCredentials } from '@/data/actions/userAction';
import { UserForm, UserLoginForm } from '@/types';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import React, { Suspense } from 'react';
import JoinSnsButton from '../accept/JoinSnsButton';
import { TargetArea } from '@/components/Spinner';

export default function LoginForm() {
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
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400"
          // name="email"
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
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400"
          // name="password"
          {...register('password', {
            required: '비밀번호를 입력하세요.',
          })}
        />
        <InputError target={errors.password} />
        <Link href="#" className="block mt-6 ml-auto text-gray-500 text-sm hover:underline">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
      <div className="flex gap-x-[17px] mt-10 justify-center items-center">
        <Submit
          className="btnBasic px-[5%] py-[1%] hover:underline cursor:pointer"
          onClick={handleSubmit(login)}
        >
          로그인
        </Submit>
        <Link href="/signup" className="btnBasic px-[5%] py-[1%] hover:underline">
          회원가입
        </Link>
      </div>
      <div className="flex items-center mt-8 mb-5">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 text-gray-500 text-sm">간편 로그인</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <Suspense fallback={<TargetArea />}>
        <JoinSnsButton />
      </Suspense>
    </form>
  );
}
