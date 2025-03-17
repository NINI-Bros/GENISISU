import { ReactNode } from 'react';
import { Metadata } from 'next';
import ScrollToTop from '@/components/ScrollToTop';
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

export default async function Layout({
  children,
  modal,
  params,
}: {
  children: ReactNode;
  modal: ReactNode;
  params: { boards: string };
}) {
  const { boards } = await params;
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
        {children}
      </div>

      {modal}
      <div id="boardModal"></div>
    </main>
  );
}
