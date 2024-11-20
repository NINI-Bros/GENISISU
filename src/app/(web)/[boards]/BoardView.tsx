'use client';
import { BoardTitle, Pagination, Post } from '@/types';
import { useEffect, useState } from 'react';
import PostPagination from '@/components/PostPagination';
import Button from '@/components/Button';
import Link from 'next/link';
import ListItem from './ListItem';
import { useSession } from '@/hook/useSession';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const paramWord = useSearchParams().get('word');
  const { session } = useSession();
  const { title, tableTitle, tableAuthor, tableDate, btnTitle } = postNameData;
  const [typingWord, setTypingWord] = useState('');

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
    if (!typingWord || typingWord === paramWord) return;
    route.push(`/${boardTypes}?word=${typingWord}&page=1`);
  };

  // 검색값 유지
  useEffect(() => {
    if (paramWord) {
      setTypingWord(paramWord);
    }
  }, [paramWord]);

  // 초기화 버튼
  const handleClickResetBtn = () => {
    setTypingWord((prev) => (prev = ''));
    route.push(`/${boardTypes}`);
  };

  // 로그인 & 공지사항에 따른 버튼 표기 분기
  const ApplyBtn = () => {
    if (boardTypes === 'info' && session?.user?.type !== 'admin') {
      return null;
    } else {
      return (
        <>
          <Link href={`/${boardTypes}/new`} className="btnBasic max-[1366px]:h-[45px]">
            {btnTitle}
          </Link>
        </>
      );
    }
  };
  return (
    <div className="max-w-[1920px] m-[0px_auto] h-full">
      <div className="text-center py-4">
        <h2 className="pb-20 max-[1366px]:pb-5 text-5xl font-medium text-black max-[1366px]:text-[34px]">
          {title}
        </h2>
      </div>

      {/* 상단 검색바 */}
      <div
        className={`w-full flex px-[300px] h-[45px] 
                    ${
                      boardTypes === 'info' && session?.user?.type !== 'admin'
                        ? 'justify-end max-[1366px]:justify-center'
                        : 'justify-between'
                    }
                  max-[1080px]:flex-col-reverse max-[1080px]:w-full max-[1080px]:h-max max-[1080px]:gap-y-[10px] max-[1080px]:px-[7%]`}
      >
        <ApplyBtn />
        <div
          className="h-full grid grid-cols-[auto_80px] gap-x-[10px] 
                      max-[1080px]:h-[45px]  "
        >
          <div className="w-full grid grid-cols-[auto_80px]">
            <input
              type="text"
              className="border-[1px] border-black pl-[10px] w-full"
              value={typingWord}
              onChange={(e) => setTypingWord(() => e.target.value)}
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
