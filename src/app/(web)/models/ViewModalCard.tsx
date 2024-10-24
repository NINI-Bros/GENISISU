'use client';

import Button from '@/components/Button';
import ModelCard from './ModelCard';
import { Product } from '@/types/product';

export default function ViewModelResult({ data }: { data: Product[] }) {
  const productCard = () => {
    return data.map((model, index) => {
      return <ModelCard key={index} model={model} />;
    });
  };

  return (
    <>
      <div className="flex justify-end mb-[20px]">
        <input type="text" placeholder="모델명을 입력해주세요" />
        <Button>검색하기</Button>
      </div>
      <ul className="grid grid-cols-5  max-[1920px]:grid-cols-4 max-[1366px]:grid-cols-3 max-[890px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6 text-white">
        {productCard()}
      </ul>
    </>
  );
}
