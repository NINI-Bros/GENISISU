import ScrollToTop from '@/components/ScrollToTop';
import BoardView from './BoardView';
import { Metadata } from 'next';
import { fetchPagination, fetchPosts } from '@/data/fetch/postFetch';
import { Suspense } from 'react';
import TableCellData from './TableCellData';

export function generateStaticParams() {
  return [{ boards: 'drive' }, { boards: 'qna' }, { boards: 'info' }];
}

export async function generateMetadata({
  params,
}: {
  params: { boards: string };
}): Promise<Metadata> {
  const boardName = params.boards;
  let board = '';
  if (boardName === 'drive') {
    board = '전시시승 게시판';
  } else if (boardName === 'info') {
    board = '공지사항 게시판';
  } else {
    board = '고객지원 게시판';
  }
  const metadataBase = await new URL('https://genisisu.vercel.app');
  return {
    metadataBase,
    title: `${board}`,
    description: `GENISISU ${board} 페이지`,
    openGraph: {
      title: `${board} `,
      description: `GENISISU ${board} 페이지입니다.`,
      url: `/${boardName}`,
      images: {
        url: '/images/genisisu_logo_og.jpg',
      },
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { boards: string };
  searchParams: { word: string; page: string };
}) {
  const { boards } = await params;
  const { word, page } = await searchParams;
  const postData = await fetchPosts(boards, page, word);
  const postPaginationData = await fetchPagination(boards, page, word);

  return (
    <main className="py-16 max-[1366px]:py-8 bg-white">
      <ScrollToTop />
      <Suspense fallback={<div>데이터 로딩중. . .</div>}>
        <BoardView
          boardTypes={boards}
          postData={postData}
          postNameData={TableCellData(boards)}
          paginationData={postPaginationData}
        />
      </Suspense>
    </main>
  );
}
