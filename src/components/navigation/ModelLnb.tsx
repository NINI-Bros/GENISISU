'use client';

import { useModelStore } from '@/zustand/useModel';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useSelectReset, useSelectState, useSelectUpdate } from '@/zustand/useSelectStore';
import { Cart } from '@/types/product';
import useLocalStorage from '@/hook/useLocalStorage';
import { useEffect, useState } from 'react';
import { fetchProduct } from '@/data/fetch/productFetch';

interface OptionList {
  [key: string]: string;
}

const optionList: OptionList = {
  detail: '모델 상세',
  engine: '엔진 타입',
  drivetrain: '구동 타입',
  passenger: '시트 구성',
  exterior: '외장 컬러',
  interior: '내장디자인 & 컬러',
  garnish: '내장가니쉬',
  wheel: '휠 & 타이어',
  add: '선택 품목',
  payments: '결제',
};

type OptionKey = keyof typeof optionList;

export default function ModelLnb({ params }: { params: { model: string } }) {
  const cartItem = useSelectState();
  const resetCartItem = useSelectReset();
  const router = useRouter();
  const pathname = usePathname();
  const [isReset, setIsReset] = useState<boolean>(false);
  const { items: modelList } = useModelStore();
  const modelName = modelList[Number(params.model) - 1];
  const [storedValue, setValue] = useLocalStorage<Cart>('cart', {
    model: modelName,
    price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const modelData = await fetchProduct(params.model);
      setValue({
        model: modelName,
        price: modelData?.price || 0,
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.model, isReset]);

  const isActive = (path: string) => (pathname === path ? 'text-white' : '');
  const handleClick = (path: string) => {
    if (path === '') {
      // 모델 상세 페이지라면, (store와 storage 초기화)
      resetCartItem();
      setIsReset((prevState) => !prevState);
    } else {
      // 모델 상세 페이지가 아니라면,
      setValue({
        model: modelName,
        price: cartItem.price === 0 ? storedValue.price : cartItem.price,
        option: {
          ...storedValue.option,
          ...cartItem.option, // 현재 옵션 페이지 선택 항목 추가 (덮어 쓰기)
        },
      });
    }
    router.push(`/models/${params.model}${path}`);
  };

  const items = Object.keys(optionList).map((item) => {
    const key = item as OptionKey;
    const content =
      modelName === 'g80' && item === 'passenger' ? '스포츠 패키지' : optionList[item];
    const path = item !== 'detail' ? '/' + item : '';
    return (
      <li key={key} className={isActive(`/models/${params.model}${path}`)}>
        <Button
          className={`${isActive(`/models/${params.model}${path}`)} border-none`}
          bgColor="black"
          style={{ fontFamily: 'Pretendard' }}
          onClick={() => handleClick(path)}
        >
          {content}
        </Button>
      </li>
    );
  });

  return (
    <div className="flex flex-col absolute top-[220px] left-[80px] max-[1366px]:hidden">
      <ul className=" text-[#666666] flex flex-col gap-y-2.5 font-light text-xl z-20">{items}</ul>
    </div>
  );
}
