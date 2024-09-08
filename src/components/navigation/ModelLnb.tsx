'use client';

import { useModelStore } from '@/zustand/useModel';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const { items: modelList } = useModelStore();
  const modelName = modelList[Number(params.model) - 1];
  const isActive = (path: string) => (pathname === path ? 'text-white' : '');

  const items = Object.keys(optionList).map((item) => {
    const key = item as OptionKey;
    const content =
      modelName === 'g80' && item === 'passenger' ? '스포츠 패키지' : optionList[item];
    const path = item !== 'detail' ? '/' + item : '';
    return (
      <li key={key} className={isActive(`/models/${params.model}${path}`)}>
        <Link href={`/models/${params.model}${path}`}>{content}</Link>
      </li>
    );
  });

  return (
    <div className="flex flex-col absolute top-[220px] left-[80px]">
      <ul className=" text-[#666666] flex flex-col gap-y-2.5 font-light text-xl z-20">
        {items}
      </ul>
      {/* <ul className='grid grid-cols-[50px_50px] grid-rows-[50px] gap-x-[5px] mt-[20px]'>
        <li className='bg-white text-black'>1</li>
        <li className='bg-white text-black'>2</li>
      </ul> */}
    </div>

  );
}
