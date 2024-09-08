'use client';

import Image from "next/image";
import Link from "next/link";

export default function Error() {

  return (
    <main>
      <div className="h-[calc(100vh-420px)] bg-white text-black p-4 flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-col gap-y-[40px] items-center">
          <figure className="relative w-[80px] h-[80px] mb-[-25px]">
            <Image src="/images/warning.png" fill style={{objectFit:"contain"}} className="absolute top-0 left-0" alt="잘못된 페이지를 들어왔을때 보여주는 경고이미지"></Image>
          </figure>
          <h2 className="text-[30px] mb-2 text-center">페이지를 찾을 수 없습니다. </h2>
          <h3 className="text-md mb-2 text-center mt-[-50px]">문의사항이 있으시면 고객센터 (080-1234-5678)로 문의해 주시기 바랍니다.</h3>
          <Link href="/" className="btnBasic px-[40px] py-[15px] mt-[10px]">
            홈으로 돌아가기
          </Link>
        </div>
 
      </div>
    </main>

  );
}