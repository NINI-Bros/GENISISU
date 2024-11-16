'use client';

import { Pagination } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PostPagination({
  pagingData,
  boardType,
}: {
  pagingData: Pagination | null;
  boardType: string;
}) {
  const route = useRouter();
  const searchParams = useSearchParams();
  const getWord = searchParams.get('word');
  const getPage = searchParams.get('page');

  // 페이지네이션 클릭
  const pagingClick = (e: React.MouseEvent<HTMLSpanElement>, page: string) => {
    route.push(`/${boardType}?${getWord !== null ? `word=${getWord}&` : ''}page=${page}`);
  };

  const viewPagination = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <span
        key={'pagingNum0' + (index + 1)}
        className={`cursor-pointer pagingView ${
          Number(getPage) === index + 1 || (index === 0 && getPage === null) ? 'on' : ''
        }`}
        onClick={(e) => pagingClick(e, `${index + 1}`)}
      >
        {index + 1}
      </span>
    ));
  };

  return (
    <div>
      <ul>
        <li className="flex justify-center items-end gap-6 m-4 pagingList">
          {viewPagination(Number(pagingData?.totalPages))}
        </li>
      </ul>
    </div>
  );
}
