'use client';

import { useEffect, useState } from 'react';
import useModalOpenBgFix from './useModalOpenBgFix';

// 보편적인 F5 새로고침 막는 이벤트
export function useRefreshEvent() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F5') {
        const confirmText = confirm(
          '새로고침을 할 경우 데이터가 초기화 됩니다.\n그대로 진행하시겠습니까?'
        );
        if (confirmText) {
          return;
        } else {
          e.preventDefault();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

// 추후 커스텀 모달을 사용할 경우 실행될 hook
export function useRefreshModal() {
  const [showModal, setShowModal] = useState(false);
  useModalOpenBgFix(showModal);
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F5') {
        e.preventDefault();
        setShowModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return { showModal, closeModal };
}
