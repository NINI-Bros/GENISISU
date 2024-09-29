'use client'

import useLocalStorage from "@/hook/useLocalStorage";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function paymentsComplete(){
  const [storedValue, setValue] = useLocalStorage('cart', {
    model:'',
    price:0,
    engine:'',
    drivetrain:'',
    passenger:'',
    exterior:'',
    interior:'',
    garnish:'',
    wheel:'',
    add:'',
  })

  useEffect(()=>{
    
  },[])

  const title = storedValue.model && storedValue.model?.split('-').join(' ').toUpperCase();
  const price = Number(storedValue.price);

  return(
    <main>
       {/* <figure className="relative w-[80px] h-[80px] mb-[-25px]">
            <Image src="/images/warning.png" fill style={{objectFit:"contain"}} className="absolute top-0 left-0" alt="잘못된 페이지를 들어왔을때 보여주는 경고이미지"></Image>
          </figure> */}

      <div className="h-[calc(100vh-420px)] bg-black text-white p-4 flex flex-col items-center justify-center gap-y-[40px]">
        <div className="flex flex-col">
          <h1 className="text-[60px] text-center text-white border-b-[1px] border-white">{title || ""} </h1>
          <h2 className="text-[40px] text-center mt-[0px]">결제에 성공했습니다!</h2>
        </div>

        <div className="">
            <h3 className="text-[20px] mb-2 text-right">
              <span className="text-[25px text-left">구입 가격 : </span>
              {price.toLocaleString() || ""}원
            </h3>
       </div>

       <button className="btnBasic border-[white] px-[40px] py-[15px] mt-[40px] hover:bg-white hover:text-black">홈으로 돌아가기</button>


      </div> 
    </main>
  );
}