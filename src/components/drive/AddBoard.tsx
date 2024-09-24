'use client';

import Link from 'next/link';
import Submit from '../Submit';
import { addPost } from '@/data/actions/postAction';
import { fetchVehicles } from '@/data/fetch/productFetch';
import Input from './Input';
import { useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { PostForm } from '@/types';
import { useRouter } from 'next/navigation';
import InputError from '../InputError';
import { useModelStore } from '@/zustand/useModel';

export default function AddBoard({ params, isMain }: { params: { boards: string }, isMain: boolean }) {
  const isWarningMargin = (errors: FieldError | undefined) =>  errors ?  '20px' : `calc(20px + 24px)`;
  const { places } = useModelStore();
  const router = useRouter();
  const setIsMain = (isMain:boolean) => isMain ? 'text-white' : 'text-black';
  const { register, handleSubmit, formState: { errors, isLoading, isSubmitted }, setError } = useForm<PostForm>();
  
  const [modelNames, setModelNames] = useState<string[]>([
    'G90 BLACK',
    'G90 LONG WHEEL BASE',
    'G90'
  ]);

  const post = async (postData: PostForm) => {
    // 프로그래밍 방식으로 서버액션 호출
    const resData = await addPost(postData);
    console.log(resData);
    if(resData.ok) {
      alert(`게시글이 작성되었습니다.`);
      router.push(`/${params.boards}`);
    } else if (!resData.ok) { // API 서버의 에러 메시지 처리
      alert(resData.message);
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchVehicles();
      const models = res.map(vehicle => vehicle.name.split('-').join(' ').toUpperCase());
      setModelNames(models);
    };
    fetch();
  }, []);

  return (
    <section className="mb-24 p-4 max-[1366px]:mb-0">
      <form>
        <input 
          type="hidden" 
          value={params.boards}
          // name="boardName" 
          { ...register('boardName') }
        />

        <div className="ev5_new_wrap">
          <div className="flex gap-16 max-[1366px]:gap-0">
            {(params.boards === 'qna' || params.boards === 'info') && (
              <Input id='title' placeholder='제목을 남겨주세요' register={register} errors={errors} isWarningMargin={isWarningMargin} />
            )}
          </div>
          <div className="flex gap-16 max-[1366px]:gap-0">
            <Input id='name' placeholder='성함을 남겨주세요' register={register} errors={errors}  isWarningMargin={isWarningMargin} />
            <Input id='phone' placeholder='연락처를 남겨주세요 (ex. 010-0000-0000)' register={register} errors={errors}  isWarningMargin={isWarningMargin} />
          </div>

          {params.boards === 'drive' && (
            <div className="flex gap-16 max-[1366px]:gap-0">
              <div className={`flex-1 mb-[${isWarningMargin(errors.title)}]`}>
                <label className="block text-lg mb-2" htmlFor="model">
                  MODEL
                </label>
                <select
                  id="title"
                  className={`w-full p-4 border bg-transparent ${setIsMain(isMain)} border-gray-300 focus:outline-none`}
                  defaultValue="model"
                  // name="title"
                  { ...register('title', {
                    required: 'MODEL을 선택하세요.',
                    pattern: {
                      value: /^(?!.*model).+$/, // (?!...) 부정형 전방탐색: 특정 패턴이 뒤따르지 않는 경우
                      message: '입력칸을 클릭하여 MODEL를 선택하세요.'
                    }})
                  }
                >
                  <option value="model" disabled hidden>
                    시승체험을 원하는 모델을 선택해주세요
                  </option>
                  {modelNames.map((name) => 
                    <option key={name} value={`${name}`}>{name}</option>
                  )}
                </select>
                <InputError target={errors.title} />
              </div>

              <div className={`flex-1 mb-[${isWarningMargin(errors.address)}]`}>
                <label className="block text-lg mb-2" htmlFor="address">
                  ADDRESS
                </label>
                <select
                  id="address"
                  className={`w-full p-4 border bg-transparent ${setIsMain(isMain)} border-gray-300 focus:outline-none`}
                  defaultValue="address"
                  // name="address"
                  { ...register('address', {
                    required: 'ADDRESS를 선택하세요.',
                    pattern: {
                      value: /^(?!.*address).+$/, // (?!...) 부정형 전방탐색: 특정 패턴이 뒤따르지 않는 경우
                      message: '입력칸을 클릭하여 ADDRESS를 선택하세요.'
                    }})
                  }
                >
                  <option value="address" disabled hidden>
                    가까운 전시장을 찾아 선택해주세요
                  </option>
                  { places.map((place, idx) => 
                    <option key={place.name + idx} value={place.name}>{place.name}</option>
                  )}
                </select>
                <InputError target={errors.address} />
              </div>
            </div>
          )}

          <Input id='content' placeholder='원하는 상담내용을 입력해주세요' register={register} errors={errors} textColor={setIsMain(isMain)}  isWarningMargin={isWarningMargin} />

          <div className="flex justify-center py-8 gap-x-[30px] max-[1366px]:pt-4 max-[1366px]:pb-0">
            {isMain 
              ? (
                <Submit 
                  onClick={handleSubmit(post)}
                  className={`mainBtn kr ${setIsMain(isMain)} border-[#aaa]`}>
                    등록
                </Submit>
              ):( 
                <>
                  <Link
                    href={`/${params.boards}`}
                    className={`mainBtn kr text-black border-[#aaa] hover:text-white hover:bg-black`}>취소
                  </Link>
                  <Submit 
                    onClick={handleSubmit(post)}
                    className={`mainBtn kr ${setIsMain(isMain)} font-bold border-[#aaa] hover:border-[transparent] hover:bg-black hover:text-white`}>등록</Submit>
                </>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
