'use client';

import Link from 'next/link';
import Submit from '../Submit';
import { addPost } from '@/data/actions/postAction';
import { fetchVehicles } from '@/data/fetch/productFetch';
import Input from './Input';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostForm } from '@/types';


export default function AddBoard({ params, isMain }: { params: { boards: string }, isMain: boolean }) {
  const setIsmain = (isMain:boolean) => isMain ? 'text-white' : 'text-black';
  const { register, handleSubmit, formState: { errors, isLoading, isSubmitted }, setError } = useForm<PostForm>();
  
  const [modelNames, setModelNames] = useState<string[]>([
    'G90 BLACK',
    'G90 LONG WHEEL BASE',
    'G90'
  ]);

  const post = async (postData: PostForm) => {
    // 프로그래밍 방식으로 서버액션 호출
    // 게시글 작성 시 리턴값 없음
    const resData = await addPost(postData);
    if(!resData) {
      alert(`게시글이 작성되었습니다.`);
      // router.push(`/${params.boards}`);
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
    <section className="mb-24 p-4">
      <form>
        <input type="hidden" name="boardName" value={params.boards} />

        <div className="ev5_new_wrap">
          <div className="flex gap-16">
            {(params.boards === 'qna' || params.boards === 'info') && (
              <Input id='title' placeholder='제목을 남겨주세요' />
            )}
          </div>
          <div className="flex gap-16">
            <Input id='name' placeholder='성함을 남겨주세요' />
            <Input id='phone' placeholder='연락처를 남겨주세요' />
          </div>

          {params.boards === 'drive' && (
            <div className="flex gap-16">
              <div className="flex-1 my-4 mb-10">
                <label className="block text-xl mb-2" htmlFor="model">
                  MODEL
                </label>

                <select
                  id="title"
                  name="title"
                  className={`w-full p-5 border bg-transparent ${setIsmain(isMain)} border-gray-300 focus:outline-none`}
                  defaultValue="model"
                >
                  <option value="model" disabled hidden>
                    시승체험을 원하는 모델을 선택해주세요
                  </option>
                  {modelNames.map((name) => 
                    <option key={name} value={`${name}`}>{name}</option>
                  )}
                </select>
              </div>

              <div className="flex-1 my-4 mb-10">
                <label className="block text-xl mb-2" htmlFor="address">
                  ADDRESS
                </label>

                <select
                  id="address"
                  name="address"
                  className={`w-full p-5 border bg-transparent ${setIsmain(isMain)} border-gray-300 focus:outline-none`}
                  defaultValue="address"
                >
                  <option value="address" disabled hidden>
                    가까운 전시장을 찾아 선택해주세요
                  </option>
                  <option value="재니시수연 강남">재니시수연 강남</option>
                  <option value="재니시수연 수지">재니시수연 수지</option>
                  <option value="재니시수연 스튜디오 하남">재니시수연 스튜디오 하남</option>
                  <option value="재니시수연 스튜디오 안성">재니시수연 스튜디오 안성</option>
                  <option value="재니시수연 스튜디오 서울">재니시수연 스튜디오 서울</option>
                  <option value="재니시수연 스튜디오 고양">재니시수연 스튜디오 고양</option>
                </select>
              </div>
            </div>
          )}

          <label className="block text-xl mt-4 mb-2" htmlFor="content">
            DETAILS
          </label>

          <textarea
            id="content"
            rows={15}
            placeholder="원하는 상담내용을 입력해주세요"
            className={`w-full p-5 resize-none border border-gray-300 bg-transparent ${setIsmain(isMain)} h-[200px]`}
            name="content"
          ></textarea>

          <div className="flex justify-center my-6 gap-x-[30px]">
            {isMain 
            ? <Submit className={`mainBtn kr ${setIsmain(isMain)} border-[#aaa]`}>등록</Submit>
            : 
            <>
              <Link
                href={`/${params.boards}`}
                className={`mainBtn kr text-black border-[#aaa] hover:text-white hover:bg-black`}>취소
              </Link>
              <Submit 
                onClick={handleSubmit(post)}
                className={`mainBtn kr ${setIsmain(isMain)} font-bold border-[#aaa] hover:border-[transparent] hover:bg-black hover:text-white`}>등록</Submit>
            </>
            }
            
          </div>
        </div>
      </form>
    </section>
  );
}
