'use client'

import { useEffect, useState } from "react"
import useModalOpenBgFix from "./useModalOpenBgFix"

// 보편적인 F5 새로고침 막는 이벤트
export function useRefreshEvent () {

  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'F5') {
        const confirmText = confirm("새로고침을 할 경우 데이터가 초기화 됩니다.\n그대로 진행하시겠습니까?")
        if (confirmText) {
          return
        } else {
          e.preventDefault();
        }
      }
    }
  
    const handleBeforeUnload = (e:BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    }
  
    window.addEventListener('keydown',handleKeyDown)
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('keydown',handleKeyDown)
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  },[])
}


// 추후 커스텀 모달을 사용할 경우 실행될 hook
export function useRefreshModal () {
  const [showModal, setShowModal] = useState(false)
  useModalOpenBgFix(showModal)
  const closeModal = () => {
    setShowModal(false)
  }



  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'F5') {
        e.preventDefault();
        setShowModal(true)
      }
    }
    
    const handleBeforeUnload = (e:BeforeUnloadEvent) => {
      e.preventDefault();
      setShowModal(true)
      e.returnValue = '';
    }
  
    window.addEventListener('keydown',handleKeyDown)
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('keydown',handleKeyDown)
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  },[])

  
  return {showModal,closeModal}
}