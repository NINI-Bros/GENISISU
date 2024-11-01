'use client';

import { FullScreen } from '@/components/Spinner';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function PaymentsComplete() {
  const searchParams = useSearchParams();
  const title = searchParams.get('model')?.toUpperCase() || '';
  const price = Number(searchParams.get('price')) || 0;

  return (
    <Suspense fallback={<FullScreen />}>
      <main>
        <div className="h-[calc(100vh-420px)] bg-black text-white p-4 flex flex-col items-center justify-center gap-y-[40px] max-[1366px]:h-screen">
          <div className="flex flex-col">
            <h1 className="text-[60px] text-center text-white border-b-[1px] border-white max-[1366px]:text-[32px]">
              {title || ''}{' '}
            </h1>
            <h2 className="text-[40px] text-center mt-[0px] max-[1366px]:text-[30px]">
              결제에 성공했습니다!
            </h2>
          </div>
          <div>
            <h3 className="text-[20px] mb-2 text-right ">
              <span className="text-[25px] text-left max-[1366px]:text-[20px]">구입 가격 : </span>
              {price.toLocaleString() || ''}원
            </h3>
          </div>
          <Link
            href="/"
            className="btnBasic border-[white] px-[40px] py-[15px] mt-[40px] hover:bg-white hover:text-black"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </Suspense>
  );
}
