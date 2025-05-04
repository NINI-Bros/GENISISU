'use client';

import InputError from '@/components/InputError';
import Submit from '@/components/Submit';
import { signup } from '@/data/actions/userAction';
import { UserForm } from '@/types';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function JoinSignupForm({ moveState }: { moveState: boolean }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<UserForm>();

  const addUser = async (formData: UserForm) => {
    const userData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      console.log(key, value);
      if (key !== 'attach') {
        userData.append(key, value as string);
      }
    });
    if (formData.attach) {
      userData.append('attach', formData.attach[0]);
    }

    const resData = await signup(userData);

    if (resData.ok) {
      alert(`${resData.item.name}님 회원가입을 환영합니다.`);
      router.push('/');
    } else {
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
        moveState ? 'right-0' : 'right-[100%]'
      } top-0 px-[10%] py-[5%] w-full h-full flex flex-col justify-between bg-white signUpForm`}
    >
      <div className="flex justify-center ">
        <h2 className="text-[30px] font-bold">회원가입</h2>
      </div>
      <form onSubmit={handleSubmit(addUser)}>
        <div className="mb-4 signInputWrap">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            className="w-full px-3 py-2 bg-[#f0f0f0] border-b focus:outline-none focus:border-b-gray-700"
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
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2 bg-[#f0f0f0] border-b focus:outline-none focus:border-b-gray-700"
            {...register('password', {
              required: '비밀번호를 입력하세요.',
            })}
          />
          <InputError target={errors.password} />
        </div>
        <div className="mb-4 signInputWrap">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            className="w-full px-3 py-2 bg-[#f0f0f0] border-b focus:outline-none focus:border-b-gray-700"
            {...register('name', {
              required: '이름을 입력하세요.',
              minLength: {
                value: 2,
                message: '이름을 2글자 이상 입력하세요.',
              },
            })}
          />
          <InputError target={errors.name} />
        </div>
        <div className="mb-14">
          <label className="block text-gray-700 mb-2" htmlFor="attach">
            프로필 이미지
          </label>
          <input
            type="file"
            id="attach"
            accept="image/*"
            placeholder="이미지를 선택하세요"
            className="w-full px-3 py-2 bg-[#f0f0f0] border-b focus:outline-none focus:border-b-gray-700"
            {...register('attach')}
          />
        </div>

        <div className=" grid grid-cols-[3fr_1fr] grid-rows-[50px_auto] gap-x-[20px] gap-y-3 justify-center items-center">
          <Submit className="btnBasic w-full h-full px-[5%] py-[1%]">회원가입</Submit>
          <Link
            href="/"
            className="btnBasic w-full h-full px-[5%] py-[1%]"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            초기화
          </Link>
        </div>
      </form>

      <div className="text-center flex justify-center gap-x-1 text-gray-500 text-sm">
        <figure>
          <FontAwesomeIcon icon={faAnglesLeft} />
        </figure>
        <Link href="/accept?type=login" className=" underline ">
          GENISISU 로그인
        </Link>
      </div>
    </div>
  );
}
