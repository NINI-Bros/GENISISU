'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { TargetArea } from './Spinner';

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
  const params = useParams();
  const searchParams = useSearchParams();

  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(i));
    const search = newSearchParams.toString();

    // console.log(page, i, page === i);
    pageList.push(
      <li key={i} className={page === i ? 'font-bold text-blue-700' : ''}>
        <Link href={`/${params.boards}?${search}`}>{i}</Link>
      </li>
    );
  }

  return (
    <div>
      <Suspense fallback={<TargetArea />}>
        <ul className="flex justify-center gap-3 m-4">{pageList}</ul>
      </Suspense>
    </div>
  );
};

export default Pagination;
