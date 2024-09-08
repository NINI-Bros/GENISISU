'use client'

import useLocalStorage from '@/hook/useLocalStorage';
import { Cart, Option, Product } from '@/types/product';
import { useModelStore } from '@/zustand/useModel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface HorizontalLayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product | null;
  optionData: Option[];
}

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// 3번레이아웃_기본 default 옵션 사진 가로
export default function HorizontalLayout({ params, modelData, optionData }: HorizontalLayoutProps) {
  const router = useRouter();
  const optionName = params.option;
  const modelName = modelData?.name || '';
  const initialPrice = modelData?.price || 0;
  const modelOptionData = optionData[0].extra.option[optionName][modelName];

  const [storedValue, setValue] = useLocalStorage<Cart>('cart', {
    model: modelName,
    price: initialPrice,
  });
  
  const defaultData = modelOptionData[0];
  const defaultItems = defaultData.items || [];
  const defaultGroupName = defaultData.topText;
  const defaultItemName = defaultItems[0].name;
  const defaultItemImage = defaultItems[0].image ? SERVER + defaultItems[0].image.path : '';
  const defaultItemDescription = defaultItems[0].description || '';
  const defaultMapData = {
    group: defaultGroupName,
    item : defaultGroupName + defaultItemName,
    price : 0
  };
  const clickedOptionRef = useRef<Map<string, string | number>>(new Map(Object.entries(defaultMapData)));
  const checkOptionRef = useRef<Set<string>>(new Set());
  const [optionState, setOptionState] = useState<{
    node: ReactNode;
    prevPrice: number;
    newPrice: number;
    imageSource: string;
    optionText: string;
  }>({
    node: null,
    prevPrice: storedValue.price,
    newPrice: storedValue.price,
    imageSource: defaultItemImage,
    optionText: defaultItemDescription,
  });

  const handleOptionClick = (
    optionGroup: string,
    optionItem: string,
    optionImage: string,
    optionText: string,
    optionPrice: number
  ) => {
    clickedOptionRef.current.clear();
    clickedOptionRef.current.set('group', optionGroup);
    clickedOptionRef.current.set('item', optionGroup + '-' + optionItem);
    clickedOptionRef.current.set('price', optionPrice);
    const newImage = optionImage;

    setOptionState((preState) => ({
      ...preState,
      node: list,
      imageSource: newImage,
      optionText: optionText
    }));
  };

  const handleOptionCheck = (
    optionGroup: string,
    optionPrice: number,
  ) => {
    let newPrice = 0;
    if (checkOptionRef.current.has(optionGroup)) {
      checkOptionRef.current.delete(optionGroup);
      newPrice = optionPrice === 0 ? storedValue.price : storedValue.price - optionPrice;
    } else {
      checkOptionRef.current.add(optionGroup);
      newPrice = optionPrice === 0 ? storedValue.price : storedValue.price + optionPrice;
    }
    setOptionState((preState) => ({
      ...preState,
      node: list,
      prevPrice: preState.newPrice,
      newPrice: newPrice,
    }));
  };

  const isOptionActive = (option: string) =>
  clickedOptionRef.current.has(option) ? 'text-white' : 'text-[#666666]';

  const list = modelOptionData.map((optionGroup, i) => {
    const groupName = optionGroup.topText;
    const price = optionGroup.price;
    const groupItems = optionGroup.items || [];
    const groupImage = groupItems[0]?.image?.path ? SERVER + groupItems[0].image.path : defaultItemImage;
    const firstItem = groupItems[0]?.name;
    const firstItemText = groupItems[0].description || '';
    const checkIcon = checkOptionRef.current.has(groupName) ? '/images/check_activate.svg' : '/images/check_deactivate.svg';
    const textItems = groupItems.length > 1 ? groupItems : [];
    return (
      <tr 
        key={groupName + i}
        className={`flex flex-col items-left text-[18px] gap-x-[86px] border-t-[1px] border-[#a4a4a4] py-[15px] pl-[15px]`}
      >
        <td 
          onClick={() => handleOptionClick(groupName, firstItem, groupImage, firstItemText, price)}
          className={`font-Hyundai-sans flex gap-x-3 items-center font-bold ${isOptionActive(groupName)} `}
        >
          <figure 
            onClick={() => handleOptionCheck(groupName, price)}
            className='w-[30px] h-[30px] relative hover:cursor-pointer'>
            <Image src={checkIcon} fill sizes='100%' alt='check icon' />
          </figure>
          <span className='hover:cursor-pointer'>{groupName}</span>
        </td>
        <td className="font-Hyundai-sans text-[16px] text-[#666666] px-11">
          + {price.toLocaleString('ko-KR')} 원
        </td>
        <td className={`font-Hyundai-sans mt-2`}>
          <ul className='list-disc px-[60px] text-[16px]'>
            {textItems.map((item, j) => {
              const itemImage = item.image?.path ? SERVER + item.image.path : '';
              const itemName = item.name;
              const itemText = item.description || '';
              const itemPrice = item.price || 0;
              return (
                <li 
                  key={item.name + j}
                  onClick={() => handleOptionClick(groupName, itemName, itemImage, itemText, itemPrice)}
                  className={`${isOptionActive(groupName + '-' + itemName)} hover:cursor-pointer`}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </td>
      </tr>
    );
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
        }
      }
    });
  };

  useEffect(() => {
    setOptionState((prevState) => ({
      ...prevState,
      node: list,
    }));
  }, []);

  const text = optionState.optionText;
  const regex = /※.*/g;
  const matches = text.match(regex);
  const annotation = matches && matches.join('\n'); // 주석
  const mainText = annotation && text.replace(annotation, ''); // 본문

  return (
    <>
      <section className="h-screen relative">
        <article className="flex absolute justify-center items-top w-[1440px] right-[50px] top-[200px]">

          <div className="flex flex-col mr-[40px]">
            <figure className="w-[650px] h-[325px] relative">
              <Image src={optionState.imageSource} fill sizes='100%' className="w-full" alt="" />
            </figure>
            <h4 className="w-[650px] mb-[20px] self-center mt-[20px] text-[16px]">
              <pre className='font-Hyundai-sans whitespace-pre-wrap'>
                {mainText}
              </pre>
              <pre className='font-Hyundai-sans whitespace-pre-wrap text-[#666666]'>
                {annotation}
              </pre>
            </h4>
          </div>

          <article className="w-[600px] h-[670px] overflow-scroll border-t-[1px] border-b-[1px]  border-[#a4a4a4]">
            <table className="w-full">
              <tbody>
                {list}
              </tbody>
            </table>
          </article>

        </article>

        <div className="grid grid-cols-[60px_60px] grid-rows-[50px] gap-x-[20px] absolute top-[620px] left-[80px]">
            <button className='bg-black border-[0.5px] border-white w-full h-full' onClick={(e) => clickButton(e, 'prev')}>
              <figure className='relative w-full h-[75%]'>
                <Image className='absolute top-0 left-0' src="/images/btn_prev.png" alt="버튼 좌측 이미지" fill style={{objectFit:"contain"}}/>
              </figure>
            </button>
            <button className='bg-white w-full h-full' onClick={clickButton}>
              <figure className='relative w-full h-[75%]'>
                <Image className='absolute top-0 left-0' src="/images/btn_next_b.png" alt="버튼 좌측 이미지" fill style={{objectFit:"contain"}}/>
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
