'use client';

import useLocalStorage from '@/hook/useLocalStorage';
import { Cart, Option, OptionItem, Product } from '@/types/product';
import { useModelStore } from '@/zustand/useModel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef, useState } from 'react';

interface VerticalLayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product | null;
  optionData: Option[];
}

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// 1번레이아웃_중앙 정렬 옵션
export default function VerticalLayout({ params, modelData, optionData }: VerticalLayoutProps) {
  const router = useRouter();
  const optionName = params.option;
  const modelName = modelData?.name || '';
  const initialPrice = modelData?.price || 0;
  const modelOptionData = optionData[0].extra.option[optionName][modelName];

  const [storedValue, setValue] = useLocalStorage<Cart>('cart', {
    model: modelName,
    price: initialPrice
  });

  const defaultMapData = {
    item: storedValue.option?.[optionName]?.name || modelOptionData[0].topText,
    price: storedValue.option?.[optionName]?.price || modelOptionData[0].price
  };
  let defaultImage = SERVER + modelOptionData[0].image?.path || '';
  defaultImage = storedValue.option?.[optionName]?.detailImage || defaultImage;
  const clickedOptionRef = useRef<Map<string, string | number>>(new Map(Object.entries(defaultMapData)));

  const handleOptionClick = (optionName: string, optionIndex: number, optionPrice: number) => {
    clickedOptionRef.current.clear();
    clickedOptionRef.current.set('item', optionName);
    clickedOptionRef.current.set('price', optionPrice);
    const newImage = SERVER + modelOptionData[optionIndex].image?.path;
    const newPrice = optionPrice === 0 ? storedValue.price : storedValue.price + optionPrice;
    setOptionState({
      node: generateOptionButton(),
      prevPrice: optionState.newPrice,
      newPrice: newPrice,
      imageSource: newImage,
    });
  };

  const isOptionActive = (option: string) =>
    clickedOptionRef.current.get('item') === option ? 'text-white' : 'text-[#666666]';

  const generateOptionButton = (): ReactNode => {
    const lastIndex = modelOptionData.length - 1;
    return modelOptionData.map((item: OptionItem, index: number) => {
      const { title, topText, price } = item;
      const isBolder = index === lastIndex ? 'border-b-[1px]' : '';
      return (
        <tr
          key={topText + index}
          onClick={() => handleOptionClick(topText, index, price)}
          className={`flex items-center text-[30px] ${isOptionActive(topText)} gap-x-[86px] border-t-[1px] ${isBolder} border-[#a4a4a4] py-[15px] pl-[15px] cursor-pointer`}
        >
          <td className="font-Hyundai-sans text-[22px]">
            {topText}
          </td>
          <td className="font-Hyundai-sans text-[22px]" data-value="">
            + {price.toLocaleString('ko-KR')} 원
          </td>
        </tr>
      );
    });
  };

  const [optionState, setOptionState] = useState<{
    node: ReactNode;
    prevPrice: number;
    newPrice: number;
    imageSource: string;
  }>({
    node: generateOptionButton(),
    prevPrice: storedValue.price,
    newPrice: storedValue.price,
    imageSource: defaultImage,
  });

  const { steps } = useModelStore();
  const currentStep = steps.indexOf(optionName);
  const nextStep = steps[currentStep + 1];
  const prevStep = steps[currentStep - 1] === 'detail' ? '' : steps[currentStep - 1];

  const clickButton = (e: React.MouseEvent<HTMLButtonElement>, direction?: string) => {
    e.preventDefault();
    const step = direction === 'prev' ? prevStep : nextStep;
    router.push(`/models/${params.model}/${step}`);
    setValue({
      model: modelName,
      price: optionState.newPrice,
      option: {
        ...storedValue.option,
        [optionName]: {
          name: clickedOptionRef.current!.get('item') as string,
          price: clickedOptionRef.current!.get('price') as number,
          detailImage: optionState.imageSource
        }
      }
    });
  };

  return (
    <>
      <section className="h-screen grid grid-cols-[500px_auto] gap-x-[4rem]">
        <div></div>
        <article className="w-[80%] grid grid-cols-[auto] grid-rows-[minmax(auto,_500px)_50px_200px] items-center ">
          <figure className="max-h-[500px] aspect-[2/1] relative ">
            <Image src={optionState.imageSource} fill sizes='100%' priority className='absolute top-0 left-[0%]' style={{objectFit:"contain"}} alt="" />
          </figure>
          <h4 className="justify-self-center text-[16px]">상기 이미지는 차량의 대표 이미지로 적용되어 있습니다.</h4>
          <article className="h-full overflow-scroll">
            <table className="w-full">
              <tbody>
                {/* 옵션 항목 렌더링 */}
                {optionState.node}
              </tbody>
            </table>
          </article>
        </article>
        <div className="grid grid-cols-[60px_60px] grid-rows-[50px] gap-x-[20px] absolute top-[620px] left-[80px]">
          <button className='bg-black border-[0.5px] border-white w-full h-full' onClick={(e) => clickButton(e, 'prev')}>
            <figure className='relative w-full h-[75%]'>
              <Image className='absolute top-0 left-0' fill sizes='100%' src="/images/btn_prev.png" alt="버튼 좌측 이미지" style={{objectFit:"contain"}}/>
            </figure>
          </button>
          <button className='bg-white w-full h-full' onClick={clickButton}>
            <figure className='relative w-full h-[75%]'>
              <Image className='absolute top-0 left-0' fill sizes='100%' src="/images/btn_next_b.png" alt="버튼 좌측 이미지" style={{objectFit:"contain"}}/>
            </figure>
          </button>
      </div>

        <article className="w-full absolute bottom-[120px] flex items-end z-10 justify-center ">
          <div className="absolute right-12">
            <aside className="font-Hyundai-sans border-[1px] border-[#666666] flex flex-col justify-center px-[30px] pt-[10px]">
              <p className="text-[15px] text-[#a4a4a4]">예상가격</p>
              <span className="text-[30px] font-bold mt-[-10px]">
                {optionState.newPrice.toLocaleString('ko-KR')}
                <span className="text-[20px] align-middle"> 원</span>
              </span>
            </aside>
          </div>
        </article>
      </section>
    </>
  );
}
