import Pagination from '@/components/Pagination';
import { Metadata } from 'next';
import ListItem from './ListItem';
import { fetchPosts } from '@/data/fetch/postFetch';
import Link from 'next/link';
import ScrollToTop from './ScrollToTop';

export function generateMetadata({ params }: { params: { boards: string } }): Metadata {
  const boardName = params.boards;
  return {
    title: `${boardName} - 전시시승`,
    description: `${boardName} 게시판입니다.`,
    openGraph: {
      title: `${boardName} - 전시시승`,
      description: `${boardName} 게시판입니다.`,
      url: `/${params.boards}`,
      images: {
        url: '/images/fesp.webp',
      },
    },
  };
}

export default async function Page({ params }: { params: { boards: string } }) {
  const data = await fetchPosts(params.boards); // API 서버 호출
  const list = data.map((item) => <ListItem key={item._id} item={item} params={params} />); // 요소를 반복문으로 생성해줄 때 key값 필수
  // const list = [<ListItem key={1} />, <ListItem key={2} />];

  let title = '';
  if ('qna' === params.boards) {
    title = '고객지원';
  } else if ('info' === params.boards) {
    title = '전시시승';
  } else {
    title = '공지사항';
  }

  const tableTitle01 = 'info' === params.boards ? '시승신청 모델' : '제목';
  let tableTitle02 = 'info' === params.boards ? '신청자' : '작성자';
  let tableTitle03 = 'info' === params.boards ? '시승 신청일' : '작성일';

  return (
    <main className="min-w-80 py-32 px-40 bg-white">
      <ScrollToTop />
      <div className="text-center py-4">
        <h2 className="pb-20 text-5xl font-medium text-black">{title}</h2>
      </div>

      {params.boards !== 'notice' ? (
        <div className="flex justify-end mr-4 mb-8">
          {/* <Search /> */}
          <Link href={`/${params.boards}/drive`} className="btnBasic">
            신청하기
          </Link>
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
          <tbody>{list}</tbody>
        </table>
        <hr />

        <Pagination />
      </section>
    </main>
  );
}
