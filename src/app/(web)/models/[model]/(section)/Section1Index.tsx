'use client';

import Link from 'next/link';
import { ImageViewer } from '../ImageViewer';
import { Cart, Product } from '@/types/product';
import { useModelStore } from '@/zustand/useModel';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hook/useLocalStorage';
import extractTitle from '@/data/extractTitle';
import Button from '@/components/Button';
import { useEffect } from 'react';

interface Section1IndexProps {
  modelIndex: string;
  modelData: Product | null;
  imageArray: string[];
}

export default function Section1Index({ modelIndex, modelData, imageArray }: Section1IndexProps) {
  const { steps } = useModelStore();
  const initialValue = {
    model: modelData?.name || '',
    price: modelData?.price || 0
  }
  const [storedValue, setValue] = useLocalStorage<Cart>('cart', 
    initialValue
  );
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(initialValue));
  }, []);
  const router = useRouter();
  const modelName = modelData ? modelData.name : storedValue.model;
  const modelPrice = modelData ? Number(modelData.price) : storedValue.price;

  const [title, subtitle] = extractTitle(modelName);
  const uppercaseName = title.toUpperCase() + ' ' + subtitle.toUpperCase();

  const clickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextStep = `/models/${modelIndex}/${steps[1]}`; // 'engine'
    setValue({
      model: modelName,
      price: modelPrice,
    });
    router.push(nextStep);
  };

  return (
    <section className="w-screen h-screen grid grid-cols-[500px_auto] gap-x-[4rem] bg-black z-10">
      {/* 이미지 영역 */}
      <div></div>
      <article className="w-[80%] grid grid-cols-1 grid-rows-[minmax(300px,_500px)_80px] justify-items-center mt-[80px] gap-y-[20px]">
        <figure className="w-full max-h-[500px] min-h-[300px] aspect-[2/1] overflow-hidden col-span-3 self-center">
          {modelData && <ImageViewer images={imageArray} />}
          {/* <img src="/images/detail/defaultCar.png" className="object-cover h-[100%] scale-150 " alt="" /> */}
        </figure>
        <div className='grid grid-cols-[auto_1fr_1fr] grid-rows-[1fr_2fr] gap-y-[10px] gap-x-[3rem]'>
          <h2 className="text-[50px] font-Hyundai-sans row-span-2 self-center justify-self-center px-[10px] font-black">{modelName && uppercaseName}</h2>
          <h3 className="text-[30px] text-[#a4a4a4] col-span-2 justify-self-start">
            시작가격{' '}
            <span className="text-white font-Hyundai-sans">{modelPrice.toLocaleString('ko-KR')}</span>
            <span className="text-[20px] text-white"> 원</span>
          </h3>
          <div className="flex gap-x-[20px] mt-[0px] col-span-2">
            {/* <button className="w-[320px] h-[70px]">시승신청</button> */}
            <Link
              href={{ pathname: '/info', query: { model: modelName } }}
              className="w-[150px] h-[37px] font-thin border-2 border-white flex items-center justify-center"
            >
              시승신청
            </Link>
            <button className='mainBtn w-[150px] h-[37px] font-thin border-2 border-white bg-white text-black text-[16px]' style={{fontFamily:"Pretendard"}} onClick={clickNext}>
              다음
            </button>
            {/* <Button color="black" bgColor="white" size="custom" onClick={clickNext}>
              다음
            </Button> */}
          </div>
        </div>
        
      </article>
    </section>
  );
}
