import BoardView from './BoardView';
import { fetchPagination, fetchPosts } from '@/data/fetch/postFetch';
import { Suspense } from 'react';
import TableCellData from './TableCellData';
import SkeletonList from '@/components/skeleton/table/skeleton_list';
import SearchBar from './SearchBar';
// import { delayTests } from '@/app/util/Delay';

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

  return (
    <>
      {/* 상단 검색바 */}
      <SearchBar boardTypes={boards} postNameData={TableCellData(boards)} />

      {/* 게시판 데이터 */}
      <Suspense key={word} fallback={<SkeletonList listCount={9} />}>
        <DataFetching boards={boards} page={page} word={word} />
      </Suspense>
    </>
  );
}
