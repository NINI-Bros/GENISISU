import ScrollToTop from '@/components/ScrollToTop';
import BoardView from './BoardView';
import { Metadata } from 'next';
import { fetchPagination, fetchPosts } from '@/data/fetch/postFetch';
import { Suspense } from 'react';
import TableCellData from './TableCellData';
import SkeletonList from '@/components/skeleton/table/skeleton_list';
// import { delayTests } from '@/app/util/Delay';

export function generateStaticParams() {
  return [{ boards: 'drive' }, { boards: 'qna' }, { boards: 'info' }];
}

// eslint-disable-next-line require-await
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
  const metadataBase = new URL('https://genisisu.vercel.app');
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

async function DataFetching({
  boards,
  page,
  word,
}: {
  boards: string;
  page: string;
  word: string;
}) {
  // await delayTests(1500); //스켈레톤 ui 활성화 체크를 위한 딜레이 함수
  const postData = await fetchPosts(boards, page, word);
  const postPaginationData = await fetchPagination(boards, page, word);
  return (
    <BoardView
      boardTypes={boards}
      postData={postData}
      postNameData={TableCellData(boards)}
      paginationData={postPaginationData}
    />
  );
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
  const { title } = TableCellData(boards);

  return (
    <main className="py-16 max-[1366px]:py-8 bg-white">
      <ScrollToTop />
      <div className="max-w-[1920px] m-[0px_auto] h-full">
        <div className="text-center py-4">
          <h2 className="pb-20 max-[1366px]:pb-5 text-5xl font-medium text-black max-[1366px]:text-[34px]">
            {title}
          </h2>
        </div>
        <Suspense key={word} fallback={<SkeletonList listCount={9} />}>
          <DataFetching boards={boards} page={page} word={word} />
        </Suspense>
      </div>
    </main>
  );
}
