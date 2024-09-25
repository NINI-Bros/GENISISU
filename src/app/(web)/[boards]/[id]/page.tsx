import Submit from '@/components/Submit';
import { Metadata } from 'next';
import Link from 'next/link';
import CommentList from './CommentList';
import { fetchPost } from '@/data/fetch/postFetch';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import Image from 'next/image';
import { deletePost } from '@/data/actions/postAction';

export async function generateMetadata({
  params,
}: {
  params: { boards: string; id: string };
}): Promise<Metadata> {
  const boardName = params.boards;
  const item = await fetchPost(params.id);
  if (item === null) notFound();
  return {
    title: `${boardName} - ${item.title}`,
    description: `${boardName} - ${item.content}`,
    openGraph: {
      title: `${boardName} - ${item.title}`,
      description: `${boardName} - ${item.content}`,
      url: `/${params.boards}/${params.id}`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { boards: 'drive', id: '13' },
    { boards: 'drive', id: '12' },
    { boards: 'drive', id: '11' },
    { boards: 'drive', id: '10' },    
    { boards: 'drive', id: '9' },
    { boards: 'drive', id: '8' },
    { boards: 'drive', id: '7' },
    { boards: 'drive', id: '5' },
    { boards: 'drive', id: '4' },
    { boards: 'drive', id: '3' },
    { boards: 'info', id: '43' },
    { boards: 'info', id: '42' },
    { boards: 'info', id: '41' },
    { boards: 'info', id: '40' },
    { boards: 'info', id: '39' },
    { boards: 'info', id: '38' },
    { boards: 'info', id: '37' },
    { boards: 'info', id: '36' },
    { boards: 'info', id: '35' },
    { boards: 'info', id: '34' },
    { boards: 'qna', id: '28' },
    { boards: 'qna', id: '27' },
    { boards: 'qna', id: '26' },
    { boards: 'qna', id: '25' },
    { boards: 'qna', id: '24' },
    { boards: 'qna', id: '23' },
    { boards: 'qna', id: '22' },
    { boards: 'qna', id: '21' },
    { boards: 'qna', id: '20' },
    { boards: 'qna', id: '19' }
  ];
}

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default async function Page({ params }: { params: { boards: string; id: string } }) {
  // const item = await model.post.detail(Number(params.id));
  const session = await auth();
  const item = await fetchPost(params.id);
  if (item === null) notFound();
  const board = params.boards === 'drive' ? '전시시승 게시글' : params.boards === 'info' ? '공지사항 게시글' : '고객지원 게시글';
  const profileImage = SERVER + item.user.image;

  return (
    <main className="bg-white px-40 py-20 max-[1366px]:px-4 max-[1366px]:py-8">
      <form className="mb-8 p-4">
        <input type='hidden' value={params.boards} name='boardName'></input>
        <input type='hidden' value={params.id} name='_id'></input>
        <h2 className='inline-block text-sm mb-2 p-2 border border-gray-[#aaa] bg-transparent'>{board}</h2>
        <div className="font-normal text-[42px] max-[1366px]:text-[25px] mb-2">
          {item.title}
        </div>
        {/* 프로필 */}
        <div className='flex gap-2 justify-start items-center mb-6'>
          <figure className='relative w-[34px] h-[34px] aspect-auto'>
            <Image fill sizes='100%' src={profileImage} alt="작성자 프로필 사진" />
          </figure>
          <div>
            <span className='block text-black text-sm'>
              {/* {item.user.name} */}
              {item.extra?.name}
            </span>
            <time 
              className='block text-[#aaa] text-sm font-normal'
              style={{ fontFamily: 'Hyundai-sans' }}
            >{item.createdAt}</time>
          </div>
        </div>
        <span className='block mb-12 border-b-[1px] border-gray-400 border-solid'></span>
        <div className="text-black text-lg mb-2 font-light">
          {params.boards === 'drive' ? '희망 플레이스 : ' : ''}
          {item.address}
        </div>
        <div className="text-black text-lg mb-12 font-light">연락처 : {item.phone}</div>
        <div className="text-black text-lg mb-20 font-light"> {item.content}</div>

        <div className="flex justify-end my-4">
          <Link
            href={`/${params.boards}`}
            className="bg-black py-1 px-4 text-base text-white ml-2"
          >
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
              <Submit bgColor="black" formAction={deletePost}>삭제</Submit>
            </>
          )}
        </div>
      </form>

      <CommentList params={params} />
    </main>
  );
}
