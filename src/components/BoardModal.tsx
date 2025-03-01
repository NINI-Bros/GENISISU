'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function BoardModal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const route = useRouter();
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTop;
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="relative w-full max-w-[60%] max-[1366px]:max-w-[85%]"
      onClose={() => route.back()}
      onClick={(e) => {
        if ((e.target as any).nodeName === 'DIALOG') {
          route.back();
        }
      }}
    >
      {children}

      {/* 모달 닫기버튼 */}
      <div
        className="absolute right-5 top-5 w-[30px] h-[30px] cursor-pointer"
        onClick={() => route.back()}
      >
        <span className="absolute w-full h-[3px] bg-black top-[50%] translate-y-[-50%] rotate-45"></span>
        <span className="absolute w-full h-[3px] bg-black top-[50%] translate-y-[-50%] rotate-[-45deg]"></span>
      </div>
    </dialog>,
    document.querySelector('#boardModal') as HTMLElement
  );
}
