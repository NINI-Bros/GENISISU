'use client';

import { useModelStore } from '@/zustand/useModel';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useSelectState } from '@/zustand/useSelectStore';
import { Cart } from '@/types/product';
import useLocalStorage from '@/hook/useLocalStorage';
import { OptionList } from '@/types/optionLayout';
import { useEffect } from 'react';
import { fetchProduct } from '@/data/fetch/productFetch';

type OptionKey = keyof OptionList;

export default function ModelLnb({ params }: { params: { model: string } }) {
  const optionList = useModelStore((state) => state.optionList);
  const cartItem = useSelectState();
  // const resetCartItem = useSelectReset();
  const router = useRouter();
  const pathname = usePathname();
  // const [isReset, setIsReset] = useState<boolean>(false);
  const { items: modelList } = useModelStore();
  const modelName = modelList[Number(params.model) - 1];
  const [storedValue, setValue] = useLocalStorage<Cart>(modelName, {
    model: modelName,
    price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const vehicle = await fetchProduct(params.model);
      if (storedValue.price === 0) {
        setValue({
          ...storedValue,
          price: vehicle.price,
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = (path: string) => (pathname === path ? 'text-white' : '');
  const handleClick = (path: string) => {
    setValue({
      model: modelName,
      price: cartItem.price === 0 ? storedValue.price : cartItem.price,
      option: {
        ...storedValue.option,
        ...cartItem.option, // 현재 옵션 페이지 선택 항목 추가 (덮어 쓰기)
      },
    });
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
    <div className="flex flex-col absolute top-[180px] left-[80px] max-[1366px]:hidden z-[6]">
      <ul className=" text-[#666666] flex flex-col gap-y-2.5 font-light text-xl">{items}</ul>
    </div>
  );
}
