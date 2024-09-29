'use client';

import { Pagination } from '@/types';
import { useEffect, useRef } from 'react';

export default function PostPagination({
  listData,
  pagingFn,
}: {
  listData: Pagination | null;
  pagingFn: (page: string) => void;
}) {
  const pagingRef = useRef<HTMLLIElement | null>(null);
  const firstChild = pagingRef.current?.children[0];
  useEffect(() => {
    firstChild?.classList.add('on');
  }, [firstChild]);

  const pagingClick = (e: React.MouseEvent<HTMLSpanElement>, page: string) => {
    pagingFn(page);
    (e.target as HTMLElement).classList.add('on');
    const sibling = Array.from((e.target as HTMLElement).parentNode!.children);
    const otherSibling = sibling.filter((item) => item !== e.target);
    otherSibling.map((state) => state.classList.remove('on'));
  };

  const viewPagination = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <span
        key={'pagingNum0' + (index + 1)}
        className="cursor-pointer pagingView"
        onClick={(e) => pagingClick(e, `${index + 1}`)}
      >
        {index + 1}
      </span>
    ));
  };

  return (
    <div>
      <ul>
        <li className="flex justify-center items-end gap-6 m-4 pagingList" ref={pagingRef}>
          {viewPagination(Number(listData?.totalPages))}
        </li>
      </ul>
    </div>
  );
}
