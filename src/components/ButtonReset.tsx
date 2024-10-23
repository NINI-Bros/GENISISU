'use client';

import { useSelectReset } from '@/zustand/useSelectStore';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

export default function ButtonReset({
  model,
  price,
}: {
  model: string;
  price: number;
}): ReactElement {
  const resetCartItem = useSelectReset();
  const router = useRouter();
  const clickReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm('[확인]을 누르면 모든 옵션값이 초기화 됩니다.')) {
      resetCartItem();
      if (typeof window !== 'undefined') {
        const initialValue = JSON.stringify({ model: model, price: price });
        window.localStorage.setItem(model, initialValue);
        router.refresh();
      }
    }
  };

  return (
    <button
      type="button"
      className="col-span-2 tooltip relative mainBtn font-normal w-full h-[37px] mt-24 border-2 text-white text-[16px] max-[1366px]:mt-0 max-[1366px]:w-[100px]"
      onClick={clickReset}
    >
      RESET
      <div
        className="tooltiptext absolute bottom-150 px-3 py-1 bg-white text-black text-center rounded opacity-0 transition-opacity duration-300"
        style={{ fontFamily: 'Pretendard' }}
      >
        모든 옶션값을 초기화
      </div>
      <div className="tooltip-arrow"></div>
    </button>
  );
}
