'use client';

import Button from '@/components/Button';
import useLocalStorage from '@/hook/useLocalStorage';
import { Cart, Option, OptionDetail, OptionItem, Product } from '@/types/product';
import { useModelStore } from '@/zustand/useModel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
interface OptionReadyLayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product | null;
  optionData: Option[];
} 


export default function OptionReadyLayout ({ params, modelData, optionData }: OptionReadyLayoutProps) {

  const router = useRouter();
  const optionName = params.option;
  const modelName = modelData?.name || '';
  const initialPrice = modelData?.price || 0;
  const modelOptionData = optionData[0].extra.option[optionName][modelName];

  const [storedValue, setValue] = useLocalStorage<Cart>('cart', {
    model: modelName,
    price: initialPrice,
  });

  const [optionState, setOptionState] = useState<{
    // node: ReactNode;
    // prevPrice: number;
    newPrice: number;
    // imageSource: string;
    // optionText: string;
  }>({
    // node: null,
    // prevPrice: storedValue.price,
    newPrice: storedValue.price,
    // imageSource: defaultItemImage,
    // optionText: defaultItemName,
  });

  const { steps } = useModelStore();
  const currentStep = steps.indexOf(optionName);
  const nextStep = steps[currentStep + 1];
  const prevStep = steps[currentStep - 1] === 'detail' ? '' : steps[currentStep - 1];

  const clickButton = (e: React.MouseEvent<HTMLButtonElement>, direction?: string) => {
    e.preventDefault();
    const step = direction === 'prev' ? prevStep : nextStep;
    router.push(`/models/${params.model}/${step}`);
    // setValue({
    //   model: modelName,
    //   price: optionState.newPrice,
    // });
  };

  return(
    <section className="h-screen relative flex justify-center">
      <article className="w-[1200px] h-[500px]  mt-[200px] flex justify-center items-center">
        <h3 className="text-[40px]">준비중 입니다.</h3>
      </article>

      <div className="grid grid-cols-[60px_60px] grid-rows-[50px] gap-x-[20px] absolute top-[620px] left-[80px]">
            {/* <Button size="custom" onClick={(e) => clickButton(e, 'prev')}>
              이전
            </Button>
            <Button color="black" bgColor="white" size="custom" onClick={clickButton}>
              다음
            </Button> */}
            <button className='bg-black border-[0.5px] border-white w-full h-full' onClick={(e) => clickButton(e, 'prev')}>
              <figure className='relative w-full h-[75%]'>
                <Image className='absolute top-0 left-0' src="/images/btn_prev.png" alt="버튼 좌측 이미지" fill style={{objectFit:"contain"}}/>
              </figure>
            </button>
            <button className='bg-white w-full h-full' 
            onClick={clickButton}
            >
              <figure className='relative w-full h-[75%]'>
                <Image className='absolute top-0 left-0' src="/images/btn_next_b.png" alt="버튼 좌측 이미지" fill style={{objectFit:"contain"}}/>
              </figure>
            </button>
        </div>

        <article className="w-full absolute left-0 bottom-[120px] flex items-end z-10 justify-center ">
          <div className="absolute right-12">
            <aside className="font-Hyundai-sans border-[1px] border-[#666666] flex flex-col justify-center px-[30px] pt-[10px]">
              <p className="text-[15px] text-[#a4a4a4]">예상 가격</p>
              <span className="text-[30px] font-bold mt-[-10px]">
                {optionState.newPrice.toLocaleString('ko-KR')}
                <span className="text-[20px]">원</span>
              </span>
            </aside>
          </div>
        </article>
    </section>
  )
}