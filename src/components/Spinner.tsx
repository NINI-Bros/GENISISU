'use client';

import { FadeLoader, HashLoader, ScaleLoader } from "react-spinners";

export function FullScreen(){
  return (
    <div className="absolutes w-screen h-[calc(100vh_-310px)] z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-lg font-semibold text-white">잠시만 기다려주세요.</h3>
        {/* 기존 스피너 */}
        {/* <HashLoader
          color="#f58714"
          size={60}
        /> */}
        <FadeLoader
          color="#ffffff"
          height={10}
          loading
          margin={5}
          radius={3}
          width={10}
        />
      </div>
    </div>
  );
}

export function TargetArea(){
  return (
    <div className="flex justify-center">
      <ScaleLoader color="#F97316"/>
    </div>
  );
}
