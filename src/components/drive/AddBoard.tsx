'use client';

import Link from 'next/link';
import Submit from '../Submit';
import { createPost, updatePost } from '@/data/actions/postAction';
import { fetchVehicles } from '@/data/fetch/productFetch';
import Input from './Input';
import { useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { PostForm } from '@/types';
import { notFound } from 'next/navigation';
import InputError from '../InputError';
import { useModelStore } from '@/zustand/useModel';
import { fetchPost } from '@/data/fetch/postFetch';

type InputKeyType = keyof Pick<PostForm, 'title' | 'extra' | 'phone' | 'address' | 'content'>;

export default function AddBoard({
  params,
  isMain = false,
  isEdit = false,
}: {
  params: { boards: string; id?: string };
  isMain?: boolean;
  isEdit?: boolean;
}) {
  const isWarningMargin = (fieldError: FieldError | undefined) => (fieldError ? 'mb-1' : 'mb-7');
  const { places } = useModelStore();
  const textColor = isMain ? 'text-white' : 'text-black';
  const isBbs = isMain ? '' : 'bbs';
  const {
    register,
    setValue: setFormValue,
    watch,
    handleSubmit,
    formState: { errors, isLoading, isSubmitted },
  } = useForm<PostForm>();

  const [modelNames, setModelNames] = useState<string[]>([
    'G90 BLACK',
    'G90 LONG WHEEL BASE',
    'G90',
  ]);

  const addPost = async (postData: PostForm) => {
    // 프로그래밍 방식으로 서버액션 호출
    const resData = await createPost(postData);
    console.log(resData);
    if (resData.ok) {
      alert(`게시글이 작성되었습니다.`);
    } else if (!resData.ok) {
      // API 서버의 에러 메시지 처리
      alert(resData.message);
    }
  };

  const editPost = async (postData: PostForm) => {
    // 프로그래밍 방식으로 서버액션 호출
    const resData = await updatePost(postData);
    console.log(resData);
    if (resData.ok) {
      alert(`게시글이 수정되었습니다.`);
    } else if (!resData.ok) {
      // API 서버의 에러 메시지 처리
      alert(resData.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const resVehicle = await fetchVehicles();
      const models = resVehicle.map((vehicle) => vehicle.name.split('-').join(' ').toUpperCase());
      setModelNames(models);
      if (isEdit) {
        const resPost = await fetchPost(params.id!);
        // console.log(resPost);
        if (resPost === null) notFound();
        const inputKeyArray = ['title', 'extra', 'phone', 'address', 'content'];
        Object.keys(resPost)
          .filter((key) => inputKeyArray.includes(key))
          .forEach((key) => {
            let inputKey: InputKeyType = key as InputKeyType;
            let inputValue = '';
            if (inputKey === 'extra') {
              inputValue = resPost.extra!.name;
            } else if (inputKey === 'title' && params.boards === 'drive') {
              inputValue = resPost.title.replace(' 차량 시승 신청합니다.', '');
            } else {
              inputValue = resPost[inputKey];
            }
            setFormValue(inputKey, inputValue);
          });
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id as keyof PostForm;
    setFormValue(field, e.target.value);
  };

  const values = watch();

  return (
    <section className="mb-24 p-4 max-[1366px]:mb-0 max-[1366px]:px-[7%] max-[1366px]:h-full">
      <form>
        <input
          type="hidden"
          value={params.boards}
          // name="boardName"
          {...register('boardName')}
        />
        <input type="hidden" value={params.id} {...register('id')} />

        <div className="ev5_new_wrap bbs_wrap">
          <div className="flex gap-16 max-[1366px]:gap-0 bbs_child">
            {(params.boards === 'qna' || params.boards === 'info') && (
              <Input
                id="title"
                placeholder="제목을 남겨주세요"
                value={values['title'] || ''}
                register={register}
                errors={errors}
                isWarningMargin={isWarningMargin}
                handleChange={handleChange}
              />
            )}
          </div>
          <div className="flex gap-16 max-[1366px]:gap-0 bbs_child">
            <Input
              id="extra"
              placeholder="성함을 남겨주세요"
              value={values['extra'] || ''}
              register={register}
              errors={errors}
              isWarningMargin={isWarningMargin}
              handleChange={handleChange}
            />
            <Input
              id="phone"
              placeholder="연락처를 남겨주세요 (ex. 010-0000-0000)"
              value={values['phone'] || ''}
              register={register}
              errors={errors}
              isWarningMargin={isWarningMargin}
              handleChange={handleChange}
            />
          </div>

          {params.boards === 'drive' && (
            <div className="flex gap-16 max-[1366px]:gap-0 bbs_child">
              <div className={`flex-1 ${isWarningMargin(errors.title)}`}>
                <label className="block text-lg mb-2" htmlFor="model">
                  MODEL
                </label>
                <select
                  id="title"
                  className={`w-full p-4 border bg-transparent ${textColor} border-gray-300 focus:outline-none`}
                  defaultValue={values['title'] || 'model'}
                  // name="title"
                  {...register('title', {
                    required: 'MODEL을 선택하세요.',
                    pattern: {
                      value: /^(?!.*model).+$/, // (?!...) 부정형 전방탐색: 특정 패턴이 뒤따르지 않는 경우
                      message: '입력칸을 클릭하여 MODEL를 선택하세요.',
                    },
                    onChange: handleChange,
                  })}
                >
                  <option value="model" disabled hidden>
                    시승체험을 원하는 모델을 선택해주세요
                  </option>
                  {modelNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <InputError target={errors.title} />
              </div>

              <div className={`flex-1 ${isWarningMargin(errors.address)}`}>
                <label className="block text-lg mb-2" htmlFor="address">
                  ADDRESS
                </label>
                <select
                  id="address"
                  className={`w-full p-4 border bg-transparent ${textColor} border-gray-300 focus:outline-none`}
                  defaultValue={values['address'] || 'address'}
                  // name="address"
                  {...register('address', {
                    required: 'ADDRESS를 선택하세요.',
                    pattern: {
                      value: /^(?!.*address).+$/, // (?!...) 부정형 전방탐색: 특정 패턴이 뒤따르지 않는 경우
                      message: '입력칸을 클릭하여 ADDRESS를 선택하세요.',
                    },
                    onChange: handleChange,
                  })}
                >
                  <option value="address" disabled hidden>
                    가까운 전시장을 찾아 선택해주세요
                  </option>
                  {places.map((place, idx) => (
                    <option key={place.name + idx} value={place.name}>
                      {place.name}
                    </option>
                  ))}
                </select>
                <InputError target={errors.address} />
              </div>
            </div>
          )}

          <Input
            id="content"
            placeholder="원하는 상담내용을 입력해주세요"
            register={register}
            value={values['content'] || ''}
            errors={errors}
            textColor={textColor}
            isWarningMargin={isWarningMargin}
            handleChange={handleChange}
          />

          <div className="flex justify-center py-8 gap-x-[30px] inputBtn">
            {isEdit ? (
              <>
                <Link href={`/${params.boards}/${params.id}`} className="mainBtn bbs kr">
                  취소
                </Link>
                <Submit onClick={handleSubmit(editPost)} className={`mainBtn kr ${isBbs}`}>
                  수정
                </Submit>
              </>
            ) : (
              <>
                {!isMain && (
                  <Link href={`/${params.boards}`} className="mainBtn bbs kr">
                    취소
                  </Link>
                )}
                <Submit onClick={handleSubmit(addPost)} className={`mainBtn kr ${isBbs}`}>
                  등록
                </Submit>
              </>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
