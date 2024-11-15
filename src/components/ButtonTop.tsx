'use client';

import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useEffect, useState } from 'react';

export default function ButtonTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (event: MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.addEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${
        isVisible ? 'block' : 'hidden'
      } flex flex-col fixed z-50 justify-center items-center bg-black border-[#fff] border-2 text-white cursor-pointer rounded-none hover:bg-gray-500 transition ease-in-out duration-300 bottom-[125px] right-[25px] p-3 sm:py-2 sm:bottom-44 sm:right-20 sm:px-4`}
    >
      <FontAwesomeIcon icon={faChevronUp} className="transition-colors text-[18px]" />
      <span className="hidden text-[16px] sm:inline-block">Top</span>
    </button>
  );
}
