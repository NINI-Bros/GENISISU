'use client';

import { BoardTitle } from '@/types';
import { useSession } from '@/hook/useSession';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';

export default function SearchBar({
  boardTypes,
  postNameData,
}: {
  boardTypes: string;
  postNameData: BoardTitle;
}) {
  const route = useRouter();
  const paramWord = useSearchParams().get('word');
  const { session } = useSession();
  const [typingWord, setTypingWord] = useState('');
  const { btnTitle } = postNameData;

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
    <>
      <section
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
      </section>
    </>
  );
}
