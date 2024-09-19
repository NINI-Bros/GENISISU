'use client';

import useLocalStorage from '@/hook/useLocalStorage';
import { Cart, Option, OptionDetail, OptionItem, Product } from '@/types/product';
import { useModelStore } from '@/zustand/useModel';
import { useSelectUpdate } from '@/zustand/useSelectStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef, useState } from 'react';

interface ColorLayoutProps {
  params: {
    model: string;
    option: string;
  };
  modelData: Product | null;
  optionData: Option[];
}

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// 2번레이아웃_컬러칩 옵션
export default function ColorLayout({ params, modelData, optionData }: ColorLayoutProps) {
  const updateCartItem = useSelectUpdate();
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
  let defaultGroupName = defaultData.topText;
  let defaultItemName = defaultItems[0].name;
  let defaultItemImage = defaultItems[0].images ? SERVER + defaultItems[0].images[1].path : '';
  let defaultItemChipImage = defaultItems[0].images ? SERVER + defaultItems[0].images[0].path : '';
  const defaultItemPrice = storedValue.option?.[optionName]?.price || 0;
  if (storedValue.option?.[optionName]) {
    const storedNameArr = storedValue.option[optionName].name.split('-');
    [defaultGroupName, defaultItemName] = storedNameArr;
    defaultItemImage = storedValue.option[optionName].detailImage;
    defaultItemChipImage = storedValue.option[optionName].image || '';
  }

  const clickedOptionRef = useRef<Set<string>>(new Set([defaultGroupName, defaultGroupName + defaultItemName]));
  const defaultMapData = {
    group: defaultGroupName,
    item: defaultItemName,
    price: defaultItemPrice,
    image: defaultItemChipImage
  }
  const textOptionRef = useRef<Map<string, string | number>>(new Map(Object.entries(defaultMapData)));

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
    optionText: defaultItemName,
  });

  const handleOptionClick = (
    optionGroup: string,
    optionItem: string,
    optionPrice: number,
    optionVehicleImage: string,
    optionColorChipImage: string,
  ) => {
    clickedOptionRef.current.clear();
    clickedOptionRef.current.add(optionGroup);
    clickedOptionRef.current.add(optionGroup + optionItem);
    const newImage = optionVehicleImage;
    let newPrice = 0;
    if (storedValue.option?.[optionName]) { // 해당 옵션을 선택한 적 있는 경우
      const basePrice = storedValue.price - storedValue.option[optionName].price;
      newPrice = basePrice + optionPrice; 
    } else { // 해당 옵션을 선택한 적 없는 경우
      newPrice = storedValue.price + optionPrice;
    }
    textOptionRef.current.set('group', optionGroup);
    textOptionRef.current.set('item', optionItem);
    textOptionRef.current.set('price', optionPrice);
    textOptionRef.current.set('image', optionColorChipImage);

    setOptionState({
      node: list,
      prevPrice: optionState.newPrice,
      newPrice: newPrice,
      imageSource: newImage,
      optionText: textOptionRef.current.get('item') as string || '',
    });
    updateCartItem({
      model: modelName,
      price: newPrice,
      option: {
        [optionName]: {
          name: optionGroup + '-' + optionItem,
          price: optionPrice,
          detailImage: newImage,
          image: optionColorChipImage
        }
      }
    });
  };

  const isClicked = (item: string) => clickedOptionRef.current.has(item) ? 'border-[3px] border-slate-300' : '';

  const generateOptionButton = (data: OptionItem): ReactNode => {
    const groupName = data.topText;
    const items = data.items || [];
    return items.map((item: OptionDetail, index: number) => {
      // const isBolder = index === lastIndex ? 'border-b-[1px]' : '';
      const { name, price = 0, images = [] } = item;
      const colorChipImage = SERVER + images[0].path;
      const vehicleImage = SERVER + images[1].path;
      return (
        <li
          key={name}
          onClick={() => handleOptionClick(groupName, name, price, vehicleImage, colorChipImage)}
          className="w-[95px] h-[50px]"
        >
          <figure className={`w-[95px] h-[50px] relative ${isClicked(groupName + name)} hover:cursor-pointer`}>
            <Image src={colorChipImage} fill sizes="100%" alt={`${name}`} />
          </figure>
        </li>
      );
    });
  };

  const isOptionActive = (option: string) =>
    clickedOptionRef.current.has(option) ? 'text-white' : 'text-[#666666]';

  const list = modelOptionData.map((optionGroup) => {
    const groupName = optionGroup.topText;
    const refItem = textOptionRef.current.get('item') || '';
    const itemName = textOptionRef.current.get('group') === groupName ? refItem : '(색상을 선택해주세요)';
    const optionData = generateOptionButton(optionGroup);
    return (
      <table key={groupName} className='mb-8 w-full'>
        <tbody>
          {/* 그룹 타이틀 */}
          <tr>
            <td className={`pl-[15px] text-[22px] ${isOptionActive(groupName)}`}>{groupName}</td>
          </tr>
          {/* 옵션 텍스트 */}
          <tr className="grid grid-cols-[250px_1fr] auto-rows-[minmax(60px,_auto)] items-center text-[18px] gap-x-[86px] border-t-[1px] border-[#a4a4a4] pt-[30px] pl-[15px]">
            <td className={`font-Hyundai-sans ${isOptionActive(groupName + itemName)} col-start-1 break-keep`}>{itemName}</td>
            <td className=' col-start-2'>
              {/* 옵션 버튼 생성 */}
              <ul className="flex gap-[20px] flex-wrap">{optionData}</ul>
            </td>
          </tr>
        </tbody>
      </table>
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
    const currentItem = `${textOptionRef.current!.get('group')}-${textOptionRef.current!.get('item')}`
    setValue({
      model: modelName,
      price: optionState.newPrice,
      option: {
        ...storedValue.option,
        [optionName]: {
          name: currentItem,
          price: textOptionRef.current!.get('price') as number,
          image: textOptionRef.current!.get('image') as string,
          detailImage: optionState.imageSource
        }
      }
    });
  };

  return (
    <>
      <section className="h-screen relative grid grid-cols-[500px_auto] gap-x-[4rem] pt-[80px]">

        {/* 옵션명 */}
        <article className="col-start-2 flex flex-col items-center w-full pr-[50px]">
          <figure className="w-full max-w-[960px] aspect-[2.4/1] relative">
            <Image
              src={optionState.imageSource}
              fill
              sizes="100%"
              alt=""
              className="absolute"
              style={{objectFit:"contain"}}
              priority
            />
          </figure>
          <h4 className='text-[16px] mt-[20px]'>상기 이미지는 차량의 대표 이미지로 적용되어 있습니다.</h4>
          <div className="tableWrap mt-[50px] w-full">
            {list}
          </div>
        </article>

        {/* 화살표 이동 버튼 */}
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

        {/* 예상가격 */}
        <article className="w-full absolute left-0 bottom-[120px] flex items-end z-10 justify-center ">
          <div className="absolute right-12">
            <aside className="font-Hyundai-sans border-[1px] border-[#666666] flex flex-col justify-center px-[30px] pt-[10px]">
              <p className="text-[15px] text-[#a4a4a4]">예상 가격</p>
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
