import Submit from '@/components/Submit';
import { Metadata } from 'next';
import Link from 'next/link';
import CommentList from './CommentList';
import { fetchPost, fetchPosts } from '@/data/fetch/postFetch';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import Image from 'next/image';
import { deletePost } from '@/data/actions/postAction';
import FoldingText from '../FoldingText';

export async function generateMetadata({
  params,
}: {
  params: { boards: string; id: string };
}): Promise<Metadata> {
  const boardName = params.boards;
  const item = await fetchPost(params.id);
  if (item === null) notFound();
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
    title: `${board} - ${item.title}`,
    description: `GENISISU ${board} 페이지`,
    openGraph: {
      title: `${board} - ${item.title}`,
      description: `GENISISU ${board} 페이지입니다.`,
      url: `/${boardName}/${params.id}`,
      images: {
        url: '/images/genisisu_logo_og.jpg',
      },
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const [drivePost, qnaPost, infoPost] = await Promise.all([
    fetchPosts('drive'),
    fetchPosts('qna'),
    fetchPosts('info'),
  ]);
  const driveParams = drivePost.map(({ type, _id }) => ({ boards: type, id: _id.toString() }));
  const qnaParams = qnaPost.map(({ type, _id }) => ({ boards: type, id: _id.toString() }));
  const infoParams = infoPost.map(({ type, _id }) => ({ boards: type, id: _id.toString() }));
  return [...driveParams, ...qnaParams, ...infoParams];
}

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT = process.env.NEXT_PUBLIC_CLIENT_ID;

export default async function Page({ params }: { params: { boards: string; id: string } }) {
  const session = await auth();
  const item = await fetchPost(params.id);
  let board = '';
  if (params.boards === 'drive') {
    board = '전시시승 게시글';
  } else if (params.boards === 'info') {
    board = '공지사항 게시글';
  } else {
    board = '고객지원 게시글';
  }
  const profileImage = item.user.image
    ? SERVER + item.user.image
    : `${SERVER}/files/${CLIENT}/profile-image-user.jpg`;

  return (
    <section className="bg-white px-[360px] py-20 max-[1366px]:px-4 max-[1366px]:py-8">
      <form className="mb-8 p-4">
        <input type="hidden" value={params.boards} name="boardName"></input>
        <input type="hidden" value={params.id} name="_id"></input>
        <h2 className="inline-block text-sm mb-2 p-2 border border-gray-[#aaa] bg-transparent">
          {board}
        </h2>
        <div className="font-normal text-[42px] max-[1366px]:text-[25px] mb-2">
          <FoldingText fetchPostData={item} viewType="detail" />
          {item.title}
        </div>
        {/* 프로필 */}
        <div className="flex gap-2 justify-start items-center pb-6 mb-12 border-b-[1px] border-gray-400 border-solid">
          <figure className="relative w-[34px] h-[34px] aspect-auto">
            <Image fill sizes="100%" src={profileImage} alt="작성자 프로필 사진" />
          </figure>
          <div>
            <span className="block text-black text-sm">{item.name || '익명'}</span>
            <time
              className="block text-[#aaa] text-sm font-normal"
              style={{ fontFamily: 'Hyundai-sans' }}
            >
              {item.createdAt}
            </time>
          </div>
        </div>

        {/* event, award에 따른 게시판 내용 분류 표기 & 옵셔널로 구분하여 DOM 랜더링 조건분기 진행 */}
        {item.extra?.contentType !== undefined ? (
          <section className="m-[0_auto] flex justify-center w-full max-w-[800px]">
            <figure className="w-full min-h-[800px] relative">
              <Image
                src={`${SERVER + item.extra.subContent}`}
                fill
                sizes="100%"
                alt={item.title}
                className="object-contain"
              ></Image>
            </figure>
          </section>
        ) : (
          <section>
            <div className="text-black text-lg mb-2 font-light">
              {params.boards === 'drive' ? '희망 플레이스 : ' : ''}
              {item.address}
            </div>
            <div className="text-black text-lg mb-12 font-light">연락처 : {item.phone}</div>
            <div className="text-black text-lg mb-20 font-light"> {item.content}</div>
          </section>
        )}

        {/* 하단 버튼 및 덧글 */}
        <div className="flex justify-end my-4">
          <Link href={`/${params.boards}`} className="bg-black py-1 px-4 text-base text-white ml-2">
            목록
          </Link>
          {(session?.user?.id === String(item.user?._id) || session?.user?.type === 'admin') && (
            <>
              <Link
                href={`/${params.boards}/${params.id}/edit`}
                className="py-1 px-4 mr-2 text-base text-black border-gray-600 border ml-2"
              >
                수정
              </Link>
              <Submit bgColor="black" formAction={deletePost}>
                삭제
              </Submit>
            </>
          )}
        </div>
      </form>
      <CommentList params={params} />
    </section>
  );
}
