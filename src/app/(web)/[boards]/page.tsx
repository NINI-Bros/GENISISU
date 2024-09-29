'use client'

import { BoardTitle, ListState } from '@/types';
import { fetchPagination, fetchPosts } from '@/data/fetch/postFetch';
import { useEffect, useState } from 'react';
// import { Metadata } from 'next';
import PostPagination from '@/components/PostPagination';
import Button from '@/components/Button';
import Link from 'next/link';
import ListItem from './ListItem';
import ScrollToTop from '../../../components/ScrollToTop';
import { useSession } from '@/hook/session';

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


export default function Page({ params }: { params: { boards: string} }) {
  const session = useSession();
  const [list, setList] = useState<ListState>({
    listJsx: null,
    pagination: null,
    typingWord: "",
    searchWord: "",
    thisPage: "1",
  });
  const [boardTitle, setBoardTitle] = useState<BoardTitle>({
    title:"",
    tableTitle01:"제목",
    tableTitle02:"작성자",
    tableTitle03:"작성일",
  });

  // 서버액션 함수 (페이지네이션, 검색)
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

  // 게시판분기에 따른 제목 및 Table Header값 설정
  useEffect(()=>{
    switch (params.boards) {
      case 'drive':
        setBoardTitle(prev => ({
          ...prev,
          title: '전시시승',
          tableTitle01: '시승신청 모델',
          tableTitle02: '신청자',
          tableTitle03: '시승 신청일'
        }))
        break;
      case 'qna':
        setBoardTitle(prev => ({...prev, title: '고객지원'}))
        break;
      case 'info':
        setBoardTitle(prev => ({...prev, title: '공지사항'}))
        break;
      default:
        setBoardTitle(prev => ({...prev}))
    }
  },[boardTitle.title, boardTitle.tableTitle01, boardTitle.tableTitle02, boardTitle.tableTitle03])

  // 검색input 작성후 엔터값 지정
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickSearchBtn()
    }
  }

  // 검색 버튼
  const handleClickSearchBtn = () => {
    setList(prev => {return {...prev, searchWord: list.typingWord }})
    setList(prev => {return {...prev, typingWord:"" }})
  }

  // 페이지네이션 클릭 및 prop끌어올리기 함수
  const handlePageClick = (page:string) => {
    setList(prev => {return{...prev, thisPage:page}})
  }

  // 로그인 & 공지사항에 따른 버튼 표기 분기
  const ApplyBtn = () => {
    if (params.boards === 'notice' && session?.user?.type !== "admin") {
      return null
    } else if (params.boards === 'notice' && session?.user?.type === "admin") {
      return <Link href={`/${params.boards}/new`} className="btnBasic">공지작성</Link>
    } else {
      return <Link href={`/${params.boards}/new`} className="btnBasic">신청하기</Link>
    }
  }

  return (
    <main className="py-16 max-[1366px]:py-8 bg-white">
      <ScrollToTop />
      <div className='max-w-[1920px] m-[0px_auto]'>
        <div className="text-center py-4">
          <h2 className="pb-20 max-[1366px]:pb-5 text-5xl font-medium text-black max-[1366px]:text-[34px]">{boardTitle.title}</h2>
        </div>

        <div className="flex justify-end mr-4 mb-8 h-[45px] gap-x-[10px] max-[1366px]:justify-between max-[1366px]:mx-0 max-[1366px]:gap-x-[3%] max-[1366px]:px-[7%]">
          {/* <Search /> */}
          <div className='grid grid-cols-[auto_80px] max-[1366px]:w-full'>
            <input type="text" className='border-[1px] border-black pl-[10px] w-full' value={list.typingWord} 
              onChange={(e) => {setList(prev => {return{...prev, typingWord:e.target.value}})}}
              onKeyDown={handleKeyDown}
              placeholder="게시글 검색"
              />
            <Button className='btnBasic w-full' onClick={handleClickSearchBtn}>검색</Button>
          </div>
            <ApplyBtn/>
        </div>

        <section className="pt-10">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              <col className="w-[80%] sm:w-[49%]" />
              <col className="w-[20%] sm:w-[25%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[8%]" />
              <col className="w-0 sm:w-[15%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-solid border-gray-600">
                {/* <th className="p-2 whitespace-nowrap font-medium">번호</th> */}
                <th className="p-2 ml-20 whitespace-nowrap font-medium max-[1366px]:px-[5%]">{boardTitle.tableTitle01}</th>
                <th className="p-2 whitespace-nowrap font-medium max-[1366px]:pl-0 max-[1366px]:pr-[5%] max-[1366px]:text-left">{boardTitle.tableTitle02}</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">조회수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">댓글수</th>
                <th className="p-2 whitespace-nowrap font-medium hidden sm:table-cell">{boardTitle.tableTitle02}</th>
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
