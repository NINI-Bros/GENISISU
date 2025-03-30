'use client';

import Button from '@/components/Button';
import ModelCard from './ModelCard';
import { Product, ViewModelCards } from '@/types/product';
import { useState } from 'react';

export default function ViewModelResult({ data }: { data: Product[] }) {
  const [value, setValue] = useState<ViewModelCards>({
    inputValue: '', // 초기 input값 세팅
    searchActiveValue: '', // 검색 input값
  });

  // 검색input 작성후 엔터값 지정
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchBtnClick();
    }
  };

  // 검색버튼 동작
  const handleSearchBtnClick = () => {
    if (value.inputValue !== '') {
      setValue((prev) => ({ ...prev, searchActiveValue: prev.inputValue, inputValue: '' }));
    } else {
      alert('검색어를 입력해주세요');
    }
  };

  // 결과값 모델 호출
  const productComponent = (modelName: string) => {
    return data
      .filter((item) => item.name.includes(modelName))
      .map((model, index) => {
        return <ModelCard key={index} model={model} />;
      });
  };

  return (
    <>
      <div className="flex justify-between mb-[20px] items-center max-[600px]:flex-col max-[600px]:gap-y-[20px]">
        <span className="text-white max-[600px]:self-end">
          {productComponent(value.searchActiveValue).length > 0
            ? `총 ${productComponent(value.searchActiveValue).length}개 모델`
            : ''}
        </span>
        <div className="flex justify-end min-h-[45px] max-[600px]:w-full">
          <input
            type="text"
            placeholder="모델명을 입력해주세요"
            value={value.inputValue}
            onChange={(e) => setValue((prev) => ({ ...prev, inputValue: e.target.value }))}
            onKeyDown={handleKeyDown}
            className="w-full pl-[10px]"
          />
          <Button
            className="btnBasic min-w-[80px] border-[1px] border-white"
            onClick={handleSearchBtnClick}
          >
            검색
          </Button>
          <Button
            className="btnBasic min-w-[80px] border-[1px] border-white ml-[5%]"
            onClick={() => {
              setValue((prev) => ({ ...prev, inputValue: '', searchActiveValue: '' }));
            }}
          >
            초기화
          </Button>
        </div>
      </div>
      {productComponent(value.searchActiveValue).length > 0 ? (
        <ul className="grid grid-cols-5 max-[1920px]:grid-cols-4 max-[1366px]:grid-cols-3 max-[890px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6 text-white">
          {productComponent(value.searchActiveValue)}
        </ul>
      ) : (
        <ul className="h-full flex justify-center items-center">
          <h2 className="text-white text-[2vw]">검색 결과가 없습니다.</h2>
        </ul>
      )}
    </>
  );
}
