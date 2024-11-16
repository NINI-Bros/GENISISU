'use client';
import { BoardTitle, ListState, Pagination, Post } from '@/types';
import { useState } from 'react';
import PostPagination from '@/components/PostPagination';
import Button from '@/components/Button';
import Link from 'next/link';
import ListItem from './ListItem';
import { useSession } from '@/hook/useSession';
import { useRouter } from 'next/navigation';

export default function BoardView({
  boardTypes,
  postData,
  postNameData,
  paginationData,
}: {
  boardTypes: string;
  postData: Post[];
  postNameData: BoardTitle;
  paginationData: Pagination;
}) {
  const route = useRouter();
  const { session } = useSession();
  const { mainTitle, tableTitle, tableAuthor, tableDate, submitBtnName } = postNameData;
  const [list, setList] = useState<ListState>({
    typingWord: '',
  });

  // 게시판 데이터 매핑
  const postAllData = () => {
    return postData.map((item) => <ListItem key={item._id} item={item} boardTypes={boardTypes} />);
  };

  // 검색input 작성후 엔터값 지정
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickSearchBtn();
    }
  };

  // 검색 버튼
  const handleClickSearchBtn = () => {
    if (!list.typingWord) return;
    route.push(`/${boardTypes}?word=${list.typingWord}&page=1`);
  };

  // 초기화 버튼
  const handleClickResetBtn = () => {
    setList((prev) => {
      return { ...prev, typingWord: '' };
    });
    route.push(`/${boardTypes}`);
  };

  // 로그인 & 공지사항에 따른 버튼 표기 분기
  const ApplyBtn = () => {
    if (boardTypes === 'info' && session?.user?.type !== 'admin') {
      return null;
    } else {
      return (
        <>
          <div className="w-[1px] h-full bg-[#aaa] max-[1366px]:w-full max-[1366px]:h-[1px]"></div>
          <Link href={`/${boardTypes}/new`} className="btnBasic max-[1366px]:h-[45px]">
            {submitBtnName}
          </Link>
        </>
      );
    }
  };
  return (
    <div className="max-w-[1920px] m-[0px_auto] h-full">
      <div className="text-center py-4">
        <h2 className="pb-20 max-[1366px]:pb-5 text-5xl font-medium text-black max-[1366px]:text-[34px]">
          {mainTitle}
        </h2>
      </div>

      <div
        className="w-full flex justify-end pr-[300px] h-[45px] gap-x-[15px] 
                  max-[1366px]:justify-between max-[1366px]:mx-0 max-[1366px]:gap-x-[3%] max-[1366px]:px-[7%]
                  max-[1366px]:flex-col max-[1366px]:h-min max-[1366px]:gap-y-[20px]"
      >
        {/* <Search /> */}
        <div className="h-full flex gap-x-[10px] max-[1366px]:w-full max-[1366px]:justify-between max-[1366px]:h-[45px]">
          <div className="w-full grid grid-cols-[auto_80px]">
            <input
              type="text"
              className="border-[1px] border-black pl-[10px] w-full"
              value={list.typingWord}
              onChange={(e) => {
                setList((prev) => {
                  return { ...prev, typingWord: e.target.value };
                });
              }}
              onKeyDown={handleKeyDown}
              placeholder="게시글 검색"
            />
            <Button className="btnBasic w-full" onClick={handleClickSearchBtn}>
              검색
            </Button>
          </div>
          <Button
            className="btnBasic w-[80px]"
            onClick={() => {
              handleClickResetBtn();
            }}
          >
            초기화
          </Button>
        </div>
        <ApplyBtn />
      </div>

      {postAllData().length !== 0 ? (
        <section className="pt-10 px-[300px] max-[1366px]:px-0">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              <col className="w-[80%] sm:w-auto" />
              <col className="w-[20%] sm:w-[10%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[12%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-solid border-gray-600">
                <th className="p-2 ml-20 whitespace-nowrap font-medium max-[640px]:px-[7%]">
                  {tableTitle}
                </th>
                <th className="p-2 whitespace-nowrap font-medium max-[640px]:pl-0 max-[640px]:pr-[7%] max-[640px]:text-left">
                  {tableAuthor}
                </th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">조회수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">댓글수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">
                  {tableDate}
                </th>
              </tr>
            </thead>
            <tbody>{postAllData()}</tbody>
          </table>
          <hr />
          <PostPagination pagingData={paginationData} boardType={boardTypes} />
        </section>
      ) : (
        <section className="pt-10 flex justify-center items-center text-[#999] text-xl px-[300px] max-[1366px]:px-0">
          게시물이 존재하지 않습니다.
        </section>
      )}
    </div>
  );
}
