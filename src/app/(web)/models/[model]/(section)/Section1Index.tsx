'use client';

import Link from 'next/link';
import { ImageViewer } from '../ImageViewer';
import { useModelStore } from '@/zustand/useModel';
import { useRouter } from 'next/navigation';
import extractTitle from '@/app/util/extractTitle';
import Image from 'next/image';
import ScrollToTop from '@/components/ScrollToTop';
import ButtonReset from '@/components/ButtonReset';
import { Product } from '@/types/product';

export default function Section1Index({
  modelIndex,
  modelData,
  imageArray,
}: {
  modelIndex: string;
  modelData: Product;
  imageArray: string[];
}) {
  const isOneImage = (arr: string[]) => (arr.length === 1 ? 'max-[1366px]:scale-150' : '');
  const { steps } = useModelStore();
  const modelName = modelData.name;
  const initialPrice = Number(modelData?.price);
  const router = useRouter();

  const [title, subtitle] = extractTitle(modelName);
  const uppercaseName = title.toUpperCase() + ' ' + subtitle.toUpperCase();

  const clickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextStep = `/models/${modelIndex}/${steps[1]}`; // 'engine'
    router.push(nextStep);
  };

  return (
    <section
      className="w-screen h-[calc(100vh-100px)] grid grid-cols-[450px_auto] gap-x-[4rem] bg-black relative z-[5] 
                        max-[1366px]:grid-cols-1 max-[1366px]:gap-x-0 max-[1366px]:h-[calc(100vh-60px)] max-[1366px]:justify-items-center max-[1366px]:overflow-hidden"
    >
      <ScrollToTop />
      <article
        className="w-[90%] max-h-full col-start-2 grid-cols-1 flex flex-col justify-items-center mt-[40px] pb-[100px] gap-y-[20px] justify-between 
                          max-[1366px]:col-start-1 max-[1366px]:pb-0 max-[1366px]:h-[80%] max-[1366px]:mt-0
                          max-[1366px]:grid max-[1366px]:grid-rows-[250px_auto] max-[1366px]:w-full max-[1366px]:px-[7%]"
      >
        {/* RESET 버튼 */}
        <div className="hidden absolute top-4 right-8 max-[1366px]:flex max-[1366px]:z-[6]">
          <ButtonReset model={modelName} price={initialPrice} />
        </div>
        {/* 이미지 영역 */}
        <figure
          className={`relative max-w-full aspect-[2/1] overflow-hidden max-[1366px]:row-start-2 max-[1366px]:z-[5] ${isOneImage(
            imageArray
          )}`}
        >
          {modelData && <ImageViewer images={imageArray} />}
        </figure>
        {/* 가격 표시 */}
        <div
          className="grid grid-cols-[auto_1fr_1fr] gap-y-[10px] gap-x-[3rem] self-center 
                        max-[1366px]:grid-cols-1 max-[1366px]:gap-x-0 max-[1366px]:gap-y-0 max-[1366px]:justify-items-center max-[1366px]:row-start-1 max-[1366px]:w-full
                        max-[1366px]:relative max-[1366px]:z-10 mt-9
                        "
        >
          <h2
            className="relative text-[50px] text-center font-Hyundai-sans self-center justify-self-center px-[10px] font-black flex flex-col items-center
                        max-[1366px]:text-[28px] max-[1366px]:max-w-full max-[1366px]:leading-none max-[1366px]:w-[95%] max-[1366px]:border-b-[1px] max-[1366px]:border-[#666]
                        max-[1366px]:pb-[1%] max-[1366px]:mt-[3%] max-[1366px]:px-0 "
          >
            {modelName && uppercaseName}
          </h2>
          <h3 className="text-[30px] text-[#a4a4a4] col-span-2 self-center max-[1366px]:text-[20px] max-[1366px]:mt-[1%]">
            시작가격{' '}
            <span className="text-white font-Hyundai-sans">
              {initialPrice.toLocaleString('ko-KR')}
            </span>
            <span className="text-[20px] text-white max-[1366px]:text-base"> 원</span>
          </h3>
          <div className="hidden gap-x-[20px] max-[1366px]:flex max-[1366px]:mt-[20px]">
            <Link
              href={{ pathname: '/info', query: { model: modelName } }}
              className="w-[100px] h-[37px] font-normal border-2 border-white flex items-center justify-center max-[1366px]:max-w-[120px]"
            >
              시승신청
            </Link>
            <button
              type="button"
              className="mainBtn w-[100px] h-[37px] font-normal border-2 border-white bg-white text-black text-[16px]"
              style={{ fontFamily: 'Pretendard' }}
              onClick={clickNext}
            >
              다음
            </button>
          </div>
          <div className="flex justify-self-center col-span-3 mt-[0px] items-end gap-x-[10px] max-[1366px]:absolute max-[1366px]:top-[calc(100vh_-200px)]">
            <figure className="w-[30px] h-[30px] relative top-[4px]">
              <Image
                src="/images/scrollIcon_g.png"
                fill
                sizes="100%"
                alt="이미지 스크롤 아이콘"
                className="absolute bg-cover animate-bounce"
              />
            </figure>
            <span className="text-[#999]">상세내용은 스크롤 해주세요</span>
          </div>
        </div>

        {/* 이후 레이아웃인 화살표 이동에 대응하는 다음버튼 */}
        <div className="flex flex-col w-[120px] gap-y-[10px] mt-[0px] col-span-2 self-start absolute top-[620px] left-[80px] max-[1366px]:hidden">
          <Link
            href={{ pathname: '/info', query: { model: modelName } }}
            className="w-full h-[37px] font-normal border-2 border-white flex items-center justify-center max-[1366px]:max-w-[120px]"
          >
            시승신청
          </Link>
          <button
            className="mainBtn w-full h-[37px] font-normal border-2 border-white bg-white text-black text-[16px]"
            style={{ fontFamily: 'Pretendard' }}
            onClick={clickNext}
          >
            다음
          </button>
          <ButtonReset model={modelName} price={initialPrice} />
        </div>
      </article>
    </section>
  );
}
