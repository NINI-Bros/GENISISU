import AddBoard from '@/components/drive/AddBoard';
import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { boards: string; id: string } }): Metadata {
  const boardName = params.boards;
  return {
    title: `${boardName} - 게시글 수정`,
    description: `${boardName} - 게시글을 수정하세요.`,
    openGraph: {
      title: `${boardName} - 게시글 수정`,
      description: `${boardName} - 게시글을 수정하세요.`,
      url: `/${params.boards}/${params.id}/editDrive`,
    },
  };
}

export default function Page({ params }: { params: { boards: string; id: string } }) {
  let board = '';
  if (params.boards === 'drive') {
    board = '시승신청 수정';
  } else if (params.boards === 'info') {
    board = '공지글 수정';
  } else {
    board = '문의글 수정';
  }

  return (
    <main className="min-w-80 py-16 px-40 bg-white max-[1366px]:px-[7%]">
      <div className="drive">
        <div className="text-center py-4">
          <h2 className="pb-12 text-5xl font-medium text-black">{board}</h2>
        </div>
        <AddBoard params={{ boards: params.boards, id: params.id }} isEdit={true} />
      </div>
    </main>
  );
}
