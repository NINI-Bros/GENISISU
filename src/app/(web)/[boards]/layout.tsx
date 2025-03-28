import { ReactNode } from 'react';
import { Metadata } from 'next';
import ScrollToTop from '@/components/ScrollToTop';

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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="py-16 max-[1366px]:py-8 bg-white">
      {/* <ScrollToTop /> */}
      <div className="max-w-[1920px] m-[0px_auto] h-full">{children}</div>
    </main>
  );
}
