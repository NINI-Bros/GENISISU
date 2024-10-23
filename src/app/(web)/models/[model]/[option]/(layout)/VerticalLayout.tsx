'use client';

import useLocalStorage from '@/hook/useLocalStorage';
import { Cart, OptionItem } from '@/types/product';
import { useModelStore } from '@/zustand/useModel';
import { useSelectUpdate } from '@/zustand/useSelectStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef, useState } from 'react';
import MobileTitleLayout from './MobileTitleLayout';
import { LayoutProps } from '@/types/optionLayout';
import MobilePriceLayout from './MobilePriceLayout';
import ButtonOption from '@/components/ButtonOption';
import ButtonReset from '@/components/ButtonReset';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// 1번레이아웃_중앙 정렬 옵션
export default function VerticalLayout({ params, modelData, optionData }: LayoutProps) {
  const updateCartItem = useSelectUpdate();
  const router = useRouter();
  const optionName = params.option;
  const modelName = modelData.name;
  const initialPrice = modelData.price;
  const modelOptionData = optionData[0].extra.option[optionName][modelName];
  const [storedValue, setValue] = useLocalStorage<Cart>(modelName, {
    model: modelName,
    price: initialPrice,
  });

  const defaultMapData = {
    item: storedValue.option?.[optionName]?.name || modelOptionData[0].topText,
    price: storedValue.option?.[optionName]?.price || modelOptionData[0].price,
  };
  let defaultImage = SERVER + modelOptionData[0].image?.path || '';
  defaultImage = storedValue.option?.[optionName]?.detailImage || defaultImage;
  const clickedOptionRef = useRef<Map<string, string | number>>(
    new Map(Object.entries(defaultMapData))
  );

  const handleOptionClick = (optionItem: string, optionIndex: number, optionPrice: number) => {
    clickedOptionRef.current.clear();
    clickedOptionRef.current.set('item', optionItem);
    clickedOptionRef.current.set('price', optionPrice);
    const newImage = SERVER + modelOptionData[optionIndex].image?.path;
    let newPrice = 0;
    if (storedValue.option?.[optionName]) {
      // 해당 옵션을 선택한 적 있는 경우
      const basePrice = storedValue.price - storedValue.option[optionName].price;
      newPrice = basePrice + optionPrice;
    } else {
      // 해당 옵션을 선택한 적 없는 경우
      newPrice = storedValue.price + optionPrice;
    }
    setOptionState({
      node: generateOptionButton(),
      prevPrice: optionState.newPrice,
      newPrice: newPrice,
      imageSource: newImage,
    });
    updateCartItem({
      model: modelName,
      price: newPrice,
      option: {
        [optionName]: {
          name: optionItem,
          price: optionPrice,
          detailImage: newImage,
        },
      },
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
          className={`grid grid-cols-[250px_1fr] auto-rows-[66px] items-center text-[30px] ${isOptionActive(
            topText
          )} gap-x-[30px] border-t-[1px] ${isBolder} border-[#a4a4a4] pl-[15px] cursor-pointer 
              max-[1366px]:pl-0 max-[1366px]:grid-cols-[1fr_110px]`}
        >
          <td className="text-[22px] break-keep max-[1366px]:text-base">{topText}</td>
          <td className="font-Hyundai-sans text-[22px] max-[1366px]:text-base" data-value="">
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
          detailImage: optionState.imageSource,
        },
      },
    });
  };

  return (
    <>
      <section
        className="h-screen grid grid-cols-[400px_auto_280px] gap-x-[4rem] pr-[3rem] relative items-center
                        max-[1366px]:grid-cols-1 max-[1366px]:pr-0 max-[1366px]:grid-rows-[max-content_auto] max-[1366px]:min-h-0 max-[1366px]:h-min"
      >
        {/* 모바일에서만 보여질 상단바 */}
        <MobileTitleLayout optionName={optionName} modelName={modelName} clickBtn={clickButton} />

        {/* 옵션명 */}
        <article className="w-full col-start-2 flex flex-col gap-y-[30px] items-center mt-[-80px] max-[1366px]:col-start-1 max-[1366px]:px-[7%] max-[1366px]:gap-y-0 max-[1366px]:my-[50px]">
          {/* RESET 버튼 */}
          <div className="hidden absolute top-4 right-8 max-[1366px]:flex max-[1366px]:z-[6]">
            <ButtonReset model={modelName} price={initialPrice} />
          </div>
          <figure className="aspect-[16/9] w-full max-h-[500px] relative max-[1366px]:h-min ">
            <Image
              src={optionState.imageSource}
              fill
              sizes="100%"
              priority
              className="absolute top-0 left-0"
              style={{ objectFit: 'contain' }}
              alt=""
            />
          </figure>
          <h4 className="justify-self-center text-base max-[1366px]:text-sm max-[1366px]:mb-[50px] max-[1366px]:text-[#666]">
            상기 이미지는 차량의 대표 이미지로 적용되어 있습니다.
          </h4>
          <article className="w-full">
            <table className="w-full">
              <tbody>
                {/* 옵션 항목 렌더링 */}
                {optionState.node}
              </tbody>
            </table>
          </article>
        </article>

        {/* 화살표 이동 버튼 */}
        <ButtonOption clickHandler={clickButton} model={modelName} price={initialPrice} />

        {/* 예상가격 */}
        <div className="h-full max-[1366px]:hidden">
          <aside
            className="sticky top-[calc(100vh_-120px)] bg-black font-Hyundai-sans border-[1px] border-[#666] flex flex-col pl-[35px] pt-[10px] 
                max-[1366px]:pl-0 max-[1366px]:flex-row max-[1366px]:py-0 max-[1366px]:items-center justify-center max-[1366px]:gap-x-[20px] max-[1366px]:h-full"
          >
            <p className="text-[15px] text-[#a4a4a4] max-[1366px]:text-xl">예상 가격</p>
            <span className="text-[30px] font-bold mt-[-10px] max-[1366px]:text-xl max-[1366px]:mt-0">
              {optionState.newPrice.toLocaleString('ko-KR')}
              <span className="text-[20px] align-middle max-[1366px]:text-xl"> 원</span>
            </span>
          </aside>
        </div>
      </section>
      {/* 모바일 예상가격 */}
      <MobilePriceLayout mobilePrice={optionState.newPrice} />
    </>
  );
}
