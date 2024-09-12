'use client'

import { Pagination } from '@/types';
import { fetchPagination, fetchPosts } from '@/data/fetch/postFetch';
import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import PostPagination from '@/components/PostPagination';
import Button from '@/components/Button';
import Link from 'next/link';
import ListItem from './ListItem';
import ScrollToTop from './ScrollToTop';

// export function generateMetadata({ params }: { params: { boards: string } }): Metadata {
//   const boardName = params.boards;
//   return {
//     title: `${boardName} - 전시시승`,
//     description: `${boardName} 게시판입니다.`,
//     openGraph: {
//       title: `${boardName} - 전시시승`,
//       description: `${boardName} 게시판입니다.`,
//       url: `/${params.boards}`,
//       images: {
//         url: '/images/fesp.webp',
//       },
//     },
//   };
// }

interface ListState {
  listJsx: JSX.Element[] | null
  pagination: Pagination | null
  typingWord: string
  searchWord: string
  thisPage: string
}

export default function Page({ params }: { params: { boards: string} }) {
  const [list, setList] = useState<ListState>({
    listJsx: null,
    pagination: null,
    typingWord: "",
    searchWord: "",
    thisPage: "1",
  });

  useEffect(()=>{
    const postAllData = async () => {
      const data = await fetchPosts(params.boards, list.thisPage, list.searchWord); 
      const listItems = data.map((item) => <ListItem key={item._id} item={item} params={params}/>);
      setList(prev => {return{...prev, listJsx:listItems}})
    }
    const postPaginationData = async () => {
      const data = await fetchPagination(params.boards, list.thisPage, list.searchWord)
      setList(prev => {return{...prev, pagination:data}})
    }

    postAllData()
    postPaginationData()
  },[params, list.thisPage, list.searchWord, list.typingWord])


  // 검색시 엔터값 지정
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickSearchBtn()
    }
  }

  const handleClickSearchBtn = () => {
    setList(prev => {return {...prev, searchWord: list.typingWord }})
    setList(prev => {return {...prev, typingWord:"" }})
  }

  const handlePageClick = (page:string) => {
    setList(prev => {return{...prev, thisPage:page}})
  }

  let title = '';
  if (params.boards === 'qna') {
    title = '고객지원';
  } else if (params.boards === 'info') {
    title = '전시시승';
  } else {
    title = '공지사항';
  }

  const tableTitle01 = params.boards === 'info' ? '시승신청 모델' : '제목';
  const tableTitle02 = params.boards === 'info' ? '신청자' : '작성자';
  const tableTitle03 = params.boards === 'info' ? '시승 신청일' : '작성일';

  return (
    <main className="py-16 bg-white">
      <ScrollToTop />
      <div className='max-w-[1920px] m-[0px_auto]'>
        <div className="text-center py-4">
          <h2 className="pb-20 text-5xl font-medium text-black">{title}</h2>
        </div>

        {params.boards !== 'notice' ? (
          <div className="flex justify-end mr-4 mb-8 h-[45px]">
            {/* <Search /> */}
            <div className='grid grid-cols-[3fr_1fr]'>
              <input type="text" className='border-[1px] border-black pl-[10px]' value={list.typingWord} 
                onChange={(e) => {setList(prev => {return{...prev, typingWord:e.target.value}})}}
                onKeyDown={handleKeyDown}
                placeholder="게시글 검색"
                />
              <Button className='btnBasic w-full' onClick={handleClickSearchBtn}>검색</Button>
            </div>
            <Link href={`/${params.boards}/drive`} className="btnBasic ml-[10px]">신청하기 </Link>
          </div>
        ) : (
          ''
        )}
        <section className="pt-10">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              {/* <col className="w-[10%] sm:w-[10%]" /> */}
              <col className="w-[60%] sm:w-[49%]" />
              <col className="w-[30%] sm:w-[25%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[15%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-solid border-gray-600">
                {/* <th className="p-2 whitespace-nowrap font-medium">번호</th> */}
                <th className="p-2 ml-20 whitespace-nowrap font-medium">{tableTitle01}</th>
                <th className="p-2 whitespace-nowrap font-medium">{tableTitle02}</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">조회수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">댓글수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">
                  {tableTitle03}
                </th>
              </tr>
            </thead>
            <tbody>
              {list?.listJsx}      
            </tbody>
          </table>
          <hr />

          <PostPagination listData={list.pagination} pagingFn={handlePageClick}/>
        </section>
        
      </div>
   
    </main>
  );
}
