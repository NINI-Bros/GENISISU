'use client';

import useModalOpenBgFix from '@/hook/useModalOpenBgFix';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function BoardModal({ children }: { children: ReactNode }) {
  const [bgFixState, setBgFixState] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const route = useRouter();
  const [isActive, setIsActive] = useState(false);

  // 모달 오픈시 배경 고정 함수
  useModalOpenBgFix(bgFixState);

  // 첫 진입시 dialog 열리게 하고 스크롤 최상단 이동
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      // dialogRef.current?.scrollTop;
    }
  }, []);

  // 모달 오픈시 스타일 적용 함수
  useEffect(() => {
    if (bgFixState) {
      setTimeout(() => {
        setIsActive(true);
      }, 10);
    } else {
      setTimeout(() => {
        setIsActive(false);
      }, 300);
    }
  }, [bgFixState]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-32'
      }  ease-linear duration-300 relative w-full max-w-[60%] max-[1366px]:max-w-[85%]`}
      onClose={() => {
        route.back();
        setBgFixState((prop) => !prop);
      }}
      onClick={(e) => {
        if ((e.target as any).nodeName === 'DIALOG') {
          route.back();
          setBgFixState((prop) => !prop);
        }
      }}
    >
      {children}

      {/* 모달 닫기버튼 */}
      <button
        className="absolute right-5 top-5 w-[30px] h-[30px] border-none cursor-pointer"
        onClick={() => {
          route.back();
          setBgFixState((prop) => !prop);
        }}
      >
        <span className="absolute w-full h-[3px] bg-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-45"></span>
        <span className="absolute w-full h-[3px] bg-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[-45deg]"></span>
      </button>
    </dialog>,
    document.querySelector('#modal') as HTMLElement
  );
}
