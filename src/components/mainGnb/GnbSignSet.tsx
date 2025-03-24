'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from '@/hook/useSession';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useModalStateStore } from '@/zustand/useModalState';
import { createPortal } from 'react-dom';
import Sitemap from '../layout/Sitemap';
import { useEffect, useRef, useState } from 'react';
import useModalOpenBgFix from '@/hook/useModalOpenBgFix';

export default function GnbSignSet() {
  const searchParams = useSearchParams();
  const { session, status } = useSession();
  const modalToggleFn = useModalStateStore((state) => state.setModalToggleState);
  const modalSelectFn = useModalStateStore((state) => state.setModalSelectState);
  const modalState = useModalStateStore((state) => state.modalState);
  const modalRef = useRef<HTMLDialogElement>(null);
  const path = usePathname();

  //모달호출시 배경 고정 커스텀훅 실행
  useModalOpenBgFix(modalState);

  // 모달 호출 상태에 따라 dialog 태그 활성화
  useEffect(() => {
    if (modalState) {
      modalRef.current?.showModal();
      modalRef.current?.scrollTop;
    } else {
      modalRef.current?.close();
    }
  }, [modalState]);

  // 화면이동시마다 (path 변경 시) 모달 닫기 실행
  useEffect(() => {
    modalSelectFn(false);
  }, [path]);

  // 패스네임 기준 로그인 버튼 클래스 활성화 함수
  const isOnActive = (routeName: string) => (searchParams.get('type') === routeName ? 'on' : '');

  // 로그아웃 함수
  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  // 사이트맵 오픈 함수
  const handleSiteMapOpen = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (modalToggleFn !== undefined) {
      modalToggleFn();
    }
  };

  // 로그인 상태에 따른 DOM 리턴 함수
  const signSetFn = () => {
    if (status === 'authenticated' && session) {
      return (
        <span className="signOut" onClick={handleSignOut}>
          로그아웃
        </span>
      );
    } else {
      return (
        <>
          <Link href="/accept?type=login" className={`${isOnActive('login')}`}>
            로그인
          </Link>
          <span>|</span>
          <Link href="/accept?type=signup" className={`${isOnActive('signup')}`}>
            회원가입
          </Link>
        </>
      );
    }
  };

  return (
    <ul className="secondGnb">
      <li className="signSetList">{signSetFn()}</li>
      <li className="sitemapBtn">
        <div className="sitemapWrap" onClick={handleSiteMapOpen}>
          <figure>
            <Image src="/images/menu_ham.png" fill sizes="100%" alt="사이트맵 클릭 버튼입니다." />
          </figure>
        </div>
      </li>
      {modalState &&
        createPortal(
          <dialog ref={modalRef}>
            <Sitemap />
          </dialog>,
          document.querySelector('#modal') as HTMLElement
        )}
    </ul>
  );
}
